import React from 'react';
import { Button, Card, PageHeader, Table } from 'antd';
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
        title={<FormattedMessage defaultMessage="Workflow" id="pv1lF7" />}
        extra={[
          <Button type="primary" key="1" onClick={() => navigate('add')}>
            <FormattedMessage defaultMessage="Create Workflow" id="GBCpm7" />
          </Button>,
        ]}
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
