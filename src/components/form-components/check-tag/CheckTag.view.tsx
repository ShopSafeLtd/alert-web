import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Tooltip } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import useStyles from './CheckTag.styles';

interface Option {
  label: string;
  value: string;
  tooltip?: string | null;
  needAdminRight?: boolean;
  hasChildren?: boolean;
  parentId?: string | null;
  parents?: string[];
  tier?: number;
}

interface Props {
  active: boolean;
  option: Option;
  onClick: (value: Option) => void;
}

const CheckTag = ({ active, option, onClick }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={option.tooltip}>
      <Row
        className={classes.selectBox}
        onClick={() => onClick(option)}
        style={{ borderColor: active ? 'red' : undefined }}
        align="middle"
      >
        <div className={classes.overlay} />
        <FontAwesomeIcon
          size="lg"
          className={classes.selectIcon}
          style={{ color: active ? 'red' : undefined }}
          icon={active ? faCheckCircleSolid : faCheckCircle}
        />
        {option.label}
      </Row>
    </Tooltip>
  );
};

export default CheckTag;
