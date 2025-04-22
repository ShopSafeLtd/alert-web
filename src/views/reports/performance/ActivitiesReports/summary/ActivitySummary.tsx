import type { FilterProps } from '#/views/reports/performance/layout/PerformanceReportLayout';

import { useActivitySummaryQuery } from '#/views/reports/performance/ActivitiesReports/summary/graphql/queries/__generated__/activity-summary.generated';
import useStyles from '#/views/reports/styles/report.styles';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Statistic, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  editMode: boolean;
  filters: FilterProps;
  removeItem: (arg0: string) => void;
}

const { Title } = Typography;

const ActivitySummary = ({ editMode, filters, removeItem }: Props) => {
  const intl = useIntl();
  const classes = useStyles();
  const { data, loading } = useActivitySummaryQuery({
    variables: {
      where: {
        createdAt: filters.dateRange,
        groupIds: filters.selectedGroups || [],
        roles: filters.selectedRoles || [],
        schemeIds: filters.schemeId ? [filters.schemeId] : [],
      },
    },
  });
  return (
    <div>
      <Button
        className="cancelDrag card-remove no-print"
        hidden={!editMode}
        icon={<FontAwesomeIcon color="red" icon={faTrash} size="lg" />}
        onClick={() => removeItem('activitySummary')}
        shape="circle"
        size="small"
        type="text"
      />

      <Row>
        <Col span={12}>
          <Title level={4}>
            {intl.formatMessage({
              defaultMessage: 'Activity Summary',
            })}
          </Title>
        </Col>
        <Row className="stats-row">
          <Statistic
            className={classes.stats}
            loading={loading}
            title={intl.formatMessage({
              defaultMessage: 'Total',
            })}
            value={data?.activitySummary?.total || 0}
          />

          <Statistic
            className={classes.stats}
            loading={loading}
            title={intl.formatMessage({
              defaultMessage: 'Completed',
            })}
            value={data?.activitySummary?.completed || 0}
          />

          <Statistic
            className={classes.stats}
            loading={loading}
            title={intl.formatMessage({
              defaultMessage: 'Overdue',
            })}
            value={data?.activitySummary?.overdue || 0}
          />

          <Statistic
            className={classes.stats}
            loading={loading}
            suffix="%"
            title={intl.formatMessage({
              defaultMessage: 'Percent Complete',
            })}
            value={data?.activitySummary?.percentComplete || 0}
          />
        </Row>
      </Row>
    </div>
  );
};

export default ActivitySummary;
