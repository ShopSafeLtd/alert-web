import IncidentStatusBadge from '#/components/incidents/IncidentStatus';
import IncidentStatusSelect from '#/components/incidents/IncidentStatusSelect';
import { Spin, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface IncidentStatus {
  id: string;
  name: string;
  tooltip?: null | string;
}

interface Props {
  currentStatus?: IncidentStatus | null;
  editRights: boolean;
  incidentId: string;
  loading?: boolean;
  onStatusChange: (statusId: string) => Promise<void>;
  statuses: IncidentStatus[];
}

const IncidentStatusChanger = ({
  currentStatus,
  editRights,
  incidentId,
  loading = false,
  onStatusChange,
  statuses,
}: Props): JSX.Element => {
  const intl = useIntl();

  if (loading) {
    return <Spin size="small" />;
  }

  if (editRights && statuses.length > 0) {
    return (
      <IncidentStatusSelect
        currentStatusId={currentStatus?.id}
        incidentId={incidentId}
        onStatusChange={onStatusChange}
        statuses={statuses}
      />
    );
  }

  if (currentStatus) {
    return <IncidentStatusBadge status={currentStatus} />;
  }

  return (
    <Typography.Text type="secondary">
      {intl.formatMessage({
        defaultMessage: 'No status',
      })}
    </Typography.Text>
  );
};

export default IncidentStatusChanger;
