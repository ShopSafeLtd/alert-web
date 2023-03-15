/* eslint-disable react/require-default-props */
import React from 'react';
import { Row, Col, Card, Descriptions, Typography, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Title, Paragraph, Text } = Typography;

const getImageSpan = (length: number, index: number) => {
  if (length === 3) {
    if (index === 0) return 24;
    return 12;
  }
  if (length === 4) {
    if (index === 0) return 24;
    return 8;
  }
  if (length >= 5) {
    if ([0, 1].includes(index)) return 12;
    return 8;
  }
  return 12;
};

const getImageHeight = (length: number, index: number) => {
  if (length === 3) {
    if (index === 0) return 200;
    return 150;
  }
  if (length === 4) {
    if (index === 0) return 200;
    return 150;
  }
  if (length >= 5) {
    if ([0, 1].includes(index)) return 200;
    return 150;
  }
  return 300;
};

const getImageMargin = (length: number, index: number) => {
  if (length === 3) {
    if (index === 0) return '0 0 3px';
    if (index === 1) return '0 3px 0 0';
    return '';
  }
  if (length === 4) {
    if (index === 0) return '0 0 3px';
    if ([1, 2].includes(index)) return '0 3px 0 0';
    return '';
  }
  if (length >= 5) {
    if (index === 0) return '0 3px 3px 0';
    if (index === 1) return '0 3px 0 0';
    if ([2, 3].includes(index)) return '0 3px 0 0';
    return '';
  }
  if (index === 0) return '0 3px 0 0';
  return '';
};

interface CollageImageProps {
  src?: string | undefined | null;
  length: number;
  index: number;
}

const CollageImage = ({ index, length, src }: CollageImageProps) => (
  <div
    role="button"
    tabIndex={index}
    className="chat-collage-image"
    style={{
      backgroundColor: 'grey',
      height: getImageHeight(length, index),
      margin: getImageMargin(length, index),
    }}
  >
    <WatermarkImage url={src} />
    <div className="chat-collage-image-overlay">
      <EyeOutlined style={{ marginRight: 5 }} /> Preview
    </div>
    <WatermarkImage url={src} />
  </div>
);

interface Props {
  from?:
    | {
        id: string;
        fullName?: string | null | undefined;
        firstLetter?: string | null | undefined;
      }
    | undefined
    | null;
  images: {
    id: string;
    optimised?: string | null | undefined;
  }[];
  offenders: {
    id: string;
    name?: string | null | undefined;
    updatedAt: Date;
    images: {
      id: string;
      optimised?: string | null | undefined;
    }[];
  }[];
  incidents: {
    id: string;
    subject?: string | null | undefined;
    description?: string | null | undefined;
    dayTime?: string | null | undefined;
    images: {
      id: string;
      optimised?: string | null | undefined;
    }[];
  }[];
  content: string;
  id: string;
  currentUser?: boolean | undefined | null;
  showUser?: boolean | undefined | null;
  paddingTop?: boolean | undefined | null;
  date: string | undefined | null;
}

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

const Content = ({
  from,
  images,
  offenders,
  incidents,
  content,
  id,
  currentUser,
  showUser,
  date,
  paddingTop,
}: Props): JSX.Element => (
  <Row
    gutter={8}
    justify={currentUser ? 'end' : 'start'}
    style={{ marginTop: paddingTop ? 15 : 0 }}
  >
    {showUser && (
      <Col>
        <Avatar className="message-avatar">{from?.firstLetter}</Avatar>
      </Col>
    )}
    <Col>
      <div
        className={
          currentUser
            ? 'message-content-card currentUser-card'
            : 'message-content-card'
        }
        style={{ marginLeft: !currentUser && !showUser ? 48 : 0 }}
      >
        <Row
          style={{
            marginTop: 8,
            marginLeft: 15,
            marginRight: 10,
            marginBottom: 0,
          }}
        >
          {showUser && (
            <Col
              style={{
                marginRight: 20,
              }}
            >
              <Text style={{ fontSize: 13 }} strong>
                {from?.fullName}
              </Text>
            </Col>
          )}
          <Col>
            <Text style={{ fontSize: 13 }} type="secondary">
              {date}
            </Text>
          </Col>
        </Row>
        {images && images.length > 0 && (
          <Row style={{ margin: 5 }}>
            {images.length === 1 ? (
              images.map((image) => (
                <Col key={image.id}>
                  <div style={{ height: 300, width: 300 }}>
                    <WatermarkImage url={image.optimised} />
                  </div>
                </Col>
              ))
            ) : (
              <Row style={{ backgroundColor: '#FFF', width: 500 }}>
                {images.map((image, index) => (
                  <Col key={image.id} span={getImageSpan(images.length, index)}>
                    <CollageImage
                      index={index}
                      length={images.length}
                      src={image.optimised}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Row>
        )}
        {offenders &&
          offenders.length > 0 &&
          offenders.map((offender) => (
            <Row key={offender.id} style={{ margin: 5 }}>
              <Col key={offender.id}>
                <Card
                  style={{ borderRadius: 5 }}
                  size="small"
                  className="message-card"
                >
                  <Row gutter={5} wrap={false}>
                    <Col>
                      {offender.images && offender.images.length > 0 && (
                        <div style={{ width: 100, height: 100 }}>
                          <WatermarkImage url={offender.images[0].optimised} />
                        </div>
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
        {incidents &&
          incidents.length > 0 &&
          incidents.map((incident) => (
            <Row
              key={incident.id}
              justify={showUser ? 'end' : 'start'}
              style={{ margin: 5 }}
            >
              <Col key={incident.id}>
                <Card
                  style={{ borderRadius: 5 }}
                  size="small"
                  className="message-card"
                >
                  <Row gutter={5} wrap={false}>
                    <Col>
                      {incident?.images && incident.images.length > 0 && (
                        <div style={{ width: 100, height: 100 }}>
                          <WatermarkImage url={incident.images[0].optimised} />
                        </div>
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
        {content && (
          <Row key={id}>
            <div className="message-content-bubble">
              <Col>
                <Text>{getContent(content)}</Text>
              </Col>
            </div>
          </Row>
        )}
      </div>
    </Col>
  </Row>
);

export default Content;
