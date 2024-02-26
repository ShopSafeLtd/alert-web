import React from 'react';
import { Tag } from 'antd';
import { IncidentPriority } from '../../../graphql/generated';

export const getIncidentPriorityText = (value: IncidentPriority) => {
  if (value === IncidentPriority.Medium) return 'Medium';
  if (value === IncidentPriority.High) return 'High';
  return 'Normal';
};
export const getIncidentPriorityColor = (value: IncidentPriority) => {
  if (value === IncidentPriority.Medium) return 'gold';
  if (value === IncidentPriority.High) return 'red';
  return 'none';
};

interface Props {
  value: IncidentPriority;
}

const IncidentPriorityTag = ({ value }: Props) => {
  const color = getIncidentPriorityColor(value);
  return <Tag color={color}>{getIncidentPriorityText(value)}</Tag>;
};

export default IncidentPriorityTag;
