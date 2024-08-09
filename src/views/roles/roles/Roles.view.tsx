import type { RolesQuery } from '#/views/roles/graphql/queries/__generated__/roles.generated';

import { Button, Card, Col, Row, Table, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';

interface Props {
  data: RolesQuery | undefined;
  fetchPage: (page: number) => void;
  loading: boolean;
}

interface TableData {
  key: string;
  name: string;
  noUsers: number;
  type: string;
}

const RolesView = ({ data, fetchPage, loading }: Props) => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <div className="page-view">
      <Row style={{ marginBottom: 10 }}>
        <Col>
          <Typography.Title level={2} style={{ marginLeft: 10 }}>
            {intl.formatMessage({ defaultMessage: 'Roles' })}
          </Typography.Title>
        </Col>
        <Col flex={1} />
        <Col>
          <Button
            onClick={() => navigate('/app/scheme-settings/roles/create')}
            type="primary"
          >
            {intl.formatMessage({
              defaultMessage: 'Create Role',
            })}
          </Button>
        </Col>
      </Row>
      <Card>
        <Table<TableData>
          columns={[
            {
              dataIndex: 'name',
              key: 'name',
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
            },
            {
              dataIndex: 'type',
              key: 'type',
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
            },
            {
              dataIndex: 'noUsers',
              key: 'noUsers',
              title: intl.formatMessage({
                defaultMessage: 'No. Users',
              }),
            },
          ]}
          dataSource={data?.roles?.edges.map(({ node: role }) => ({
            key: role?.id,
            name: role?.name,
            noUsers: role?.usersCount || 0,
            type:
              // eslint-disable-next-line no-unsafe-optional-chaining
              role?.type?.charAt(0).toUpperCase() +
              // eslint-disable-next-line no-unsafe-optional-chaining
              role?.type?.slice(1).toLowerCase().replaceAll('_', ' '),
          }))}
          loading={loading}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/app/scheme-settings/roles/${record?.key}`);
            },
            style: { cursor: 'pointer' },
          })}
          pagination={{
            hideOnSinglePage: true,
            onChange: (page) => {
              fetchPage(page);
            },
            total: data?.roles?.totalCount,
          }}
        />
      </Card>
    </div>
  );
};

export default RolesView;
