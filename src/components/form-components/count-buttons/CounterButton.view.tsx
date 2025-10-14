import { faMinusCircle, faPlusCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Tooltip, Typography } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import useStyles from './count-buttons.styles';

const { Text } = Typography;

interface CounterButtonProps {
  dataName: string;
  onClick: (count: number) => void;
}

const CounterButtonView = ({ dataName, onClick }: CounterButtonProps) => {
  const intl = useIntl();
  const classes = useStyles();
  const [count, setCount] = useState(5);

  return (
    <div className={classes.countCardContainer}>
      <Row>
        <Col
          className={classes.countCardButtonLeft}
          onClick={() => setCount(count > 0 ? count - 1 : 0)}
        >
          <FontAwesomeIcon icon={faMinusCircle} size="xl" />
        </Col>
        <Tooltip
          title={intl.formatMessage(
            {
              defaultMessage: 'Add {count} {dataName} to the incident',
            },
            { count, dataName: dataName.toLowerCase() }
          )}
        >
          <Col
            className={classes.countCardContent}
            onClick={() => onClick(count)}
          >
            <Text className={classes.countText}>
              <FormattedMessage
                defaultMessage="{count} {dataName}"
                values={{ count, dataName }}
              />
            </Text>
          </Col>
        </Tooltip>
        <Col
          className={classes.countCardButtonRight}
          onClick={() => setCount(count + 1)}
        >
          <FontAwesomeIcon icon={faPlusCircle} size="xl" />
        </Col>
      </Row>
    </div>
  );
};

export default CounterButtonView;
