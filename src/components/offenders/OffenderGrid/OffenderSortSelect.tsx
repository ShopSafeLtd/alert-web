import { Select } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

interface OffenderSortSelectProps {
  onChange: (value: string) => void;
  value: string;
}

export const OffenderSortSelect: React.FC<OffenderSortSelectProps> = ({
  onChange,
  value,
}) => {
  const intl = useIntl();

  return (
    <Select
      onChange={onChange}
      size="small"
      style={{ width: 200 }}
      value={value}
    >
      <Select.Option value="lastSeen">
        {intl.formatMessage({ defaultMessage: 'Last Seen (Newest)' })}
      </Select.Option>
      <Select.Option value="lastSeenAsc">
        {intl.formatMessage({ defaultMessage: 'Last Seen (Oldest)' })}
      </Select.Option>
      <Select.Option value="name">
        {intl.formatMessage({ defaultMessage: 'Name (A-Z)' })}
      </Select.Option>
      <Select.Option value="nameDesc">
        {intl.formatMessage({ defaultMessage: 'Name (Z-A)' })}
      </Select.Option>
      <Select.Option value="incidents">
        {intl.formatMessage({ defaultMessage: 'Most Incidents' })}
      </Select.Option>
      <Select.Option value="incidentsAsc">
        {intl.formatMessage({ defaultMessage: 'Fewest Incidents' })}
      </Select.Option>
      <Select.Option value="value">
        {intl.formatMessage({ defaultMessage: 'Highest Value' })}
      </Select.Option>
      <Select.Option value="valueAsc">
        {intl.formatMessage({ defaultMessage: 'Lowest Value' })}
      </Select.Option>
    </Select>
  );
};
