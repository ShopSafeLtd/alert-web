import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/pro-light-svg-icons';
import { useIntl } from 'react-intl';
import type { Incident } from '../incident-details-node';

const { Title, Text } = Typography;

interface Props {
  incident: Incident;
}

const IncidentCard = ({ incident }: Props): JSX.Element => {
  const intl = useIntl();
  return (
    <Card
      className="incident-card"
      key={incident.id || ''}
      style={{ zIndex: 4, height: '100%' }}
    >
      <div className="incident-card-content">
        <Title level={4} ellipsis style={{ marginBottom: 2 }}>
          {incident?.description}
        </Title>
        <Text type="secondary">
          {intl.formatMessage(
            {
              defaultMessage: 'Alert ID: {ref}',
              id: 'umL9sI',
            },
            {
              ref: incident?.reference,
            }
          )}
        </Text>
        <Row>
          <Col flex={1}>
            <FontAwesomeIcon
              size="sm"
              className="incident-card-icon"
              icon={faClock}
            />
            <Text type="secondary">{incident?.dayTime}</Text>
          </Col>
        </Row>
        <Row gutter={8} className="incident-card-location-row">
          <Col span={1}>
            <FontAwesomeIcon
              size="sm"
              className="incident-card-icon"
              icon={faLocationDot}
            />
          </Col>
          <Col span={23}>
            <Text style={{ width: '100%' }} ellipsis type="secondary">
              {incident?.location}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default IncidentCard;
