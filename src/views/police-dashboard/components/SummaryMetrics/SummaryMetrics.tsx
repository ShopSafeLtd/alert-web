import { currencyAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  faChartBar,
  faPoundSign,
  faRedoAlt,
  faShareNodes,
  faUser,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Skeleton, Statistic } from 'antd';
import { useAtomValue } from 'jotai';
import React from 'react';
import { useIntl } from 'react-intl';

import type { PoliceHubDashboardQuery } from '../../graphql/queries/__generated__/police-hub-dashboard.generated';

interface SummaryMetricsProps {
  loading: boolean;
  summary: PoliceHubDashboardQuery['policeHubDashboard']['summary'] | undefined;
}

const SummaryMetrics: React.FC<SummaryMetricsProps> = ({
  loading,
  summary,
}) => {
  const intl = useIntl();
  const currency = useAtomValue(currencyAtom);

  if (loading) {
    return (
      <Card
        style={{ marginBottom: 24 }}
        title={intl.formatMessage({ defaultMessage: 'Key Metrics' })}
      >
        <Row gutter={[16, 16]}>
          {Array.from({ length: 7 }).map((_, index) => (
            <Col key={index} lg={6} md={8} sm={12} xl={3} xs={12}>
              <Skeleton.Input active style={{ width: '100%' }} />
              <Skeleton.Input
                active
                size="small"
                style={{ marginTop: 8, width: '60%' }}
              />
            </Col>
          ))}
        </Row>
      </Card>
    );
  }

  return (
    <Card
      style={{ marginBottom: 24 }}
      title={intl.formatMessage({ defaultMessage: 'Key Metrics' })}
    >
      <Row gutter={[16, 16]}>
        {/* Active Offenders */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            prefix={<FontAwesomeIcon icon={faUser} />}
            title={intl.formatMessage({
              defaultMessage: 'Active Offenders',
            })}
            value={summary?.activeOffendersCount ?? 0}
          />
        </Col>

        {/* Incidents */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            prefix={<FontAwesomeIcon icon={faChartBar} />}
            title={intl.formatMessage({
              defaultMessage: 'Incidents',
            })}
            value={summary?.totalIncidentsSharedCount ?? 0}
          />
        </Col>

        {/* Total Value */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            precision={0}
            prefix={<FontAwesomeIcon icon={faPoundSign} />}
            suffix={currency}
            title={intl.formatMessage({
              defaultMessage: 'Total Value',
            })}
            value={summary?.totalEstimatedValue ?? 0}
          />
        </Col>

        {/* Total Offenders */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            prefix={<FontAwesomeIcon icon={faUsers} />}
            title={intl.formatMessage({
              defaultMessage: 'Total Offenders',
            })}
            value={summary?.totalOffenders ?? 0}
          />
        </Col>

        {/* Average Offender Value */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            precision={0}
            prefix={<FontAwesomeIcon icon={faPoundSign} />}
            suffix={currency}
            title={intl.formatMessage({
              defaultMessage: 'Avg Offender Value',
            })}
            value={summary?.averageOffenderValue ?? 0}
          />
        </Col>

        {/* Total Repeat Offenders */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            prefix={<FontAwesomeIcon icon={faRedoAlt} />}
            title={intl.formatMessage({
              defaultMessage: 'Repeat Offenders',
            })}
            value={summary?.totalRepeatOffenders ?? 0}
          />
        </Col>

        {/* Offenders Shared with Other Police Hubs */}
        <Col lg={6} md={8} sm={12} xl={3} xs={12}>
          <Statistic
            prefix={<FontAwesomeIcon icon={faShareNodes} />}
            title={intl.formatMessage({
              defaultMessage: 'Cross Force Offenders',
            })}
            value={summary?.offendersSharedWithOtherPoliceHubs ?? 0}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default SummaryMetrics;
