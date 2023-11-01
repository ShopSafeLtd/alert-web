import React, { useEffect, useRef, useState } from 'react';

import { createUseStyles } from 'react-jss';
import { Col, Form, Modal, Row, Spin, Switch } from 'antd';
import { useStoreState } from 'state';
import type { MapRef } from 'react-map-gl';
import Map, { Marker } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import { useIntl } from 'react-intl';
import type { ViewportData } from 'types/DataType';

import MapPin from '../MapPin';
import GeocoderControl from './geocoder-control';

const useStyles = createUseStyles({
  spin: { position: 'absolute', top: '50%', left: '50%' },

  actions: {
    marginTop: 60,
    paddingLeft: 10,
  },
  action: {
    marginTop: -20,
  },
});

interface Props {
  viewportData: ViewportData;
  onClose: () => void;
  open: boolean;
  handleSubmit: (value: ViewportData) => void;
}

const LocatingModal = ({
  viewportData,
  onClose,
  open,
  handleSubmit,
}: Props) => {
  const mapRef = useRef<MapRef>(null);
  // const geoControlRef = useRef<mapboxgl.GeolocateControl>();
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [viewport, setViewport] = useState<ViewportData>();

  const toggleMarkers = () => setShowMarkers(!showMarkers);
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);
  // console.log('LocatingModal-viewport', viewport);

  useEffect(() => {
    if (viewportData) {
      setViewport({ ...viewportData, transitionDuration: 500 });
    }
  }, [viewportData]);

  const handleOnResult = (event) => {
    // console.log('handleOnResult', event.result);
    setViewport({
      // ???
      // eslint-disable-next-line
      latitude: event.result.center[1],
      // ???
      // eslint-disable-next-line
      longitude: event.result.center[0],
      // transitionDuration: 500,
    });
  };
  const handleClick = (e: {
    lngLat: {
      lat: number;
      lng: number;
    };
  }) => {
    if (e.lngLat) {
      setViewport({
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      });
    }
  };
  const onSubmit = () => {
    if (viewport) handleSubmit(viewport);
  };

  return (
    <Modal
      bodyStyle={{ padding: 0, borderRadius: 10, overflow: 'hidden' }}
      open={open}
      title={intl.formatMessage({
        id: 'iUn355',
        defaultMessage: 'Pin an Location -- click to pin a location on the map',
      })}
      okText={intl.formatMessage({
        defaultMessage: 'Save Location',
        id: 'w/HiaX',
      })}
      onOk={onSubmit}
      onCancel={() => {
        // ???
        setViewport(viewportData);
        onClose();
        // handleOnResult(viewportData);
      }}
      width="95vw"
    >
      <Row wrap={false}>
        <Col>
          {viewport ? (
            <Map
              onClick={handleClick}
              ref={mapRef}
              mapLib={mapboxgl}
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              initialViewState={{
                longitude: viewport?.longitude,
                latitude: viewport?.latitude,
                pitch: 45,
                zoom: 16,
                fitBoundsOptions: { duration: 100 },
              }}
              style={{ width: '85vw', height: '80vh' }}
              mapStyle={
                currentTheme === 'dark'
                  ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                  : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
              }
            >
              <GeocoderControl
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                position="top-right"
                onResult={handleOnResult}
                marker={false}
              />
              {/* <Row>
                <Col>search</Col>
                <Col>search</Col>
              </Row> */}

              <Marker
                longitude={viewport.longitude}
                latitude={viewport.latitude}
                anchor="bottom"
              >
                <MapPin />
              </Marker>
            </Map>
          ) : (
            <div style={{ width: '85vw', height: '80vh' }}>
              <div className={classes.spin}>
                <Spin size="large" />
              </div>
            </div>
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
  );
};

export default LocatingModal;
