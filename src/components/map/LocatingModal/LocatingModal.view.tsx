import type { MapRef } from 'react-map-gl';
import type { ViewportData } from 'types/DataType';

import { Col, Form, Modal, Row, Spin, Switch } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Map, { Marker } from 'react-map-gl';
import { useStoreState } from 'state';

import MapPin from '../MapPin';
import GeocoderControl from './geocoder-control';

const useStyles = createUseStyles({
  action: {
    marginTop: -20,
  },

  actions: {
    marginTop: 60,
    paddingLeft: 10,
  },
  spin: { left: '50%', position: 'absolute', top: '50%' },
});

interface Props {
  handleSubmit: (value: ViewportData) => void;
  onClose: () => void;
  open: boolean;
  uneditable?: boolean;
  viewportData: ViewportData;
}

const LocatingModal = ({
  handleSubmit,
  onClose,
  open,
  uneditable,
  viewportData,
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

  useEffect(() => {
    if (viewportData) {
      setViewport({ ...viewportData, transitionDuration: 500 });
    }
  }, [viewportData]);

  const handleOnResult = (event) => {
    setViewport({
      // eslint-disable-next-line
      latitude: event.result.center[1],
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
  const onCancel = () => {
    setViewport(viewportData);
    onClose();
  };

  return (
    <Modal
      bodyStyle={{ borderRadius: 10, overflow: 'hidden', padding: 0 }}
      okText={
        uneditable
          ? undefined
          : intl.formatMessage({
              defaultMessage: 'Save Location',
            })
      }
      onCancel={onCancel}
      onOk={uneditable ? onCancel : onSubmit}
      open={open}
      title={
        uneditable
          ? undefined
          : intl.formatMessage({
              defaultMessage:
                'Pin an Location -- click to pin a location on the map',
            })
      }
      width="95vw"
    >
      <Row wrap={false}>
        <Col>
          {viewport ? (
            <Map
              initialViewState={{
                latitude: viewport?.latitude,
                longitude: viewport?.longitude,
                pitch: 45,
                zoom: 16,
              }}
              mapLib={mapboxgl}
              mapStyle={
                currentTheme === 'dark'
                  ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                  : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
              }
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              onClick={handleClick}
              onError={() => {}}
              ref={mapRef}
              style={{ height: '80vh', width: '85vw' }}
            >
              <GeocoderControl
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
                marker={false}
                onResult={handleOnResult}
                position="top-right"
              />

              <Marker
                anchor="bottom"
                latitude={viewport.latitude}
                longitude={viewport.longitude}
              >
                <MapPin />
              </Marker>
            </Map>
          ) : (
            <div style={{ height: '80vh', width: '85vw' }}>
              <div className={classes.spin}>
                <Spin size="large" />
              </div>
            </div>
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
  );
};

export default LocatingModal;
