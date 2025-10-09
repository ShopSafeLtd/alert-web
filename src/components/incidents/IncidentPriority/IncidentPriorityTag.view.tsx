import { Tag } from 'antd';
import { IncidentPriority } from 'graphql/types';
import React from 'react';

export const getIncidentPriorityText = (value: IncidentPriority) => {
  if (value === IncidentPriority.Medium) return 'Medium';
  if (value === IncidentPriority.High) return 'High';
  return 'Normal';
};
export const getIncidentPriorityColor = (value: IncidentPriority) => {
  if (value === IncidentPriority.Medium) return 'orange';
  if (value === IncidentPriority.High) return 'red';
  return 'green';
};

interface Props {
  value: IncidentPriority;
}

const IncidentPriorityTag = ({ value }: Props) => {
  const color = getIncidentPriorityColor(value);
  return <Tag color={color}>{getIncidentPriorityText(value)}</Tag>;
};

export default IncidentPriorityTag;
