import { Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export const useOffenderSort = (defaultSort = 'lastSeen') => {
  const [sortBy, setSortBy] = useState<string>(defaultSort);
  return { setSortBy, sortBy };
};

interface OffenderSortSelectProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  value: string;
}

export const OffenderSortSelect: React.FC<OffenderSortSelectProps> = ({
  onChange,
  style = { width: 200 },
  value,
}) => {
  const intl = useIntl();

  const options = [
    {
      label: intl.formatMessage({ defaultMessage: 'Name (A-Z)' }),
      value: 'name',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Name (Z-A)' }),
      value: 'nameDesc',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Most Incidents' }),
      value: 'incidents',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Least Incidents' }),
      value: 'incidentsAsc',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Highest Value' }),
      value: 'value',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Lowest Value' }),
      value: 'valueAsc',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Recently Seen' }),
      value: 'lastSeen',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Oldest Activity' }),
      value: 'lastSeenAsc',
    },
  ];

  return (
    <Select onChange={onChange} options={options} style={style} value={value} />
  );
};
