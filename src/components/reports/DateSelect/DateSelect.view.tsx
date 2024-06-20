import React, { useState, useEffect } from 'react';
import { Dropdown, Button, Row, Col, Tooltip } from 'antd';
import { FormattedMessage, useIntl } from 'react-intl';
import dayjs from 'dayjs';
import DatePicker from '#/components/util-components/DatePicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faChevronDown } from '@fortawesome/pro-light-svg-icons';

type SelectedType =
  | 'last30Days'
  | 'last7Days'
  | 'last1Years'
  | 'yearToDate'
  | 'prev1Years'
  | 'monthToDate'
  | 'prevMonth';

const selectedToText = (value: SelectedType) => {
  switch (value) {
    case 'last7Days': {
      return <FormattedMessage defaultMessage="Last 7 Days" id="jnzQzj" />;
    }
    case 'last1Years': {
      return <FormattedMessage defaultMessage="Last 12 Months" id="GX2x7C" />;
    }
    case 'yearToDate': {
      return <FormattedMessage defaultMessage="Year To Date" id="yq0PyW" />;
    }
    case 'prev1Years': {
      return <FormattedMessage defaultMessage="Previous Year" id="TOXvuK" />;
    }
    case 'monthToDate': {
      return <FormattedMessage defaultMessage="Month To Date" id="EPs0pl" />;
    }
    case 'prevMonth': {
      return <FormattedMessage defaultMessage="Previous Month" id="8RT/mJ" />;
    }
    default: {
      return <FormattedMessage defaultMessage="Last 30 Days" id="brX8Pt" />;
    }
  }
};

const selectedToDate = (value: SelectedType) => {
  switch (value) {
    case 'last7Days': {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(7, 'days')
          .toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
      };
    }
    case 'last1Years': {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(1, 'years')
          .toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
      };
    }
    case 'yearToDate': {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .month(0)
          .toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
      };
    }
    case 'prev1Years': {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .month(0)
          .subtract(2, 'years')
          .toDate(),
        endDate: dayjs()
          .hour(23)
          .minute(59)
          .minute(59)
          .date(1)
          .month(0)
          .subtract(1, 'years')
          .subtract(1, 'days')
          .toDate(),
      };
    }
    case 'monthToDate': {
      return {
        startDate: dayjs().hour(0).minute(0).second(1).date(1).toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
      };
    }
    case 'prevMonth': {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .date(1)
          .subtract(1, 'months')
          .toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).date(-1).toDate(),
      };
    }
    default: {
      return {
        startDate: dayjs()
          .hour(0)
          .minute(0)
          .second(1)
          .subtract(1, 'months')
          .toDate(),
        endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
      };
    }
  }
};

interface Props {
  defaultRange: SelectedType;
  onChange: (value: { startDate: Date; endDate: Date }) => void;
}

const DateSelect = ({ defaultRange, onChange }: Props) => {
  const intl = useIntl();
  const [selected, setSelected] = useState<SelectedType>(
    defaultRange ?? 'last30Days'
  );
  const [customRangeOpen, setCustomRangeOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dayjs()
      .hour(0)
      .minute(0)
      .second(1)
      .subtract(30, 'days')
      .toDate(),
    // today at 23:59:59
    endDate: dayjs().hour(23).minute(59).second(59).toDate(),
  });

  useEffect(() => {
    if (customRangeOpen) {
      onChange(dateRange);
    } else {
      onChange(selectedToDate(selected));
    }
  }, [selected, dateRange]);

  const toggleCustomRange = () => setCustomRangeOpen(!customRangeOpen);

  return customRangeOpen ? (
    <Row>
      <Col>
        <DatePicker.RangePicker
          style={{
            width: 190,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
          defaultValue={[dateRange.startDate, dateRange.endDate]}
          value={[dateRange.startDate, dateRange.endDate]}
          allowClear={false}
          format={'DD/MM/YY'}
          onChange={(value) =>
            setDateRange(
              value
                ? {
                    startDate:
                      value?.[0] ??
                      dayjs()
                        .hour(0)
                        .minute(0)
                        .second(1)
                        .subtract(30, 'days')
                        .toDate(),
                    endDate:
                      value?.[1] ??
                      dayjs().hour(23).minute(59).minute(59).toDate(),
                  }
                : {
                    startDate: dayjs()
                      .hour(0)
                      .minute(0)
                      .second(1)
                      .subtract(30, 'days')
                      .toDate(),
                    endDate: dayjs().hour(23).minute(59).minute(59).toDate(),
                  }
            )
          }
        />
      </Col>
      <Col>
        <Tooltip
          title={intl.formatMessage({
            defaultMessage: 'Use a predefined range.',
            id: 's1T2WW',
          })}
        >
          <Button
            style={{
              paddingLeft: 14,
              paddingRight: 14,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              borderLeft: 'none',
            }}
            onClick={toggleCustomRange}
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
            label: selectedToText('last7Days'),
            key: 'last7Days',
            onClick: () => setSelected('last7Days'),
          },
          {
            label: selectedToText('last30Days'),
            key: 'last30Days',
            onClick: () => setSelected('last30Days'),
          },
          {
            label: selectedToText('monthToDate'),
            key: 'monthToDate',
            onClick: () => setSelected('monthToDate'),
          },
          {
            label: selectedToText('prevMonth'),
            key: 'prevMonth',
            onClick: () => setSelected('prevMonth'),
          },
          {
            label: selectedToText('last1Years'),
            key: 'last1Years',
            onClick: () => setSelected('last1Years'),
          },
          {
            label: selectedToText('yearToDate'),
            key: 'yearToDate',
            onClick: () => setSelected('yearToDate'),
          },
          {
            label: selectedToText('prev1Years'),
            key: 'prev1Years',
            onClick: () => setSelected('prev1Years'),
          },
          {
            label: (
              <FormattedMessage
                defaultMessage="Custom Date Range"
                id="HyIRsT"
              />
            ),
            key: 'custom',
            onClick: toggleCustomRange,
          },
        ],
      }}
    >
      <Button>
        <FormattedMessage
          defaultMessage="Date Range: {value1}"
          id="WXJjsy"
          values={{ value1: selectedToText(selected) }}
        />
        <FontAwesomeIcon
          size="lg"
          style={{ marginLeft: 10 }}
          icon={faChevronDown}
        />
      </Button>
    </Dropdown>
  );
};

export default DateSelect;
