/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Row, Col, Card, Descriptions, Typography, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';

const { Title, Paragraph, Text } = Typography;

interface DatedMessages {
  id?: string;
  content?: string | undefined | null;
  from?: {
    id: string;
    fullName: string;
    businesses: { id: string; name: string }[];
  };
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
  createdAt?: Moment;
}

const getMessageDate = (date?: Moment) => {
  if (date?.week() === moment().week()) {
    if (date.format('DD/MM/YY') === moment().add(-1, 'days').format('DD/MM/YY'))
      return `Yesterday ${date?.format('HH:mm')}`;
    if (date?.dayOfYear() === moment().dayOfYear()) return date.format('HH:mm');
    return date.format('dddd HH:mm');
  }
  return date?.format('DD/MM HH:mm');
};

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

const CollageImage = ({ index, length, src }: CollageImageProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onClick={() => setVisible(true)}
      onKeyPress={() => setVisible(true)}
      role="button"
      tabIndex={index}
      className="update-collage-image"
      style={{
        backgroundColor: 'grey',
        height: getImageHeight(length, index),
        margin: getImageMargin(length, index),
        backgroundImage: `url(${src})`,
      }}
    >
      <div className="chat-collage-image-overlay">
        <EyeOutlined style={{ marginRight: 5 }} /> Preview
      </div>
      <Image
        preview={{
          visible,
          src: src || undefined,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
      />
    </div>
  );
};

interface Props extends DatedMessages {
  userId: string | undefined;
  showUser?: boolean;
  showDate?: boolean;
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

const UpdateContent = ({
  from,
  images,
  offenders,
  incidents,
  content,
  id,
  userId,
  showUser,
  showDate,
  createdAt,
}: Props): JSX.Element => (
  <Row
    gutter={8}
    style={{
      marginTop: showDate ? 10 : 0,
    }}
    className="update-container"
  >
    <Col>
      <div
        className={
          showUser
            ? 'update-content-card currentUser-card'
            : 'update-content-card'
        }
      >
        {showDate && (
          <Row
            style={{
              marginTop: 8,
              marginLeft: 15,
              marginRight: 10,
              marginBottom: 0,
            }}
          >
            <Col
              style={{
                marginRight: 20,
              }}
              flex={1}
            >
              <Text ellipsis style={{ fontSize: 13 }} strong>
                {userId !== from?.id ? from?.fullName : 'You'}
              </Text>
            </Col>
            <Col>
              <Text style={{ fontSize: 13 }} type="secondary">
                {getMessageDate(moment(createdAt))}
              </Text>
            </Col>
          </Row>
        )}
        {images && images.length > 0 && (
          <Row style={{ margin: 5 }}>
            {images.length === 1 ? (
              images.map((image) => (
                <Col key={image.id}>
                  <div>
                    <Image
                      style={{ maxWidth: 240 }}
                      src={image.optimised || ''}
                      alt={image.id}
                    />
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
          offenders.map((offender) => (
            <Row key={offender.id} style={{ margin: 5 }}>
              <Col key={offender.id}>
                <Card
                  style={{ borderRadius: 5 }}
                  size="small"
                  className="update-card"
                  bodyStyle={{
                    padding: 0,
                  }}
                >
                  <Row gutter={5} wrap={false}>
                    <Col>
                      {offender.images && offender.images.length > 0 && (
                        <Image
                          width={80}
                          height={80}
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
        {incidents &&
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
                  className="update-card"
                  bodyStyle={{
                    padding: 0,
                  }}
                >
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

                      <Paragraph
                        type="secondary"
                        ellipsis
                        style={{
                          marginBottom: '10px',
                        }}
                      >
                        {incident.description}
                      </Paragraph>
                      <Paragraph
                        type="secondary"
                        ellipsis
                        style={{
                          marginBottom: '0',
                        }}
                      >
                        {incident.dayTime}
                      </Paragraph>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          ))}
        {content && (
          <Row key={id}>
            <div className="update-content-bubble">
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

export default UpdateContent;
