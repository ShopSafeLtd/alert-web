import type { MapRef } from 'react-map-gl';

import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Form, Modal, Row, Switch, Typography } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Layer, Map, Source } from 'react-map-gl';
import { useStoreState } from 'state';

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
  markers: {
    geoLat?: null | number;
    geoLng?: null | number;
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

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    paint={{
      'heatmap-opacity': 0.6,
      'heatmap-radius': 150,
      'heatmap-weight': 2,
    }}
    type="heatmap"
  />
);

const VisionMap = ({ height, isPrinting, markers, width }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);

  const isDark = currentTheme === 'dark' && !isPrinting;

  const toggleLargeOpen = () => setLargeOpen(!largeOpen);
  const toggleMarkers = () => setShowMarkers(!showMarkers);
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);

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
        latitude={markers[0]?.geoLat || 0}
        longitude={markers[0]?.geoLng || 0}
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
        zoom={6}
      >
        <Source
          cluster
          clusterMaxZoom={20}
          clusterProperties={{}}
          clusterRadius={50}
          data={{
            features: markers.map((marker) => ({
              geometry: {
                coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                type: 'Point',
              },
              properties: {},
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
        </Source>
      </Map>

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
            {largeOpen && (
              <Map
                initialViewState={{
                  latitude: markers[0]?.geoLat || 0,
                  longitude: markers[0]?.geoLng || 0,
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
                  // clusterProperties={{}}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features: markers.map((marker) => ({
                      geometry: {
                        coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                        type: 'Point',
                      },
                      properties: {},
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
                </Source>
              </Map>
            )}
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
