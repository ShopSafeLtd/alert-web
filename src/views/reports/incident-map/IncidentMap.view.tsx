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
            styles: [
              { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
              {
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#242f3e' }],
              },
              {
                elementType: 'labels.text.fill',
                stylers: [{ color: '#746855' }],
              },
              {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }],
              },
              {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }],
              },
              {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }],
              },
              {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }],
              },
              {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }],
              },
              {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }],
              },
              {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }],
              },
              {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }],
              },
              {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }],
              },
            ],
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
              radius: 50,
              opacity: 0.8,
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
