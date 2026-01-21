import type { CascadeOptions } from 'types/investigations';

import { faCircleQuestion } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Checkbox, Space, Tooltip } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import useStyles from './CascadeOptionsCheckbox.styles';

interface CascadeOptionsCheckboxProps {
  disabled?: boolean;
  layout?: 'horizontal' | 'vertical';
  onChange: (value: CascadeOptions) => void;
  value: CascadeOptions;
}

const CascadeOptionsCheckbox: React.FC<CascadeOptionsCheckboxProps> = ({
  disabled = false,
  layout = 'vertical',
  onChange,
  value,
}) => {
  const intl = useIntl();
  const classes = useStyles();

  const handleChange = (key: keyof CascadeOptions) => (checked: boolean) => {
    onChange({
      ...value,
      [key]: checked,
    });
  };

  const options = [
    {
      key: 'connectIncidents' as const,
      label: intl.formatMessage({
        defaultMessage: 'Also connect their incidents',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Automatically add all incidents associated with this offender to the investigation',
      }),
    },
    {
      key: 'connectVehicles' as const,
      label: intl.formatMessage({
        defaultMessage: 'Also connect their vehicles',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Automatically add all vehicles associated with this offender to the investigation',
      }),
    },
    {
      key: 'connectCrimeGroups' as const,
      label: intl.formatMessage({
        defaultMessage: 'Also connect their crime groups',
      }),
      tooltip: intl.formatMessage({
        defaultMessage:
          'Automatically add all crime groups associated with this offender to the investigation',
      }),
    },
  ];

  return (
    <Space
      className={classes.container}
      direction={layout === 'vertical' ? 'vertical' : 'horizontal'}
      size={layout === 'vertical' ? 8 : 16}
    >
      {options.map((option) => (
        <div className={classes.checkboxWrapper} key={option.key}>
          <Checkbox
            checked={value[option.key]}
            disabled={disabled}
            onChange={(e) => handleChange(option.key)(e.target.checked)}
          >
            {option.label}
          </Checkbox>
          <Tooltip placement="right" title={option.tooltip}>
            <FontAwesomeIcon
              className={classes.tooltipIcon}
              icon={faCircleQuestion}
            />
          </Tooltip>
        </div>
      ))}
    </Space>
  );
};

export default CascadeOptionsCheckbox;
