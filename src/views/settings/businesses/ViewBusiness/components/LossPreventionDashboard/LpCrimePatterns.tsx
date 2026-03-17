import {
  PeakHoursBarChart,
  StolenGoodsList,
} from '#/components/dashboard-widgets';
import { Card, Col, Empty, Row, Skeleton, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { BusinessLossPreventionDashboardQuery } from '../../graphql/queries/__generated__/business-loss-prevention-dashboard.generated';

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface LpCrimePatternsProps {
  data:
    | BusinessLossPreventionDashboardQuery['businessLossPreventionDashboard']['crimePatterns']
    | null
    | undefined;
  loading: boolean;
}

const LpCrimePatterns: React.FC<LpCrimePatternsProps> = ({ data, loading }) => {
  const intl = useIntl();

  return (
    <Card
      style={{ height: '100%' }}
      title={intl.formatMessage({ defaultMessage: 'Crime Patterns' })}
    >
      {loading && !data ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : data ? (
        <>
          {data.peakDay !== null && data.peakDay !== undefined && (
            <Typography.Paragraph>
              <Typography.Text strong>
                {intl.formatMessage({ defaultMessage: 'Peak day: ' })}
              </Typography.Text>
              {DAYS[data.peakDay] ?? String(data.peakDay)}
            </Typography.Paragraph>
          )}
          <Row gutter={[16, 16]}>
            <Col md={14} xs={24}>
              <Typography.Title level={5}>
                {intl.formatMessage({ defaultMessage: 'Incidents by Hour' })}
              </Typography.Title>
              <PeakHoursBarChart data={data.peakHours} />
            </Col>
            <Col md={10} xs={24}>
              <Typography.Title level={5}>
                {intl.formatMessage({ defaultMessage: 'Top Stolen Goods' })}
              </Typography.Title>
              <StolenGoodsList data={data.topStolenGoods} />
            </Col>
          </Row>
        </>
      ) : (
        <Empty
          description={intl.formatMessage({
            defaultMessage: 'No crime pattern data available',
          })}
        />
      )}
    </Card>
  );
};

export default LpCrimePatterns;
