import type { LocationData, ViewportData } from 'types/DataType';

import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import Map, { Marker } from 'react-map-gl';
import { useStoreState } from 'state';
import getAddressFromLatLng from 'utils/mapbox/get-address-from-lat-lng';

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
// enum Permissions {
//   denied = 'denied',
//   prompt = 'prompt',
//   granted = 'granted',
// }
interface Props {
  height: number | string;
  location: LocationData | null | undefined;
  setLocation: (value: LocationData) => void;
  uneditable?: boolean;
  width: number | string;
}

const LocatingCard = ({
  height,
  location,
  setLocation,
  uneditable,
  width,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [viewport, setViewport] = useState<ViewportData>();
  const [currentViewport, setCurrentViewport] = useState<ViewportData>();
  // const [getCurrentLocation, setGetCurrentLocation] = useState(true);
  const [status, setStatus] = useState<'denied' | 'granted' | 'prompt'>();
  const originalViewport = {
    latitude: 51.6,
    longitude: 0.12,
  };
  useEffect(() => {}, []);
  // get current location
  useEffect(() => {
    void navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      const newStatus = result.state;
      setStatus(newStatus);
      result.addEventListener('change', () => {
        setStatus(newStatus);
      });
    });
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentViewport({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location?.geoLat && location?.geoLng) {
      setViewport({
        latitude: location.geoLat,
        longitude: location.geoLng,
      });
    }
    if (!(location?.geoLat && location?.geoLng) && currentViewport) {
      setViewport({
        latitude: currentViewport.latitude,
        longitude: currentViewport.longitude,
      });
    }
  }, [location, currentViewport]);

  const toggleLargeOpen = () => setLargeOpen(!largeOpen);
  const onSubmit = async (value: ViewportData) => {
    if (value) {
      const result = await getAddressFromLatLng({
        lat: value.latitude,
        lng: value.longitude,
      });
      setViewport({ latitude: value.latitude, longitude: value.longitude });
      setLocation({
        ...result,
        geoLat: value.latitude,
        geoLng: value.longitude,
        townCity: result.city,
      });
      setLargeOpen(false);
    }
  };

  return (
    <Card
      bodyStyle={{
        borderRadius: 10,
        overflow: 'hidden',
        padding: 0,
        position: 'relative',
      }}
    >
      {viewport || status === 'denied' ? (
        <>
          {uneditable && (
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
          )}

          <Map
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            onError={() => {}}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(viewport || originalViewport)}
            // initialViewState={{
            //   longitude: viewport.longitude,
            //   latitude: viewport.latitude,
            //   pitch: 45,
            //   zoom: 8,
            // }}
            // viewState={{
            //   ...viewport,
            //   zoom: 8,
            //   pitch: 45,
            //   bearing: 0,
            //   padding: { bottom: 0, left: 0, right: 0, top: 0 },
            //   height: 194,
            //   width: 100,
            // }}
            // longitude={viewport.longitude}
            mapStyle={
              currentTheme === 'dark'
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
            pitch={45}
            style={{ height, width }}
            // latitude={viewport.latitude}
            zoom={15}
          >
            {viewport && (
              <Marker
                anchor="bottom"
                latitude={viewport.latitude}
                longitude={viewport.longitude}
              >
                <MapPin />
              </Marker>
            )}
          </Map>

          <LocatingModal
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleSubmit={onSubmit}
            onClose={toggleLargeOpen}
            open={largeOpen}
            viewportData={
              viewport || {
                latitude: 51.6,
                longitude: 0.12,
              }
            }
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

export default LocatingCard;
