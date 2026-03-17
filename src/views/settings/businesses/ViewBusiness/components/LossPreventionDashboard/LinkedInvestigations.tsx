import { Card, Empty, Skeleton, Table, Tag, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

type Investigation = NonNullable<
  BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['linkedInvestigations']
>[number];

interface LinkedInvestigationsProps {
  investigations: Investigation[] | null | undefined;
  loading: boolean;
}

const getStatusColor = (status: null | string | undefined): string => {
  switch (status?.toLowerCase()) {
    case 'open': {
      return 'blue';
    }
    case 'closed': {
      return 'default';
    }
    case 'pending': {
      return 'orange';
    }
    case 'resolved': {
      return 'green';
    }
    default: {
      return 'default';
    }
  }
};

const LinkedInvestigations: React.FC<LinkedInvestigationsProps> = ({
  investigations,
  loading,
}) => {
  const intl = useIntl();

  const columns = [
    {
      dataIndex: 'reference',
      key: 'reference',
      render: (ref: null | string) => (
        <Typography.Text code>
          {ref ?? intl.formatMessage({ defaultMessage: '—' })}
        </Typography.Text>
      ),
      title: intl.formatMessage({ defaultMessage: 'Ref' }),
      width: 80,
    },
    {
      dataIndex: 'name',
      key: 'name',
      render: (name: null | string, record: Investigation) => (
        <Link to={`/app/investigations/view/${record.id}`}>
          {name ?? intl.formatMessage({ defaultMessage: 'Unnamed' })}
        </Link>
      ),
      title: intl.formatMessage({ defaultMessage: 'Name' }),
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (status: null | string) => (
        <Tag color={getStatusColor(status)}>
          {status ?? intl.formatMessage({ defaultMessage: '—' })}
        </Tag>
      ),
      title: intl.formatMessage({ defaultMessage: 'Status' }),
      width: 100,
    },
    {
      dataIndex: 'incidentCount',
      key: 'incidentCount',
      title: intl.formatMessage({ defaultMessage: 'Incidents' }),
      width: 80,
    },
  ];

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Linked Investigations' })}
    >
      {loading && !investigations ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : !investigations || investigations.length === 0 ? (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No linked investigations',
          })}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={investigations}
          pagination={false}
          rowKey="id"
          size="small"
        />
      )}
    </Card>
  );
};

export default LinkedInvestigations;
