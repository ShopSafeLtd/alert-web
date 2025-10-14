import type { ProgressProps } from 'antd';

import { Card, Progress } from 'antd';
import React from 'react';

interface Props extends ProgressProps {
  extra: JSX.Element[];
  subtitle: string;
  title: string;
  value: number;
  width: number;
}

export const GoalWidget = ({
  extra,
  strokeWidth = 4,
  subtitle,
  title,
  value,
  width = 150,
}: Props): JSX.Element => (
  <Card>
    <div className="text-center">
      {title && <h4 className="mb-3 font-weight-bold">{title}</h4>}
      <Progress
        percent={value}
        strokeWidth={strokeWidth}
        type="dashboard"
        width={width}
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
