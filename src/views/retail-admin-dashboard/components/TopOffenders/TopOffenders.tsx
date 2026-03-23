import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { Avatar, Card, Empty, Skeleton } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

type Offender = NonNullable<
  RetailAdminDashboardQuery['retailAdminDashboard']['topOffenders']
>[number];

interface TopOffendersProps {
  loading: boolean;
  offenders: Offender[];
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

const RANK_STYLES: Record<number, { background: string; color: string }> = {
  1: { background: '#FFD700', color: '#7a5800' },
  2: { background: '#C0C0C0', color: '#555' },
  3: { background: '#CD7F32', color: '#fff' },
};

const DEFAULT_RANK_STYLE = { background: '#f0f0f0', color: '#8c8c8c' };

const TopOffenders: React.FC<TopOffendersProps> = ({ loading, offenders }) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const maxIncidents = Math.max(
    ...offenders.map((o) => o.incidentCount ?? 0),
    1
  );

  return (
    <Card
      style={{ flex: 1 }}
      title={intl.formatMessage({ defaultMessage: 'Top Offenders' })}
    >
      {loading && offenders.length === 0 ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : offenders.length === 0 ? (
        <Empty
          description={intl.formatMessage({ defaultMessage: 'No offenders' })}
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gap: 8,
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          }}
        >
          {offenders.map((offender, index) => {
            const rank = index + 1;
            const rankStyle = RANK_STYLES[rank] ?? DEFAULT_RANK_STYLE;
            const avatarSrc = getImageUrl(
              offender.images as { [key: string]: unknown }
            );
            const barWidth = Math.min(
              ((offender.incidentCount ?? 0) / maxIncidents) * 100,
              100
            );

            return (
              <div
                key={offender.id}
                onClick={() => navigate(`/app/offenders/view/${offender.id}`)}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.30)';
                  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.30)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.boxShadow = 'none';
                }}
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 10,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  padding: '12px',
                  position: 'relative',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                }}
              >
                {/* Rank badge */}
                <div
                  style={{
                    alignItems: 'center',
                    background: rankStyle.background,
                    borderRadius: '50%',
                    color: rankStyle.color,
                    display: 'flex',
                    fontSize: 11,
                    fontWeight: 700,
                    height: 22,
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    width: 22,
                  }}
                >
                  {rank}
                </div>

                {/* Avatar + name */}
                <div style={{ alignItems: 'center', display: 'flex', gap: 8 }}>
                  <Avatar size={52} src={avatarSrc}>
                    {!avatarSrc &&
                      (offender.name?.[0] ??
                        intl.formatMessage({ defaultMessage: '?' }))}
                  </Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {offender.name ??
                        intl.formatMessage({ defaultMessage: 'Unknown' })}
                    </div>
                    {offender.lastIncidentDate && (
                      <div style={{ color: '#8c8c8c', fontSize: 11 }}>
                        {intl.formatMessage(
                          { defaultMessage: 'Last seen {date}' },
                          {
                            date: intl.formatDate(offender.lastIncidentDate, {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }),
                          }
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: 2,
                    height: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      background: '#ff4d4f',
                      borderRadius: 2,
                      height: '100%',
                      width: `${barWidth}%`,
                    }}
                  />
                </div>

                {/* Incidents + value */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 6,
                      flex: 1,
                      padding: '4px 8px',
                    }}
                  >
                    <div style={{ color: '#8c8c8c', fontSize: 10 }}>
                      {intl.formatMessage({ defaultMessage: 'Incidents' })}
                    </div>
                    <div
                      style={{
                        color: '#ff4d4f',
                        fontSize: 14,
                        fontWeight: 700,
                      }}
                    >
                      {offender.incidentCount ?? 0}
                    </div>
                  </div>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      borderRadius: 6,
                      flex: 1,
                      padding: '4px 8px',
                    }}
                  >
                    <div style={{ color: '#8c8c8c', fontSize: 10 }}>
                      {intl.formatMessage({ defaultMessage: 'Total Value' })}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>
                      {intl.formatNumber(offender.totalValue ?? 0, {
                        currency,
                        style: 'currency',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default TopOffenders;
