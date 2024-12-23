import { Button, Card, PageHeader, Table } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router';

import type { WorkflowItem } from './types';

import useCreateColumns from './types';

interface Props {
  data: WorkflowItem[];
  loading: boolean;
}

const ListWorkflowView = ({ data, loading }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        extra={[
          <Button key="1" onClick={() => navigate('add')} type="primary">
            <FormattedMessage defaultMessage="Create Workflow" />
          </Button>,
        ]}
        title={<FormattedMessage defaultMessage="Workflow" />}
      />
      <Card
        style={{
          margin: 16,
        }}
      >
        <Table<WorkflowItem>
          columns={useCreateColumns()}
          dataSource={data}
          loading={loading}
          pagination={{
            hideOnSinglePage: true,
          }}
        />
      </Card>
    </div>
  );
};

export default ListWorkflowView;
