import React from 'react';
import styled from 'styled-components';
import Moment from 'react-moment';
import { Typography, Row, Col, Tag } from 'antd'

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

const { Title, Text, Paragraph } = Typography

class AlertCardDescription extends React.Component {
  render() {
    const { subject, date, time, crimeTypes, description, user, groups } =
      this.props;
    return (
      <AlertDescription>
        <Container>
          <Title className="feed-card-title" level={4}>
            {subject}
          </Title>
          <Row gutter={8}>
            <Col>
              <Text className="incident-card-date" type="secondary">
                <Moment format="HH:mm">{time}</Moment>
              </Text>
            </Col>
            <Col>
              <Text className="incident-card-date" type="secondary">
                <Moment format="DD/MM/YYYY">{date}</Moment>
              </Text>
            </Col>
          </Row>
          <Row gutter={4}>
            {groups.map((el) => (
              <Col>
                <Text style={{ marginRight: '9px' }}>{`${el.name}`}</Text>
              </Col>
            ))}
          </Row>
          <div gutter={16} className="alert-crime-tags">
            {crimeTypes.map(({ name, id }) => {
              return (
                <Tag color="volcano" key={id}>{name}</Tag>
              );
            })}
          </div>
          <Paragraph type="secondary">
            {description}
          </Paragraph>
        </Container>
        <User>
          <Text className="incident-card-user" type="secondary">
            {user === null ? 'Deleted User' : user.fullName}{' '}
            {user !== null && '-'}{' '}
            {user !== null && user.organisation}
          </Text>
        </User>
      </AlertDescription>
    );
  }
}

export default AlertCardDescription;
