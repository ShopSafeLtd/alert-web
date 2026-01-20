import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Radio, Space, Typography } from 'antd';
import { subDays, subMonths, subYears } from 'date-fns';
import moment from 'moment';
import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

import type { DateRange } from '../usePoliceHeatmap';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

interface Props {
  dateRange: DateRange;
  onChangeDateRange: (value: DateRange) => void;
  onClose: () => void;
  totalCount: number;
}

interface Theme {
  primary: string;
  secondaryText: string;
}

const useStyles = createUseStyles((theme: Theme) => ({
  countBadge: {
    backgroundColor: theme.primary,
    borderRadius: 12,
    color: '#fff',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 600,
    marginLeft: 8,
    padding: '2px 12px',
  },
  filterHeader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterPanel: {
    '@media (max-width: 768px)': {
      borderRadius: '16px 16px 0 0',
      bottom: 0,
      left: 0,
      maxHeight: '70vh',
      right: 0,
      top: 'auto',
      width: '100%',
    },
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    left: 20,
    maxHeight: 'calc(100vh - 40px)',
    overflow: 'auto',
    position: 'absolute',
    top: 20,
    width: 400,
    zIndex: 10,
  },
  filterSection: {
    marginBottom: 24,
  },
  priorityLabel: {
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 8,
  },
  sliderLabels: {
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 12,
    justifyContent: 'space-between',
    marginTop: 4,
  },
}));

enum DatePreset {
  ALL_TIME = 'all_time',
  CUSTOM = 'custom',
  LAST_3_MONTHS = 'last_3_months',
  LAST_6_MONTHS = 'last_6_months',
  LAST_12_MONTHS = 'last_12_months',
  LAST_30_DAYS = 'last_30_days',
}

const PoliceHeatmapFilters: React.FC<Props> = ({
  dateRange,
  onChangeDateRange,
  onClose,
  totalCount,
}) => {
  const intl = useIntl();
  const classes = useStyles();

  // Determine current preset
  const currentPreset = useMemo(() => {
    if (!dateRange) return DatePreset.ALL_TIME;
    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const threeMonthsAgo = subMonths(now, 3);
    const sixMonthsAgo = subMonths(now, 6);
    const twelveMonthsAgo = subMonths(now, 12);
    const tenYearsAgo = subYears(now, 10);

    // Check if it's within a day (to account for time differences)
    const isWithinDay = (date1: Date, date2: Date) =>
      Math.abs(date1.getTime() - date2.getTime()) < 24 * 60 * 60 * 1000;

    const isLast30Days =
      isWithinDay(dateRange.startDate, thirtyDaysAgo) &&
      isWithinDay(dateRange.endDate, now);

    const isLast3Months =
      isWithinDay(dateRange.startDate, threeMonthsAgo) &&
      isWithinDay(dateRange.endDate, now);

    const isLast6Months =
      isWithinDay(dateRange.startDate, sixMonthsAgo) &&
      isWithinDay(dateRange.endDate, now);

    const isLast12Months =
      isWithinDay(dateRange.startDate, twelveMonthsAgo) &&
      isWithinDay(dateRange.endDate, now);

    const isAllTime =
      isWithinDay(dateRange.startDate, tenYearsAgo) &&
      isWithinDay(dateRange.endDate, now);

    if (isLast30Days) return DatePreset.LAST_30_DAYS;
    if (isLast3Months) return DatePreset.LAST_3_MONTHS;
    if (isLast6Months) return DatePreset.LAST_6_MONTHS;
    if (isLast12Months) return DatePreset.LAST_12_MONTHS;
    if (isAllTime) return DatePreset.ALL_TIME;
    return DatePreset.CUSTOM;
  }, [dateRange]);

  const handlePresetChange = (preset: DatePreset) => {
    const now = new Date();
    switch (preset) {
      case DatePreset.LAST_30_DAYS: {
        onChangeDateRange({ endDate: now, startDate: subDays(now, 30) });
        break;
      }
      case DatePreset.LAST_3_MONTHS: {
        onChangeDateRange({ endDate: now, startDate: subMonths(now, 3) });
        break;
      }
      case DatePreset.LAST_6_MONTHS: {
        onChangeDateRange({ endDate: now, startDate: subMonths(now, 6) });
        break;
      }
      case DatePreset.LAST_12_MONTHS: {
        onChangeDateRange({ endDate: now, startDate: subMonths(now, 12) });
        break;
      }
      case DatePreset.ALL_TIME: {
        onChangeDateRange({ endDate: now, startDate: subYears(now, 10) });
        break;
      }
      case DatePreset.CUSTOM: {
        // Don't change the date range, just switch to custom mode
        break;
      }
    }
  };

  const handleCustomDateChange = (
    dates: [moment.Moment, moment.Moment] | null
  ) => {
    if (dates && dates[0] && dates[1]) {
      const startDate = dates[0].toDate();
      const endDate = dates[1].toDate();
      onChangeDateRange({
        endDate,
        startDate,
      });
    } else {
      onChangeDateRange(null);
    }
  };

  return (
    <Card className={classes.filterPanel}>
      <div className={classes.filterHeader}>
        <div>
          <Title level={4} style={{ margin: 0 }}>
            <FormattedMessage defaultMessage="Heatmap Filters" />
          </Title>
          <Text type="secondary">
            <FormattedMessage
              defaultMessage="{count} incidents"
              values={{
                count: (
                  <span className={classes.countBadge}>
                    {totalCount.toLocaleString()}
                  </span>
                ),
              }}
            />
          </Text>
        </div>
        <Button
          aria-label={intl.formatMessage({ defaultMessage: 'Close filters' })}
          icon={<CloseOutlined />}
          onClick={onClose}
          type="text"
        />
      </div>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div className={classes.filterSection}>
          <Text className={classes.priorityLabel}>
            <FormattedMessage defaultMessage="Date Range" />
          </Text>
          <Space style={{ marginBottom: 12 }} wrap>
            <Radio.Group
              onChange={(e) => handlePresetChange(e.target.value as DatePreset)}
              value={currentPreset}
            >
              <Radio.Button value={DatePreset.LAST_30_DAYS}>
                <FormattedMessage defaultMessage="Last 30 Days" />
              </Radio.Button>
              <Radio.Button value={DatePreset.LAST_3_MONTHS}>
                <FormattedMessage defaultMessage="Last 3 Months" />
              </Radio.Button>
              <Radio.Button value={DatePreset.LAST_6_MONTHS}>
                <FormattedMessage defaultMessage="Last 6 Months" />
              </Radio.Button>
              <Radio.Button value={DatePreset.LAST_12_MONTHS}>
                <FormattedMessage defaultMessage="Last 12 Months" />
              </Radio.Button>
              <Radio.Button value={DatePreset.ALL_TIME}>
                <FormattedMessage defaultMessage="All Time" />
              </Radio.Button>
              <Radio.Button value={DatePreset.CUSTOM}>
                <FormattedMessage defaultMessage="Custom Range" />
              </Radio.Button>
            </Radio.Group>
          </Space>
          {currentPreset === DatePreset.CUSTOM && (
            <RangePicker
              format="MMM D, YYYY"
              onChange={handleCustomDateChange}
              style={{ width: '100%' }}
              value={
                dateRange
                  ? [moment(dateRange.startDate), moment(dateRange.endDate)]
                  : null
              }
            />
          )}
        </div>
      </Space>
    </Card>
  );
};

export default PoliceHeatmapFilters;
