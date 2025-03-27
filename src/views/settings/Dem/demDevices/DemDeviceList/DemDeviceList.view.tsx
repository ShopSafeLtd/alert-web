import type { UpsertDemDeviceMutation } from '#/components/form-components/DemDevice/AddDemDevice/graphql/mutations/__generated__/upsert-dem-device.generated';
import type { DemDeviceData } from '#/types/DataType';
import type { MutationUpdaterFn } from '@apollo/client';

import AddDemDevice from '#/components/form-components/DemDevice/AddDemDevice';
import LinkBusiness from '#/components/form-components/businesses/LinkBusiness';
import FormatCalendar from '#/utils/format-calendar-24h';
import { faEdit, faPlus, faShare } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Input,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { DemDevicesQuery } from '../graphql/queries/__generated__/dem-devices.generated';

interface Props {
  addDemDevice: boolean;
  assignToBusiness: string;
  data: DemDevicesQuery | undefined;
  editData: DemDeviceData | undefined;
  loading: boolean;
  onAssignedBusiness: (value: string) => void;
  pagination: { page: number; pageSize: number };
  resetPage: () => void;
  saving: boolean;
  search: string;
  setAssignToBusiness: (value: string) => void;
  setEditData: (value: DemDeviceData | undefined) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setSearch: (value: string) => void;
  toggleAddDemDevice: () => void;
  updateDemDeviceList: MutationUpdaterFn<UpsertDemDeviceMutation>;
}
interface TableItem {
  business?: { id: string; name: string };
  createdAt?: Date | null;
  demDevice: DemDeviceData;
  demGroups: { id: string; name: string }[];
  id: string;
  name: string;
  serialNumber?: null | string;
}

const DemDeviceList = ({
  addDemDevice,
  assignToBusiness,
  data,
  editData,
  loading,
  onAssignedBusiness,
  pagination,
  resetPage,
  saving,
  search,
  setAssignToBusiness,
  setEditData,
  setPagination,
  setSearch,
  toggleAddDemDevice,
  updateDemDeviceList,
}: Props): JSX.Element => {
  const intl = useIntl();
  const groupIds = new Set(
    data?.demDevices.edges.flatMap(({ node }) =>
      node.demGroups.map(({ id }) => id)
    )
  );
  const groupData = data?.demDevices.edges.flatMap(
    ({ node }) => node.demGroups
  );
  const groupFilter = [...groupIds]
    .map((id) => groupData?.find((el) => el.id === id))
    .map((el) => ({ text: el?.name || '', value: el?.id || '' }));

  const businessIds = new Set(
    data?.demDevices.edges.map(({ node }) => node.business.id)
  );
  const businessData = data?.demDevices.edges.map(({ node }) => node.business);
  const businessFilter = [...businessIds]
    .map((id) => businessData?.find((el) => el.id === id))
    .map((el) => ({ text: el?.name || '', value: el?.id || '' }));

  return (
    <div className="list-view">
      <Row gutter={8} style={{ marginBottom: 10 }}>
        <Col span={8}>
          <Input
            allowClear
            onChange={(event) => {
              resetPage();
              setSearch(event.target.value);
            }}
            placeholder={intl.formatMessage({
              defaultMessage: 'Search for a Dem Device...',
            })}
            value={search}
          />
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={toggleAddDemDevice}
            type="primary"
          >
            <FormattedMessage defaultMessage="New Dem Device" />
          </Button>
        </Col>
      </Row>
      <Table<TableItem>
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            render: (name: string, item: TableItem) => (
              <Link to={`/app/scheme-settings/dem/dem-devices/view/${item.id}`}>
                {name}
              </Link>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
          },

          {
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            title: intl.formatMessage({
              defaultMessage: 'Serial Number',
            }),
          },
          {
            dataIndex: 'business',
            filters: businessFilter,
            key: 'business',
            onFilter: (
              value: boolean | number | string,
              record: { business?: { id: string; name: string } }
            ) => record.business?.id === value,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (_, record) => (
              <Link
                to={`/app/scheme-settings/businesses/view/${record.business?.id}`}
              >
                <Tag color="red">{record.business?.name}</Tag>
              </Link>
            ),

            title: intl.formatMessage({
              defaultMessage: 'Business',
            }),
          },

          {
            dataIndex: 'demGroups',
            filters: groupFilter,
            key: 'demGroups',
            onFilter: (
              value: boolean | number | string,
              record: { demGroups: { id: string; name: string }[] }
            ) => record.demGroups.some(({ id }) => id === value),
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            render: (value: { id: string; name: string }[]) => (
              <Typography.Text>
                {value
                  .map(({ name }, index) => (index === 0 ? name : ` ${name}`))
                  .toString()}
              </Typography.Text>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Dem Groups',
            }),
          },
          {
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: Date) =>
              FormatCalendar(new Date(value), intl, true),
            title: intl.formatMessage({
              defaultMessage: 'Created Date',
            }),
          },
          {
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
              <Row gutter={8}>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Assign Device to Business',
                    })}
                  >
                    <Button
                      icon={<FontAwesomeIcon icon={faShare} size="lg" />}
                      onClick={() => {
                        setAssignToBusiness(record.id);
                      }}
                      type="text"
                    />
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip
                    title={intl.formatMessage({
                      defaultMessage: 'Edit Device Detail',
                    })}
                  >
                    <Button
                      icon={<FontAwesomeIcon icon={faEdit} size="lg" />}
                      onClick={() => {
                        setEditData(record.demDevice);
                      }}
                      type="text"
                    />
                  </Tooltip>
                </Col>
              </Row>
            ),
            title: '',
            width: 150,
          },
        ]}
        dataSource={data?.demDevices.edges.map(({ node: demDevice }) => ({
          business: demDevice.business,
          createdAt: demDevice.createdAt,
          demDevice: {
            ...demDevice,
            business: demDevice.business.id,
            demGroups: demDevice.demGroups.map(({ id }) => id),
          },
          demGroups: demDevice.demGroups,
          id: demDevice.id,
          name: demDevice.name,
          serialNumber: demDevice.serialNumber,
        }))}
        loading={loading}
        pagination={{
          current: pagination.page,
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            setPagination({ page, pageSize });
          },
          pageSize: pagination.pageSize,
          total: data?.demDevices.totalCount,
        }}
        size="small"
      />

      <Drawer
        onClose={toggleAddDemDevice}
        open={addDemDevice}
        title={intl.formatMessage({
          defaultMessage: 'Create New Dem Device',
        })}
        width="400"
      >
        {addDemDevice ? (
          <AddDemDevice
            onClose={toggleAddDemDevice}
            update={updateDemDeviceList}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setEditData(undefined)}
        open={!!editData}
        title={intl.formatMessage({
          defaultMessage: 'Edit Dem Device Details',
        })}
        width="400"
      >
        {editData ? (
          <AddDemDevice
            editData={editData}
            onClose={() => setEditData(undefined)}
          />
        ) : (
          <div />
        )}
      </Drawer>
      <Drawer
        onClose={() => setAssignToBusiness('')}
        open={assignToBusiness !== ''}
        title={intl.formatMessage({
          defaultMessage: 'Add New Business',
        })}
        width={600}
      >
        {assignToBusiness !== '' && (
          <LinkBusiness
            onClose={() => setAssignToBusiness('')}
            saving={saving}
            update={onAssignedBusiness}
          />
        )}
      </Drawer>
    </div>
  );
};

export default DemDeviceList;
