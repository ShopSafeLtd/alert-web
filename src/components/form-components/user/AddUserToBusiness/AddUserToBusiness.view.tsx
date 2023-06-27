/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Button, Col, Row, Table, Typography } from 'antd';
import type { ListSchemeUsersQuery } from 'graphql/generated';
import { useIntl } from 'react-intl';

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
}: Props) => {
  const intl = useIntl();
  return (
    <div>
      <Table
        size="small"
        loading={loading}
        columns={[
          {
            key: 'fullName',
            dataIndex: 'fullName',
            title: intl.formatMessage({ defaultMessage: 'Name', id: 'HAlOn1' }),
          },
          {
            key: 'status',
            dataIndex: 'status',
            title: intl.formatMessage({
              defaultMessage: 'Status',
              id: 'tzMNF3',
            }),
            render: (value) => (
              <Typography.Text
                type={value === 'Enabled' ? 'success' : 'warning'}
              >
                {value}
              </Typography.Text>
            ),
          },
          {
            key: 'business',
            dataIndex: 'business',
            title: intl.formatMessage({
              defaultMessage: 'Business',
              id: 'w1Fanr',
            }),
            render: (value) => <Typography.Text>{value?.name}</Typography.Text>,
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
          <Button onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel', id: '47FYwb' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            onClick={onSubmit}
          >
            {intl.formatMessage({ defaultMessage: 'Add Users', id: 'ShE8aY' })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddUserToBusiness;
