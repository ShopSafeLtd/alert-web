/* eslint-disable  */
import React from 'react';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/es/date-picker/generatePicker';
import { ConfigProvider } from 'antd';
import enUSAntd from 'antd/es/locale/en_US';

const InternalDatePicker = generatePicker<Date>(dateFnsGenerateConfig);

function wrapInEnglish<P>(PickerComponent: React.ComponentType<P>) {
  return (props: P) => (
    <ConfigProvider locale={enUSAntd}>
      {/* @ts-ignore */}
      <PickerComponent {...props} />
    </ConfigProvider>
  );
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
