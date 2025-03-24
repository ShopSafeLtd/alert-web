import type { PermissionMethod, PermissionModel } from 'graphql/types';

import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Tooltip } from 'antd';
import React from 'react';

import useStyles from './CheckTag.styles';

interface Option {
  hasChildren?: boolean;
  label: string;
  parentId?: null | string;
  parents?: string[];
  permissions?: { method: PermissionMethod; model: PermissionModel }[];
  tier?: number;
  tooltip?: null | string;
  value: string;
}

interface Props {
  active: boolean;
  onClick: (value: Option) => void;
  option: Option;
}

const CheckTag = ({ active, onClick, option }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={option.tooltip}>
      <Row
        align="middle"
        className={classes.selectBox}
        onClick={() => onClick(option)}
        style={{
          backgroundColor: active ? 'rgb(222, 68, 54)' : undefined,
          borderColor: active ? 'rgb(222, 68, 54)' : undefined,
          color: active ? 'white' : undefined,
        }}
      >
        <div className={classes.overlay} />
        <FontAwesomeIcon
          className={classes.selectIcon}
          icon={active ? faCheckCircleSolid : faCheckCircle}
          size="lg"
          style={{ color: active ? 'white' : undefined }}
        />
        {option.label}
      </Row>
    </Tooltip>
  );
};

export default CheckTag;
