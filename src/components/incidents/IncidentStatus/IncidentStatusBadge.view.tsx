import { Tag, Tooltip } from 'antd';
import React from 'react';

interface IncidentStatus {
  id: string;
  name: string;
  tooltip?: null | string;
}

interface Props {
  status: IncidentStatus | null | undefined;
}

const IncidentStatusBadge = ({ status }: Props) => {
  if (!status) return null;

  const badge = <Tag color="blue">{status.name}</Tag>;

  if (status.tooltip) {
    return <Tooltip title={status.tooltip}>{badge}</Tooltip>;
  }

  return badge;
};

export default IncidentStatusBadge;
