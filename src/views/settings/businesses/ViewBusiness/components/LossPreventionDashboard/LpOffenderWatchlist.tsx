import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  Avatar,
  Card,
  Empty,
  List,
  Segmented,
  Skeleton,
  Tag,
  Typography,
} from 'antd';
import { BusinessLPWatchlistOrderBy } from 'graphql/types';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

type WatchlistOffender = NonNullable<
  BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['offenderWatchlist']
>[number];

interface LpOffenderWatchlistProps {
  loading: boolean;
  offenders: WatchlistOffender[] | null | undefined;
  onOrderByChange: (value: BusinessLPWatchlistOrderBy | undefined) => void;
  orderBy: BusinessLPWatchlistOrderBy | undefined;
}

const getImageUrl = (images: {
  [key: string]: unknown;
}): string | undefined => {
  if (!images || typeof images !== 'object') return undefined;
  const arr = Object.values(images) as Array<{
    card?: string;
    primary?: boolean;
    url?: string;
  }>;
  const primary = arr.find((img) => img?.primary);
  const img = primary ?? arr[0];
  return img?.card ?? img?.url;
};

const LpOffenderWatchlist: React.FC<LpOffenderWatchlistProps> = ({
  loading,
  offenders,
  onOrderByChange,
  orderBy,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const sortOptions = [
    {
      label: intl.formatMessage({ defaultMessage: 'Incidents' }),
      value: BusinessLPWatchlistOrderBy.IncidentCount,
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Value' }),
      value: BusinessLPWatchlistOrderBy.TotalValue,
    },
  ];

  return (
    <Card
      extra={
        <Segmented
          onChange={(value) =>
            onOrderByChange(value as BusinessLPWatchlistOrderBy)
          }
          options={sortOptions}
          size="small"
          value={orderBy ?? BusinessLPWatchlistOrderBy.IncidentCount}
        />
      }
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Offender Watchlist' })}
    >
      {loading && !offenders ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : !offenders || offenders.length === 0 ? (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No offenders on watchlist',
          })}
        />
      ) : (
        <List
          dataSource={offenders.slice(0, 10)}
          renderItem={(offender) => {
            const avatarSrc = getImageUrl(
              offender.images as { [key: string]: unknown }
            );
            return (
              <List.Item
                extra={
                  offender.totalValue !== null &&
                  offender.totalValue !== undefined ? (
                    <Typography.Text type="secondary">
                      {intl.formatNumber(offender.totalValue, {
                        currency,
                        style: 'currency',
                      })}
                    </Typography.Text>
                  ) : undefined
                }
                onClick={() => navigate(`/app/offenders/view/${offender.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar size={40} src={avatarSrc}>
                      {!avatarSrc &&
                        (offender.name?.[0] ??
                          intl.formatMessage({ defaultMessage: '?' }))}
                    </Avatar>
                  }
                  description={
                    <Typography.Text style={{ fontSize: 12 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: '{count} incidents' },
                        { count: offender.incidentCount }
                      )}
                    </Typography.Text>
                  }
                  title={
                    <span>
                      {offender.name ??
                        intl.formatMessage({ defaultMessage: 'Unknown' })}
                      {offender.isCurrentlyBanned && (
                        <Tag
                          color="red"
                          style={{ fontSize: 11, marginLeft: 8 }}
                        >
                          {intl.formatMessage({ defaultMessage: 'BANNED' })}
                        </Tag>
                      )}
                    </span>
                  }
                />
              </List.Item>
            );
          }}
          size="small"
          style={{ maxHeight: 480, overflowY: 'auto' }}
        />
      )}
    </Card>
  );
};

export default LpOffenderWatchlist;
