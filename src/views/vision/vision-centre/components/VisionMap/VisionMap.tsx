import type { MapRef } from 'react-map-gl';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useStoreState } from '#/state';
import { useAiVisionMapQuery } from '#/views/vision/vision-centre/components/VisionMap/graphql/queries/__generated__/vision-map.generated';
import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, Modal, Row, Spin, Switch, Typography } from 'antd';
import { useAtomValue } from 'jotai';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Layer, Map, Source } from 'react-map-gl';

const { Text } = Typography;

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
  width: number | string;
}

const ClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': [
        'step',
        ['get', 'sum'],
        '#51bbd6',
        50,
        '#f1f075',
        250,
        '#f28cb1',
      ],
      'circle-radius': ['step', ['get', 'sum'], 16, 50, 24, 250, 32],
      'circle-stroke-color': 'rgba(0,0,0,0)',
      'circle-stroke-width': 0,
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
      'text-field': '{sum}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
    paint={{
      'text-color': '#000000',
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
      'circle-radius': [
        'step',
        ['coalesce', ['get', 'count'], 1],
        6,
        10,
        8,
        25,
        12,
      ],
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 1,
    }}
    source="incidents"
    type="circle"
  />
);

const UnClusteredCountLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-count"
    layout={{
      'text-allow-overlap': true,
      'text-anchor': 'center',
      'text-field': ['to-string', ['coalesce', ['get', 'count'], 1]],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0],
      'text-size': 11,
    }}
    paint={{
      'text-color': '#000000',
    }}
    source="incidents"
    type="symbol"
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    paint={{
      'heatmap-opacity': 0.6,
      'heatmap-radius': 150,
      'heatmap-weight': [
        'interpolate',
        ['linear'],
        ['coalesce', ['get', 'count'], 1],
        1,
        0.2,
        50,
        1,
      ],
    }}
    type="heatmap"
  />
);

const VisionMap = ({ height, isPrinting, width }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const currentScheme = useAtomValue(currentSchemeIdAtom);

  const { data, loading } = useAiVisionMapQuery({
    variables: {
      where: {
        schemeIds: [currentScheme],
        search: '',
      },
    },
  });

  const markers = useMemo(
    () =>
      (data?.aiVisionMap ?? []).map((item) => {
        const raw = item?.count as unknown;
        const numericCount = Array.isArray(raw)
          ? (raw as number[]).reduce((a, b) => a + (Number(b) || 0), 0)
          : Number(raw ?? 1) || 1;
        return {
          count: numericCount,
          geoLat: item?.lat ?? null,
          geoLng: item?.lon ?? null,
        };
      }),
    [data]
  );

  const isDark = currentTheme === 'dark' && !isPrinting;

  // sensible fallback centre (London) if there are no markers
  const defaultCenter = { geoLat: 51.509_865, geoLng: -0.118_092 };
  const center = markers.length > 0 ? markers[0] : defaultCenter;

  const toggleLargeOpen = () => setLargeOpen(!largeOpen);
  const toggleMarkers = () => setShowMarkers(!showMarkers);
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);

  useEffect(() => {
    if (!mapRef.current) return;
    try {
      // Ensure order: heatmap (if any) -> clusters -> cluster-count -> unclustered-point -> unclustered-count (on top)
      mapRef.current.moveLayer('clusters');
      mapRef.current.moveLayer('cluster-count');
      mapRef.current.moveLayer('unclustered-point');
      mapRef.current.moveLayer('unclustered-count');
    } catch {
      // ignore if layers not present yet
    }
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
      {/* {loading ? (*/}
      {/*  <div*/}
      {/*    style={{*/}
      {/*      height,*/}
      {/*      width,*/}
      {/*      display: 'flex',*/}
      {/*      alignItems: 'center',*/}
      {/*      justifyContent: 'center',*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Spin size="large" />*/}
      {/*  </div>*/}
      {/* ) : (*/}
      <Map
        // use initialViewState to position the map correctly and allow reinit when centre changes
        initialViewState={{
          latitude: center.geoLat || defaultCenter.geoLat,
          longitude: center.geoLng || defaultCenter.geoLng,
          zoom: 6,
        }}
        key={`${center.geoLat}-${center.geoLng}-${isDark ? 'dark' : 'light'}`}
        mapLib={mapboxgl}
        mapStyle={
          isDark
            ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
            : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
        }
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        onError={() => {}}
        preserveDrawingBuffer
        style={{ height, width }}
      >
        <Source
          cluster
          clusterMaxZoom={20}
          clusterProperties={{
            // aggregated sum of child feature "count" values
            sum: ['+', ['accumulated'], ['get', 'count']],
          }}
          clusterRadius={50}
          data={{
            features: markers.map((marker) => ({
              geometry: {
                coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                type: 'Point',
              },
              properties: { count: marker.count ?? 1 },
              type: 'Feature',
            })),
            type: 'FeatureCollection',
          }}
          id="incidents"
          type="geojson"
        >
          {ClusterLayer}
          {ClusterCountLayer}
          {UnClusteredLayer}
          {UnClusteredCountLayer}
        </Source>
      </Map>
      {/* )}*/}

      <Modal
        bodyStyle={{ borderRadius: 10, overflow: 'hidden', padding: 0 }}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
        okText={intl.formatMessage({ defaultMessage: 'Close' })}
        onCancel={toggleLargeOpen}
        onOk={toggleLargeOpen}
        open={largeOpen}
        width="95vw"
      >
        <Row wrap={false}>
          <Col>
            {largeOpen &&
              (loading ? (
                <div
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    height: '80vh',
                    justifyContent: 'center',
                    width: '85vw',
                  }}
                >
                  <Spin size="large" />
                </div>
              ) : (
                <Map
                  // use initialViewState to set the view for the modal map
                  initialViewState={{
                    latitude: center.geoLat || defaultCenter.geoLat,
                    longitude: center.geoLng || defaultCenter.geoLng,
                    zoom: 7,
                  }}
                  mapLib={mapboxgl}
                  mapStyle={
                    currentTheme === 'dark'
                      ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                      : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
                  }
                  mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                  ref={mapRef}
                  style={{ height: '80vh', width: '85vw' }}
                >
                  <Source
                    cluster
                    clusterMaxZoom={14}
                    clusterProperties={{
                      // aggregated sum of child feature "count" values
                      sum: ['+', ['accumulated'], ['get', 'count']],
                    }}
                    clusterRadius={50}
                    data={{
                      features: markers.map((marker) => ({
                        geometry: {
                          coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                          type: 'Point',
                        },
                        properties: { count: marker.count ?? 1 },
                        type: 'Feature',
                      })),
                      type: 'FeatureCollection',
                    }}
                    id="incidents"
                    type="geojson"
                  >
                    {showHeatmap && HeatMapLayer}
                    {showMarkers && ClusterLayer}
                    {showMarkers && ClusterCountLayer}
                    {showMarkers && UnClusteredLayer}
                    {showMarkers && UnClusteredCountLayer}
                  </Source>
                </Map>
              ))}
          </Col>
          <Col className={classes.actions}>
            <Form layout="vertical">
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Heat Map',
                })}
                style={{ margin: 0 }}
              >
                <Switch
                  checked={showHeatmap}
                  className={classes.action}
                  onClick={toggleHeatmap}
                />
              </Form.Item>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Markers',
                })}
                style={{ margin: 0 }}
              >
                <Switch
                  checked={showMarkers}
                  className={classes.action}
                  onClick={toggleMarkers}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default VisionMap;
