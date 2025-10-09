import { Select, message } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface IncidentStatus {
  id: string;
  name: string;
  tooltip?: null | string;
}

interface Props {
  currentStatusId?: null | string;
  disabled?: boolean;
  onStatusChange: (statusId: string) => Promise<void>;
  statuses: IncidentStatus[];
}

const IncidentStatusSelect = ({
  currentStatusId,
  disabled = false,
  onStatusChange,
  statuses,
}: Props): JSX.Element => {
  const intl = useIntl();

  const handleChange = async (statusId: string) => {
    try {
      await onStatusChange(statusId);
      void message.success(
        intl.formatMessage({
          defaultMessage: 'Incident status updated successfully',
        })
      );
    } catch {
      void message.error(
        intl.formatMessage({
          defaultMessage: 'Failed to update incident status',
        })
      );
    }
  };

  return (
    <Select
      disabled={disabled}
      onChange={(value) => {
        void handleChange(value);
      }}
      placeholder={intl.formatMessage({
        defaultMessage: 'Select Status',
      })}
      size="small"
      style={{ minWidth: 150 }}
      value={currentStatusId}
    >
      {statuses.map((status) => (
        <Select.Option key={status.id} value={status.id}>
          {status.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default IncidentStatusSelect;
