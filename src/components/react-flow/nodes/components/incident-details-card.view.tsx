import { faClock, faLocationDot } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';

import type { Incident } from '../incident-details-node';

const { Text, Title } = Typography;

interface Props {
  incident: Incident;
}

const IncidentCard = ({ incident }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Card
      className="incident-card"
      key={incident.id || ''}
      style={{ height: '100%', zIndex: 4 }}
    >
      <div className="incident-card-content">
        <Title ellipsis level={4} style={{ marginBottom: 2 }}>
          {incident?.description}
        </Title>
        <Text type="secondary">
          {intl.formatMessage(
            {
              defaultMessage: 'Alert ID: {ref}',
            },
            {
              ref: incident?.reference,
            }
          )}
        </Text>
        <Row>
          <Col flex={1}>
            <FontAwesomeIcon
              className="incident-card-icon"
              icon={faClock}
              size="sm"
            />
            <Text type="secondary">{incident?.dayTime}</Text>
          </Col>
        </Row>
        <Row className="incident-card-location-row" gutter={8}>
          <Col span={1}>
            <FontAwesomeIcon
              className="incident-card-icon"
              icon={faLocationDot}
              size="sm"
            />
          </Col>
          <Col span={23}>
            <Text ellipsis style={{ width: '100%' }} type="secondary">
              {incident?.location}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default IncidentCard;
