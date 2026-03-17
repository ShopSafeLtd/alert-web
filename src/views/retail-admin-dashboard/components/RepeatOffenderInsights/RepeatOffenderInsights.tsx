import { RecidivismDonutChart } from '#/components/dashboard-widgets';
import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { FireOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Col,
  Empty,
  Row,
  Skeleton,
  Statistic,
  Typography,
} from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import type { RetailAdminDashboardQuery } from '../../graphql/queries/__generated__/retail-admin-dashboard.generated';

interface RepeatOffenderInsightsProps {
  insights:
    | RetailAdminDashboardQuery['retailAdminDashboard']['repeatOffenderInsights']
    | null
    | undefined;
  loading: boolean;
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

const RepeatOffenderInsights: React.FC<RepeatOffenderInsightsProps> = ({
  insights,
  loading,
}) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const currency = useAtomValue(currencyAtom);

  const formatLastSeen = (date: Date | null | string | undefined) => {
    if (!date) return '-';
    const days = Math.floor(
      (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (days === 0) return intl.formatMessage({ defaultMessage: 'Today' });
    if (days === 1) return intl.formatMessage({ defaultMessage: '1d ago' });
    return intl.formatMessage({ defaultMessage: '{days}d ago' }, { days });
  };

  return (
    <Card
      style={{ flex: 1 }}
      title={intl.formatMessage({ defaultMessage: 'Repeat Offender Insights' })}
    >
      {loading && !insights ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : insights ? (
        <>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col sm={12} xs={24}>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Repeat Offenders',
                })}
                value={insights.totalRepeatOffenders}
              />
            </Col>
            <Col sm={12} xs={24}>
              <Statistic
                title={intl.formatMessage({
                  defaultMessage: 'Avg Days Between',
                })}
                value={Math.round(insights.averageDaysBetweenIncidents)}
              />
            </Col>
          </Row>

          {insights.recidivismDistribution && (
            <RecidivismDonutChart
              distribution={
                insights.recidivismDistribution as {
                  period0to30?: number;
                  period31to90?: number;
                  period91to180?: number;
                  period180plus?: number;
                }
              }
            />
          )}

          {insights.topByFrequency && insights.topByFrequency.length > 0 && (
            <>
              <Typography.Title
                level={5}
                style={{ marginBottom: 8, marginTop: 16 }}
              >
                {intl.formatMessage({
                  defaultMessage: 'Top 5 Most Frequent Offenders',
                })}
              </Typography.Title>

              {insights.topByFrequency.slice(0, 5).map((offender, index) => {
                const avatarSrc = getImageUrl(
                  offender.images as { [key: string]: unknown }
                );
                const isHighFrequency = offender.incidentCount >= 5;

                return (
                  <div
                    key={offender.id}
                    onClick={() =>
                      navigate(`/app/offenders/view/${offender.id}`)
                    }
                    style={{
                      alignItems: 'center',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: 10,
                      padding: '8px 4px',
                    }}
                  >
                    {/* Rank */}
                    <Typography.Text
                      style={{
                        color: '#bfbfbf',
                        fontSize: 12,
                        minWidth: 20,
                        textAlign: 'center',
                      }}
                    >
                      {index + 1}
                    </Typography.Text>

                    {/* Avatar */}
                    <Avatar
                      icon={avatarSrc ? undefined : <UserOutlined />}
                      size={32}
                      src={avatarSrc}
                      style={{ flexShrink: 0 }}
                    />

                    {/* Name */}
                    <Typography.Text
                      ellipsis
                      strong
                      style={{ flex: 1, fontSize: 13 }}
                    >
                      {offender.name ??
                        intl.formatMessage({ defaultMessage: 'Unknown' })}
                    </Typography.Text>

                    {/* Incidents */}
                    <div style={{ flexShrink: 0, textAlign: 'right' }}>
                      <Typography.Text
                        style={{
                          color: '#bfbfbf',
                          display: 'block',
                          fontSize: 10,
                        }}
                      >
                        {intl.formatMessage({ defaultMessage: 'Incidents' })}
                      </Typography.Text>
                      <Typography.Text
                        style={{
                          color: isHighFrequency ? '#f5222d' : '#595959',
                          fontSize: 12,
                        }}
                      >
                        {isHighFrequency && (
                          <FireOutlined style={{ marginRight: 3 }} />
                        )}
                        {intl.formatMessage(
                          { defaultMessage: '{count}x' },
                          { count: offender.incidentCount }
                        )}
                      </Typography.Text>
                    </div>

                    {/* Value */}
                    {offender.totalValue > 0 && (
                      <div
                        style={{
                          flexShrink: 0,
                          minWidth: 60,
                          textAlign: 'right',
                        }}
                      >
                        <Typography.Text
                          style={{
                            color: '#bfbfbf',
                            display: 'block',
                            fontSize: 10,
                          }}
                        >
                          {intl.formatMessage({ defaultMessage: 'Value' })}
                        </Typography.Text>
                        <Typography.Text
                          style={{ color: '#595959', fontSize: 12 }}
                        >
                          {intl.formatNumber(offender.totalValue, {
                            currency,
                            style: 'currency',
                          })}
                        </Typography.Text>
                      </div>
                    )}

                    {/* Last seen */}
                    <div
                      style={{
                        flexShrink: 0,
                        minWidth: 50,
                        textAlign: 'right',
                      }}
                    >
                      <Typography.Text
                        style={{
                          color: '#bfbfbf',
                          display: 'block',
                          fontSize: 10,
                        }}
                      >
                        {intl.formatMessage({ defaultMessage: 'Last seen' })}
                      </Typography.Text>
                      <Typography.Text
                        style={{ color: '#595959', fontSize: 12 }}
                      >
                        {formatLastSeen(offender.lastIncidentDate)}
                      </Typography.Text>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No repeat offender data',
          })}
        />
      )}
    </Card>
  );
};

export default RepeatOffenderInsights;
