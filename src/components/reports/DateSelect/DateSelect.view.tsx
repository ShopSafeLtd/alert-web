import DatePicker from '#/components/util-components/DatePicker';
import { faChevronDown, faClose } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Dropdown, Row, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

export type DateSelectModeType =
  | 'last1Years'
  | 'last7Days'
  | 'last30Days'
  | 'lastDay'
  | 'monthToDate'
  | 'none'
  | 'prev1Years'
  | 'prevMonth'
  | 'yearToDate';

const selectedToText = (value: DateSelectModeType | undefined) => {
  switch (value) {
    case 'lastDay': {
      return <FormattedMessage defaultMessage="Yesterday" />;
    }
    case 'last7Days': {
      return <FormattedMessage defaultMessage="Last 7 Days" />;
    }
    case 'last1Years': {
      return <FormattedMessage defaultMessage="Last 12 Months" />;
    }
    case 'yearToDate': {
      return <FormattedMessage defaultMessage="Year To Date" />;
    }
    case 'prev1Years': {
      return <FormattedMessage defaultMessage="Previous Year" />;
    }
    case 'monthToDate': {
      return <FormattedMessage defaultMessage="Month To Date" />;
    }
    case 'prevMonth': {
      return <FormattedMessage defaultMessage="Previous Month" />;
    }
    case 'last30Days': {
      return <FormattedMessage defaultMessage="Last 30 Days" />;
    }
    default: {
      return <FormattedMessage defaultMessage="None" />;
    }
  }
};

export const selectedModeToDate = (value: DateSelectModeType | undefined) => {
  switch (value) {
    case 'lastDay': {
      return {
        endDate: dayjs()
          .subtract(1, 'days')
          .hour(23)
          .minute(59)
          .minute(59)
          .toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(1, 'days')
          .toDate(),
      };
    }
    case 'last7Days': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(7, 'days')
          .toDate(),
      };
    }
    case 'last1Years': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(1, 'years')
          .toDate(),
      };
    }
    case 'yearToDate': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .month(0)
          .toDate(),
      };
    }
    case 'prev1Years': {
      return {
        endDate: dayjs()
          .hour(23)
          .minute(59)
          .minute(59)
          .date(1)
          .month(0)
          .subtract(1, 'years')
          .subtract(1, 'days')
          .toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .month(0)
          .subtract(2, 'years')
          .toDate(),
      };
    }
    case 'monthToDate': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
        startDate: dayjs().hour(0).minute(0).second(1).date(1).toDate(),
      };
    }
    case 'prevMonth': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).date(-1).toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .subtract(1, 'months')
          .toDate(),
      };
    }
    case 'last30Days': {
      return {
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(1, 'months')
          .toDate(),
      };
    }
    default: {
      return undefined;
    }
  }
};

interface Props {
  defaultRange?: DateSelectModeType;
  onChange: (
    value: { endDate: Date; startDate: Date } | undefined,
    range: DateSelectModeType | undefined
  ) => void;
}

const DateSelect = ({ defaultRange, onChange }: Props) => {
  const intl = useIntl();
  const [selected, setSelected] = useState<DateSelectModeType | undefined>(
    defaultRange ?? undefined
  );
  const [customRangeOpen, setCustomRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    endDate: Date;
    startDate: Date;
  }>({
    // today at 23:59:59
    endDate: dayjs().hour(23).minute(59).second(59).toDate(),
    startDate: dayjs()
      .hour(0)
      .minute(0)
      .second(1)
      .subtract(30, 'days')
      .toDate(),
  });

  useEffect(() => {
    if (customRangeOpen) {
      onChange(dateRange, selected);
    } else {
      onChange(selectedModeToDate(selected), selected);
    }
  }, [selected, dateRange]);

  const toggleCustomRange = () => setCustomRangeOpen(!customRangeOpen);

  return customRangeOpen ? (
    <Row>
      <Col>
        <DatePicker.RangePicker
          allowClear={false}
          defaultValue={[dateRange.startDate, dateRange.endDate]}
          format="DD/MM/YY"
          onChange={(value) =>
            setDateRange(
              value
                ? {
                    endDate:
                      value?.[1] ??
                      dayjs().hour(23).minute(59).minute(59).toDate(),
                    startDate:
                      value?.[0] ??
                      dayjs()
                        .hour(0)
                        .minute(0)
                        .second(1)
                        .subtract(30, 'days')
                        .toDate(),
                  }
                : {
                    endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
                    startDate: dayjs()
                      .hour(0)
                      .minute(0)
                      .second(1)
                      .subtract(30, 'days')
                      .toDate(),
                  }
            )
          }
          style={{
            borderBottomRightRadius: 0,
            borderTopRightRadius: 0,
            width: 190,
          }}
          value={[dateRange.startDate, dateRange.endDate]}
        />
      </Col>
      <Col>
        <Tooltip
          title={intl.formatMessage({
            defaultMessage: 'Use a predefined range.',
          })}
        >
          <Button
            onClick={toggleCustomRange}
            style={{
              borderBottomLeftRadius: 0,
              borderLeft: 'none',
              borderTopLeftRadius: 0,
              paddingLeft: 14,
              paddingRight: 14,
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </Tooltip>
      </Col>
    </Row>
  ) : (
    <Dropdown
      menu={{
        items: [
          {
            key: 'none',
            label: selectedToText(undefined),
            onClick: () => setSelected(undefined),
          },
          {
            key: 'lastDay',
            label: selectedToText('lastDay'),
            onClick: () => setSelected('lastDay'),
          },
          {
            key: 'last7Days',
            label: selectedToText('last7Days'),
            onClick: () => setSelected('last7Days'),
          },
          {
            key: 'last30Days',
            label: selectedToText('last30Days'),
            onClick: () => setSelected('last30Days'),
          },
          {
            key: 'monthToDate',
            label: selectedToText('monthToDate'),
            onClick: () => setSelected('monthToDate'),
          },
          {
            key: 'prevMonth',
            label: selectedToText('prevMonth'),
            onClick: () => setSelected('prevMonth'),
          },
          {
            key: 'last1Years',
            label: selectedToText('last1Years'),
            onClick: () => setSelected('last1Years'),
          },
          {
            key: 'yearToDate',
            label: selectedToText('yearToDate'),
            onClick: () => setSelected('yearToDate'),
          },
          {
            key: 'prev1Years',
            label: selectedToText('prev1Years'),
            onClick: () => setSelected('prev1Years'),
          },
          {
            key: 'custom',
            label: <FormattedMessage defaultMessage="Custom Date Range" />,
            onClick: toggleCustomRange,
          },
        ],
      }}
    >
      <Button>
        <FormattedMessage
          defaultMessage="Date Range: {value1}"
          values={{ value1: selectedToText(selected) }}
        />
        <FontAwesomeIcon
          icon={faChevronDown}
          size="lg"
          style={{ marginLeft: 10 }}
        />
      </Button>
    </Dropdown>
  );
};

export default DateSelect;
