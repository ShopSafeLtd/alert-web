/* eslint-disable react/require-default-props */
import React from 'react';
import { Row, Col, Card, Descriptions, Typography, Image } from 'antd';
import { MessageType } from 'types';
import moment from 'moment';

const { Title, Paragraph } = Typography;

interface DatedMessages {
  type: string;
  id?: string;
  content?: string;
  from?: { id: string; fullName: string; organisation: string };
  images?: { id: string; optimised?: string | null; url?: string | null }[];
  incidents?: {
    id: string;
    subject?: string | null;
    description: string;
    dayTime?: string | null;
    images?: { id: string; optimised?: string | null; url?: string | null }[];
  }[];
  offenders?: {
    id: string;
    updatedAt?: Date;
    dateOfBirth?: Date | null;
    name?: string | null;
    images?: { id: string; optimised?: string | null; url?: string | null }[];
  }[];
}

interface Props extends DatedMessages {
  userId: string | undefined;
}
const Content = ({
  from,
  type,
  images,
  offenders,
  incidents,
  content,
  id,
  userId,
}: Props): JSX.Element => (
  <div
    className={
      from?.id === userId
        ? 'message-content-card currentUser-card'
        : 'message-content-card'
    }
  >
    {type === MessageType.message && images && images.length > 0 && (
      <Row style={{ margin: 5 }}>
        {images.map((image) => (
          <Col key={image.id}>
            <div className="message-upload-card">
              <Image width={100} height={100} src={image.optimised || ''} />
            </div>
          </Col>
        ))}
      </Row>
    )}
    {type === MessageType.message &&
      offenders &&
      offenders.length > 0 &&
      offenders.map((offender) => (
        <Row key={offender.id} style={{ margin: 5 }}>
          <Col key={offender.id}>
            <Card size="small" className="message-card">
              <Row gutter={5} wrap={false}>
                <Col>
                  {offender.images && offender.images.length > 0 && (
                    <Image
                      width={100}
                      height={100}
                      src={offender.images[0].optimised || ''}
                    />
                  )}
                </Col>

                <Col
                  flex={1}
                  style={{
                    marginTop: 10,
                    marginLeft: 5,
                  }}
                >
                  <Title level={4}> {offender.name}</Title>
                  <Descriptions size="small">
                    <Descriptions.Item label="Last Active">
                      {moment(offender.updatedAt || moment()).format(
                        `ddd MMM DD YYYY - HH:mm`
                      )}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}
    {type === MessageType.message &&
      incidents &&
      incidents.length > 0 &&
      incidents.map((incident) => (
        <Row
          key={incident.id}
          justify={from?.id === userId ? 'end' : 'start'}
          style={{ margin: 5 }}
        >
          <Col key={incident.id}>
            <Card size="small" className="message-card">
              <Row gutter={5} wrap={false}>
                <Col>
                  {incident?.images && incident.images.length > 0 && (
                    <Image
                      width={100}
                      height={100}
                      src={incident.images[0].optimised || ''}
                    />
                  )}
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
                    {incident.subject}
                  </Paragraph>
                  <Descriptions size="small">
                    <Descriptions.Item label="Created At">
                      {incident.dayTime}
                    </Descriptions.Item>
                  </Descriptions>
                  <Paragraph
                    type="secondary"
                    ellipsis
                    style={{
                      marginBottom: '0.5rem',
                    }}
                  >
                    {incident.description}
                  </Paragraph>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ))}
    {type === MessageType.message && content && (
      <Row key={id}>
        <div className="message-content-bubble">
          <Col>{content}</Col>
        </div>
      </Row>
    )}
  </div>
);

export default Content;
