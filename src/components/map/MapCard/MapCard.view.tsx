import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Card, Modal, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsMaximize } from '@fortawesome/pro-solid-svg-icons';
import { useStoreState } from 'state';
import Map, { Layer, Marker, Source } from 'react-map-gl';
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
  markers: {
    geoLng?: number | null;
    geoLat?: number | null;
  }[];
}

const ClusterLayer = (
  <Layer
    id="clusters"
    type="circle"
    source="incidents"
    filter={['has', 'point_count']}
    paint={{
      'circle-color': [
        'step',
        ['get', 'point_count'],
        '#51bbd6',
        100,
        '#f1f075',
        750,
        '#f28cb1',
      ],
      'circle-radius': 20,
    }}
  />
);

const ClusterCountLayer = (
  <Layer
    id="cluster-count"
    type="symbol"
    source="incidents"
    filter={['has', 'point_count']}
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
  />
);

const UnClusteredLayer = (
  <Layer
    id="unclustered-point"
    type="circle"
    source="incidents"
    filter={['!', ['has', 'point_count']]}
    paint={{
      'circle-color': '#11b4da',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    }}
  />
);

const MapCard = ({ height, width, markers }: Props) => {
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
        longitude={markers[0]?.geoLng || 0}
        latitude={markers[0]?.geoLat || 0}
        zoom={16}
        pitch={45}
        style={{ width, height }}
        mapStyle={
          currentTheme === 'dark'
            ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
            : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
        }
      >
        {markers.length === 1 &&
          markers.map((marker) => (
            <Marker
              longitude={Number(marker.geoLng) || 0}
              latitude={Number(marker.geoLat) || 0}
              anchor="bottom"
            >
              <MapPin />
            </Marker>
          ))}
        {markers.length > 1 && (
          <Source
            id="incidents"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features: markers.map((marker) => ({
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Point',
                  coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                },
              })),
            }}
            cluster
            clusterProperties={{}}
            clusterMaxZoom={20}
            clusterRadius={0}
          >
            {ClusterLayer}
            {ClusterCountLayer}
            {UnClusteredLayer}
          </Source>
        )}
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
              longitude: markers[0]?.geoLng || 0,
              latitude: markers[0]?.geoLat || 0,
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
            {markers.length === 1 &&
              markers.map((marker) => (
                <Marker
                  longitude={Number(marker.geoLng) || 0}
                  latitude={Number(marker.geoLat) || 0}
                  anchor="bottom"
                >
                  <MapPin />
                </Marker>
              ))}
            {markers.length > 1 && (
              <Source
                id="incidents"
                type="geojson"
                data={{
                  type: 'FeatureCollection',
                  features: markers.map((marker) => ({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: [marker.geoLng || 0, marker.geoLat || 0],
                    },
                  })),
                }}
                cluster
                clusterProperties={{}}
                clusterMaxZoom={20}
                clusterRadius={0}
              >
                {ClusterLayer}
                {ClusterCountLayer}
                {UnClusteredLayer}
              </Source>
            )}
          </Map>
        )}
      </Modal>
    </Card>
  );
};

export default MapCard;
