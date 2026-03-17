import { BanCountdown } from '#/components/dashboard-widgets';
import { Card, Empty, List, Skeleton, Tabs, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

type BanItem = NonNullable<
  BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['activeBans']
>['expiringWithin30Days'][number];

interface LpActiveBansProps {
  bans:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['activeBans']
    | null
    | undefined;
  loading: boolean;
}

const BanList: React.FC<{ items: BanItem[] }> = ({ items }) => {
  const intl = useIntl();

  if (items.length === 0) {
    return (
      <Empty
        description={intl.formatMessage({
          defaultMessage: 'No bans in this category',
        })}
      />
    );
  }

  return (
    <List
      dataSource={items}
      renderItem={(ban) => (
        <List.Item extra={<BanCountdown daysRemaining={ban.daysRemaining} />}>
          <List.Item.Meta
            description={
              ban.location ? (
                <Typography.Text style={{ fontSize: 12 }} type="secondary">
                  {ban.location}
                </Typography.Text>
              ) : undefined
            }
            title={
              ban.offenderName ??
              intl.formatMessage({ defaultMessage: 'Unknown offender' })
            }
          />
        </List.Item>
      )}
      size="small"
    />
  );
};

const LpActiveBans: React.FC<LpActiveBansProps> = ({ bans, loading }) => {
  const intl = useIntl();

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Active Bans' })}
    >
      {loading && !bans ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : bans ? (
        <Tabs
          items={[
            {
              children: <BanList items={bans.expiringWithin30Days} />,
              key: 'expiring',
              label: intl.formatMessage({ defaultMessage: 'Expiring Soon' }),
            },
            {
              children: <BanList items={bans.longerTerm} />,
              key: 'active',
              label: intl.formatMessage({ defaultMessage: 'Active' }),
            },
          ]}
        />
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No ban data available',
          })}
        />
      )}
    </Card>
  );
};

export default LpActiveBans;
