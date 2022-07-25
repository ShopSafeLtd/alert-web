/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/require-default-props */
import React from 'react';
import { Col, Row, Typography } from 'antd';
import moment from 'moment-timezone';
import { IoLocationOutline } from 'react-icons/io5';

interface Props {
  incident: {
    subject: string;
    date: string;
    location: {
      full: string;
    };
  };
  incidentKey?: string;
  activeIncident?: string | string[];
}
const Incident: React.FC<Props> = ({
  incident,
  incidentKey,
  activeIncident,
}: Props) => {
  const { subject, date, location } = incident;
  // const active = activeIncident?.includes(incidentKey || ' ');
  // const active = activeIncident === incidentKey;
  const active = false;

  return (
    <Row className="incident-list-item" key={subject || date}>
      <Col span={24}>
        <Typography.Title className="incident-title" level={4}>
          {subject || 'Incident'}
        </Typography.Title>
        <Row>
          <Typography.Text className="date-time" type="secondary">
            {moment.tz(date, 'Europe/London').format('DD/MM/YYYY - HH:mm')}
          </Typography.Text>
        </Row>
        <Row align="top" wrap={false} className="location">
          <div className="icon-container">
            <IoLocationOutline color="#de4436" size={13} />
          </div>
          <Typography.Text ellipsis={!active} type="secondary">
            {location.full}
          </Typography.Text>
        </Row>
      </Col>
    </Row>
  );
};
export default Incident;
