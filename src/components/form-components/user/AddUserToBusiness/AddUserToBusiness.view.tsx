/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import { Button, Col, Row, Table, Typography } from 'antd';

import { useIntl } from 'react-intl';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';

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
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
          {
            key: 'status',
            dataIndex: 'status',
            title: intl.formatMessage({
              defaultMessage: 'Status',
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
            {intl.formatMessage({ defaultMessage: 'Cancel' })}
          </Button>
        </Col>
        <Col>
          <Button
            disabled={saving}
            loading={saving}
            type="primary"
            onClick={onSubmit}
          >
            {intl.formatMessage({ defaultMessage: 'Add Users' })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AddUserToBusiness;
