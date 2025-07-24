import type { MapRef } from 'react-map-gl';

import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { faArrowsMaximize, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Switch,
  Tooltip,
  Typography,
} from 'antd';
import { useAtomValue } from 'jotai';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Layer, Map, Marker, Popup, Source } from 'react-map-gl';
import { useStoreState } from 'state';

import MapPin from '../MapPin';
import MultiIncidentPopup from '../MultiIncidentPopup/MultiIncidentPopup.view';
import { useMapInteractions } from '../hooks/useMapInteractions';

const { Text } = Typography;

// Calculate scale factor based on zoom level
const getScaleFactor = (zoom: number) => {
  // Balanced scaling for readability
  if (zoom < 8) return 0.9; // Very zoomed out
  if (zoom < 10) return 0.915; // Zoomed out
  if (zoom < 12) return 0.925; // Medium zoom out
  if (zoom < 14) return 0.935; // Slight zoom out
  if (zoom < 16) return 0.95; // Normal scale
  return 0.95; // Slightly smaller when very zoomed in
};

const useStyles = createUseStyles({
  action: {
    marginTop: -20,
  },
  actions: {
    marginTop: 60,
    paddingLeft: 10,
  },
  clickableOverlay: {
    cursor: 'pointer',
  },
  mapOverlay: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.3)',
      opacity: 1,
    },
    alignItems: 'center',
    bottom: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all 0.2s ease-in-out',
    zIndex: 3,
  },
  mapText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 0,
    marginLeft: 10,
  },
});

interface Props {
  height: number | string;
  isPrinting?: boolean;
  markers: {
    // Additional fields for incident data
    approved?: boolean | null;
    business?: {
      name?: null | string;
    } | null;
    createdBy?: {
      fullName?: null | string;
    } | null;
    crimeTypes?: Array<{
      id: string;
      name: string;
    }> | null;
    customerRef?: null | string;
    dayTime?: null | string;
    description?: null | string;
    geoLat?: null | number;
    geoLng?: null | number;
    groups?: Array<{
      id: string;
      name: string;
    }> | null;
    id?: string;
    location?: {
      full?: null | string;
      geoLat?: null | number;
      geoLng?: null | number;
    } | null;
    offenders?: Array<{
      id: string;
      name?: null | string;
    }> | null;
    policeRef?: null | string;
    priority?: null | string;
    reference?: null | number | string;
    subject?: string;
    totalValue?: null | number;
  }[];
  width: number | string;
}

const ClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
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
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
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
      'circle-color': '#11b4da',
      'circle-radius': 8,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1,
    }}
    source="incidents"
    type="circle"
  />
);

// Component for detailed incident card
interface IncidentData {
  offenders?: Array<{
    id: string;
    name?: null | string;
  }> | null;
  reference?: null | number | string;
  subject?: string;
  totalValue?: null | number;
}

const DetailedIncidentCard = ({
  currency,
  incident,
  intl,
  isDark,
  scaleFactor = 1,
}: {
  currency: string;
  incident: IncidentData;
  intl: ReturnType<typeof useIntl>;
  isDark: boolean;
  scaleFactor?: number;
}) => (
  <div
    style={{
      WebkitBackdropFilter: 'blur(12px) saturate(150%)',
      backdropFilter: 'blur(12px) saturate(150%)',
      background: isDark
        ? 'rgba(30, 30, 30, 0.75)'
        : 'rgba(255, 255, 255, 0.75)',
      border: `1px solid ${
        isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'
      }`,
      borderRadius: 12,
      boxShadow: isDark
        ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
      fontSize: 14 * scaleFactor,
      maxWidth: 260 * scaleFactor,
      padding: 12 * scaleFactor,
      pointerEvents: 'none',
      transform: `scale(${scaleFactor})`,
      transformOrigin: 'bottom center',
    }}
  >
    <div
      style={{
        fontSize: 16 * scaleFactor,
        fontWeight: 700,
        marginBottom: 6 * scaleFactor,
      }}
    >
      {incident.subject || intl.formatMessage({ defaultMessage: 'Incident' })}
    </div>
    <div
      style={{
        color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#555',
        fontSize: 13 * scaleFactor,
        marginBottom: 4 * scaleFactor,
      }}
    >
      {intl.formatMessage(
        { defaultMessage: 'Reference: #{reference}' },
        { reference: incident.reference }
      )}
    </div>
    <div
      style={{
        color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#555',
        fontSize: 15 * scaleFactor,
        fontWeight: 600,
        marginBottom: 4 * scaleFactor,
      }}
    >
      {intl.formatMessage({ defaultMessage: 'Value: ' })}
      {intl.formatNumber(Number(incident.totalValue || 0), {
        currency,
        notation: 'compact',
        style: 'currency',
      })}
    </div>
    {incident.offenders && incident.offenders.length > 0 && (
      <div
        style={{
          borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
          marginTop: 6 * scaleFactor,
          paddingTop: 6 * scaleFactor,
        }}
      >
        <div
          style={{
            fontSize: 13 * scaleFactor,
            fontWeight: 600,
            marginBottom: 4 * scaleFactor,
          }}
        >
          {intl.formatMessage({ defaultMessage: 'Offenders:' })}
        </div>
        {incident.offenders.slice(0, 3).map((offender, idx) => (
          <div
            key={idx}
            style={{
              color: isDark ? 'rgba(255, 255, 255, 0.85)' : '#666',
              fontSize: 12 * scaleFactor,
              marginBottom: 2 * scaleFactor,
            }}
          >
            {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
            {'\u2022 '}
            {offender.name || intl.formatMessage({ defaultMessage: 'Unknown' })}
          </div>
        ))}
        {incident.offenders.length > 3 && (
          <div
            style={{
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#888',
              fontSize: 11 * scaleFactor,
              fontStyle: 'italic',
              marginTop: 2 * scaleFactor,
            }}
          >
            {intl.formatMessage(
              { defaultMessage: '...and {count} more' },
              { count: incident.offenders.length - 3 }
            )}
          </div>
        )}
      </div>
    )}
  </div>
);

// Dynamic heatmap layer that scales better with zoom
const createHeatMapLayer = (zoom: number) => {
  // Adjust parameters based on zoom level
  const getHeatmapRadius = () => {
    if (zoom < 5) return [0, 5, 8, 15, 12, 25, 15, 40, 18, 60];
    if (zoom < 8) return [0, 8, 8, 20, 12, 35, 15, 55, 18, 80];
    if (zoom < 10) return [0, 10, 8, 25, 12, 45, 15, 70, 18, 100];
    if (zoom < 12) return [0, 15, 8, 35, 12, 60, 15, 90, 18, 120];
    if (zoom < 14) return [0, 20, 8, 45, 12, 80, 15, 120, 18, 160];
    return [0, 25, 8, 60, 12, 100, 15, 150, 18, 200];
  };

  const radiusStops = getHeatmapRadius();

  return (
    <Layer
      id="heatmap"
      maxzoom={20}
      paint={{
        // Enhanced color ramp with better contrast
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(0,0,255,0)', // Transparent
          0.05,
          'rgba(33,102,172,0.5)', // Deep blue (very low)
          0.1,
          'rgba(103,169,207,0.6)', // Light blue (low)
          0.2,
          'rgba(149,217,180,0.7)', // Blue-green
          0.4,
          'rgba(255,255,191,0.8)', // Yellow-green
          0.6,
          'rgba(253,174,97,0.9)', // Orange
          0.8,
          'rgba(244,109,67,0.95)', // Dark orange
          1,
          'rgba(215,48,39,1)', // Red (hotspot)
        ],
        // Dynamic intensity based on zoom
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          zoom < 10 ? 0.5 : 1,
          8,
          zoom < 10 ? 1 : 1.5,
          12,
          zoom < 10 ? 1.5 : 2,
          15,
          zoom < 10 ? 2 : 2.5,
          18,
          3,
        ],
        // Dynamic opacity
        'heatmap-opacity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0,
          0.6,
          8,
          0.7,
          12,
          0.8,
          15,
          0.85,
          18,
          0.9,
        ],
        // Dynamic radius based on zoom
        'heatmap-radius': [
          'interpolate',
          ['exponential', 2],
          ['zoom'],
          ...radiusStops,
        ],
        // Weight based on incident value and count
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', 'incidentValue'],
          0,
          0.1,
          1000,
          0.3,
          5000,
          0.6,
          10_000,
          1,
          50_000,
          1.5,
          100_000,
          2,
        ],
      }}
      source="incidents"
      type="heatmap"
    />
  );
};

const LocatingCard = ({ height, isPrinting, markers, width }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const intl = useIntl();
  const classes = useStyles();
  const currency = useAtomValue(currencyAtom);
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [expandedCluster, setExpandedCluster] = useState<null | string>(null);

  // Initialize currentZoom state with a default value
  const [currentZoom, setCurrentZoom] = useState(10);

  const isDark = currentTheme === 'dark' && !isPrinting;

  // Convert markers to include location structure
  const incidentsData = useMemo(
    () =>
      markers.map((marker, index) => ({
        ...marker,
        id: marker.id || `marker-${index}`,
        location: marker.location || {
          full: undefined,
          geoLat: marker.geoLat,
          geoLng: marker.geoLng,
        },
      })),
    [markers]
  );

  // Function to cluster nearby incidents for detailed view
  const getClusteredIncidents = useMemo(() => {
    if (!showDetailedView || markers.length <= 1) return [];

    const incidents = [...incidentsData];
    const clusters: Array<{
      center: { lat: number; lng: number };
      id: string;
      incidents: typeof incidentsData;
      totalValue: number;
    }> = [];
    const processed = new Set<string>();

    // Clustering radius in degrees (roughly 100 meters at equator)
    const CLUSTER_RADIUS = 0.001;

    for (const incident of incidents) {
      if (processed.has(incident.id)) continue;

      const lat = incident.location?.geoLat || incident.geoLat || 0;
      const lng = incident.location?.geoLng || incident.geoLng || 0;

      // Find all nearby incidents
      const cluster = incidents.filter((other) => {
        if (processed.has(other.id)) return false;

        const otherLat = other.location?.geoLat || other.geoLat || 0;
        const otherLng = other.location?.geoLng || other.geoLng || 0;

        // Simple distance check (good enough for clustering)
        const latDiff = Math.abs(lat - otherLat);
        const lngDiff = Math.abs(lng - otherLng);

        return latDiff < CLUSTER_RADIUS && lngDiff < CLUSTER_RADIUS;
      });

      if (cluster.length > 0) {
        // Mark all incidents in cluster as processed
        for (const inc of cluster) processed.add(inc.id);

        // Calculate cluster center
        const sumLat = cluster.reduce(
          (sum, inc) => sum + (inc.location?.geoLat || inc.geoLat || 0),
          0
        );
        const sumLng = cluster.reduce(
          (sum, inc) => sum + (inc.location?.geoLng || inc.geoLng || 0),
          0
        );
        const totalValue = cluster.reduce(
          (sum, inc) => sum + (inc.totalValue || 0),
          0
        );

        clusters.push({
          center: {
            lat: sumLat / cluster.length,
            lng: sumLng / cluster.length,
          },
          id: `cluster-${clusters.length}`,
          incidents: cluster,
          totalValue,
        });
      }
    }

    return clusters;
  }, [showDetailedView, markers, incidentsData]);

  // Use map interactions hook
  const {
    handleMapClick,
    handleMouseEnter,
    handleMouseLeave,
    selectedIncidents,
  } = useMapInteractions(mapRef, incidentsData, { enableClustering: true });

  const toggleLargeOpen = () => setLargeOpen(!largeOpen);
  const toggleMarkers = () => setShowMarkers(!showMarkers);
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);
  const toggleDetailedView = () => setShowDetailedView(!showDetailedView);

  const scaleFactor = getScaleFactor(currentZoom);

  // Create dynamic heatmap layer based on current zoom
  const HeatMapLayer = useMemo(
    () => createHeatMapLayer(currentZoom),
    [currentZoom]
  );

  // Add global styles for Mapbox popup theming and modal positioning
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
      .fullscreen-map-modal .ant-modal-wrap {
        position: fixed !important;
        inset: 0 !important;
        overflow: hidden !important;
      }
      .fullscreen-map-modal .ant-modal {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        max-width: 100vw !important;
        height: 100vh !important;
      }
      .fullscreen-map-modal .ant-modal-content {
        height: 100vh !important;
        margin: 0 !important;
        border-radius: 0 !important;
      }
      .fullscreen-map-modal .ant-modal-body {
        height: 100vh !important;
        padding: 0 !important;
      }
    `;
    document.head.append(style);

    return () => {
      style.remove();
    };
  }, [currentTheme]);

  // Calculate bounds that include all markers
  const bounds = useMemo(() => {
    if (!markers || markers.length === 0) return null;

    const validMarkers = markers.filter(
      (m) => m.geoLat !== null && m.geoLng !== null
    );
    if (validMarkers.length === 0) return null;

    const lngs = validMarkers.map((m) => m.geoLng!);
    const lats = validMarkers.map((m) => m.geoLat!);

    const sw: [number, number] = [Math.min(...lngs), Math.min(...lats)];
    const ne: [number, number] = [Math.max(...lngs), Math.max(...lats)];

    return [sw, ne];
  }, [markers]);

  // Calculate initial view state based on bounds
  const initialViewState = useMemo(() => {
    if (!bounds) {
      return {
        latitude: 0,
        longitude: 0,
        pitch: 45,
        zoom: 2,
      };
    }

    const [sw, ne] = bounds;
    const centerLng = (sw[0] + ne[0]) / 2;
    const centerLat = (sw[1] + ne[1]) / 2;

    // If single marker, use higher zoom
    if (markers.length === 1) {
      return {
        latitude: centerLat,
        longitude: centerLng,
        pitch: 45,
        zoom: 16,
      };
    }

    // For multiple markers, calculate appropriate zoom level based on geographic spread
    const lngDiff = ne[0] - sw[0];
    const latDiff = ne[1] - sw[1];
    const maxDiff = Math.max(lngDiff, latDiff);

    // Improved zoom calculation for better handling of spread out points
    let zoom = 16;
    if (maxDiff > 10)
      zoom = 3; // Continental scale
    else if (maxDiff > 5)
      zoom = 4; // Large country scale
    else if (maxDiff > 2)
      zoom = 5; // Country scale
    else if (maxDiff > 1)
      zoom = 6; // Large region scale
    else if (maxDiff > 0.5)
      zoom = 7; // Region scale
    else if (maxDiff > 0.2)
      zoom = 8; // State/province scale
    else if (maxDiff > 0.1)
      zoom = 10; // City scale
    else if (maxDiff > 0.05)
      zoom = 12; // District scale
    else if (maxDiff > 0.01)
      zoom = 14; // Neighborhood scale
    else zoom = 15; // Local area scale

    return {
      latitude: centerLat,
      longitude: centerLng,
      padding: { bottom: 50, left: 50, right: 50, top: 50 },
      pitch: 45,
      zoom,
    };
  }, [bounds, markers.length]);

  // Update zoom when initialViewState changes
  useEffect(() => {
    setCurrentZoom(initialViewState.zoom);
  }, [initialViewState.zoom]);

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);

  return (
    <Card
      bodyStyle={{
        borderRadius: 10,
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
      }}
    >
      <div
        className={classes.mapOverlay}
        onClick={toggleLargeOpen}
        onKeyPress={toggleLargeOpen}
        role="button"
        tabIndex={-100}
      >
        <FontAwesomeIcon color="#FFF" icon={faArrowsMaximize} size="lg" />
        <Text className={classes.mapText}>
          {intl.formatMessage({
            defaultMessage: 'View Larger Map',
          })}
        </Text>
      </div>
      <Map
        initialViewState={initialViewState}
        interactiveLayerIds={
          markers.length > 1
            ? ['unclustered-point', 'clusters', 'cluster-count']
            : []
        }
        mapLib={mapboxgl}
        mapStyle={
          isDark
            ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
            : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
        }
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        onClick={handleMapClick as (event: unknown) => void}
        onError={() => {}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMove={(evt) => setCurrentZoom(evt.viewState.zoom)}
        preserveDrawingBuffer
        style={{ height, width }}
      >
        {markers.length === 1 &&
          markers.map((marker, index) => (
            <Marker
              anchor="bottom"
              key={index}
              latitude={Number(marker.geoLat) || 0}
              longitude={Number(marker.geoLng) || 0}
            >
              <MapPin />
            </Marker>
          ))}
        {markers.length > 1 && (
          <Source
            cluster
            clusterMaxZoom={20}
            clusterProperties={{}}
            clusterRadius={50}
            data={{
              features: incidentsData.map((incident) => ({
                geometry: {
                  coordinates: [
                    incident.location?.geoLng || incident.geoLng || 0,
                    incident.location?.geoLat || incident.geoLat || 0,
                  ],
                  type: 'Point',
                },
                properties: {
                  incident: JSON.stringify(incident),
                  incidentCount: 1,
                  incidentValue: incident.totalValue || 0,
                  offenderNames:
                    incident.offenders
                      ?.map(
                        (o) =>
                          o.name ||
                          intl.formatMessage({ defaultMessage: 'Unknown' })
                      )
                      .slice(0, 3)
                      .join(', ') ||
                    intl.formatMessage({ defaultMessage: 'No offenders' }),
                },
                type: 'Feature',
              })),
              type: 'FeatureCollection',
            }}
            id="incidents"
            type="geojson"
          >
            {!showDetailedView && ClusterLayer}
            {!showDetailedView && ClusterCountLayer}
            {!showDetailedView && UnClusteredLayer}
          </Source>
        )}

        {/* Detailed view for small map with clustering */}
        {showDetailedView &&
          markers.length > 1 &&
          getClusteredIncidents.slice(0, 10).map((cluster) => (
            <Marker
              anchor="bottom"
              key={`small-${cluster.id}`}
              latitude={cluster.center.lat}
              longitude={cluster.center.lng}
            >
              <div
                style={{
                  WebkitBackdropFilter: 'blur(10px) saturate(140%)',
                  backdropFilter: 'blur(10px) saturate(140%)',
                  background: isDark
                    ? 'rgba(30, 30, 30, 0.7)'
                    : 'rgba(255, 255, 255, 0.7)',
                  border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
                  borderRadius: 8,
                  boxShadow: isDark
                    ? '0 4px 16px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
                    : '0 4px 16px rgba(0, 0, 0, 0.06), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
                  cursor: cluster.incidents.length > 1 ? 'pointer' : 'default',
                  fontSize: 11,
                  maxWidth: 140,
                  padding: 6,
                  pointerEvents: 'auto',
                  transition: 'all 0.2s ease',
                }}
              >
                {cluster.incidents.length === 1 ? (
                  <>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>
                      {intl.formatMessage(
                        { defaultMessage: '#{reference}' },
                        { reference: cluster.incidents[0].reference }
                      )}
                    </div>
                    <div
                      style={{
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#555',
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {intl.formatNumber(cluster.incidents[0].totalValue || 0, {
                        currency,
                        notation: 'compact',
                        style: 'currency',
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                      {cluster.incidents.length}{' '}
                      {intl.formatMessage({ defaultMessage: 'Incidents' })}
                    </div>
                    <div
                      style={{
                        color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#555',
                        fontSize: 11,
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {intl.formatNumber(cluster.totalValue, {
                        currency,
                        notation: 'compact',
                        style: 'currency',
                      })}
                    </div>
                  </>
                )}
              </div>
            </Marker>
          ))}

        {selectedIncidents && (
          <Popup
            anchor="bottom"
            closeButton={true}
            closeOnClick={false}
            latitude={selectedIncidents.latitude}
            longitude={selectedIncidents.longitude}
            offset={[0, -10]}
            onClose={() => {
              void handleMapClick({
                features: [],
              } as unknown as mapboxgl.MapLayerMouseEvent);
            }}
          >
            <MultiIncidentPopup
              incidents={selectedIncidents.incidents.map(
                (incident) => incident.id
              )}
            />
          </Popup>
        )}
      </Map>

      <Modal
        centered={false}
        footer={null}
        maskClosable={false}
        onCancel={toggleLargeOpen}
        open={largeOpen}
        style={{
          height: '100vh',
          margin: 0,
          padding: 0,
        }}
        width="100vw"
        wrapClassName="fullscreen-map-modal"
      >
        <div style={{ height: '100vh', position: 'relative', width: '100vw' }}>
          {largeOpen && (
            <Map
              initialViewState={initialViewState}
              interactiveLayerIds={
                markers.length > 1
                  ? ['unclustered-point', 'clusters', 'cluster-count']
                  : []
              }
              mapLib={mapboxgl}
              mapStyle={
                currentTheme === 'dark'
                  ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                  : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
              }
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              onClick={handleMapClick as (event: unknown) => void}
              onError={() => {}}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMove={(evt) => setCurrentZoom(evt.viewState.zoom)}
              ref={mapRef}
              style={{ height: '100vh', width: '100vw' }}
            >
              {markers.length === 1 &&
                markers.map((marker, index) => (
                  <Marker
                    anchor="bottom"
                    key={index}
                    latitude={Number(marker.geoLat) || 0}
                    longitude={Number(marker.geoLng) || 0}
                  >
                    <MapPin />
                  </Marker>
                ))}
              {markers.length > 1 && (
                <Source
                  cluster
                  // clusterProperties={{}}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features: incidentsData.map((incident) => ({
                      geometry: {
                        coordinates: [
                          incident.location?.geoLng || incident.geoLng || 0,
                          incident.location?.geoLat || incident.geoLat || 0,
                        ],
                        type: 'Point',
                      },
                      properties: {
                        incident: JSON.stringify(incident),
                        incidentCount: 1,
                        incidentValue: incident.totalValue || 0,
                        offenderNames:
                          incident.offenders
                            ?.map(
                              (o) =>
                                o.name ||
                                intl.formatMessage({
                                  defaultMessage: 'Unknown',
                                })
                            )
                            .slice(0, 3)
                            .join(', ') ||
                          intl.formatMessage({
                            defaultMessage: 'No offenders',
                          }),
                      },
                      type: 'Feature',
                    })),
                    type: 'FeatureCollection',
                  }}
                  id="incidents"
                  type="geojson"
                >
                  {showHeatmap && HeatMapLayer}
                  {showMarkers && !showDetailedView && ClusterLayer}
                  {showMarkers && !showDetailedView && ClusterCountLayer}
                  {showMarkers && !showDetailedView && UnClusteredLayer}
                  {showMarkers && showDetailedView && ClusterLayer}
                </Source>
              )}

              {/* Detailed view markers with clustering */}
              {showDetailedView &&
                markers.length > 1 &&
                getClusteredIncidents.slice(0, 50).map((cluster) => (
                  <Marker
                    anchor="bottom"
                    key={cluster.id}
                    latitude={cluster.center.lat}
                    longitude={cluster.center.lng}
                  >
                    {cluster.incidents.length === 1 ? (
                      <DetailedIncidentCard
                        currency={currency}
                        incident={cluster.incidents[0]}
                        intl={intl}
                        isDark={isDark}
                        scaleFactor={scaleFactor}
                      />
                    ) : (
                      <div
                        onClick={() =>
                          setExpandedCluster(
                            expandedCluster === cluster.id ? null : cluster.id
                          )
                        }
                        style={{
                          WebkitBackdropFilter: 'blur(12px) saturate(150%)',
                          backdropFilter: 'blur(12px) saturate(150%)',
                          background: isDark
                            ? 'rgba(30, 30, 30, 0.75)'
                            : 'rgba(255, 255, 255, 0.75)',
                          border: `2px solid ${
                            isDark
                              ? expandedCluster === cluster.id
                                ? 'rgba(255, 255, 255, 0.5)'
                                : 'rgba(255, 255, 255, 0.3)'
                              : expandedCluster === cluster.id
                                ? 'rgba(0, 0, 0, 0.25)'
                                : 'rgba(0, 0, 0, 0.15)'
                          }`,
                          borderRadius: 12,
                          boxShadow: isDark
                            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.05)'
                            : '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8)',
                          cursor: 'pointer',
                          fontSize: 14 * scaleFactor,
                          maxWidth:
                            (expandedCluster === cluster.id ? 340 : 260) *
                            scaleFactor,
                          padding: 12 * scaleFactor,
                          pointerEvents: 'auto',
                          transform: `scale(${scaleFactor})`,
                          transformOrigin: 'bottom center',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <div
                          style={{
                            fontSize: 18 * scaleFactor,
                            fontWeight: 700,
                            marginBottom: 6 * scaleFactor,
                            textAlign: 'center',
                          }}
                        >
                          {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
                          {cluster.incidents.length}{' '}
                          {intl.formatMessage({ defaultMessage: 'Incidents' })}
                        </div>
                        <div
                          style={{
                            color: isDark ? 'rgba(255, 255, 255, 0.9)' : '#555',
                            fontSize: 15 * scaleFactor,
                            fontWeight: 600,
                            marginBottom: 4 * scaleFactor,
                            textAlign: 'center',
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: 'Total: ' })}
                          {intl.formatNumber(cluster.totalValue, {
                            currency,
                            notation: 'compact',
                            style: 'currency',
                          })}
                        </div>
                        <div
                          style={{
                            borderTop: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
                            marginTop: 6 * scaleFactor,
                            paddingTop: 6 * scaleFactor,
                          }}
                        >
                          <div
                            style={{
                              fontSize: 12 * scaleFactor,
                              fontWeight: 600,
                              marginBottom: 4 * scaleFactor,
                            }}
                          >
                            {intl.formatMessage({
                              defaultMessage: 'Offenders Involved:',
                            })}
                          </div>
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              fontSize: 11 * scaleFactor,
                              gap: 4 * scaleFactor,
                            }}
                          >
                            {(() => {
                              // Get unique offenders from all incidents in cluster
                              const offendersMap: Record<string, string> = {};
                              for (const inc of cluster.incidents) {
                                if (inc.offenders)
                                  for (const offender of inc.offenders) {
                                    if (
                                      offender.id &&
                                      !offendersMap[offender.id]
                                    ) {
                                      offendersMap[offender.id] =
                                        offender.name ||
                                        intl.formatMessage({
                                          defaultMessage: 'Unknown',
                                        });
                                    }
                                  }
                              }
                              const offendersList = Object.values(offendersMap);
                              const totalOffenders = offendersList.length;

                              return (
                                <>
                                  {offendersList
                                    .slice(0, 5)
                                    .map((name, idx) => (
                                      <span
                                        key={idx}
                                        style={{
                                          background: isDark
                                            ? 'rgba(255, 255, 255, 0.1)'
                                            : 'rgba(0, 0, 0, 0.05)',
                                          borderRadius: 6 * scaleFactor,
                                          fontSize: 12 * scaleFactor,
                                          padding: `${3 * scaleFactor}px ${8 * scaleFactor}px`,
                                        }}
                                      >
                                        {name}
                                      </span>
                                    ))}
                                  {totalOffenders > 5 && (
                                    <span
                                      style={{
                                        color: isDark
                                          ? 'rgba(255, 255, 255, 0.7)'
                                          : '#888',
                                        fontSize: 12 * scaleFactor,
                                        fontStyle: 'italic',
                                      }}
                                    >
                                      {intl.formatMessage(
                                        { defaultMessage: '+{count} more' },
                                        { count: totalOffenders - 5 }
                                      )}
                                    </span>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </Marker>
                ))}

              {selectedIncidents && (
                <Popup
                  anchor="bottom"
                  closeButton={true}
                  closeOnClick={false}
                  latitude={selectedIncidents.latitude}
                  longitude={selectedIncidents.longitude}
                  offset={[0, -10]}
                  onClose={() => {
                    void handleMapClick({
                      features: [],
                    } as unknown as mapboxgl.MapLayerMouseEvent);
                  }}
                >
                  <MultiIncidentPopup
                    incidents={selectedIncidents.incidents.map(
                      (incident) => incident.id
                    )}
                  />
                </Popup>
              )}
            </Map>
          )}

          {/* Floating toolbar */}
          <div
            style={{
              background: isDark
                ? 'rgba(30, 30, 30, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              minWidth: 200,
              padding: 16,
              position: 'absolute',
              right: 20,
              top: 20,
              zIndex: 1000,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: isDark ? '#fff' : undefined,
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {intl.formatMessage({ defaultMessage: 'Map Options' })}
              </Text>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text style={{ color: isDark ? '#fff' : undefined }}>
                    {intl.formatMessage({ defaultMessage: 'Heat Map' })}
                  </Text>
                </Col>
                <Col>
                  <Switch checked={showHeatmap} onChange={toggleHeatmap} />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Text style={{ color: isDark ? '#fff' : undefined }}>
                    {intl.formatMessage({ defaultMessage: 'Markers' })}
                  </Text>
                </Col>
                <Col>
                  <Switch checked={showMarkers} onChange={toggleMarkers} />
                </Col>
              </Row>
            </div>

            <div style={{ marginBottom: 12 }}>
              <Row align="middle" justify="space-between">
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage:
                        'Shows incident details directly on the map including value and offenders involved',
                    })}
                  >
                    <Text style={{ color: isDark ? '#fff' : undefined }}>
                      {intl.formatMessage({ defaultMessage: 'Detailed View' })}
                    </Text>
                  </Tooltip>
                </Col>
                <Col>
                  <Switch
                    checked={showDetailedView}
                    onChange={toggleDetailedView}
                  />
                </Col>
              </Row>
            </div>

            {showHeatmap && (
              <div style={{ marginBottom: 16 }}>
                <Text
                  style={{
                    color: isDark ? '#fff' : undefined,
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  {intl.formatMessage({ defaultMessage: 'Heat Map Legend' })}
                </Text>
                <div
                  style={{
                    background:
                      'linear-gradient(to right, rgba(33,102,172,0.5), rgba(103,169,207,0.6), rgba(149,217,180,0.7), rgba(255,255,191,0.8), rgba(253,174,97,0.9), rgba(244,109,67,0.95), rgba(215,48,39,1))',
                    borderRadius: 4,
                    height: 20,
                    marginBottom: 4,
                    width: '100%',
                  }}
                />
                <div
                  style={{
                    display: 'flex',
                    fontSize: 10,
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={{ color: isDark ? '#fff' : undefined }}>
                    {intl.formatMessage({ defaultMessage: 'Low' })}
                  </Text>
                  <Text style={{ color: isDark ? '#fff' : undefined }}>
                    {intl.formatMessage({ defaultMessage: 'High' })}
                  </Text>
                </div>
                <div
                  style={{
                    color: isDark ? 'rgba(255, 255, 255, 0.6)' : '#888',
                    fontSize: 10,
                    marginTop: 4,
                  }}
                >
                  {intl.formatMessage({
                    defaultMessage: 'Heat intensity adjusts with zoom level',
                  })}
                </div>
              </div>
            )}

            <div
              style={{
                borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <Button
                block
                icon={
                  <FontAwesomeIcon icon={faTimes} style={{ marginRight: 6 }} />
                }
                onClick={toggleLargeOpen}
                type="default"
              >
                {intl.formatMessage({ defaultMessage: 'Close' })}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </Card>
  );
};

export default LocatingCard;
