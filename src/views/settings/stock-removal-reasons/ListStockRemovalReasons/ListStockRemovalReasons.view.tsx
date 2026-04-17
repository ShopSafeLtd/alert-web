import { faEdit } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Col,
  Drawer,
  Popconfirm,
  Row,
  Switch,
  Table,
  Typography,
} from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { ReasonTableRow } from './useListStockRemovalReasons';

import CreateEditStockRemovalReason from '../CreateEditStockRemovalReason';

interface Props {
  createDrawerOpen: boolean;
  editDrawerOpen: boolean;
  loading: boolean;
  onCloseCreateDrawer: () => void;
  onCloseEditDrawer: () => void;
  onDelete: (id: string) => void;
  onOpenCreateDrawer: () => void;
  onOpenEditDrawer: (reason: ReasonTableRow) => void;
  reasons: ReasonTableRow[];
  selectedReason: ReasonTableRow | null;
}

const ListStockRemovalReasons = ({
  createDrawerOpen,
  editDrawerOpen,
  loading,
  onCloseCreateDrawer,
  onCloseEditDrawer,
  onDelete,
  onOpenCreateDrawer,
  onOpenEditDrawer,
  reasons,
  selectedReason,
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
            {intl.formatMessage({ defaultMessage: 'Stock Removal Reasons' })}
          </Typography.Title>
          <Typography.Paragraph style={{ marginBottom: 0 }} type="secondary">
            {intl.formatMessage({
              defaultMessage:
                'Manage the reasons available when creating stock removal requests.',
            })}
          </Typography.Paragraph>
        </Col>
        <Col>
          <Button onClick={onOpenCreateDrawer} type="primary">
            {intl.formatMessage({ defaultMessage: 'Add Reason' })}
          </Button>
        </Col>
      </Row>

      <Table
        columns={[
          {
            dataIndex: 'position',
            sorter: (a, b) => a.position - b.position,
            title: intl.formatMessage({ defaultMessage: '#' }),
            width: 60,
          },
          {
            dataIndex: 'label',
            title: intl.formatMessage({ defaultMessage: 'Label' }),
          },
          {
            dataIndex: 'active',
            render: (active: boolean) => (
              <Switch checked={active} disabled size="small" />
            ),
            title: intl.formatMessage({ defaultMessage: 'Active' }),
            width: 80,
          },
          {
            key: 'actions',
            render: (_, record) => (
              <Row gutter={8} wrap={false}>
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
                    okText={intl.formatMessage({
                      defaultMessage: 'Deactivate',
                    })}
                    onConfirm={() => onDelete(record.id)}
                    title={intl.formatMessage({
                      defaultMessage:
                        'This will deactivate the reason and hide it from new requests.',
                    })}
                  >
                    <Button danger size="small" type="text">
                      {intl.formatMessage({ defaultMessage: 'Deactivate' })}
                    </Button>
                  </Popconfirm>
                </Col>
              </Row>
            ),
            title: intl.formatMessage({ defaultMessage: 'Actions' }),
            width: 160,
          },
        ]}
        dataSource={reasons.map((r) => ({ ...r, key: r.id }))}
        loading={loading}
        pagination={false}
        rowKey="id"
      />

      <Drawer
        onClose={onCloseCreateDrawer}
        open={createDrawerOpen}
        title={intl.formatMessage({ defaultMessage: 'Add Reason' })}
        width={400}
      >
        <CreateEditStockRemovalReason
          onCancel={onCloseCreateDrawer}
          onSuccess={onCloseCreateDrawer}
        />
      </Drawer>

      <Drawer
        onClose={onCloseEditDrawer}
        open={editDrawerOpen}
        title={intl.formatMessage({ defaultMessage: 'Edit Reason' })}
        width={400}
      >
        {selectedReason && (
          <CreateEditStockRemovalReason
            id={selectedReason.id}
            initData={{
              active: selectedReason.active,
              label: selectedReason.label,
              position: selectedReason.position,
            }}
            onCancel={onCloseEditDrawer}
            onSuccess={onCloseEditDrawer}
          />
        )}
      </Drawer>
    </div>
  );
};

export default ListStockRemovalReasons;
