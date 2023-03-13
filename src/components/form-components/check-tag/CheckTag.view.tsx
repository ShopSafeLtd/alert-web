import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Tooltip } from 'antd';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { faCheckCircle as faCheckCircleSolid } from '@fortawesome/pro-solid-svg-icons';
import useStyles from './CheckTag.styles';

interface Props {
  active: boolean;
  label: string;
  value: string;
  tooltip?: string;
  onClick: (value: string) => void;
}

const CheckTag = ({ active, label, value, onClick, tooltip }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip}>
      <Row
        className={classes.selectBox}
        onClick={() => onClick(value)}
        style={{ borderColor: active ? 'red' : undefined }}
        align="middle"
      >
        <div className={classes.overlay} />
        <FontAwesomeIcon
          size="lg"
          className={classes.selectIcon}
          style={{ color: active ? 'red' : undefined }}
          icon={!active ? faCheckCircle : faCheckCircleSolid}
        />
        {label}
      </Row>
    </Tooltip>
  );
};

export default CheckTag;
