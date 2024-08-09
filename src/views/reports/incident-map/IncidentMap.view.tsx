import type { BrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import type { BusinessLocationsQuery } from 'graphql/businesses/queries/__generated__/business-locations.generated';
import type { SchemeGroupsQuery } from 'graphql/groups/queries/__generated__/scheme-groups.generated';
import type { IndustriesQuery } from 'graphql/industry/__generated__/industries.generated';
import type { IncidentMapQuery } from 'graphql/reports/queries/__generated__/incident-map.generated';
import type { FillLayer, LineLayer, MapRef } from 'react-map-gl';
import type { Scheme } from 'state';

import ReportsSideMenu from '#/components/reports/ReportsSideMenu/ReportsSideMenu.view';
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
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Layer, Map, Source } from 'react-map-gl';
import { useStoreState } from 'state';

import useStyles from './IncidentMap.styles';
import policeJSON from './police-areas';

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const dataLayer: FillLayer = {
  id: 'data',
  paint: {
    'fill-color': '#3288bd',
    'fill-opacity': 0.5,
  },
  source: 'police-data',
  type: 'fill',
};

export const lineLayer: LineLayer = {
  id: 'line',
  paint: {
    'line-color': '#000',
    'line-width': 1,
  },
  source: 'police-data',
  type: 'line',
};

const PoliceDataLayer = (
  <Layer
    id="policeData"
    paint={{ 'fill-color': '#3288bd', 'fill-opacity': 0.5 }}
    source="police-data"
    type="fill"
  />
);

const PoliceLineLayer = (
  <Layer
    id="policeLine"
    paint={{ 'line-color': '#000', 'line-width': 1 }}
    source="police-data"
    type="line"
  />
);

const ClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
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
    source="incidents"
    type="circle"
  />
);

const ClusterCountLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="cluster-count"
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
    source="incidents"
    type="symbol"
  />
);

const UnClusteredLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-point"
    paint={{
      'circle-color': '#11b4da',
      'circle-radius': 6,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.5,
    }}
    source="incidents"
    type="circle"
  />
);

const BusinessClusterLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="clusters"
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
    }}
    source="businesses"
    type="circle"
  />
);

const BusinessClusterCountLayer = (
  <Layer
    filter={['has', 'point_count']}
    id="cluster-count"
    layout={{
      'text-field': '{point_count_abbreviated}',
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    }}
    paint={{
      'text-color': '#FFF',
    }}
    source="businesses"
    type="symbol"
  />
);

const BusinessUnClusteredLayer = (
  <Layer
    filter={['!', ['has', 'point_count']]}
    id="unclustered-point"
    paint={{
      'circle-color': 'rgb(222, 68, 54)',
      'circle-radius': 5,
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 0.5,
    }}
    source="businesses"
    type="circle"
  />
);

const HeatMapLayer = (
  <Layer
    id="heatmap"
    maxzoom={20}
    paint={{
      'heatmap-intensity': {
        stops: [
          [11, 1],
          [15, 3],
        ],
      },
      'heatmap-opacity': 0.3,
      'heatmap-radius': {
        stops: [
          [11, 15],
          [15, 30],
        ],
      },
      'heatmap-weight': 1,
      // 'heatmap-intensity': {
      //   stops: [
      //     [11, 1],
      //     [15, 3]
      //   ]
      // },
    }}
    type="heatmap"
  />
);

interface Props {
  brandsData: BrandsQuery | undefined;
  brandsLoading: boolean;
  businessData: BusinessLocationsQuery | undefined;
  data: IncidentMapQuery | undefined;
  groupsData: SchemeGroupsQuery | undefined;
  groupsLoading: boolean;
  industriesData: IndustriesQuery | undefined;
  industriesLoading: boolean;
  loading: boolean;
  onChangeBrands: (value: string[]) => void;
  onChangeDateRange: (value: { endDate: Date; startDate: Date }) => void;
  onChangeGroups: (value: string[]) => void;
  onChangeIndustries: (value: string[]) => void;
  onChangeSchemes: (value: string[]) => void;
  schemes: Scheme[];
  selectedBrands: string[];
  selectedGroups: string[];
  selectedIndustries: string[];
  selectedSchemes: string[];
}

const IncidentMap = ({
  brandsData,
  brandsLoading,
  businessData,
  data,
  groupsData,
  groupsLoading,
  industriesData,
  industriesLoading,
  loading,
  onChangeBrands,
  onChangeDateRange,
  onChangeGroups,
  onChangeIndustries,
  onChangeSchemes,
  schemes,
  selectedBrands,
  selectedGroups,
  selectedIndustries,
  selectedSchemes,
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
  const [collapsed, setCollapsed] = useState(false);

  const classes = useStyles();
  return (
    <Row>
      <Col style={{ width: collapsed ? 0 : undefined }}>
        <ReportsSideMenu
          collapsed={collapsed}
          selectedId="incident-map"
          setCollapsed={setCollapsed}
        />
      </Col>
      <Col className={classes.page} flex={1}>
        <Row align="middle" className={classes.titleContainer} gutter={16}>
          <Col flex={1}>
            <Title className={classes.title} level={3}>
              {intl.formatMessage({
                defaultMessage: 'Incident Map',
              })}
            </Title>
          </Col>
          <Col>
            <Button onClick={toggleDrawerOpen}>
              <FormattedMessage defaultMessage="Mapping Options" />
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
              initialViewState={{
                latitude: 55.37,
                longitude: 3.43,
                zoom: 5,
              }}
              mapLib={mapboxgl}
              mapStyle={
                currentTheme === 'dark'
                  ? 'mapbox://styles/wgarrod/clua60bxj016401qse8vj1qfu'
                  : 'mapbox://styles/wgarrod/clgkn5gb7007u01qmahuhbi6o'
              }
              mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
              onError={() => {}}
              ref={mapRef}
              style={{ height: 'calc(100vh - 60px)', width: '100%' }}
            >
              {showPolice && (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore Polygon / multipolygon issue
                <Source data={policeJSON} id="police-data" type="geojson">
                  {PoliceDataLayer}
                  {PoliceLineLayer}
                </Source>
              )}
              {showMarkers && (
                <Source
                  cluster={cluster}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features:
                      data?.incidents.map((incident) => ({
                        geometry: {
                          coordinates: [
                            incident.location?.geoLng || 0,
                            incident.location?.geoLat || 0,
                          ],
                          type: 'Point',
                        },
                        properties: {},
                        type: 'Feature',
                      })) || [],
                    type: 'FeatureCollection',
                  }}
                  id="incidents"
                  type="geojson"
                >
                  {ClusterLayer}
                  {ClusterCountLayer}
                  {UnClusteredLayer}
                </Source>
              )}
              <Source
                data={{
                  features:
                    data?.incidents.map((incident) => ({
                      geometry: {
                        coordinates: [
                          incident.location?.geoLng || 0,
                          incident.location?.geoLat || 0,
                        ],
                        type: 'Point',
                      },
                      properties: {},
                      type: 'Feature',
                    })) || [],
                  type: 'FeatureCollection',
                }}
                id="incidents-heatmap"
                type="geojson"
              >
                {showHeatmap && HeatMapLayer}
              </Source>
              {showBusinesses && (
                <Source
                  cluster={cluster}
                  clusterMaxZoom={14}
                  clusterRadius={50}
                  data={{
                    features:
                      businessData?.listBusinesses.businesses.map(
                        (business) => ({
                          geometry: {
                            coordinates: [
                              business.locations[0]?.geoLng || 0,
                              business.locations[0]?.geoLat || 0,
                            ],
                            type: 'Point',
                          },
                          properties: {},
                          type: 'Feature',
                        })
                      ) || [],
                    type: 'FeatureCollection',
                  }}
                  id="businesses"
                  type="geojson"
                >
                  {BusinessClusterLayer}
                  {BusinessClusterCountLayer}
                  {BusinessUnClusteredLayer}
                </Source>
              )}
            </Map>
          </div>
        )}

        <Drawer onClose={toggleDrawerOpen} visible={drawerOpen}>
          <Form layout="vertical">
            <Row>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Show Businesses',
                  })}
                >
                  <Switch checked={showBusinesses} onClick={toggleBusinesses} />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Show Incidents',
                  })}
                >
                  <Switch checked={showMarkers} onClick={toggleMarkers} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Show Heatmap',
                  })}
                >
                  <Switch checked={showHeatmap} onClick={toggleHeatmap} />
                </Form.Item>
              </Col>
              <Col flex={1}>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Show Police Areas',
                  })}
                >
                  <Switch checked={showPolice} onClick={togglePolice} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  label={intl.formatMessage({
                    defaultMessage: 'Cluster Points',
                  })}
                >
                  <Switch checked={cluster} onClick={toggleCluster} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Schemes',
              })}
            >
              <Select
                className={classes.groupSelect}
                maxTagCount={2}
                mode="multiple"
                onChange={onChangeSchemes}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select Scheme',
                })}
                style={{ minWidth: 150 }}
                value={selectedSchemes}
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
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Groups',
              })}
            >
              <Select
                className={classes.groupSelect}
                maxTagCount={1}
                mode="multiple"
                onChange={onChangeGroups}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Select Groups',
                })}
                style={{ minWidth: 150 }}
                value={selectedGroups}
              >
                {groupsData?.groups.map((group) => (
                  <Select.Option
                    key={group.id}
                    loading={groupsLoading}
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
              })}
            >
              <RangePicker
                onChange={(value) => {
                  if (value && value[0] && value[1])
                    onChangeDateRange({
                      endDate: new Date(value[1].valueOf()),
                      startDate: new Date(value[0].valueOf()),
                    });
                }}
              />
            </Form.Item>
            <Form.Item
              label={intl.formatMessage({
                defaultMessage: 'Brands',
              })}
            >
              <Select
                className={classes.groupSelect}
                loading={brandsLoading}
                maxTagCount={1}
                mode="multiple"
                onChange={onChangeBrands}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Brands Groups',
                })}
                style={{ minWidth: 150 }}
                value={selectedBrands}
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
              })}
            >
              <Select
                className={classes.groupSelect}
                loading={industriesLoading}
                maxTagCount={1}
                mode="multiple"
                onChange={onChangeIndustries}
                placeholder={intl.formatMessage({
                  defaultMessage: 'Industries Groups',
                })}
                style={{ minWidth: 150 }}
                value={selectedIndustries}
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
      </Col>
    </Row>
  );
};

export default IncidentMap;
