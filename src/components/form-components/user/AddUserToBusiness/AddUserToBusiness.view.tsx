import React from 'react';
import { Button, Col, Row, Table, Typography } from 'antd';
import { ListSchemeUsersQuery } from 'graphql/generated';

interface Props {
  data: ListSchemeUsersQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelectChange: (
    selectedRowKeys: React.Key[],
    selectedRows: {
      key: string;
      fullName: string;
      status: string | null | undefined;
      business: {
        id: string;
        name: string;
      } | null;
    }[]
  ) => void;
  onSubmit: () => void;
  saving: boolean;
}

const AddUserToBusiness = ({
  data,
  loading,
  onSelectChange,
  onClose,
  onSubmit,
  saving,
}: Props) => (
  <div>
    <Table
      size="small"
      loading={loading}
      columns={[
        {
          key: 'fullName',
          dataIndex: 'fullName',
          title: 'Name',
        },
        {
          key: 'status',
          dataIndex: 'status',
          title: 'Status',
          render: (value) => (
            <Typography.Text type={value === 'Enabled' ? 'success' : 'warning'}>
              {value}
            </Typography.Text>
          ),
        },
        {
          key: 'business',
          dataIndex: 'business',
          title: 'Business',
          render: (value) => (
            <Typography.Text>
              {/* eslint-disable-next-line */}
              {value?.name}
            </Typography.Text>
          ),
        },
      ]}
      dataSource={
        data?.users.map((user) => ({
          key: user.id,
          fullName: user.fullName,
          status: user.status,
          business: user.businesses.length > 0 ? user.businesses[0] : null,
        })) || []
      }
      rowSelection={{
        type: 'checkbox',
        onChange: onSelectChange,
      }}
      pagination={false}
    />
    <Row style={{ marginTop: 30 }} justify="end" gutter={16}>
      <Col>
        <Button onClick={onClose}>Cancel</Button>
      </Col>
      <Col>
        <Button
          disabled={saving}
          loading={saving}
          type="primary"
          onClick={onSubmit}
        >
          Add Users
        </Button>
      </Col>
    </Row>
  </div>
);

export default AddUserToBusiness;
