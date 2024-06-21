import React from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import type { RolesQuery } from '#/views/roles/graphql/queries/roles.generated';

interface Props {
  data: RolesQuery | undefined;
  loading: boolean;
  fetchPage: (page: number) => void;
}

interface TableData {
  key: string;
  name: string;
  type: string;
  noUsers: number;
}

const RolesView = ({ data, loading, fetchPage }: Props) => {
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
            type="primary"
            onClick={() => navigate('/app/scheme-settings/roles/create')}
          >
            {intl.formatMessage({
              defaultMessage: 'Create Role',
            })}
          </Button>
        </Col>
      </Row>
      <Card>
        <Table<TableData>
          loading={loading}
          dataSource={data?.roles?.edges.map(({ node: role }) => ({
            key: role?.id,
            name: role?.name,
            type:
              // eslint-disable-next-line no-unsafe-optional-chaining
              role?.type?.charAt(0).toUpperCase() +
              // eslint-disable-next-line no-unsafe-optional-chaining
              role?.type?.slice(1).toLowerCase().replaceAll('_', ' '),
            noUsers: role?.usersCount || 0,
          }))}
          pagination={{
            hideOnSinglePage: true,
            total: data?.roles?.totalCount,
            onChange: (page) => {
              fetchPage(page);
            },
          }}
          onRow={(record) => ({
            onClick: () => {
              navigate(`/app/scheme-settings/roles/${record?.key}`);
            },
            style: { cursor: 'pointer' },
          })}
          columns={[
            {
              title: intl.formatMessage({
                defaultMessage: 'Name',
              }),
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'Type',
              }),
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: intl.formatMessage({
                defaultMessage: 'No. Users',
              }),
              dataIndex: 'noUsers',
              key: 'noUsers',
            },
          ]}
        />
      </Card>
    </div>
  );
};

export default RolesView;
