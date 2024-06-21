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
  Tooltip,
} from 'antd';

import { Link } from 'react-router-dom';
// import type { MutationUpdaterFn } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faFilter } from '@fortawesome/pro-light-svg-icons';
import type { DateType } from 'types/DataType';
import CheckTags from 'components/form-components/check-tags/CheckTags.view';
import VehicleFilter from 'components/vehicles/VehicleFilter';
import { useIntl } from 'react-intl';
import AddInvestigation from 'components/form-components/Investigation/AddInvestigation';
import type { VehicleFilters } from 'state/data-model';
import WatermarkImage from 'components/images/WatermarkImage.view';
import FormatCalendar from 'utils/format-calendar-24h';
import type { Moment } from 'moment';
import useStyles from './ListVehicles.styles';
import type { ListCustomGalleriesQuery } from 'graphql/customGallery/queries/list_custom_galleries.generated';
import type { ImagePosition, SortOrder } from 'graphql/types';
import type { ListVehiclesQuery } from 'graphql/vehicles/queries/list-vehicles.generated';

interface Props {
  data: ListVehiclesQuery | undefined;
  loading: boolean;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  clearFilters: () => void;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGallery: (values: string[]) => void;
  setGroupsFilter: (value: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  customGalleriesData: ListCustomGalleriesQuery | undefined;
  onSelectCustomGalleries: (values: string) => void;
  setOrder: (value: SortOrder) => void;
  addInvestigation: string;
  toggleAddInvestigation: (value: string) => void;
  variables: VehicleFilters;
  onNavigate: () => void;
}

const ListVehicles = ({
  data,
  loading,
  setSearch,
  // updateVehicleList,
  groups,
  groupsLoading,
  setGroupsFilter,
  setCreatedAtFilter,
  clearFilters,
  sortFilter,
  toggleSortFilter,
  customGalleriesData,
  onSelectCustomGalleries,
  setGallery,
  setOrder,
  addInvestigation,
  toggleAddInvestigation,
  variables,
  onNavigate,
}: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const { search, gallery, customGalleries } = variables;

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
      <Row align="middle" gutter={12} className={classes.headerRow}>
        <Col span={8} xxl={6}>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            allowClear
            placeholder={intl.formatMessage({
              defaultMessage: 'Search vehicles...',
            })}
          />
        </Col>
        <Col>
          <CheckTags
            mode="check"
            noGutter
            value={gallery}
            onChange={setGallery}
            options={galleryOptions}
          />
        </Col>
        <Col flex={1}>
          {customGalleriesData?.customGalleriesRelay?.totalCount &&
          customGalleriesData?.customGalleriesRelay?.totalCount > 0 ? (
            <Dropdown
              overlay={menu}
              placement="bottom"
              arrow={{ pointAtCenter: true }}
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
              onClick={toggleSortFilter}
              icon={<FontAwesomeIcon icon={faFilter} size="lg" />}
            />
          </Tooltip>
        </Col>
        <Col>
          <Button type="primary" onClick={onNavigate}>
            {intl.formatMessage({
              defaultMessage: 'Add New Vehicle',
            })}
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={data?.listVehicles.vehicles.map((vehicle) => ({
          key: vehicle.id,
          images: vehicle.images,
          make: vehicle.make,
          reference: vehicle?.reference,
          colour: vehicle.colour,
          model: vehicle.model,
          registration: vehicle.registration,
          updatedAt: vehicle.updatedAt,
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
            key: 'images',
            dataIndex: 'images',
            title: '',
            width: 120,
            render: (
              item: {
                position: ImagePosition | undefined;
                rotation: number | undefined;
                optimised?: string | null | undefined;
              }[]
            ) => (
              <div style={{ height: 100, width: 100 }}>
                <WatermarkImage
                  url={item[0]?.optimised}
                  rotation={item[0]?.rotation}
                  position={item[0]?.position}
                />
              </div>
            ),
          },
          {
            key: 'reference',
            dataIndex: 'reference',
            title: intl.formatMessage({
              defaultMessage: 'Alert ID',
            }),
            render: (value, item) => (
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
            // sorter: (a, b) => a.reference - b.reference,
          },
          {
            key: 'registration',
            dataIndex: 'registration',
            title: intl.formatMessage({
              defaultMessage: 'Registration',
            }),
            render: (value, item) => (
              <Link to={`view/${item.key}`}>{value}</Link>
            ),
          },
          {
            key: 'make',
            dataIndex: 'make',
            title: intl.formatMessage({ defaultMessage: 'Make' }),
          },
          {
            key: 'colour',
            dataIndex: 'colour',
            title: intl.formatMessage({
              defaultMessage: 'Colour',
            }),
          },
          {
            key: 'model',
            dataIndex: 'model',
            title: intl.formatMessage({
              defaultMessage: 'Model',
            }),
          },
          {
            key: 'updatedAt',
            dataIndex: 'updatedAt',
            title: intl.formatMessage({
              defaultMessage: 'UpdatedAt',
            }),
            render: (value: Date | Moment) => FormatCalendar(value),
            sorter: (a, b) =>
              new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf(),
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
      />

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Vehicle Filters',
        })}
        open={sortFilter}
        onClose={toggleSortFilter}
        width={500}
      >
        <VehicleFilter
          variables={variables}
          setOrder={setOrder}
          groups={groups}
          groupsLoading={groupsLoading}
          setGroupsFilter={setGroupsFilter}
          clearFilters={clearFilters}
          setCreatedAtFilter={setCreatedAtFilter}
        />
      </Drawer>
      {/* investigation */}
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Add New Investigation',
        })}
        open={!!addInvestigation}
        width="500"
        onClose={() => toggleAddInvestigation('')}
      >
        {addInvestigation ? (
          <AddInvestigation
            vehicleId={addInvestigation}
            onClose={() => toggleAddInvestigation('')}
          />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ListVehicles;
