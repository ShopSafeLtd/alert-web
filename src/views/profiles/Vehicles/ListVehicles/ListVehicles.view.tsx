import type { ListCustomGalleriesQuery } from 'graphql/customGallery/queries/__generated__/list_custom_galleries.generated';
import type { ImagePosition, SortOrder } from 'graphql/types';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/__generated__/list-vehicles.generated';
import type { Moment } from 'moment';
import type { VehicleFilters } from 'state/data-model';
import type { DateType } from 'types/DataType';

import { faChevronDown, faFilter } from '@fortawesome/pro-light-svg-icons';
// import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  Tooltip,
} from 'antd';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import VehicleFilter from 'components/vehicles/VehicleFilter';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ListVehicles.styles';

interface Props {
  addInvestigation: string;
  clearFilters: () => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  data: ListVehiclesQuery | undefined;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  onNavigate: () => void;
  onSelectCustomGalleries: (values: string) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  sortFilter: boolean;
  toggleAddInvestigation: (value: string) => void;
  toggleSortFilter: () => void;
  variables: VehicleFilters;
}

const ListVehicles = ({
  addInvestigation,
  clearFilters,
  customGalleriesData,
  data,
  // updateVehicleList,
  groups,
  groupsLoading,
  loading,
  onNavigate,
  onSelectCustomGalleries,
  setCreatedAtFilter,
  setGallery,
  setGroupsFilter,
  setOrder,
  setSearch,
  sortFilter,
  toggleAddInvestigation,
  toggleSortFilter,
  variables,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const { customGalleries, gallery, search } = variables;

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
      {customGalleriesData?.customGalleriesRelay?.edges?.map(
        ({ node: { id, name } }) => (
          <Menu.Item key={id}>
            <Checkbox
              checked={customGalleries.includes(id)}
              key={id}
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
      <Row align="middle" className={classes.headerRow} gutter={12}>
        <Col span={8} xxl={6}>
          <Input
            allowClear
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search vehicles...',
            })}
            value={search}
          />
        </Col>
        <Col>
          <CheckTags
            mode="check"
            noGutter
            onChange={setGallery}
            options={galleryOptions}
            value={gallery}
          />
        </Col>
        <Col flex={1}>
          {customGalleriesData?.customGalleriesRelay?.totalCount &&
          customGalleriesData?.customGalleriesRelay?.totalCount > 0 ? (
            <Dropdown
              arrow={{ pointAtCenter: true }}
              overlay={menu}
              placement="bottom"
            >
              <Button className={classes.selectBox}>
                {intl.formatMessage({
                  defaultMessage: 'Custom Gallery',
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
          <Tooltip
            title={intl.formatMessage({
              defaultMessage: 'Sort & Filter',
            })}
          >
            <Button
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
              onClick={toggleSortFilter}
            />
          </Tooltip>
        </Col>
        <Col>
          <Button onClick={onNavigate} type="primary">
            {intl.formatMessage({
              defaultMessage: 'Add New Vehicle',
            })}
          </Button>
        </Col>
      </Row>
      <Table
        columns={[
          {
            dataIndex: 'images',
            key: 'images',
            render: (
              item: {
                optimised?: null | string | undefined;
                position: ImagePosition | undefined;
                rotation: number | undefined;
              }[]
            ) => (
              <div style={{ height: 100, width: 100 }}>
                <WatermarkImage
                  position={item[0]?.position}
                  rotation={item[0]?.rotation}
                  url={item[0]?.optimised}
                />
              </div>
            ),
            title: '',
            width: 120,
          },
          {
            dataIndex: 'reference',
            key: 'reference',
            render: (value, item) => (
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
            // sorter: (a, b) => a.reference - b.reference,
          },
          {
            dataIndex: 'registration',
            key: 'registration',
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Registration',
            }),
          },
          {
            dataIndex: 'make',
            key: 'make',
            title: intl.formatMessage({ defaultMessage: 'Make' }),
          },
          {
            dataIndex: 'colour',
            key: 'colour',
            title: intl.formatMessage({
              defaultMessage: 'Colour',
            }),
          },
          {
            dataIndex: 'model',
            key: 'model',
            title: intl.formatMessage({
              defaultMessage: 'Model',
            }),
          },
          {
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (value: Date | Moment) => FormatCalendar(value),
            sorter: (a, b) =>
              new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf(),
            title: intl.formatMessage({
              defaultMessage: 'UpdatedAt',
            }),
          },

          // {
          //   title: '',
          //   dataIndex: 'actions',
          //   key: 'actions',
          //   width: 120,
          //   render: (_, record) => (
          //     // <FontAwesomeIcon
          //     //   icon={faArrowUpRightFromSquare}
          //     //   onClick={() => navigate(`view/${record.key}`)}
          //     // />
          //     <Button
          //       type="ghost"
          //       onClick={() => toggleAddInvestigation(record.key)}
          //     >
          //       <FontAwesomeIcon
          //         size="1x"
          //         style={{ marginRight: 8 }}
          //         icon={faPlus}
          //       />
          //       {intl.formatMessage({
          //         defaultMessage: 'Investigation',
          //         id: 'tNseQe',
          //       })}
          //     </Button>
          //   ),
          // },
        ]}
        dataSource={data?.listVehicles.vehicles.map((vehicle) => ({
          colour: vehicle.colour,
          images: vehicle.images,
          key: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          reference: vehicle?.reference,
          registration: vehicle.registration,
          updatedAt: vehicle.updatedAt,
        }))}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
      />

      <Drawer
        onClose={toggleSortFilter}
        open={sortFilter}
        title={intl.formatMessage({
          defaultMessage: 'Vehicle Filters',
        })}
        width={500}
      >
        <VehicleFilter
          clearFilters={clearFilters}
          groups={groups}
          groupsLoading={groupsLoading}
          setCreatedAtFilter={setCreatedAtFilter}
          setGroupsFilter={setGroupsFilter}
          setOrder={setOrder}
          variables={variables}
        />
      </Drawer>
      {/* investigation */}
      <Drawer
        onClose={() => toggleAddInvestigation('')}
        open={!!addInvestigation}
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        width="500"
      >
        {addInvestigation ? (
          <AddInvestigation
            onClose={() => toggleAddInvestigation('')}
            vehicleId={addInvestigation}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListVehicles;
