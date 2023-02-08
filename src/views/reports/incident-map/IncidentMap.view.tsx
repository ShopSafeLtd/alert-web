import React from 'react';
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api';
import { IncidentMapQuery } from 'graphql/generated';
import useStyles from './IncidentMap.styles';

const containerStyle = {
  width: '100%',
  height: '600px',
};

interface Props {
  data: IncidentMapQuery | undefined;
  loading: boolean;
}

const IncidentMap = ({ data, loading }: Props) => {
  const classes = useStyles();
  return (
    <div className={classes.page}>
      {!loading ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: data?.incidents[0]?.location?.geoLat || 0,
            lng: data?.incidents[0]?.location?.geoLng || 0,
          }}
          zoom={10}
          clickableIcons={false}
          options={{
            streetViewControl: false,
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <HeatmapLayer
            // required
            data={
              data?.incidents
                .filter(
                  (incident) =>
                    incident.location?.geoLat && incident.location.geoLng
                )
                .map(
                  (incident) =>
                    new google.maps.LatLng(
                      incident.location?.geoLat || 0,
                      incident.location?.geoLng || 0
                    )
                ) || []
            }
            options={{
              gradient: [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)',
              ],
            }}
          />
        </GoogleMap>
      ) : (
        <div />
      )}
    </div>
  );
};

export default IncidentMap;
