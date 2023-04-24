import { Empty, Typography } from 'antd';
import React from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';

const HeatMapGoogle = ({
  data,
  label,
  emptyLabel,
  markers,
}: {
  data:
    | Array<{
        geoLat?: number | null | undefined;
        geoLng?: number | null | undefined;
      } | null>
    | null
    | undefined;
  label: string;
  emptyLabel: string;
  markers?: Array<{
    label: string;
    key: string;
    position: {
      lat: number;
      lng: number;
    };
  }>;
}) => {
  const containerStyle = {
    width: '100%',
    height: '600px',
  };
  return (
    <div style={{ height: '100%', width: '100%%' }} className="no-break">
      <Typography.Title level={4}>{label}</Typography.Title>
      {data && data.length > 0 ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={{
            lat: data[0]?.geoLat || 51.5081,
            lng: data[0]?.geoLng || 0.0759,
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
              data
                ?.filter((latLng) => latLng?.geoLat && latLng.geoLng)
                .map(
                  (latLng) =>
                    new google.maps.LatLng(
                      latLng?.geoLat || 0,
                      latLng?.geoLng || 0
                    )
                ) || []
            }
            options={{
              radius: 50,
              opacity: 0.8,
            }}
          />
          {markers?.map((marker) => (
            <Marker
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...marker}
            />
          ))}
        </GoogleMap>
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default HeatMapGoogle;
