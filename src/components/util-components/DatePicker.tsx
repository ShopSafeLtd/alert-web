/* eslint-disable */
import { ConfigProvider } from 'antd';
import generatePicker from 'antd/es/date-picker/generatePicker';
import antdEnGB from 'antd/lib/locale/en_GB';
import { enGB } from 'date-fns/locale';
import dateFnsGenerateConfig from 'rc-picker/es/generate/dateFns';
import React from 'react';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

const DatePickerDayJs = (props: any) => {
  return (
    <ConfigProvider locale={antdEnGB}>
      <DatePicker locale={enGB} {...props} />
    </ConfigProvider>
  );
};

export default DatePickerDayJs;
