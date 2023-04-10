import React from 'react';
import { Card, Progress, ProgressProps } from 'antd';

interface Props extends ProgressProps {
  title: string;
  value: number;
  subtitle: string;
  extra: JSX.Element[];
  width: number;
}

export const GoalWidget = ({
  title,
  value,
  width = 150,
  subtitle,
  strokeWidth = 4,
  extra,
}: Props): JSX.Element => (
  <Card>
    <div className="text-center">
      {title && <h4 className="mb-3 font-weight-bold">{title}</h4>}
      <Progress
        type="dashboard"
        percent={value}
        width={width}
        strokeWidth={strokeWidth}
      />
      <div
        className={`mt-2 mx-auto text-muted ${extra ? 'mb-3' : ''}`}
        style={{ maxWidth: `${width + 30}px` }}
      >
        {subtitle}
      </div>
      {extra}
    </div>
  </Card>
);

export default GoalWidget;
