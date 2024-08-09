import type { ListDemUsersQuery } from 'graphql/dem/queries/__generated__/list-users.generated';

import { Button, Col, Row, Table } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  data: ListDemUsersQuery | undefined;
  loading: boolean;
  onClose: () => void;
  onSelect: (item: { key: string }) => void;
  onSubmit: () => void;
  saving: boolean;
}

const LinkDemUser = ({
  data,
  loading,
  onClose,
  onSelect,
  onSubmit,
  saving,
}: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <div className="add-existing-offender">
      <Table
        columns={[
          {
            dataIndex: 'name',
            key: 'name',
            title: intl.formatMessage({ defaultMessage: 'Name' }),
          },
          {
            dataIndex: 'email',
            key: 'email',
            title: intl.formatMessage({
              defaultMessage: 'Email',
            }),
          },
        ]}
        dataSource={data?.listDemUsers?.demUsers?.map((user) => ({
          email: user.email || '',
          id: user.id || '',
          key: user.id || '',

          name: user.name || '',
        }))}
        loading={loading}
        pagination={{
          hideOnSinglePage: true,
          pageSize: 24,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: data?.listDemUsers?.total,
        }}
        rowSelection={{
          onSelect,
          type: 'radio',
        }}
        size="small"
      />
      <Row gutter={16} justify="end" style={{ paddingBottom: 30 }}>
        <Col>
          <Button disabled={saving} onClick={onClose} type="text">
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
            {intl.formatMessage({
              defaultMessage: 'Link DEM User',
            })}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default LinkDemUser;
