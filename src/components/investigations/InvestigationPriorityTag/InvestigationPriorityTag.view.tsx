import { Tag } from 'antd';
import { InvestigationPriority } from 'graphql/types';
import React from 'react';

export const getInvestigationPriorityText = (value: InvestigationPriority) => {
  if (value === InvestigationPriority.High) return 'High';
  if (value === InvestigationPriority.Medium) return 'Medium';
  if (value === InvestigationPriority.Low) return 'Low';
  return 'Normal';
};

export const getInvestigationPriorityColor = (value: InvestigationPriority) => {
  if (value === InvestigationPriority.High) return 'red';
  if (value === InvestigationPriority.Medium) return 'orange';
  if (value === InvestigationPriority.Low) return 'blue';
  return 'green';
};

interface Props {
  value: InvestigationPriority;
}

const InvestigationPriorityTag = ({ value }: Props) => {
  const color = getInvestigationPriorityColor(value);
  return <Tag color={color}>{getInvestigationPriorityText(value)}</Tag>;
};

export default InvestigationPriorityTag;
