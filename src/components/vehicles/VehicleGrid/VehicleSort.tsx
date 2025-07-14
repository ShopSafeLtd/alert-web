import { Select } from 'antd';
import React, { useState } from 'react';
import { useIntl } from 'react-intl';

export const useVehicleSort = (defaultSort = 'registration') => {
  const [sortBy, setSortBy] = useState<string>(defaultSort);
  return { setSortBy, sortBy };
};

interface VehicleSortSelectProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
  value: string;
}

export const VehicleSortSelect: React.FC<VehicleSortSelectProps> = ({
  onChange,
  style = { width: 200 },
  value,
}) => {
  const intl = useIntl();

  const options = [
    {
      label: intl.formatMessage({ defaultMessage: 'Registration (A-Z)' }),
      value: 'registration',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Registration (Z-A)' }),
      value: 'registrationDesc',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Make (A-Z)' }),
      value: 'make',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Make (Z-A)' }),
      value: 'makeDesc',
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
      label: intl.formatMessage({ defaultMessage: 'Most Offenders' }),
      value: 'offenders',
    },
    {
      label: intl.formatMessage({ defaultMessage: 'Least Offenders' }),
      value: 'offendersAsc',
    },
  ];

  return (
    <Select onChange={onChange} options={options} style={style} value={value} />
  );
};
