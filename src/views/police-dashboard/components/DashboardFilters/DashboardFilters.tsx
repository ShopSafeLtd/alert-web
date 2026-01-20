import type { Moment } from 'moment';

import { DatePicker, Radio, Space } from 'antd';
import { subDays, subMonths } from 'date-fns';
import moment from 'moment';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { DatePreset, type DateRange } from '../../types';

const { RangePicker } = DatePicker;

interface Props {
  dateRange: DateRange;
  loading?: boolean;
  onChangeDateRange: (value: DateRange) => void;
}

const DashboardFilters: React.FC<Props> = ({
  dateRange,
  loading = false,
  onChangeDateRange,
}) => {
  // Determine current preset
  const currentPreset = useMemo(() => {
    if (!dateRange) return DatePreset.ALL_TIME;

    const now = new Date();
    const thirtyDaysAgo = subDays(now, 30);
    const threeMonthsAgo = subMonths(now, 3);
    const sixMonthsAgo = subMonths(now, 6);
    const twelveMonthsAgo = subMonths(now, 12);

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

    if (isLast30Days) return DatePreset.LAST_30_DAYS;
    if (isLast3Months) return DatePreset.LAST_3_MONTHS;
    if (isLast6Months) return DatePreset.LAST_6_MONTHS;
    if (isLast12Months) return DatePreset.LAST_12_MONTHS;
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
        onChangeDateRange(null);
        break;
      }
      case DatePreset.CUSTOM: {
        // Don't change the date range, just switch to custom mode
        break;
      }
    }
  };

  const handleCustomDateChange = (
    dates: [Moment | null, Moment | null] | null
  ) => {
    if (dates && dates.length === 2) {
      const [startMoment, endMoment] = dates;
      if (startMoment && endMoment) {
        const startDate = startMoment.toDate();
        const endDate = endMoment.toDate();
        onChangeDateRange({
          endDate,
          startDate,
        });
      }
    } else {
      onChangeDateRange(null);
    }
  };

  return (
    <div style={{ marginBottom: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space wrap>
          <Radio.Group
            disabled={loading}
            onChange={(e) => {
              const value = e.target.value as string;
              if (Object.values(DatePreset).includes(value as DatePreset)) {
                handlePresetChange(value as DatePreset);
              }
            }}
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
            disabled={loading}
            format="MMM D, YYYY"
            onChange={handleCustomDateChange}
            style={{ maxWidth: 400, width: '100%' }}
            value={
              dateRange
                ? [moment(dateRange.startDate), moment(dateRange.endDate)]
                : null
            }
          />
        )}
      </Space>
    </div>
  );
};

export default DashboardFilters;
