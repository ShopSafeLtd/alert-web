import type mapboxgl from 'mapbox-gl';
import type { MapRef } from 'react-map-gl';

import { useCallback, useState } from 'react';

interface MapIncident {
  [key: string]: unknown;
  id: string;
  location?: {
    geoLat?: null | number;
    geoLng?: null | number;
  } | null;
}

interface SelectedIncidents<T extends MapIncident> {
  currentIndex: number;
  incidents: T[];
  latitude: number;
  longitude: number;
}

export function useMapInteractions<T extends MapIncident>(
  mapRef: React.RefObject<MapRef>,
  incidents: T[],
  options?: {
    clusterTolerance?: number;
    enableClustering?: boolean;
  }
) {
  const [selectedIncidents, setSelectedIncidents] =
    useState<SelectedIncidents<T> | null>(null);

  const findIncidentsAtLocation = useCallback(
    (clickLng: number, clickLat: number, tolerance = 0.0001) =>
      incidents.filter((incident) => {
        const lng = incident.location?.geoLng || 0;
        const lat = incident.location?.geoLat || 0;
        return (
          Math.abs(lng - clickLng) < tolerance &&
          Math.abs(lat - clickLat) < tolerance
        );
      }),
    [incidents]
  );

  const getIncidentsFromCluster = useCallback(
    async (clusterFeature: mapboxgl.MapboxGeoJSONFeature): Promise<T[]> => {
      if (!mapRef.current || !incidents) return [];

      try {
        const map = mapRef.current.getMap();
        const source = map.getSource('incidents') as mapboxgl.GeoJSONSource;

        if (!source) {
          console.warn('Cluster source not available');
          return [];
        }

        // Try to get the cluster leaves (actual incidents in the cluster)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const clusterId = clusterFeature.properties?.cluster_id;
        if (clusterId !== undefined && 'getClusterLeaves' in source) {
          return new Promise<T[]>((resolve) => {
            // Type assertion needed for Mapbox clustering extension
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            const clusterSource = source as any;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            clusterSource.getClusterLeaves(
              clusterId,
              Infinity,
              0,
              (
                err: Error | null,
                features: mapboxgl.MapboxGeoJSONFeature[]
              ) => {
                if (err) {
                  console.error('Error getting cluster leaves:', err);
                  resolve([]);
                  return;
                }

                const incidentsList = features
                  .map((feature) => {
                    try {
                      return feature.properties?.incident
                        ? (JSON.parse(
                            feature.properties.incident as string
                          ) as T)
                        : null;
                    } catch (error) {
                      console.error(
                        'Failed to parse incident from cluster leaf:',
                        error
                      );
                      return null;
                    }
                  })
                  .filter((incident): incident is T => incident !== null);

                resolve(incidentsList);
              }
            );
          });
        }

        // Fallback: Use geographic proximity
        const { coordinates } = clusterFeature.geometry as unknown as {
          coordinates: [number, number];
        };
        const [clusterLng, clusterLat] = coordinates;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const pointCount = clusterFeature.properties?.point_count || 0;

        // Calculate dynamic tolerance based on zoom level and point count
        const currentZoom = map.getZoom();
        const baseTolerance = options?.clusterTolerance || 0.001;
        const tolerance =
          baseTolerance *
          Math.max(1, (15 - currentZoom) / 5) *
          Math.sqrt(pointCount / 10);

        return incidents.filter((incident) => {
          const incidentLng = incident.location?.geoLng || 0;
          const incidentLat = incident.location?.geoLat || 0;

          const distance = Math.sqrt(
            Math.pow(incidentLng - clusterLng, 2) +
              Math.pow(incidentLat - clusterLat, 2)
          );

          return distance <= tolerance;
        });
      } catch (error) {
        console.error('Failed to get incidents from cluster:', error);
        return [];
      }
    },
    [incidents, mapRef, options?.clusterTolerance]
  );

  const handleMapClick = useCallback(
    async (event: mapboxgl.MapLayerMouseEvent) => {
      const { features } = event;

      if (features && features.length > 0) {
        // Look for cluster features first
        const clusterFeature = features.find(
          (f) => f.layer.id === 'clusters' && f.properties?.cluster_id
        );

        const clusterCountFeature = features.find(
          (f) => f.layer.id === 'cluster-count'
        );

        const incidentFeature = features.find(
          (f) =>
            (f.layer.id === 'unclustered-point' ||
              f.layer.id === 'incident-count') &&
            f.properties?.incident
        );

        // Handle cluster click
        if (clusterFeature || clusterCountFeature) {
          const feature = clusterFeature || clusterCountFeature;

          try {
            // If we clicked on cluster-count but it doesn't have cluster_id, try to find the cluster underneath
            if (
              feature?.layer.id === 'cluster-count' &&
              !feature?.properties?.cluster_id
            ) {
              const nearbyCluster = features.find(
                (f) => f.layer.id === 'clusters' && f.properties?.cluster_id
              );
              if (nearbyCluster) {
                const incidentsList =
                  await getIncidentsFromCluster(nearbyCluster);
                if (incidentsList.length > 0) {
                  setSelectedIncidents({
                    currentIndex: 0,
                    incidents: incidentsList,
                    latitude: event.lngLat.lat,
                    longitude: event.lngLat.lng,
                  });
                }
                return;
              }
            }

            const incidentsList = feature
              ? await getIncidentsFromCluster(feature)
              : [];

            if (incidentsList.length > 0) {
              setSelectedIncidents({
                currentIndex: 0,
                incidents: incidentsList,
                latitude: event.lngLat.lat,
                longitude: event.lngLat.lng,
              });
            }
          } catch (error) {
            console.error('Failed to handle cluster click:', error);
          }
        }
        // Handle individual incident click
        else if (incidentFeature) {
          try {
            const clickedIncident = JSON.parse(
              incidentFeature.properties?.incident as string
            ) as T;

            // Only use manual grouping when clustering is disabled or for precision
            const incidentsAtLocation =
              options?.enableClustering === false
                ? findIncidentsAtLocation(
                    clickedIncident.location?.geoLng || 0,
                    clickedIncident.location?.geoLat || 0
                  )
                : [clickedIncident];

            setSelectedIncidents({
              currentIndex: 0,
              incidents: incidentsAtLocation,
              latitude: event.lngLat.lat,
              longitude: event.lngLat.lng,
            });
          } catch (error) {
            console.error('Failed to parse incident data:', error);
          }
        }
      } else {
        // Click on empty space closes popup
        setSelectedIncidents(null);
      }
    },
    [
      findIncidentsAtLocation,
      getIncidentsFromCluster,
      options?.enableClustering,
    ]
  );

  const handleMouseEnter = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (event.features && event.features.length > 0) {
        const [feature] = event.features;
        if (
          (feature.layer.id === 'unclustered-point' ||
            feature.layer.id === 'incident-count' ||
            feature.layer.id === 'clusters' ||
            feature.layer.id === 'cluster-count') &&
          mapRef.current
        ) {
          mapRef.current.getCanvas().style.cursor = 'pointer';
        }
      }
    },
    [mapRef]
  );

  const handleMouseLeave = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = '';
    }
  }, [mapRef]);

  const navigateIncident = useCallback(
    (index: number) => {
      if (selectedIncidents) {
        setSelectedIncidents({
          ...selectedIncidents,
          currentIndex: index,
        });
      }
    },
    [selectedIncidents]
  );

  return {
    handleMapClick,
    handleMouseEnter,
    handleMouseLeave,
    navigateIncident,
    selectedIncidents,
    setSelectedIncidents,
  };
}
