import type { IncidentSimpleMapQuery } from '#/views/reports/incident-map/graphql/queries/__generated__/incident-map.generated';
import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import type { IncidentMapQuery } from 'graphql/reports/queries/__generated__/incident-map.generated';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';

import FloatingFilterPanel from '#/components/map/FloatingFilterPanel';
import FloatingShowFiltersButton from '#/components/map/FloatingShowFiltersButton';
import IncidentSidebar from '#/components/map/IncidentSidebar/IncidentSidebar.view';
import MapLegend from '#/components/map/MapLegend';
import MultiIncidentPopup from '#/components/map/MultiIncidentPopup/MultiIncidentPopup.view';
import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
import BCRPLayer from '#/views/reports/incident-map/layers/bcrpLayer';
import BusinessLayer, {
  getBrandColor,
} from '#/views/reports/incident-map/layers/businessLayer';
import CameraLayer from '#/views/reports/incident-map/layers/cameraLayer';
import {
  clusterRingLayer,
  incidentClusterCountLayer,
  incidentClusterLayer,
  incidentCountLayer,
  incidentMarkerLayer,
  incidentPulseLayer,
  incidentRingLayer,
} from '#/views/reports/incident-map/layers/incidentLayers';
import LondonPoliceLayer from '#/views/reports/incident-map/layers/londonArea';
import PoliceLayer from '#/views/reports/incident-map/layers/policeArea';
import RetailParkLayer from '#/views/reports/incident-map/layers/retailParkLayer';
import UKDistrictsLayer from '#/views/reports/incident-map/layers/ukDistrictsLayer';
import { Col, Row, Spin, Typography } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Map as MapboxMap, Popup, Source } from 'react-map-gl';
import { useStoreState } from 'state';

import useStyles from './IncidentMap.styles';

const { Text } = Typography;

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

// Layer definitions have been moved to ./layers/incidentLayers.tsx for better organization

interface Props {
  allBrandsData: BrandsQuery | undefined;
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  cluster: boolean;
  data: IncidentSimpleMapQuery | undefined;
  dateRange: { endDate: Date; startDate: Date } | null;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  heatmapIntensity: number;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  multiColour: 'multi' | 'single';
  onChangeBrands: (value: string[]) => void;
  onChangeCrimeGroups: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date } | null) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIncidentTypes: (value: string | string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangeOffenders: (value: string[]) => void;
  onChangePoliceAreas: (value: string | string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  // Save filters
  saveFilters: () => void;
  saving: boolean;
  schemes: { scheme: { id: string; name: string } }[];
  selectedBrands: string[];
  selectedCrimeGroups: string[];
  selectedGroups: string[];
  selectedIncidentTypes: string[];
  selectedIndustries: string[];
  selectedOffenders: string[];
  selectedPoliceAreas: string[];
  selectedSchemes: string[];
  setCluster: (value: boolean) => void;
  setHeatmapIntensity: (value: number) => void;
  setMultiColour: (value: 'multi' | 'single') => void;
  setShowBCRP: (value: boolean) => void;
  setShowBusinesses: (value: boolean) => void;
  setShowCameras: (value: boolean) => void;
  setShowHeatmap: (value: boolean) => void;
  setShowLondonPolice: (value: boolean) => void;
  setShowMarkers: (value: boolean) => void;
  setShowPolice: (value: boolean) => void;
  setShowRetailParks: (value: boolean) => void;
  setShowUKDistricts: (value: boolean) => void;
  setUseBcu: (value: boolean) => void;
  setViewMode: (value: 'popup' | 'sidebar') => void;
  showBCRP: boolean;
  showBusinesses: boolean;
  showCameras: boolean;
  showHeatmap: boolean;
  showLondonPolice: boolean;
  // Display settings
  showMarkers: boolean;
  showPolice: boolean;
  showRetailParks: boolean;
  showUKDistricts: boolean;

  useBcu: boolean;
  viewMode: 'popup' | 'sidebar';
}

const IncidentMap = ({
  allBrandsData,
  brandsData,
  brandsLoading,
  businessData,
  cluster,
  data,
  dateRange,
  groupsData,
  groupsLoading,
  heatmapIntensity,
  industriesData,
  industriesLoading,
  loading,
  multiColour,
  onChangeBrands,
  onChangeCrimeGroups,
  onChangeDateRange,
  onChangeGroups,
  onChangeIncidentTypes,
  onChangeIndustries,
  onChangeOffenders,
  onChangePoliceAreas,
  onChangeSchemes,
  // Save filters
  saveFilters,
  saving,
  schemes,
  selectedBrands,
  selectedCrimeGroups,
  selectedGroups,
  selectedIncidentTypes,
  selectedIndustries,
  selectedOffenders,
  selectedPoliceAreas,
  selectedSchemes,
  setCluster,
  setHeatmapIntensity,
  setMultiColour,
  setShowBCRP,
  setShowBusinesses,
  setShowCameras,
  setShowHeatmap,
  setShowLondonPolice: setShowLondonPoliceProp,
  setShowMarkers,
  setShowPolice,
  setShowRetailParks,
  setShowUKDistricts,
  setUseBcu: setUseBcuProp,
  setViewMode,
  showBCRP,
  showBusinesses,
  showCameras,
  showHeatmap,
  showLondonPolice,
  // Display settings
  showMarkers,
  showPolice,
  showRetailParks,
  showUKDistricts,

  useBcu,
  viewMode,
}: Props) => {
  const mapRef = useRef<MapRef>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [selectedIncidents, setSelectedIncidents] = useState<{
    currentIndex: number;
    incidents: IncidentSimpleMapQuery['incidents'];
    latitude: number;
    longitude: number;
  } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const setUseBcu = () => {
    setUseBcuProp(!useBcu);
  };

  const setShowLondonPolice = () => {
    setShowLondonPoliceProp(!showLondonPolice);
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
  const toggleCameras = () => setShowCameras(!showCameras);
  const toggleBCRP = () => setShowBCRP(!showBCRP);
  const toggleRetailParks = () => setShowRetailParks(!showRetailParks);
  const toggleUKDistricts = () => setShowUKDistricts(!showUKDistricts);

  const onCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
    setSelectedIncidents(null);
  }, []);

  const onOpenSidebar = useCallback(
    (
      incidents: IncidentSimpleMapQuery['incidents'],
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
    ): Promise<IncidentSimpleMapQuery['incidents']> => {
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
          return new Promise<IncidentSimpleMapQuery['incidents']>((resolve) => {
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
            // Check if this feature has multiple incidents stored
            const allIncidentsJson = incidentFeature.properties
              ?.allIncidents as string | undefined;
            let incidentsAtLocation: IncidentMapQuery['incidents'];

            if (allIncidentsJson) {
              // Multiple incidents at this location - use the stored array
              incidentsAtLocation = JSON.parse(
                allIncidentsJson
              ) as IncidentMapQuery['incidents'];
            } else {
              // Single incident
              const clickedIncident = JSON.parse(
                incidentFeature.properties?.incident as string
              ) as IncidentMapQuery['incidents'][number];
              incidentsAtLocation = [clickedIncident];
            }

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
    // Small delay to ensure layers are loaded
    const timer = setTimeout(() => {
      if (!mapRef.current) return;

      try {
        // Move incident layers up
        mapRef.current.moveLayer('unclustered-point');
        mapRef.current.moveLayer('clusters');

        // Move text layers to the top
        mapRef.current.moveLayer('cluster-count');
        mapRef.current.moveLayer('incident-count');

        // If businesses are shown, ensure they're below incidents
        if (showBusinesses && showMarkers) {
          const map = mapRef.current.getMap();

          // Check if layers exist before trying to move them
          if (
            map.getLayer('business-points') &&
            map.getLayer('unclustered-point')
          ) {
            map.moveLayer('business-points', 'unclustered-point');
          }
          if (
            map.getLayer('business-ring') &&
            map.getLayer('business-points')
          ) {
            map.moveLayer('business-ring', 'business-points');
          }
        }
      } catch (error) {
        console.log('Layer reordering error:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [
    showHeatmap,
    showMarkers,
    showPolice,
    useBcu,
    showLondonPolice,
    showBusinesses,
    cluster,
  ]);

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

  const classes = useStyles({ colorScheme: currentTheme } as Parameters<
    typeof useStyles
  >[0]);

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

  const incidentCoords =
    data?.incidents
      ?.map((incident) => ({
        lat: incident.location?.geoLat || 0,
        lng: incident.location?.geoLng || 0,
      }))
      ?.filter((coord) => coord.lng !== 0 && coord.lat !== 0) || [];

  // Extract unique brands with their colors
  const uniqueBrands = useMemo(() => {
    if (!businessData?.listBusinesses?.businesses || !showBusinesses) return [];

    const brandsMap = new Map<string, { color: string; name: string }>();

    // Create a map of brand IDs to names from both brandsData and allBrandsData
    const brandIdToName = new Map<string, string>();

    // First add brands from filtered brandsData
    if (brandsData?.brands?.edges) {
      for (const { node } of brandsData.brands.edges) {
        brandIdToName.set(node.id, node.name);
      }
    }

    // Then add ALL brands to catch any missing ones
    if (allBrandsData?.brands?.edges) {
      for (const { node } of allBrandsData.brands.edges) {
        if (!brandIdToName.has(node.id)) {
          brandIdToName.set(node.id, node.name);
        }
      }
    }

    for (const business of businessData.listBusinesses.businesses) {
      if (business.brands)
        for (const brandId of business.brands) {
          if (brandId && !brandsMap.has(brandId)) {
            // Get the brand name from our complete map, fallback to ID if still not found
            const brandName = brandIdToName.get(brandId) || brandId;
            brandsMap.set(brandId, {
              color: getBrandColor(brandId, brandName),
              name: brandName,
            });
          }
        }
    }

    // Convert to array and sort by name
    return [...brandsMap.values()].sort((a, b) => a.name.localeCompare(b.name));
  }, [businessData, brandsData, allBrandsData, showBusinesses]);

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
        <div className={classes.mapContainer} ref={mapContainerRef}>
          {/* Loading overlay */}
          {(loading || (!data && !businessData)) && (
            <div className={classes.loadingOverlay}>
              <div className={classes.loadingContent}>
                <Spin size="large" />
                <Text className={classes.loadingText}>
                  <FormattedMessage defaultMessage="Loading map data..." />
                </Text>
              </div>
            </div>
          )}
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
              'business-points',
              'business-clusters',
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
            <BusinessLayer
              businessData={businessData}
              cluster={cluster}
              showDetailedLabels={false}
              showLabels={true}
              visible={showBusinesses}
            />
            {showMarkers && (
              <Source
                cluster={cluster}
                clusterMaxZoom={14}
                clusterProperties={{
                  incidentCount: ['+', ['get', 'incidentCount']],
                }}
                clusterRadius={50}
                data={{
                  features: (() => {
                    if (!data?.incidents) return [];

                    // Always group incidents by exact location first
                    const locationGroups = new Map<
                      string,
                      IncidentSimpleMapQuery['incidents'][number][]
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

                    // Create features with proper incident counts
                    return [...locationGroups.entries()].map(
                      ([locationKey, incidents]) => {
                        const [lng, lat] = locationKey.split(',').map(Number);
                        const [primaryIncident] = incidents;

                        return {
                          geometry: {
                            coordinates: [lng, lat],
                            type: 'Point' as const,
                          },
                          properties: {
                            // Store all incidents for retrieval when clicked
                            allIncidents:
                              incidents.length > 1
                                ? JSON.stringify(incidents)
                                : undefined,
                            incident: JSON.stringify(primaryIncident),
                            incidentCount: incidents.length,
                          },
                          type: 'Feature' as const,
                        };
                      }
                    );
                  })(),
                  type: 'FeatureCollection',
                }}
                id="incidents"
                type="geojson"
              >
                {/* Background layers first */}
                <Layer {...incidentPulseLayer} />
                <Layer {...incidentRingLayer} />

                {/* Cluster layers - only shown when clustering is enabled */}
                {cluster && (
                  <>
                    <Layer {...clusterRingLayer} />
                    <Layer {...incidentClusterLayer} />
                  </>
                )}

                {/* Main marker layer */}
                <Layer {...incidentMarkerLayer} />

                {/* Text layers on top - these must be last to appear above circles */}
                {cluster && <Layer {...incidentClusterCountLayer} />}
                <Layer {...incidentCountLayer} />
              </Source>
            )}
            <PoliceLayer
              colourMode={multiColour}
              incidents={incidentCoords}
              mapRef={mapRef}
              visible={showPolice}
            />
            <LondonPoliceLayer
              colourMode={multiColour}
              incidents={incidentCoords}
              mapRef={mapRef}
              useBcuColour={useBcu}
              visible={showLondonPolice}
            />
            <CameraLayer
              showLabels={true}
              useIcons={false}
              visible={showCameras}
            />
            <BCRPLayer
              showDetailedLabels={false}
              showLabels={true}
              visible={showBCRP}
            />
            <RetailParkLayer
              showIcons={false}
              showLabels={true}
              visible={showRetailParks}
            />
            <UKDistrictsLayer showLabels={true} visible={showUKDistricts} />
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
              {showHeatmap && (
                <Layer
                  id="heatmap"
                  maxzoom={20}
                  paint={{
                    'heatmap-intensity': {
                      stops: [
                        [11, 0.5 + (heatmapIntensity / 100) * 1.5], // Scale from 0.5 to 2
                        [15, 1 + (heatmapIntensity / 100) * 4], // Scale from 1 to 5
                      ],
                    },
                    'heatmap-opacity': 0.2 + (heatmapIntensity / 100) * 0.4, // Scale from 0.2 to 0.6
                    'heatmap-radius': {
                      stops: [
                        [11, 10 + (heatmapIntensity / 100) * 20], // Scale from 10 to 30
                        [15, 20 + (heatmapIntensity / 100) * 30], // Scale from 20 to 50
                      ],
                    },
                    'heatmap-weight': 0.5 + (heatmapIntensity / 100) * 1, // Scale from 0.5 to 1.5
                  }}
                  source="incidents-heatmap"
                  type="heatmap"
                />
              )}
            </Source>

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
                  incidents={
                    selectedIncidents?.incidents.map((item) => item.id) || []
                  }
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
              dateRange={dateRange}
              groupsData={groupsData}
              groupsLoading={groupsLoading}
              heatmapIntensity={heatmapIntensity}
              industriesData={industriesData}
              industriesLoading={industriesLoading}
              multiColour={multiColour}
              onChangeBrands={onChangeBrands}
              onChangeCrimeGroups={onChangeCrimeGroups}
              onChangeDateRange={onChangeDateRange}
              onChangeGroups={onChangeGroups}
              onChangeHeatmapIntensity={setHeatmapIntensity}
              onChangeIncidentTypes={onChangeIncidentTypes}
              onChangeIndustries={onChangeIndustries}
              onChangeOffenders={onChangeOffenders}
              onChangePoliceAreas={onChangePoliceAreas}
              onChangeSchemes={onChangeSchemes}
              onClose={toggleFilterPanel}
              onSaveFilters={saveFilters}
              onToggleBCRP={toggleBCRP}
              onToggleBusinesses={toggleBusinesses}
              onToggleCameras={toggleCameras}
              onToggleCluster={toggleCluster}
              onToggleHeatmap={toggleHeatmap}
              onToggleMarkers={toggleMarkers}
              onTogglePolice={togglePolice}
              onToggleRetailParks={toggleRetailParks}
              onToggleUKDistricts={toggleUKDistricts}
              onToggleViewMode={toggleViewMode}
              savingFilters={saving}
              schemes={schemes}
              selectedBrands={selectedBrands}
              selectedCrimeGroups={selectedCrimeGroups}
              selectedGroups={selectedGroups}
              selectedIncidentTypes={selectedIncidentTypes}
              selectedIndustries={selectedIndustries}
              selectedOffenders={selectedOffenders}
              selectedPoliceAreas={selectedPoliceAreas}
              selectedSchemes={selectedSchemes}
              setMultiColour={setMultiColour}
              setShowLondonPolice={setShowLondonPolice}
              setUseBcu={setUseBcu}
              showBCRP={showBCRP}
              showBusinesses={showBusinesses}
              showCameras={showCameras}
              showHeatmap={showHeatmap}
              showLondonPolice={showLondonPolice}
              showMarkers={showMarkers}
              showPolice={showPolice}
              showRetailParks={showRetailParks}
              showUKDistricts={showUKDistricts}
              useBcu={useBcu}
              viewMode={viewMode}
            />
          )}

          {!showFilterPanel && (
            <FloatingShowFiltersButton onClick={toggleFilterPanel} />
          )}

          <MapLegend
            brands={uniqueBrands}
            showBCRP={showBCRP}
            showBusinesses={showBusinesses}
            showCameras={showCameras}
            showHeatmap={showHeatmap}
            showMarkers={showMarkers}
            showRetailParks={showRetailParks}
            showUKDistricts={showUKDistricts}
          />
        </div>

        <IncidentSidebar
          currentIndex={selectedIncidents?.currentIndex || 0}
          incidents={selectedIncidents?.incidents.map((item) => item.id) || []}
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
