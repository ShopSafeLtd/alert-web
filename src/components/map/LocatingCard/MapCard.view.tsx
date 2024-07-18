import { faArrowsMaximize } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Spin, Typography } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Map, { Marker } from 'react-map-gl';
import { useStoreState } from 'state';

import LocatingModal from '../LocatingModal';
import MapPin from '../MapPin';

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
  spin: { left: '50%', position: 'absolute', top: '45%' },
});

interface Props {
  height: number | string;
  viewport: { latitude: number; longitude: number };
  width: number | string;
}

const MapCard = ({ height, viewport, width }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const toggleLargeOpen = () => setLargeOpen(!largeOpen);

  return (
    <Card
      bodyStyle={{
        borderRadius: 10,
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
      }}
    >
      {viewport.latitude && viewport.longitude ? (
        <>
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
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            onError={() => {}}
            {...viewport}
            mapStyle={
              currentTheme === 'dark'
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
            pitch={45}
            style={{ height, width }}
            zoom={15}
          >
            <Marker
              anchor="bottom"
              latitude={viewport.latitude}
              longitude={viewport.longitude}
            >
              <MapPin />
            </Marker>
          </Map>
          <LocatingModal
            handleSubmit={() => {}}
            onClose={toggleLargeOpen}
            open={largeOpen}
            uneditable
            viewportData={viewport}
          />
        </>
      ) : (
        <div style={{ height, width }}>
          <div className={classes.spin}>
            <Spin size="large" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default MapCard;
