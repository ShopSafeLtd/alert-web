/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { Button, Col, Row, Table, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListSchemeUsersQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelectChange: (
    selectedRowKeys: React.Key[],
    selectedRows: {
      business: {
        id: string;
        name: string;
      } | null;
      fullName: string;
      key: string;
      status: null | string | undefined;
    }[]
  ) => void;
  onSubmit: () => void;
  saving: boolean;
}

const AddUserToBusiness = ({
  data,
  loading,
  onClose,
  onSelectChange,
  onSubmit,
  saving,
}: Props) => {
  const intl = useIntl();
  return (
    <div>
      <Table
        columns={[
          {
            dataIndex: 'fullName',
            key: 'fullName',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
          {
            dataIndex: 'status',
            key: 'status',
            render: (value) => (
              <Typography.Text
                type={value === 'Enabled' ? 'success' : 'warning'}
              >
                {value}
              </Typography.Text>
            ),
            title: intl.formatMessage({
              defaultMessage: 'Status',
            }),
          },
          {
            dataIndex: 'business',
            key: 'business',
            render: (value) => <Typography.Text>{value?.name}</Typography.Text>,
            title: intl.formatMessage({
              defaultMessage: 'Business',
            }),
          },
        ]}
        dataSource={
          data?.users.map((user) => ({
            business: user.businesses.length > 0 ? user.businesses[0] : null,
            fullName: user.fullName,
            key: user.id,
            status: user.status,
          })) || []
        }
        loading={loading}
        pagination={false}
        rowSelection={{
          onChange: onSelectChange,
          type: 'checkbox',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ marginTop: 30 }}>
        <Col>
          <Button onClick={onClose}>
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            onClick={onSubmit}
            type="primary"
          >
            {intl.formatMessage({ defaultMessage: 'Add Users' })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddUserToBusiness;
