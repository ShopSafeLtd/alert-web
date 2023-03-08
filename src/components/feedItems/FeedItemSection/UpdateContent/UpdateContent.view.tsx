import React from 'react';
import { Card, Col, Descriptions, Row, Typography } from 'antd';
import { UpdateType } from 'graphql/generated';

import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessageDots } from '@fortawesome/pro-light-svg-icons';

const { Title, Text, Paragraph } = Typography;
interface UpdateData {
  id: string;
  text?: string | null | undefined;
  type: UpdateType;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
  }[];
  linkedIncidents: {
    id: string;
    subject?: string | null;
    description: string;
    dayTime?: string | null;
    images?: {
      id: string;
      optimised?: string | null;
      url?: string | null;
    }[];
  }[];
  linkedOffenders: {
    id: string;
    updatedAt?: Date;
    name?: string | null;
    images?: { id: string; optimised?: string | null; url?: string | null }[];
  }[];
}
interface Props {
  update: UpdateData | undefined;
  title: string;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 100,
      height: 100,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
);
const UpdateContent = ({ update, title }: Props): JSX.Element => {
  const getContent = (content: string) =>
    content.split(/(@\[.*?\]\(.*?\))/).map((item) => {
      if (item.includes('@[')) {
        return (
          <Text strong key={item}>
            {item.replace('@[', '').replace(/(]\(.*?\))/, '')}{' '}
          </Text>
        );
      }
      return <Text key={item}>{item}</Text>;
    });
  return (
    <>
      {update?.text ? (
        <div style={{ marginBottom: -10 }}>
          <Title level={4} style={{ marginBottom: 2 }} ellipsis>
            {title}
          </Title>

          <Paragraph
            style={{ fontSize: 14, marginTop: 5 }}
            type="secondary"
            ellipsis={{ rows: 3 }}
          >
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faMessageDots}
            />
            {getContent(update.text)}
          </Paragraph>
        </div>
      ) : null}
      {!update?.text ? (
        <>
          {update?.linkedIncidents[0] ? (
            <>
              <Title style={{ fontSize: 14, marginLeft: 5 }}>
                <FontAwesomeIcon
                  size="sm"
                  className="feedItem-card-icon"
                  icon={faMessageDots}
                />
                Link an incident
              </Title>
              <Card
                style={{ borderRadius: 5, margin: 0 }}
                size="small"
                className="message-card"
              >
                <Row gutter={5} wrap={false}>
                  <Col>
                    {update.linkedIncidents[0].images &&
                    update.linkedIncidents[0].images.length > 0 ? (
                      <ImageContainer
                        src={
                          update.linkedIncidents[0].images[0].optimised || ''
                        }
                      />
                    ) : null}
                  </Col>
                  <Col
                    flex={1}
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Paragraph
                      strong
                      ellipsis
                      style={{
                        marginBottom: '0.5rem',
                        fontSize: 15,
                      }}
                    >
                      {update.linkedIncidents[0].subject}
                    </Paragraph>
                    <Descriptions size="small">
                      <Descriptions.Item label="Created At">
                        {update.linkedIncidents[0].dayTime}
                      </Descriptions.Item>
                    </Descriptions>
                    <Paragraph
                      type="secondary"
                      ellipsis
                      style={{
                        marginBottom: '0.5rem',
                      }}
                    >
                      {update.linkedIncidents[0].description}
                    </Paragraph>
                  </Col>
                </Row>
              </Card>
            </>
          ) : null}
          {update?.linkedOffenders[0] ? (
            <>
              <Title style={{ fontSize: 14, marginLeft: 5 }}>
                <FontAwesomeIcon
                  size="sm"
                  className="feedItem-card-icon"
                  icon={faMessageDots}
                />
                Link an offender
              </Title>
              <Card
                style={{ borderRadius: 5, margin: 0 }}
                size="small"
                className="message-card"
              >
                <Row gutter={5} wrap={false}>
                  <Col>
                    {update.linkedOffenders[0].images &&
                    update.linkedOffenders[0].images.length > 0 ? (
                      <ImageContainer
                        src={
                          update.linkedOffenders[0].images[0].optimised || ''
                        }
                      />
                    ) : null}
                  </Col>

                  <Col
                    flex={1}
                    style={{
                      marginTop: 10,
                      marginLeft: 5,
                    }}
                  >
                    <Title level={4}>{update.linkedOffenders[0].name}</Title>
                    <Descriptions size="small">
                      <Descriptions.Item label="Last Active">
                        {moment(
                          update.linkedOffenders[0].updatedAt || moment()
                        ).format(`ddd MMM DD YYYY - HH:mm`)}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </Card>
            </>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default UpdateContent;
