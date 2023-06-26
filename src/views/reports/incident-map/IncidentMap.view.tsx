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
import { useIntl } from 'react-intl';
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
        50,
        '#f1f075',
        100,
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

interface Props {
  data: IncidentMapQuery | undefined;
  loading: boolean;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  schemes: Scheme[];
  onChangeSchemes: (value: string[]) => void;
  selectedSchemes: string[];
  onChangeGroups: (value: string[]) => void;
  selectedGroups: string[];
  onChangeDateRange: (value: { startDate: Date; endDate: Date }) => void;
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
  onChangeGroups,
  selectedGroups,
  onChangeDateRange,
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

  const intl = useIntl();

  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Form layout="vertical">
        <Row gutter={16} align="middle" className={classes.headerRow}>
          <Col flex={1}>
            <Title className={classes.title} level={3}>
              {intl.formatMessage({
                defaultMessage: 'Incident Map',
                id: '8vWvqg',
              })}
            </Title>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Show Businesses',
                id: 'NOT1VO',
              })}
            >
              <Switch onClick={toggleBusinesses} checked={showBusinesses} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Show Incidents',
                id: 'RVBwrX',
              })}
            >
              <Switch onClick={toggleMarkers} checked={showMarkers} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Show Heatmap',
                id: 'JNbVtq',
              })}
            >
              <Switch onClick={toggleHeatmap} checked={showHeatmap} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Schemes',
                id: 'QgGevU',
              })}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select Scheme',
                  id: 'bfRA48',
                })}
                className={classes.groupSelect}
                onChange={onChangeSchemes}
                value={selectedSchemes}
                mode="multiple"
                maxTagCount={2}
                style={{ minWidth: 150 }}
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
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
                id: 'hzmswI',
              })}
            >
              <Select
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select Groups',
                  id: 'q2cuIU',
                })}
                className={classes.groupSelect}
                style={{ minWidth: 150 }}
                onChange={onChangeGroups}
                value={selectedGroups}
                mode="multiple"
                maxTagCount={1}
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
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Date Filter',
                id: 'cMfoug',
              })}
            >
              <RangePicker
                onChange={(value) => {
                  if (value && value[0] && value[1])
                    onChangeDateRange({
                      startDate: new Date(value[0].valueOf()),
                      endDate: new Date(value[1].valueOf()),
                    });
                }}
              />
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
            {showMarkers && ClusterLayer}
            {showMarkers && ClusterCountLayer}
            {showMarkers && UnClusteredLayer}
          </Source>
          <Source
            id="incidents-heatmap"
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
          >
            {showHeatmap && HeatMapLayer}
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
