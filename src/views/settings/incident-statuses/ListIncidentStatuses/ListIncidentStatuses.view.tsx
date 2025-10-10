import type { ListIncidentStatusesQuery } from 'graphql/incidents/queries/__generated__/list-incident-statuses.generated';

import { faEdit, faPlus, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Drawer, Popconfirm, Row, Table, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import CreateEditIncidentStatus from '../CreateEditIncidentStatus';

interface TableData {
  description: null | string | undefined;
  key: string;
  name: string;
  tooltip: null | string | undefined;
}

interface Props {
  createDrawerOpen: boolean;
  data: ListIncidentStatusesQuery | undefined;
  editDrawerOpen: boolean;
  loading: boolean;
  onCloseCreateDrawer: () => void;
  onCloseEditDrawer: () => void;
  onDelete: (id: string) => Promise<void>;
  onOpenCreateDrawer: () => void;
  onOpenEditDrawer: (status: TableData) => void;
  selectedStatus: TableData | null;
}

const ListIncidentStatuses = ({
  createDrawerOpen,
  data,
  editDrawerOpen,
  loading,
  onCloseCreateDrawer,
  onCloseEditDrawer,
  onDelete,
  onOpenCreateDrawer,
  onOpenEditDrawer,
  selectedStatus,
}: Props) => {
  const intl = useIntl();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '24px',
      }}
    >
      <Row align="middle" gutter={16} style={{ marginBottom: 24 }}>
        <Col flex={1}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            {intl.formatMessage({ defaultMessage: 'Incident Statuses' })}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }} type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Manage the available statuses for incidents in your system.',
            })}
          </Typography.Paragraph>
        </Col>
        <Col>
          <Button
            icon={
              <FontAwesomeIcon
                icon={faPlus}
                size="lg"
                style={{ marginRight: 5 }}
              />
            }
            onClick={onOpenCreateDrawer}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Create Status' })}
          </Button>
        </Col>
      </Row>

      <Table<TableData>
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({
              defaultMessage: 'Name',
            }),
            width: '30%',
          },
          {
            dataIndex: 'tooltip',
            key: 'tooltip',
            render: (value: null | string | undefined) => value || '-',
            title: intl.formatMessage({
              defaultMessage: 'Tooltip',
            }),
            width: '25%',
          },
          {
            dataIndex: 'description',
            key: 'description',
            render: (value: null | string | undefined) => value || '-',
            title: intl.formatMessage({
              defaultMessage: 'Description',
            }),
            width: '30%',
          },
          {
            key: 'actions',
            render: (_: unknown, record: TableData) => (
              <Row gutter={8}>
                <Col>
                  <Button
                    icon={<FontAwesomeIcon icon={faEdit} />}
                    onClick={() => onOpenEditDrawer(record)}
                    size="small"
                    type="text"
                  />
                </Col>
                <Col>
                  <Popconfirm
                    cancelText={intl.formatMessage({
                      defaultMessage: 'Cancel',
                    })}
                    okText={intl.formatMessage({ defaultMessage: 'Delete' })}
                    onConfirm={() => {
                      void onDelete(record.key);
                    }}
                    title={intl.formatMessage({
                      defaultMessage:
                        'Are you sure you want to delete this status?',
                    })}
                  >
                    <Button
                      danger
                      icon={<FontAwesomeIcon icon={faTrash} />}
                      size="small"
                      type="text"
                    />
                  </Popconfirm>
                </Col>
              </Row>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Actions',
            }),
            width: '15%',
          },
        ]}
        dataSource={data?.incidentStatuses.map((status) => ({
          description: status.description,
          key: status.id,
          name: status.name,
          tooltip: status.tooltip,
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 20,
        }}
        size="small"
      />

      <Drawer
        onClose={onCloseCreateDrawer}
        open={createDrawerOpen}
        title={intl.formatMessage({ defaultMessage: 'Create Incident Status' })}
        width={600}
      >
        <CreateEditIncidentStatus
          onCancel={onCloseCreateDrawer}
          onSuccess={onCloseCreateDrawer}
        />
      </Drawer>

      <Drawer
        onClose={onCloseEditDrawer}
        open={editDrawerOpen}
        title={intl.formatMessage({ defaultMessage: 'Edit Incident Status' })}
        width={600}
      >
        {selectedStatus && (
          <CreateEditIncidentStatus
            id={selectedStatus.key}
            initData={{
              description: selectedStatus.description || undefined,
              name: selectedStatus.name,
            }}
            onCancel={onCloseEditDrawer}
            onSuccess={onCloseEditDrawer}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListIncidentStatuses;
