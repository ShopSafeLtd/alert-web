import { Avatar, Card, Empty, List, Skeleton, Tag, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { StoreColleagueDashboardQuery } from '../../graphql/queries/__generated__/store-colleague-dashboard.generated';

type WatchlistOffender = NonNullable<
  StoreColleagueDashboardQuery['storeColleagueDashboard']['offenderWatchlist']
>[number];

interface OffenderWatchlistProps {
  loading: boolean;
  offenders: WatchlistOffender[] | null | undefined;
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

const OffenderWatchlist: React.FC<OffenderWatchlistProps> = ({
  loading,
  offenders,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <Card
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
          dataSource={offenders}
          renderItem={(offender) => {
            const avatarSrc = getImageUrl(
              offender.images as { [key: string]: unknown }
            );
            return (
              <List.Item
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

export default OffenderWatchlist;
