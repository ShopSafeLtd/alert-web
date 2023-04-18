import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card, Modal, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { useStoreState } from 'state';
import Map, { Marker } from 'react-map-gl';
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
});

interface Props {
  height: number | string;
  width: number | string;
  geoLng?: number | null;
  geoLat?: number | null;
}

const MapCard = ({ height, width, geoLat, geoLng }: Props) => {
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);

  const toggleLargeOpen = () => {
    setLargeOpen(!largeOpen);
  };

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
        <Text className={classes.mapText}>View Larger Map</Text>
      </div>
      <Map
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        longitude={geoLng || 0}
        latitude={geoLat || 0}
        zoom={16}
        pitch={45}
        style={{ width, height }}
        mapStyle={
          currentTheme === 'dark'
            ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
            : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
        }
      >
        <Marker
          longitude={Number(geoLng) || 0}
          latitude={Number(geoLat) || 0}
          anchor="bottom"
        >
          <MapPin />
        </Marker>
      </Map>

      <Modal
        bodyStyle={{ padding: 0, borderRadius: 10, overflow: 'hidden' }}
        open={largeOpen}
        onOk={toggleLargeOpen}
        okText="Close"
        onCancel={toggleLargeOpen}
        width="95vw"
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        {largeOpen && (
          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: geoLng || 0,
              latitude: geoLat || 0,
              pitch: 45,
              zoom: 16,
            }}
            style={{ width: '95vw', height: '80vh' }}
            mapStyle={
              currentTheme === 'dark'
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
          >
            <Marker
              longitude={Number(geoLng) || 0}
              latitude={Number(geoLat) || 0}
              anchor="bottom"
            >
              <MapPin />
            </Marker>
          </Map>
        )}
      </Modal>
    </Card>
  );
};

export default MapCard;
