import type { MutationUpdaterFn } from '@apollo/client';
import type { ColumnsType } from 'antd/es/table/interface';
import type { DeleteIncidentMutation } from 'graphql/recycled/mutations/__generated__/delete-incident.generated';
import type { DeleteOffenderMutation } from 'graphql/recycled/mutations/__generated__/delete-offender.generated';
import type { RestoreIncidentMutation } from 'graphql/recycled/mutations/__generated__/restore-incident.generated';
import type { RestoreOffenderMutation } from 'graphql/recycled/mutations/__generated__/restore-offender.generated';
import type { RecycledItemsQuery } from 'graphql/recycled/queries/__generated__/recycled-items.generated';

import { SyncOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Row, Table, Typography } from 'antd';
import EditIncident from 'components/form-components/recycled/RestoreIncident';
import EditOffender from 'components/form-components/recycled/RestoreOffender';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  currentId: string | undefined;
  data: RecycledItemsQuery | undefined;
  loading: boolean;
  recycledId: string | undefined;
  restoreIncident: boolean;
  restoreOffender: boolean;
  saving: boolean;
  setCurrentId: (value: string | undefined) => void;
  setRecycledId: (value: string | undefined) => void;
  toggleRestore: (value: string | undefined) => void;
  toggleRestoreIncident: () => void;

  toggleRestoreOffender: () => void;
  updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation>;
  updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation>;
  updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation>;
  updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation>;
}

interface ColumnType {
  deletedAt: Date | undefined;
  deletedBy: string;
  expiresAt: Date | undefined;
  id: string;
  key: string;
  title: string;
  type: string | undefined;
}

const RecycleBin = ({
  currentId,
  data,
  loading,
  recycledId,
  restoreIncident,
  restoreOffender,
  saving,
  setCurrentId,
  setRecycledId,
  toggleRestore,
  toggleRestoreIncident,
  toggleRestoreOffender,
  updateDeleteIncident,
  updateDeleteOffender,
  updateRestoreIncident,
  updateRestoreOffender,
}: Props): JSX.Element => {
  const intl = useIntl();
  const columns: ColumnsType<ColumnType> = [
    {
      dataIndex: 'type',
      key: 'type',
      title: 'Type',
      width: 200,
    },
    {
      dataIndex: 'title',
      key: 'title',
      render: (value, record) => (
        <Typography.Link
          disabled={saving}
          onClick={() => {
            setCurrentId(record.key);
            setRecycledId(record.id);
            toggleRestore(record.type);
          }}
        >
          {value}
        </Typography.Link>
      ),
      title: 'Title',
      width: 300,
    },
    {
      dataIndex: 'deletedBy',
      ellipsis: true,
      key: 'deletedBy',
      title: 'Deleted By',
    },
    {
      dataIndex: 'deletedAt',
      ellipsis: true,
      key: 'deletedAt',
      render: (value: Date | undefined) =>
        dayjs(value).format('hh:mm DD/MM/YYYY'),
      title: 'Deleted At',
    },
    {
      dataIndex: 'expiresAt',
      ellipsis: true,
      key: 'expiresAt',
      render: (value: Date | undefined) =>
        dayjs(value).format('hh:mm DD/MM/YYYY'),
      title: 'Scheduled Deletion',
    },
    {
      dataIndex: 'restore',
      key: 'restore',
      render: (value, record) => (
        <Button
          disabled={saving}
          icon={<SyncOutlined />}
          onClick={() => {
            setCurrentId(record.key);
            setRecycledId(record.id);
            toggleRestore(record.type);
          }}
          size="small"
        />
      ),
      title: 'Restore',
      width: 80,
    },
  ];

  return (
    <div className="list-view">
      <Row style={{ margin: 10 }}>
        <Col>
          {/* <Typography.Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Recycle Bin',
            })}
          </Typography.Title> */}
          <Typography.Text>
            {intl.formatMessage({
              defaultMessage:
                'Deleted items will be stored here for 30 days, then permanently deleted. Items can be restored at any point before that.',
            })}
          </Typography.Text>
        </Col>
      </Row>

      <Table<ColumnType>
        columns={columns}
        dataSource={data?.recycledItems?.map((item) => ({
          deletedAt: item?.deletedAt,
          deletedBy: item?.deletedBy
            ? `${item?.deletedBy?.fullName}, ${item?.deletedBy?.businesses[0]?.name}.`
            : 'Automatically Expired',
          expiresAt: item?.expiresAt,
          id: item?.id || '',
          key: item?.incident?.id || item?.offender?.id || '',
          title: item?.incident?.subject || item?.offender?.name || '',
          // eslint-disable-next-line
          type: item?.incident?.__typename || item?.offender?.__typename,
        }))}
        loading={loading}
        pagination={{
          defaultPageSize: 20,
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
        style={{ marginRight: 10 }}
      />
      <Drawer
        onClose={toggleRestoreIncident}
        open={restoreIncident}
        title={intl.formatMessage({
          defaultMessage: 'Recycled Incident',
        })}
        width="400"
      >
        <EditIncident
          incidentId={currentId}
          onClose={toggleRestoreIncident}
          recycledId={recycledId}
          updateDelete={updateDeleteIncident}
          updateRestore={updateRestoreIncident}
        />
      </Drawer>

      <Drawer
        onClose={toggleRestoreOffender}
        open={restoreOffender}
        title={intl.formatMessage({
          defaultMessage: 'Recycled Offender',
        })}
        width="400"
      >
        <EditOffender
          offenderId={currentId}
          onClose={toggleRestoreOffender}
          recycledId={recycledId}
          updateDelete={updateDeleteOffender}
          updateRestore={updateRestoreOffender}
        />
      </Drawer>
    </div>
  );
};

export default RecycleBin;
