import { Empty, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import type { MapRef } from 'react-map-gl';
import { Layer, Map, Source } from 'react-map-gl';
import { useStoreState } from '../../../state';

// const ClusterLayer = (
//   <Layer
//     id="clusters"
//     type="circle"
//     source="incidents"
//     filter={['has', 'point_count']}
//     paint={{
//       'circle-color': [
//         'step',
//         ['get', 'point_count'],
//         '#51bbd6',
//         50,
//         '#f1f075',
//         100,
//         '#f28cb1',
//       ],
//       'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
//     }}
//   />
// );

// const ClusterCountLayer = (
//   <Layer
//     id="cluster-count"
//     type="symbol"
//     source="incidents"
//     filter={['has', 'point_count']}
//     layout={{
//       'text-field': '{point_count_abbreviated}',
//       'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//       'text-size': 12,
//     }}
//   />
// );
//
// const UnClusteredLayer = (
//   <Layer
//     id="unclustered-point"
//     type="circle"
//     source="incidents"
//     filter={['!', ['has', 'point_count']]}
//     paint={{
//       'circle-color': '#11b4da',
//       'circle-radius': 8,
//       'circle-stroke-width': 1,
//       'circle-stroke-color': '#fff',
//     }}
//   />
// );

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    type="heatmap"
    paint={{
      'heatmap-weight': 1,
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3],
        ],
      },
      'heatmap-radius': {
        stops: [
          [11, 15],
          [15, 30],
        ],
      },
      'heatmap-opacity': 0.3,
      // 'heatmap-intensity': {
      //   stops: [
      //     [11, 1],
      //     [15, 3]
      //   ]
      // },
    }}
  />
);

const HeatMapGoogle = ({
  data,
  label,
  emptyLabel,
  markers: _,
  height,
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
  height?: string;
}) => {
  const mapRef = useRef<MapRef>(null);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);
  const [showHeatmap] = useState(true);
  const [showMarkers] = useState(true);

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);

  return (
    <div style={{ height: '100%', width: '100%%' }} className="no-break">
      <Typography.Title level={4}>{label}</Typography.Title>
      {data && data.length > 0 ? (
        <Map
          onError={() => {}}
          ref={mapRef}
          mapLib={mapboxgl}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          style={{ width: '100%', height }} // will need to dynamically work out based on container size
          mapStyle={
            currentTheme === 'dark'
              ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
              : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
          }
        >
          {/* <Source */}
          {/*   id="incidents" */}
          {/*   type="geojson" */}
          {/*   data={{ */}
          {/*     type: 'FeatureCollection', */}
          {/*     features: */}
          {/*       data */}
          {/*         ?.filter((latLng) => latLng?.geoLat && latLng.geoLng) */}
          {/*         .map((latLng) => ({ */}
          {/*           type: 'Feature', */}
          {/*           properties: {}, */}
          {/*           geometry: { */}
          {/*             type: 'Point', */}
          {/*             coordinates: [latLng?.geoLng || 0, latLng?.geoLat || 0], */}
          {/*           }, */}
          {/*         })) || [], */}
          {/*   }} */}
          {/*   cluster */}
          {/*   // clusterProperties={{}} */}
          {/*   clusterMaxZoom={14} */}
          {/*   clusterRadius={50} */}
          {/* > */}
          {/*   {showMarkers && ClusterLayer} */}
          {/*   {showMarkers && ClusterCountLayer} */}
          {/*   {showMarkers && UnClusteredLayer} */}
          {/* </Source> */}
          <Source
            id="incidents-heatmap"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features:
                data
                  ?.filter((latLng) => latLng?.geoLat && latLng.geoLng)
                  .map((latLng) => ({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: [latLng?.geoLng || 0, latLng?.geoLat || 0],
                    },
                  })) || [],
            }}
          >
            {showHeatmap && HeatMapLayer}
          </Source>
        </Map>
      ) : (
        <Empty description={emptyLabel} />
      )}
    </div>
  );
};

export default HeatMapGoogle;
