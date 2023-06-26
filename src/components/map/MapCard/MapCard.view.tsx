import React, { useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card, Col, Form, Modal, Row, Switch, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { useStoreState } from 'state';
import type { MapRef } from 'react-map-gl';
import Map, { Layer, Marker, Source } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { useIntl } from 'react-intl';
import MapPin from '../MapPin';

const { Text } = Typography;

const useStyles = createUseStyles({
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.3)',
      opacity: 1,
    },
  },
  mapText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 0,
  },
  actions: {
    marginTop: 60,
    paddingLeft: 10,
  },
  action: {
    marginTop: -20,
  },
});

interface Props {
  height: number | string;
  width: number | string;
  markers: {
    geoLng?: number | null;
    geoLat?: number | null;
  }[];
}

const ClusterLayer = (
  <Layer
    id="clusters"
    type="circle"
    source="incidents"
    filter={['has', 'point_count']}
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
  />
);

const ClusterCountLayer = (
  <Layer
    id="cluster-count"
    type="symbol"
    source="incidents"
    filter={['has', 'point_count']}
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
  />
);

const UnClusteredLayer = (
  <Layer
    id="unclustered-point"
    type="circle"
    source="incidents"
    filter={['!', ['has', 'point_count']]}
    paint={{
      'circle-color': '#11b4da',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    }}
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    type="heatmap"
    paint={{
      'heatmap-radius': 150,
      'heatmap-opacity': 0.6,
      'heatmap-weight': 2,
    }}
  />
);

const MapCard = ({ height, width, markers }: Props) => {
  const mapRef = useRef<MapRef>(null);
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);

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
        padding: 0,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        onKeyPress={toggleLargeOpen}
        role="button"
        tabIndex={-100}
        onClick={toggleLargeOpen}
        className={classes.mapOverlay}
      >
        <FontAwesomeIcon size="lg" color="#FFF" icon={faArrowsMaximize} />
        <Text className={classes.mapText}>
          {intl.formatMessage({
            defaultMessage: 'View Larger Map',
            id: '3LkujO',
          })}
        </Text>
      </div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        longitude={markers[0]?.geoLng || 0}
        latitude={markers[0]?.geoLat || 0}
        zoom={16}
        pitch={45}
        style={{ width, height }}
        mapStyle={
          currentTheme === 'dark'
            ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
            : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
        }
      >
        {markers.length === 1 &&
          markers.map((marker) => (
            <Marker
              longitude={Number(marker.geoLng) || 0}
              latitude={Number(marker.geoLat) || 0}
              anchor="bottom"
            >
              <MapPin />
            </Marker>
          ))}
        {markers.length > 1 && (
          <Source
            id="incidents"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: markers.map((marker) => ({
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                },
              })),
            }}
            cluster
            clusterProperties={{}}
            clusterMaxZoom={20}
            clusterRadius={50}
          >
            {ClusterLayer}
            {ClusterCountLayer}
            {UnClusteredLayer}
          </Source>
        )}
      </Map>

      <Modal
        bodyStyle={{ padding: 0, borderRadius: 10, overflow: 'hidden' }}
        open={largeOpen}
        onOk={toggleLargeOpen}
        okText={intl.formatMessage({ defaultMessage: 'Close', id: 'rbrahO' })}
        onCancel={toggleLargeOpen}
        width="95vw"
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Row wrap={false}>
          <Col>
            {largeOpen && (
              <Map
                ref={mapRef}
                mapLib={mapboxgl}
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                initialViewState={{
                  longitude: markers[0]?.geoLng || 0,
                  latitude: markers[0]?.geoLat || 0,
                  pitch: 45,
                  zoom: 16,
                }}
                style={{ width: '85vw', height: '80vh' }}
                mapStyle={
                  currentTheme === 'dark'
                    ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                    : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
                }
              >
                {markers.length === 1 &&
                  markers.map((marker) => (
                    <Marker
                      longitude={Number(marker.geoLng) || 0}
                      latitude={Number(marker.geoLat) || 0}
                      anchor="bottom"
                    >
                      <MapPin />
                    </Marker>
                  ))}
                {markers.length > 1 && (
                  <Source
                    id="incidents"
                    type="geojson"
                    data={{
                      type: 'FeatureCollection',
                      features: markers.map((marker) => ({
                        type: 'Feature',
                        properties: {},
                        geometry: {
                          type: 'Point',
                          coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                        },
                      })),
                    }}
                    cluster
                    // clusterProperties={{}}
                    clusterMaxZoom={14}
                    clusterRadius={50}
                  >
                    {showHeatmap && HeatMapLayer}
                    {showMarkers && ClusterLayer}
                    {showMarkers && ClusterCountLayer}
                    {showMarkers && UnClusteredLayer}
                  </Source>
                )}
              </Map>
            )}
          </Col>
          <Col className={classes.actions}>
            <Form layout="vertical">
              <Form.Item
                style={{ margin: 0 }}
                label={intl.formatMessage({
                  defaultMessage: 'Show Heat Map',
                  id: 'anpRhM',
                })}
              >
                <Switch
                  className={classes.action}
                  onClick={toggleHeatmap}
                  checked={showHeatmap}
                />
              </Form.Item>
              <Form.Item
                style={{ margin: 0 }}
                label={intl.formatMessage({
                  defaultMessage: 'Show Markers',
                  id: '3AXahR',
                })}
              >
                <Switch
                  className={classes.action}
                  onClick={toggleMarkers}
                  checked={showMarkers}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};

export default MapCard;
