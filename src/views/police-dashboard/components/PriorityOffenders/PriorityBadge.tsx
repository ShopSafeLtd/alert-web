import { Tag } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface PriorityBadgeProps {
  score: null | number | undefined;
}

const PriorityBadge: React.FC<PriorityBadgeProps> = ({ score }) => {
  const intl = useIntl();

  if (score === null || score === undefined) {
    return (
      <span style={{ color: '#999' }}>
        {intl.formatMessage({ defaultMessage: '-' })}
      </span>
    );
  }

  const getColor = () => {
    if (score >= 80) return '#f5222d'; // Critical - Red
    if (score >= 50) return '#fa8c16'; // High - Orange
    if (score >= 25) return '#faad14'; // Medium - Yellow
    return '#52c41a'; // Low - Green
  };

  return (
    <Tag
      color={getColor()}
      style={{
        color: '#fff',
        fontSize: 14,
        fontWeight: 700,
        padding: '4px 12px',
      }}
    >
      {intl.formatMessage({ defaultMessage: '{score}/100' }, { score })}
    </Tag>
  );
};

export default PriorityBadge;
