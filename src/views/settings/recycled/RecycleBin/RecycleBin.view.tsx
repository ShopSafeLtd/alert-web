import React from 'react';
import { Button, Col, Drawer, Row, Table, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import type {
  DeleteIncidentMutation,
  DeleteOffenderMutation,
  RecycledItemsQuery,
  RestoreIncidentMutation,
  RestoreOffenderMutation,
} from 'graphql/generated';
import type { MutationUpdaterFn } from '@apollo/client';
import moment from 'moment';

import EditIncident from 'components/form-components/recycled/RestoreIncident';
import EditOffender from 'components/form-components/recycled/RestoreOffender';
import type { ColumnsType } from 'antd/es/table/interface';
import { useIntl } from 'react-intl';

interface Props {
  data: RecycledItemsQuery | undefined;
  loading: boolean;
  saving: boolean;
  currentId: string | undefined;
  setCurrentId: (value: string | undefined) => void;
  recycledId: string | undefined;
  setRecycledId: (value: string | undefined) => void;
  restoreIncident: boolean;
  toggleRestoreIncident: () => void;
  updateRestoreIncident: MutationUpdaterFn<RestoreIncidentMutation>;
  updateDeleteIncident: MutationUpdaterFn<DeleteIncidentMutation>;

  restoreOffender: boolean;
  toggleRestoreOffender: () => void;
  toggleRestore: (value: string | undefined) => void;
  updateRestoreOffender: MutationUpdaterFn<RestoreOffenderMutation>;
  updateDeleteOffender: MutationUpdaterFn<DeleteOffenderMutation>;
}

interface ColumnType {
  key: string;
  title: string;
  id: string;
  deletedAt: Date | undefined;
  expiresAt: Date | undefined;
  deletedBy: string;
  type: string | undefined;
}

const RecycleBin = ({
  data,
  loading,
  saving,
  currentId,
  setCurrentId,
  recycledId,
  setRecycledId,
  toggleRestore,
  restoreIncident,
  toggleRestoreIncident,
  updateRestoreIncident,
  updateDeleteIncident,
  restoreOffender,
  toggleRestoreOffender,
  updateRestoreOffender,
  updateDeleteOffender,
}: Props): JSX.Element => {
  const intl = useIntl();
  const columns: ColumnsType<ColumnType> = [
    {
      key: 'type',
      title: 'Type',
      dataIndex: 'type',
      width: 200,
    },
    {
      key: 'title',
      title: 'Title',
      dataIndex: 'title',
      width: 300,
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
    },
    {
      key: 'deletedBy',
      title: 'Deleted By',
      dataIndex: 'deletedBy',
      ellipsis: true,
    },
    {
      key: 'deletedAt',
      title: 'Deleted At',
      dataIndex: 'deletedAt',
      ellipsis: true,
      render: (value: Date | undefined) =>
        moment(value).format('hh:mm DD/MM/YYYY'),
    },
    {
      key: 'expiresAt',
      title: 'Scheduled Deletion',
      dataIndex: 'expiresAt',
      ellipsis: true,
      render: (value: Date | undefined) =>
        moment(value).format('hh:mm DD/MM/YYYY'),
    },
    {
      key: 'restore',
      title: 'Restore',
      dataIndex: 'restore',
      width: 80,
      render: (value, record) => (
        <Button
          disabled={saving}
          onClick={() => {
            setCurrentId(record.key);
            setRecycledId(record.id);
            toggleRestore(record.type);
          }}
          icon={<SyncOutlined />}
          size="small"
        />
      ),
    },
  ];

  return (
    <div className="list-view">
      <Row style={{ margin: 10 }}>
        <Col>
          <Typography.Title level={3}>
            {intl.formatMessage({
              defaultMessage: 'Recycle Bin',
              id: 'Qc/Mx7',
            })}
          </Typography.Title>
          <Typography.Text>
            {intl.formatMessage({
              defaultMessage:
                'Deleted items will be stored here for 30 days, then permanently deleted. Items can be restored at any point before that.',
              id: 'nOsiXy',
            })}
          </Typography.Text>
        </Col>
      </Row>

      <Table<ColumnType>
        size="small"
        style={{ marginRight: 10 }}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={columns}
        dataSource={data?.recycledItems?.map((item) => ({
          id: item?.id || '',
          key: item?.incident?.id || item?.offender?.id || '',
          // eslint-disable-next-line
          type: item?.incident?.__typename || item?.offender?.__typename,
          title: item?.incident?.subject || item?.offender?.name || '',
          deletedAt: item?.deletedAt,
          expiresAt: item?.expiresAt,
          deletedBy: item?.deletedBy
            ? `${item?.deletedBy?.fullName}, ${item?.deletedBy?.businesses[0]?.name}.`
            : 'Automatically Expired',
        }))}
      />
      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Recycled Incident',
          id: 'bcJvHG',
        })}
        visible={restoreIncident}
        width="400"
        onClose={toggleRestoreIncident}
      >
        <EditIncident
          updateRestore={updateRestoreIncident}
          updateDelete={updateDeleteIncident}
          incidentId={currentId}
          recycledId={recycledId}
          onClose={toggleRestoreIncident}
        />
      </Drawer>

      <Drawer
        title={intl.formatMessage({
          defaultMessage: 'Recycled Offender',
          id: 'WxqFHl',
        })}
        visible={restoreOffender}
        width="400"
        onClose={toggleRestoreOffender}
      >
        <EditOffender
          updateRestore={updateRestoreOffender}
          updateDelete={updateDeleteOffender}
          offenderId={currentId}
          recycledId={recycledId}
          onClose={toggleRestoreOffender}
        />
      </Drawer>
    </div>
  );
};

export default RecycleBin;
