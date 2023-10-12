import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card, Spin, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { useStoreState } from 'state';
import Map, { Marker } from 'react-map-gl';
import { useIntl } from 'react-intl';
import type { LocationData, ViewportData } from 'types/DataType';
import getAddressFromLatLng from 'utils/mapbox/get-address-from-lat-lng';
import MapPin from '../MapPin';
import LocatingModal from '../LocatingModal';

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
  spin: { position: 'absolute', top: '45%', left: '50%' },
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
  clickableOverlay: {
    cursor: 'pointer',
  },
});

interface Props {
  height: number | string;
  width: number | string;
  location: LocationData | undefined | null;
  setLocation: (value: LocationData) => void;
}

const LocatingCard = ({ height, width, location, setLocation }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [largeOpen, setLargeOpen] = useState(false);
  const [viewport, setViewport] = useState<ViewportData>();
  const [currentViewport, setCurrentViewport] = useState<ViewportData>();
  console.log('LocatingCard-location', location);

  // get current location
  useEffect(() => {
    console.log('1');

    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentViewport({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    if (location?.geoLat && location?.geoLng) {
      console.log('2');

      setViewport({
        latitude: location.geoLat,
        longitude: location.geoLng,
      });
    }
    if (!(location?.geoLat && location?.geoLng) && currentViewport) {
      console.log('3');

      setViewport({
        latitude: currentViewport.latitude,
        longitude: currentViewport.longitude,
      });
    }
    console.log('LocatingCard2-viewport', viewport);
  }, [location, currentViewport]);

  console.log('LocatingCard3-viewport', viewport);

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
        padding: 0,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {viewport ? (
        <>
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
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...viewport}
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
            // latitude={viewport.latitude}
            zoom={15}
            pitch={45}
            style={{ width, height }}
            mapStyle={
              currentTheme === 'dark'
                ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
          >
            <Marker
              longitude={viewport.longitude}
              latitude={viewport.latitude}
              anchor="bottom"
            >
              <MapPin />
            </Marker>
          </Map>

          <LocatingModal
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleSubmit={onSubmit}
            onClose={toggleLargeOpen}
            viewportData={viewport}
            open={largeOpen}
          />
        </>
      ) : (
        <div style={{ width, height }}>
          <div className={classes.spin}>
            <Spin size="large" />
          </div>
        </div>
      )}
    </Card>
  );
};

export default LocatingCard;
