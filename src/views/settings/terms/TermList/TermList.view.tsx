import React from 'react';
import { Card, Table } from 'antd';
import { Link } from 'react-router-dom';

const Terms = (): JSX.Element => (
  <div className="list-view">
    <Card>
      <Table
        size="small"
        pagination={{
          defaultPageSize: 20,
          pageSize: 20,
        }}
        columns={[
          {
            key: 'term',
            title: 'Terms',
            dataIndex: 'term',
            render: (value, record) => (
              <Link to={`/app/scheme-settings/terms/${record.key}`}>
                {value}
              </Link>
            ),
          },
        ]}
        dataSource={[
          {
            key: 'user-terms',
            term: 'User Terms',
          },
          {
            key: 'scheme-terms',
            term: 'Scheme Terms',
          },
        ]}
      />
    </Card>
  </div>
);

export default Terms;
