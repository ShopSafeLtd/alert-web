import React, { useEffect, useRef, useState } from 'react';
import type {
  BusinessLocationsQuery,
  IncidentMapQuery,
  SchemeGroupsQuery,
} from 'graphql/generated';
import {
  Col,
  DatePicker,
  Form,
  Row,
  Select,
  Spin,
  Switch,
  Typography,
} from 'antd';
import type { MapRef } from 'react-map-gl';
import { Layer, Map, Source } from 'react-map-gl';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import mapboxgl from 'mapbox-gl';
import useStyles from './IncidentMap.styles';

const { Title } = Typography;
const { RangePicker } = DatePicker;

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
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
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

const BusinessClusterLayer = (
  <Layer
    id="clusters"
    type="circle"
    source="businesses"
    filter={['has', 'point_count']}
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    }}
  />
);

const BusinessClusterCountLayer = (
  <Layer
    id="cluster-count"
    type="symbol"
    source="businesses"
    filter={['has', 'point_count']}
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
    paint={{
      'text-color': '#FFF',
    }}
  />
);

const BusinessUnClusteredLayer = (
  <Layer
    id="unclustered-point"
    type="circle"
    source="businesses"
    filter={['!', ['has', 'point_count']]}
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': 8,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff',
    }}
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    type="heatmap"
    paint={{
      'heatmap-weight': 2,
      'heatmap-radius': 150,
      'heatmap-opacity': 0.3,
    }}
  />
);

interface Props {
  data: IncidentMapQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  schemes: Scheme[];
  onChangeSchemes: (value: string[]) => void;
  selectedSchemes: string[];
}

const IncidentMap = ({
  data,
  loading,
  groupsData,
  groupsLoading,
  businessData,
  schemes,
  onChangeSchemes,
  selectedSchemes,
}: Props) => {
  const mapRef = useRef<MapRef>(null);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const [showBusinesses, setShowBusinesses] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);

  const toggleBusinesses = () => {
    setShowBusinesses(!showBusinesses);
    if (!showBusinesses) setShowMarkers(false);
  };
  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
    if (!showMarkers) setShowBusinesses(false);
  };
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);

  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Form layout="vertical">
        <Row gutter={16} align="middle" className={classes.headerRow}>
          <Col flex={1}>
            <Title className={classes.title} level={3}>
              Incident Map
            </Title>
          </Col>
          <Col>
            <Form.Item label="Show Businesses">
              <Switch onClick={toggleBusinesses} checked={showBusinesses} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Show Incidents">
              <Switch onClick={toggleMarkers} checked={showMarkers} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Show Heatmap">
              <Switch onClick={toggleHeatmap} checked={showHeatmap} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Schemes">
              <Select
                placeholder="Select Scheme"
                className={classes.groupSelect}
                onChange={onChangeSchemes}
                value={selectedSchemes}
                mode="multiple"
                maxTagCount={2}
              >
                {schemes.map((scheme) => (
                  <Select.Option
                    key={scheme.scheme.id}
                    value={scheme.scheme.id}
                  >
                    {scheme.scheme.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Groups">
              <Select
                placeholder="Select Groups"
                className={classes.groupSelect}
              >
                {groupsData?.groups.map((group) => (
                  <Select.Option
                    loading={groupsLoading}
                    key={group.id}
                    value={group.id}
                  >
                    {group.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Date Filter">
              <RangePicker />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {loading && data?.incidents ? (
        <div className={classes.loadingPage}>
          <Spin />
        </div>
      ) : (
        <Map
          ref={mapRef}
          mapLib={mapboxgl}
          mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            longitude: data?.incidents[0]?.location?.geoLng || 0,
            latitude: data?.incidents[0]?.location?.geoLng || 0,
            pitch: 45,
            zoom: 17,
          }}
          style={{ width: '100%', height: '80vh' }}
          mapStyle={
            currentTheme === 'dark'
              ? 'mapbox://styles/wgarrod/clgkseekj009o01qz193sacyp'
              : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
          }
        >
          <Source
            id="incidents"
            type="geojson"
            data={{
              type: 'FeatureCollection',
              features:
                data?.incidents.map((incident) => ({
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'Point',
                    coordinates: [
                      incident.location?.geoLng || 0,
                      incident.location?.geoLat || 0,
                    ],
                  },
                })) || [],
            }}
            cluster
            // clusterProperties={{}}
            clusterMaxZoom={14}
            clusterRadius={50}
          >
            {showHeatmap && HeatMapLayer}
            {showMarkers && ClusterLayer}
            {showMarkers && ClusterCountLayer}
            {showMarkers && UnClusteredLayer}
          </Source>
          {showBusinesses && (
            <Source
              id="businesses"
              type="geojson"
              cluster
              clusterMaxZoom={14}
              clusterRadius={50}
              data={{
                type: 'FeatureCollection',
                features:
                  businessData?.listBusinesses.businesses.map((business) => ({
                    type: 'Feature',
                    properties: {},
                    geometry: {
                      type: 'Point',
                      coordinates: [
                        business.locations[0]?.geoLng || 0,
                        business.locations[0]?.geoLat || 0,
                      ],
                    },
                  })) || [],
              }}
            >
              {BusinessClusterLayer}
              {BusinessClusterCountLayer}
              {BusinessUnClusteredLayer}
            </Source>
          )}
        </Map>
      )}
    </div>
  );
};

export default IncidentMap;
