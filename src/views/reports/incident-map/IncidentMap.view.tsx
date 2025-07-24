import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import type { IncidentMapQuery } from 'graphql/reports/queries/__generated__/incident-map.generated';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';

import FloatingFilterPanel from '#/components/map/FloatingFilterPanel';
import FloatingShowFiltersButton from '#/components/map/FloatingShowFiltersButton';
import IncidentSidebar from '#/components/map/IncidentSidebar/IncidentSidebar.view';
import MultiIncidentPopup from '#/components/map/MultiIncidentPopup/MultiIncidentPopup.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import LondonPoliceLayer from '#/views/reports/incident-map/layers/londonArea';
import PoliceLayer from '#/views/reports/incident-map/layers/policeArea';
import { Col, Row, Spin } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Layer, Map as MapboxMap, Popup, Source } from 'react-map-gl';
import { useStoreState } from 'state';

import useStyles from './IncidentMap.styles';

export const dataLayer: FillLayer = {
  id: 'data',
  paint: {
    'fill-color': '#3288bd',
    'fill-opacity': 0.5,
  },
  source: 'police-data',
  type: 'fill',
};

export const lineLayer: LineLayer = {
  id: 'line',
  paint: {
    'line-color': '#000',
    'line-width': 1,
  },
  source: 'police-data',
  type: 'line',
};

const ClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        50,
        '#f1f075',
        100,
        '#f28cb1',
      ],
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    }}
    source="incidents"
    type="circle"
  />
);

const ClusterCountLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="cluster-count"
    layout={{
      'text-allow-overlap': true,
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-ignore-placement': true,
      'text-size': 12,
    }}
    paint={{
      'text-color': [
        'step',
        ['get', 'point_count'],
        '#fff',
        50,
        '#000',
        100,
        '#fff',
      ],
    }}
    source="incidents"
    type="symbol"
  />
);

const UnClusteredLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-point"
    paint={{
      'circle-color': [
        'case',
        ['>', ['get', 'incidentCount'], 1],
        '#ff4d4f', // Red for multiple incidents
        '#11b4da', // Blue for single incident
      ],
      'circle-radius': ['case', ['>', ['get', 'incidentCount'], 1], 10, 8],
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 2,
    }}
    source="incidents"
    type="circle"
  />
);

const IncidentCountLayer = (
  <Layer
    filter={[
      'all',
      ['!', ['has', 'point_count']],
      ['>', ['get', 'incidentCount'], 1],
    ]}
    id="incident-count"
    layout={{
      'text-field': ['get', 'incidentCount'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 11,
    }}
    paint={{
      'text-color': '#fff',
    }}
    source="incidents"
    type="symbol"
  />
);

const BusinessClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    }}
    source="businesses"
    type="circle"
  />
);

const BusinessClusterCountLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="cluster-count"
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
    paint={{
      'text-color': '#FFF',
    }}
    source="businesses"
    type="symbol"
  />
);

const BusinessUnClusteredLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-point"
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': 5,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.5,
    }}
    source="businesses"
    type="circle"
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    paint={{
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3],
        ],
      },
      'heatmap-opacity': 0.3,
      'heatmap-radius': {
        stops: [
          [11, 15],
          [15, 30],
        ],
      },
      'heatmap-weight': 1,
      // 'heatmap-intensity': {
      //   stops: [
      //     [11, 1],
      //     [15, 3]
      //   ]
      // },
    }}
    type="heatmap"
  />
);

interface Props {
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  data: IncidentMapQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date }) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIndustries: string[];
  selectedSchemes: string[];
}

const IncidentMap = ({
  brandsData,
  brandsLoading,
  businessData,
  data,
  groupsData,
  groupsLoading,
  industriesData,
  industriesLoading,
  loading,
  onChangeBrands,
  onChangeDateRange,
  onChangeGroups,
  onChangeIndustries,
  onChangeSchemes,
  schemes,
  selectedBrands,
  selectedGroups,
  selectedIndustries,
  selectedSchemes,
}: Props) => {
  const mapRef = useRef<MapRef>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [multiColour, setMultiColour] = useState<'multi' | 'single'>('single');
  const [showBusinesses, setShowBusinesses] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showPolice, setShowPolice] = useState(false);
  const [showLondonPolice, toggleShowLondonPolice] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [cluster, setCluster] = useState(true);
  const [selectedIncidents, setSelectedIncidents] = useState<{
    currentIndex: number;
    incidents: IncidentMapQuery['incidents'];
    latitude: number;
    longitude: number;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'popup' | 'sidebar'>('popup');

  // Helper function to convert GraphQL incident to component incident type
  const adaptIncidentForComponent = useCallback(
    (incident: IncidentMapQuery['incidents'][number]) => ({
      ...incident,
      reference: incident.reference?.toString() || null,
    }),
    []
  );

  const setShowLondonPolice = () => {
    toggleShowLondonPolice(!showLondonPolice);
  };

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const toggleCluster = () => {
    setCluster(!cluster);
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'popup' ? 'sidebar' : 'popup');
    // Close any open interfaces when switching modes
    setSidebarOpen(false);
    setSelectedIncidents(null);
  };

  const toggleBusinesses = () => {
    setShowBusinesses(!showBusinesses);
    if (!showBusinesses) setShowMarkers(false);
  };
  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
    if (!showMarkers) setShowBusinesses(false);
  };
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);
  const togglePolice = () => setShowPolice(!showPolice);

  const onCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
    setSelectedIncidents(null);
  }, []);

  const onOpenSidebar = useCallback(
    (
      incidents: IncidentMapQuery['incidents'],
      longitude: number,
      latitude: number,
      currentIndex: number = 0
    ) => {
      setSelectedIncidents({
        currentIndex,
        incidents,
        latitude,
        longitude,
      });
      setSidebarOpen(true);
    },
    []
  );

  const findIncidentsAtLocation = useCallback(
    (clickLng: number, clickLat: number, tolerance = 0.0001) => {
      if (!data?.incidents) return [];

      return data.incidents.filter((incident) => {
        const lng = incident.location?.geoLng || 0;
        const lat = incident.location?.geoLat || 0;
        return (
          Math.abs(lng - clickLng) < tolerance &&
          Math.abs(lat - clickLat) < tolerance
        );
      });
    },
    [data?.incidents]
  );

  const getIncidentsFromCluster = useCallback(
    async (
      clusterFeature: mapboxgl.MapboxGeoJSONFeature
    ): Promise<IncidentMapQuery['incidents']> => {
      if (!mapRef.current || !data?.incidents) return [];

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
          return new Promise<IncidentMapQuery['incidents']>((resolve) => {
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

                const incidents = features
                  .map((feature) => {
                    try {
                      return feature.properties?.incident
                        ? (JSON.parse(
                            feature.properties.incident as string
                          ) as IncidentMapQuery['incidents'][number])
                        : null;
                    } catch (error) {
                      console.error(
                        'Failed to parse incident from cluster leaf:',
                        error
                      );
                      return null;
                    }
                  })
                  .filter(
                    (
                      incident
                    ): incident is IncidentMapQuery['incidents'][number] =>
                      incident !== null
                  );

                console.log(
                  `Cluster ${clusterId}: ${features.length} features, ${incidents.length} incidents`
                );
                resolve(incidents);
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
        const baseTolerance = 0.001;
        const tolerance =
          baseTolerance *
          Math.max(1, (15 - currentZoom) / 5) *
          Math.sqrt(pointCount / 10);

        const nearbyIncidents = data.incidents.filter((incident) => {
          const incidentLng = incident.location?.geoLng || 0;
          const incidentLat = incident.location?.geoLat || 0;

          const distance = Math.sqrt(
            Math.pow(incidentLng - clusterLng, 2) +
              Math.pow(incidentLat - clusterLat, 2)
          );

          return distance <= tolerance;
        });

        console.log(
          `Cluster fallback: ${pointCount} expected, ${nearbyIncidents.length} found (tolerance: ${tolerance.toFixed(6)})`
        );
        return nearbyIncidents;
      } catch (error) {
        console.error('Failed to get incidents from cluster:', error);
        return [];
      }
    },
    [data?.incidents]
  );

  const onMapClick = useCallback(
    async (event: mapboxgl.MapLayerMouseEvent) => {
      // Check if we clicked on an incident or cluster
      const { features } = event;
      console.log(
        'Map click - all features:',
        features?.map((f) => ({ layer: f.layer.id, properties: f.properties }))
      );

      if (features && features.length > 0) {
        // Look for cluster features first (prioritize cluster handling)
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

        // Handle cluster click (prioritize cluster over individual incidents)
        if (clusterFeature || clusterCountFeature) {
          const feature = clusterFeature || clusterCountFeature;
          console.log(
            'Cluster click detected:',
            feature?.layer.id,
            feature?.properties
          );

          try {
            // If we clicked on cluster-count but it doesn't have cluster_id, try to find the cluster underneath
            if (
              feature?.layer.id === 'cluster-count' &&
              !feature?.properties?.cluster_id
            ) {
              // Look for a cluster feature at the same location
              const nearbyCluster = features.find(
                (f) => f.layer.id === 'clusters' && f.properties?.cluster_id
              );
              if (nearbyCluster) {
                console.log(
                  'Found underlying cluster:',
                  nearbyCluster.properties
                );
                const incidents = await getIncidentsFromCluster(nearbyCluster);
                if (incidents.length > 0) {
                  setSelectedIncidents({
                    currentIndex: 0,
                    incidents,
                    latitude: event.lngLat.lat,
                    longitude: event.lngLat.lng,
                  });
                }
                return;
              }
            }

            const incidents = feature
              ? await getIncidentsFromCluster(feature)
              : [];

            if (incidents.length > 0) {
              if (viewMode === 'sidebar') {
                onOpenSidebar(incidents, event.lngLat.lng, event.lngLat.lat, 0);
              } else {
                setSelectedIncidents({
                  currentIndex: 0,
                  incidents,
                  latitude: event.lngLat.lat,
                  longitude: event.lngLat.lng,
                });
              }
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
            ) as IncidentMapQuery['incidents'][number];

            // Only use manual grouping when clustering is disabled or for precision
            const incidentsAtLocation = cluster
              ? [clickedIncident] // When clustering is enabled, treat as single incident
              : findIncidentsAtLocation(
                  // When clustering is disabled, find overlapping
                  clickedIncident.location?.geoLng || 0,
                  clickedIncident.location?.geoLat || 0
                );

            if (viewMode === 'sidebar') {
              onOpenSidebar(
                incidentsAtLocation,
                event.lngLat.lng,
                event.lngLat.lat,
                0
              );
            } else {
              setSelectedIncidents({
                currentIndex: 0,
                incidents: incidentsAtLocation,
                latitude: event.lngLat.lat,
                longitude: event.lngLat.lng,
              });
            }
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
      cluster,
      viewMode,
      onOpenSidebar,
    ]
  );

  const onMouseEnter = useCallback((event: mapboxgl.MapLayerMouseEvent) => {
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
  }, []);

  const onMouseLeave = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = '';
    }
  }, []);

  const onNavigateIncident = useCallback(
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

  const onSelectIncident = useCallback(
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

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };

    const rAF = requestAnimationFrame(handleResize);

    return () => cancelAnimationFrame(rAF);
  }, [collapsed]);

  const classes = useStyles();

  // Add global styles for Mapbox popup theming
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .mapboxgl-popup-content {
        background-color: ${currentTheme === 'dark' ? '#1f1f1f' : '#ffffff'} !important;
        border-radius: 12px !important;
        padding: 0 !important;
      }
      .mapboxgl-popup-tip {
        border-top-color: ${currentTheme === 'dark' ? '#1f1f1f' : '#ffffff'} !important;
      }
    `;
    document.head.append(style);

    return () => {
      style.remove();
    };
  }, [currentTheme]);

  console.log(showLondonPolice);
  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId="incident-map"
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col className={classes.page} flex={1}>
        {loading && data?.incidents ? (
          <div className={classes.loadingPage}>
            <Spin />
          </div>
        ) : (
          <div className={classes.mapContainer} ref={mapContainerRef}>
            <MapboxMap
              initialViewState={{
                latitude: 55.37,
                longitude: 3.43,
                zoom: 5,
              }}
              interactiveLayerIds={[
                'unclustered-point',
                'incident-count',
                'clusters',
                'cluster-count',
              ]}
              mapLib={mapboxgl}
              mapStyle={
                currentTheme === 'dark'
                  ? 'mapbox://styles/wgarrod/clua60bxj016401qse8vj1qfu'
                  : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
              }
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              onClick={onMapClick as (event: unknown) => void}
              onError={() => {}}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              ref={mapRef}
              style={{ height: '100vh', width: '100%' }}
            >
              <PoliceLayer colourMode={multiColour} visible={showPolice} />
              <LondonPoliceLayer
                colourMode={multiColour}
                visible={showLondonPolice}
              />
              {showMarkers && (
                <Source
                  cluster={cluster}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features: (() => {
                      if (!data?.incidents) return [];

                      if (cluster) {
                        // When clustering is enabled, create individual features
                        // Mapbox will handle the clustering automatically
                        return data.incidents.map((incident) => ({
                          geometry: {
                            coordinates: [
                              incident.location?.geoLng || 0,
                              incident.location?.geoLat || 0,
                            ],
                            type: 'Point' as const,
                          },
                          properties: {
                            incident: JSON.stringify(incident),
                            incidentCount: 1, // Individual incidents
                          },
                          type: 'Feature' as const,
                        }));
                      } else {
                        // When clustering is disabled, group incidents by location manually
                        const locationGroups = new Map<
                          string,
                          IncidentMapQuery['incidents'][number][]
                        >();
                        for (const incident of data.incidents) {
                          const lng = incident.location?.geoLng || 0;
                          const lat = incident.location?.geoLat || 0;
                          const locationKey = `${lng.toFixed(6)},${lat.toFixed(6)}`;

                          if (!locationGroups.has(locationKey)) {
                            locationGroups.set(locationKey, []);
                          }
                          locationGroups.get(locationKey)!.push(incident);
                        }

                        // Create features with incident count for manual grouping
                        return [...locationGroups.entries()].map(
                          ([locationKey, incidents]) => {
                            const [lng, lat] = locationKey
                              .split(',')
                              .map(Number);
                            const [primaryIncident] = incidents; // Use first incident as primary

                            return {
                              geometry: {
                                coordinates: [lng, lat],
                                type: 'Point' as const,
                              },
                              properties: {
                                incident: JSON.stringify(primaryIncident),
                                incidentCount: incidents.length,
                              },
                              type: 'Feature' as const,
                            };
                          }
                        );
                      }
                    })(),
                    type: 'FeatureCollection',
                  }}
                  id="incidents"
                  type="geojson"
                >
                  {ClusterLayer}
                  {ClusterCountLayer}
                  {UnClusteredLayer}
                  {!cluster && IncidentCountLayer}
                </Source>
              )}
              <Source
                data={{
                  features:
                    data?.incidents.map((incident) => ({
                      geometry: {
                        coordinates: [
                          incident.location?.geoLng || 0,
                          incident.location?.geoLat || 0,
                        ],
                        type: 'Point',
                      },
                      properties: {},
                      type: 'Feature',
                    })) || [],
                  type: 'FeatureCollection',
                }}
                id="incidents-heatmap"
                type="geojson"
              >
                {showHeatmap && HeatMapLayer}
              </Source>
              {showBusinesses && (
                <Source
                  cluster={cluster}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features:
                      businessData?.listBusinesses.businesses.map(
                        (business) => ({
                          geometry: {
                            coordinates: [
                              business.locations[0]?.geoLng || 0,
                              business.locations[0]?.geoLat || 0,
                            ],
                            type: 'Point',
                          },
                          properties: {},
                          type: 'Feature',
                        })
                      ) || [],
                    type: 'FeatureCollection',
                  }}
                  id="businesses"
                  type="geojson"
                >
                  {BusinessClusterLayer}
                  {BusinessClusterCountLayer}
                  {BusinessUnClusteredLayer}
                </Source>
              )}

              {selectedIncidents && viewMode === 'popup' && (
                <Popup
                  anchor="bottom"
                  closeButton={true}
                  closeOnClick={false}
                  latitude={selectedIncidents.latitude}
                  longitude={selectedIncidents.longitude}
                  offset={[0, -10]}
                  onClose={() => setSelectedIncidents(null)}
                >
                  <MultiIncidentPopup
                    currentIndex={selectedIncidents.currentIndex}
                    incidents={selectedIncidents.incidents.map(
                      adaptIncidentForComponent
                    )}
                    onNavigate={onNavigateIncident}
                  />
                </Popup>
              )}
            </MapboxMap>

            {showFilterPanel && (
              <FloatingFilterPanel
                brandsData={brandsData}
                brandsLoading={brandsLoading}
                cluster={cluster}
                containerRef={mapContainerRef}
                groupsData={groupsData}
                groupsLoading={groupsLoading}
                industriesData={industriesData}
                industriesLoading={industriesLoading}
                multiColour={multiColour}
                onChangeBrands={onChangeBrands}
                onChangeDateRange={onChangeDateRange}
                onChangeGroups={onChangeGroups}
                onChangeIndustries={onChangeIndustries}
                onChangeSchemes={onChangeSchemes}
                onClose={toggleFilterPanel}
                onToggleBusinesses={toggleBusinesses}
                onToggleCluster={toggleCluster}
                onToggleHeatmap={toggleHeatmap}
                onToggleMarkers={toggleMarkers}
                onTogglePolice={togglePolice}
                onToggleViewMode={toggleViewMode}
                schemes={schemes}
                selectedBrands={selectedBrands}
                selectedGroups={selectedGroups}
                selectedIndustries={selectedIndustries}
                selectedSchemes={selectedSchemes}
                setMultiColour={setMultiColour}
                setShowLondonPolice={setShowLondonPolice}
                showBusinesses={showBusinesses}
                showHeatmap={showHeatmap}
                showLondonPolice={showLondonPolice}
                showMarkers={showMarkers}
                showPolice={showPolice}
                viewMode={viewMode}
              />
            )}

            {!showFilterPanel && (
              <FloatingShowFiltersButton onClick={toggleFilterPanel} />
            )}
          </div>
        )}

        <IncidentSidebar
          currentIndex={selectedIncidents?.currentIndex || 0}
          incidents={
            selectedIncidents?.incidents.map(adaptIncidentForComponent) || []
          }
          isOpen={sidebarOpen}
          onClose={onCloseSidebar}
          onNavigate={onNavigateIncident}
          onSelectIncident={onSelectIncident}
        />
      </Col>
    </Row>
  );
};

export default IncidentMap;
