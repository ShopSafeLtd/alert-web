import {
  faArrowsMaximize,
  faMapLocationDot,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Typography } from 'antd';
import mapboxgl from 'mapbox-gl';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Map, Marker } from 'react-map-gl';
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
  emptyState: {
    alignItems: 'center',
    backgroundColor: ({ isDark }: { isDark: boolean }) =>
      isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: 'inherit',
    padding: 24,
    width: '100%',
  },
  emptyStateDescription: {
    color: ({ isDark }: { isDark: boolean }) =>
      isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(0, 0, 0, 0.45)',
    fontSize: 12,
    textAlign: 'center',
  },
  emptyStateIcon: {
    color: ({ isDark }: { isDark: boolean }) =>
      isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.25)',
    marginBottom: 12,
  },
  emptyStateTitle: {
    color: ({ isDark }: { isDark: boolean }) =>
      isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 4,
    textAlign: 'center',
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
  isPrinting?: boolean;
  viewport: {
    latitude: null | number | undefined;
    longitude: null | number | undefined;
  };
  width: number | string;
}

const MapCard = ({ height, isPrinting, viewport, width }: Props) => {
  const intl = useIntl();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const isDark = currentTheme === 'dark' && !isPrinting;
  const classes = useStyles({ isDark });
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
      className="no-break"
    >
      {viewport.latitude !== null &&
      viewport.latitude !== undefined &&
      viewport.longitude !== null &&
      viewport.longitude !== undefined ? (
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
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            mapLib={mapboxgl}
            mapStyle={
              isDark
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            onError={() => {}}
            pitch={45}
            preserveDrawingBuffer
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
            viewportData={{
              latitude: viewport.latitude,
              longitude: viewport.longitude,
            }}
          />
        </>
      ) : (
        <div className={classes.emptyState} style={{ height, width }}>
          <FontAwesomeIcon
            className={classes.emptyStateIcon}
            icon={faMapLocationDot}
            size="3x"
          />
          <Text className={classes.emptyStateTitle}>
            {intl.formatMessage({
              defaultMessage: 'No Location Available',
            })}
          </Text>
          <Text className={classes.emptyStateDescription}>
            {intl.formatMessage({
              defaultMessage:
                'GPS coordinates are not available for this incident',
            })}
          </Text>
        </div>
      )}
    </Card>
  );
};

export default MapCard;
