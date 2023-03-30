/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Card } from 'antd';
import ApexChart, { Props as DefaultChatProps } from 'react-apexcharts';
import { apexPieChartDefaultOption } from 'constants/ChartConstant';

const defaultOption = apexPieChartDefaultOption;

interface ChatProps extends DefaultChatProps {
  options: any;
  width: number | string;
  height: number | string;
}

const Chart = (props: ChatProps) => <ApexChart {...props} />;

interface Props {
  series: string[];
  customOptions: any[];
  labels: string[];
  width: string | number;
  height: string | number;
  title: string;
  extra: JSX.Element;
}

const DonutChartWidget = (props: Props) => {
  const {
    series = [],
    customOptions,
    labels = [],
    width = '100%',
    height = 250,
    title = '',
    extra,
  } = props;

  let options = defaultOption;

  // @ts-expect-error array type wrong
  options.labels = labels;
  options.plotOptions.pie.donut.labels.total.label = title;
  if (!title) {
    options.plotOptions.pie.donut.labels.show = false;
  }
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  return (
    <Card>
      <div className="text-center">
        <Chart
          type="donut"
          options={options}
          // @ts-expect-error array type wrong
          series={series}
          width={width}
          height={height}
        />
        {extra}
      </div>
    </Card>
  );
};

DonutChartWidget.defaultProps = {
  series: [],
  labels: [],
  title: '',
  height: 250,
  width: '100%',
};

export default DonutChartWidget;
