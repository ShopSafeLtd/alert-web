import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  Drawer,
  Dropdown,
  Input,
  Menu,
  Row,
  Table,
} from 'antd';
import type {
  ListCustomGalleriesQuery,
  ListVehiclesQuery,
  SortOrder,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
// import type { MutationUpdaterFn } from '@apollo/client';
import AddVehicle from 'components/form-components/Vehicle/AddVehicle';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faChevronDown,
  faFilter,
} from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
import type { DateType, VehicleData } from 'types/DataType';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import VehicleFilter from 'components/vehicles/VehicleFilter';
import { useIntl } from 'react-intl';
import useStyles from './ListVehicles.styles';

interface Props {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  search: string;
  setSearch: (value: string) => void;
  addVehicle: boolean;
  toggleAddVehicle: () => void;
  // updateVehicleList: MutationUpdaterFn<CreateVehicleMutation>;
  onSubmit: (value: VehicleData) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  onSelectCustomGalleries: (values: string) => void;
  customGalleries: string[];
  order: SortOrder;
  setOrder: (value: SortOrder) => void;
}

const ListVehicles = ({
  data,
  loading,
  search,
  setSearch,
  addVehicle,
  toggleAddVehicle,
  // updateVehicleList,
  onSubmit,
  groups,
  groupsLoading,
  groupsFilter,
  setGroupsFilter,
  setCreatedAtFilter,
  clearFilters,
  sortFilter,
  toggleSortFilter,
  customGalleriesData,
  customGalleries,
  onSelectCustomGalleries,
  gallery,
  setGallery,
  order,
  setOrder,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const navigate = useNavigate();
  const galleryOptions = [
    {
      label: 'Following',
      value: 'FOLLOWING',
    },
    {
      label: 'My Data',
      value: 'MYDATA',
    },
  ];
  const menu = () => (
    <Menu>
      {customGalleriesData?.listCustomGalleries.customGalleries.map(
        ({ id, name }) => (
          <Menu.Item key={id}>
            <Checkbox
              key={id}
              checked={customGalleries.includes(id)}
              onChange={() => {
                onSelectCustomGalleries(id);
              }}
            >
              {name}
            </Checkbox>
          </Menu.Item>
        )
      )}
    </Menu>
  );
  return (
    <div className={classes.page}>
      <Row align="middle" gutter={16} className={classes.headerRow}>
        <Col span={8} xxl={6}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Search vehicles...',
              id: 'PoSlBr',
            })}
          />
        </Col>
        <Col>
          <CheckTags
            mode="check"
            value={gallery}
            onChange={setGallery}
            options={galleryOptions}
          />
        </Col>
        <Col flex={1}>
          {customGalleriesData?.listCustomGalleries.total ? (
            <Dropdown
              overlay={menu}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
            >
              <Button className={classes.selectBox}>
                {intl.formatMessage({
                  defaultMessage: 'Custom Gallery',
                  id: '/b4BmP',
                })}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  style={{ marginLeft: 10 }}
                />
              </Button>
            </Dropdown>
          ) : null}
        </Col>
        <Col>
          <Button
            onClick={toggleSortFilter}
            icon={
              <FontAwesomeIcon
                icon={faFilter}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
          >
            {intl.formatMessage({
              defaultMessage: 'Sort & Filter',
              id: 'f2g3SM',
            })}
          </Button>
        </Col>
        <Col>
          <Button type="primary" onClick={toggleAddVehicle}>
            {intl.formatMessage({
              defaultMessage: 'Add New Vehicle',
              id: 'cHbTr7',
            })}
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={data?.listVehicles.vehicles.map((vehicle) => ({
          key: vehicle.id,
          make: vehicle.make,
          reference: vehicle?.reference,
          colour: vehicle.colour,
          model: vehicle.model,
          registration: vehicle.registration,
          updatedAt: vehicle.updatedAt,
          totalCrimeGroups: vehicle.totalCrimeGroups,
          totalOffenders: vehicle.totalOffenders,
          totalIncidents: vehicle.totalIncidents,
        }))}
        loading={loading}
        size="small"
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
              id: 'k8ZNgH',
            }),
            render: (value, item) => (
              // eslint-disable-next-line formatjs/no-literal-string-in-jsx
              <Link to={`view/${item.key}`}>V-{value}</Link>
            ),
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: intl.formatMessage({
              defaultMessage: 'Registration',
              id: 'qv7ied',
            }),
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'make',
            dataIndex: 'make',
            title: intl.formatMessage({ defaultMessage: 'Make', id: '6AAM0P' }),
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: intl.formatMessage({
              defaultMessage: 'Colour',
              id: '+e8vAT',
            }),
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: intl.formatMessage({
              defaultMessage: 'Model',
              id: 'rhSI1/',
            }),
          },
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: intl.formatMessage({
              defaultMessage: 'UpdatedAt',
              id: 'tjQ2Mx',
            }),
            render: (value: Date | undefined) =>
              moment(value || moment()).calendar(),
          },
          {
            key: 'totalOffenders',
            dataIndex: 'totalOffenders',
            title: intl.formatMessage({
              defaultMessage: 'Members',
              id: '+a+2ug',
            }),
          },
          {
            key: 'totalIncidents',
            dataIndex: 'totalIncidents',
            title: intl.formatMessage({
              defaultMessage: 'Incidents',
              id: 'mtr3R4',
            }),
          },
          {
            key: 'totalCrimeGroups',
            dataIndex: 'totalCrimeGroups',
            title: intl.formatMessage({
              defaultMessage: 'Crime Groups',
              id: 'a0aLil',
            }),
          },
          {
            title: '',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                onClick={() => navigate(`view/${record.key}`)}
              />
            ),
          },
        ]}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Vehicle',
          id: 'cHbTr7',
        })}
        visible={addVehicle}
        width="700"
        zIndex={999}
        onClose={toggleAddVehicle}
      >
        {addVehicle ? (
          <AddVehicle update={onSubmit} onClose={toggleAddVehicle} showGroups />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Vehicle Filters',
          id: '1KlEM/',
        })}
        visible={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <VehicleFilter
          order={order}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          groupsFilter={groupsFilter}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
        />
      </Drawer>
    </div>
  );
};

export default ListVehicles;
