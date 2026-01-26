/* eslint-disable  */
import React from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import { ConfigProvider } from 'antd';
import enUSAntd from 'antd/es/locale/en_US';
import { isValid } from 'date-fns';

const InternalDatePicker: any = generatePicker<Date>(dateFnsGenerateConfig);

function wrapInEnglish<P>(PickerComponent: React.ComponentType<P>) {
  return (
    props: P & {
      onChange?: (value: Date | null | [Date | null, Date | null]) => void;
    }
  ) => {
    const { onChange, ...restProps } = props;

    const handleChange = (value: Date | null | [Date | null, Date | null]) => {
      // Handle RangePicker (array of dates)
      if (Array.isArray(value)) {
        onChange?.(value);
        return;
      }

      // If value exists but is not a valid date, clear it
      if (value !== null && value !== undefined && !isValid(value)) {
        onChange?.(null);
        return;
      }

      // If value is a valid date, pass it through
      onChange?.(value);
    };

    return (
      <ConfigProvider locale={enUSAntd}>
        {/* @ts-ignore */}
        <PickerComponent {...restProps} onChange={handleChange} />
      </ConfigProvider>
    );
  };
}

// @ts-ignore
const DatePicker = wrapInEnglish(
  InternalDatePicker
) as unknown as typeof InternalDatePicker;

// @ts-ignore
DatePicker.RangePicker = wrapInEnglish(InternalDatePicker.RangePicker);
// @ts-ignore
DatePicker.WeekPicker = wrapInEnglish(InternalDatePicker.WeekPicker);
// @ts-ignore
DatePicker.MonthPicker = wrapInEnglish(InternalDatePicker.MonthPicker);
// @ts-ignore
DatePicker.YearPicker = wrapInEnglish(InternalDatePicker.YearPicker);
// @ts-ignore
DatePicker.TimePicker = wrapInEnglish(InternalDatePicker.TimePicker);
// @ts-ignore
DatePicker.QuarterPicker = wrapInEnglish(InternalDatePicker.QuarterPicker);

export default DatePicker;
