import React from 'react';
import { Row, Tooltip, Typography } from 'antd';
import useStyles from './count-buttons.styles';

const { Text } = Typography;

interface Props {
  onClick: () => void;
  selected?: boolean;
  text: React.ReactNode;
  tooltip: React.ReactNode;
}

const CountButton = ({ onClick, selected = false, tooltip, text }: Props) => {
  const classes = useStyles();
  return (
    <Tooltip title={tooltip}>
      <Row
        className={selected ? classes.countCardSelected : classes.countCard}
        onClick={onClick}
      >
        <Text
          className={selected ? classes.countTextSelected : classes.countText}
        >
          {text}
        </Text>
      </Row>
    </Tooltip>
  );
};

export default CountButton;
