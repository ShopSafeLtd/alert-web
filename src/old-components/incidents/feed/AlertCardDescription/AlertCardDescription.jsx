import React from 'react';
import styled from 'styled-components';
import { Typography, Row, Col } from 'antd';
import moment from 'moment-timezone';

const AlertDescription = styled.div`
  height: 231px;
  padding: 0.5rem 1rem;
  position: relative;
`;
const User = styled(Typography)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: #fff;
  padding: 0.5rem 1rem;
  color: rgba(0, 0, 0, 0.54);
`;
const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 38px;
`;

const { Text, Paragraph } = Typography;

class AlertCardDescription extends React.Component {
  render() {
    const { subject, date, time, crimeTypes, description, user, groups } =
      this.props;
    return (
      <AlertDescription>
        <Container>
          <Row>
            <Col span={20} className="incident-title">
              <Typography.Title ellipsis level={3}>
                {subject}
              </Typography.Title>
              <Row className="incident-date-time">
                <Text className="incident-card-date" type="secondary">
                  {moment
                    .tz(date, 'Europe/London')
                    .format('ddd MMM DD YYYY - ')}
                </Text>
                <Text className="incident-card-date" type="secondary">
                  {moment.tz(time, 'Europe/London').format('HH:mm')}
                </Text>
              </Row>
            </Col>
          </Row>
          <Row className="incident-groups">
            {groups.map((el) => (
              <div key={el.id} className="group">
                <Typography.Text>{el.name}</Typography.Text>
              </div>
            ))}
          </Row>
          <div className="alert-crime-tags">
            {crimeTypes.map(({ name, id }) => {
              return (
                <div key={id} className="main-tag">
                  {name}
                </div>
              );
            })}
          </div>
          <Paragraph type="secondary">{description}</Paragraph>
        </Container>
        <User>
          <Text className="incident-card-user" type="secondary">
            {user === null ? 'Deleted User' : user.fullName}{' '}
            {user !== null && '-'} {user !== null && user.organisation}
          </Text>
        </User>
      </AlertDescription>
    );
  }
}

export default AlertCardDescription;
