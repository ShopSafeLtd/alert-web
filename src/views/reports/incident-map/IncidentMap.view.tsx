import React, { useEffect, useRef, useState } from 'react';
import type {
  BrandsQuery,
  BusinessLocationsQuery,
  IncidentMapQuery,
  IndustriesQuery,
  SchemeGroupsQuery,
} from 'graphql/generated';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Row,
  Select,
  Spin,
  Switch,
  Typography,
} from 'antd';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';
import { Layer, Map, Source } from 'react-map-gl';
import type { Scheme } from 'state';
import { useStoreState } from 'state';
import mapboxgl from 'mapbox-gl';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './IncidentMap.styles';
import policeJSON from './police-areas';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const dataLayer: FillLayer = {
  id: 'data',
  source: 'police-data',
  type: 'fill',
  paint: {
    'fill-color': '#3288bd',
    'fill-opacity': 0.5,
  },
};

export const lineLayer: LineLayer = {
  id: 'line',
  source: 'police-data',
  type: 'line',
  paint: {
    'line-color': '#000',
    'line-width': 1,
  },
};

const PoliceDataLayer = (
  <Layer
    id="policeData"
    source="police-data"
    type="fill"
    paint={{ 'fill-color': '#3288bd', 'fill-opacity': 0.5 }}
  />
);

const PoliceLineLayer = (
  <Layer
    id="policeLine"
    source="police-data"
    type="line"
    paint={{ 'line-color': '#000', 'line-width': 1 }}
  />
);

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
      'circle-radius': 6,
      'circle-stroke-width': 0.5,
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
      'circle-radius': 5,
      'circle-stroke-width': 0.5,
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
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  selectedBrands: string[];
  selectedIndustries: string[];
  onChangeBrands: (value: string[]) => void;
  onChangeIndustries: (value: string[]) => void;
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
  brandsLoading,
  industriesLoading,
  brandsData,
  industriesData,
  selectedIndustries,
  onChangeIndustries,
  selectedBrands,
  onChangeBrands,
}: Props) => {
  const mapRef = useRef<MapRef>(null);

  const currentTheme = useStoreState((state) => state.theme.currentTheme);

  const [showBusinesses, setShowBusinesses] = useState(false);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showMarkers, setShowMarkers] = useState(true);
  const [showPolice, setShowPolice] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cluster, setCluster] = useState(true);

  const toggleDrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleCluster = () => {
    setCluster(!cluster);
  };

  const toggleBusinesses = () => {
    setShowBusinesses(!showBusinesses);
    if (!showBusinesses) setShowMarkers(false);
  };
  const toggleMarkers = () => {
    setShowMarkers(!showMarkers);
    if (!showMarkers) setShowBusinesses(false);
  };
  const toggleHeatmap = () => setShowHeatmap(!showHeatmap);
  const togglePolice = () => setShowPolice(!showPolice);

  useEffect(() => {
    mapRef.current?.moveLayer('unclustered-point');
    mapRef.current?.moveLayer('clusters');
    mapRef.current?.moveLayer('cluster-count');
  }, [showHeatmap, showMarkers]);

  const intl = useIntl();

  const classes = useStyles();
  return (
    <div className={classes.page}>
      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col flex={1}>
          <Title className={classes.title} level={3}>
            {intl.formatMessage({
              defaultMessage: 'Incident Map',
              id: '8vWvqg',
            })}
          </Title>
        </Col>
        <Col>
          <Button onClick={toggleDrawerOpen}>
            <FormattedMessage id="i2gKJi" defaultMessage="Mapping Options" />
          </Button>
        </Col>
      </Row>

      {loading && data?.incidents ? (
        <div className={classes.loadingPage}>
          <Spin />
        </div>
      ) : (
        <div className={classes.mapContainer}>
          <Map
            onError={() => {}}
            ref={mapRef}
            mapLib={mapboxgl}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            style={{ width: '100%', height: '85vh' }}
            mapStyle={
              currentTheme === 'dark'
                ? 'mapbox://styles/wgarrod/clua60bxj016401qse8vj1qfu'
                : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
            }
            initialViewState={{
              longitude: 3.43,
              latitude: 55.37,
              zoom: 5,
            }}
          >
            {showPolice && (
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore Polygon / multipolygon issue
              <Source id="police-data" type="geojson" data={policeJSON}>
                {PoliceDataLayer}
                {PoliceLineLayer}
              </Source>
            )}
            {showMarkers && (
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
                cluster={cluster}
                clusterMaxZoom={14}
                clusterRadius={50}
              >
                {ClusterLayer}
                {ClusterCountLayer}
                {UnClusteredLayer}
              </Source>
            )}
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
                cluster={cluster}
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
        </div>
      )}

      <Drawer visible={drawerOpen} onClose={toggleDrawerOpen}>
        <Form layout="vertical">
          <Row>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Businesses',
                  id: 'NOT1VO',
                })}
              >
                <Switch onClick={toggleBusinesses} checked={showBusinesses} />
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Incidents',
                  id: 'RVBwrX',
                })}
              >
                <Switch onClick={toggleMarkers} checked={showMarkers} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Heatmap',
                  id: 'JNbVtq',
                })}
              >
                <Switch onClick={toggleHeatmap} checked={showHeatmap} />
              </Form.Item>
            </Col>
            <Col flex={1}>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Show Police Areas',
                  id: 'rZNlFU',
                })}
              >
                <Switch onClick={togglePolice} checked={showPolice} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Item
                label={intl.formatMessage({
                  defaultMessage: 'Cluster Points',
                  id: 'qXZqPu',
                })}
              >
                <Switch onClick={toggleCluster} checked={cluster} />
              </Form.Item>
            </Col>
          </Row>
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
                <Select.Option key={scheme.scheme.id} value={scheme.scheme.id}>
                  {scheme.scheme.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Brands',
              id: 'jWfWEA',
            })}
          >
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Brands Groups',
                id: 'nlQzOH',
              })}
              className={classes.groupSelect}
              style={{ minWidth: 150 }}
              onChange={onChangeBrands}
              value={selectedBrands}
              mode="multiple"
              maxTagCount={1}
              loading={brandsLoading}
            >
              {brandsData?.brands.edges.map(({ node: group }) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={intl.formatMessage({
              defaultMessage: 'Industries',
              id: 'lINmqu',
            })}
          >
            <Select
              placeholder={intl.formatMessage({
                defaultMessage: 'Industries Groups',
                id: 'bkQwcu',
              })}
              className={classes.groupSelect}
              style={{ minWidth: 150 }}
              onChange={onChangeIndustries}
              value={selectedIndustries}
              mode="multiple"
              maxTagCount={1}
              loading={industriesLoading}
            >
              {industriesData?.industries.map((group) => (
                <Select.Option key={group.id} value={group.id}>
                  {group.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default IncidentMap;
