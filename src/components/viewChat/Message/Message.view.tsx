/* eslint-disable react/require-default-props */
import React from 'react';
import { Row, Col, Typography, Avatar } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

import WatermarkImage from 'components/images/WatermarkImage.view';
import {
  CrimeGroupData,
  ImageCardData,
  IncidentCardData,
  OffenderCardData,
  VehicleData,
} from 'types/DataType';

import {
  CrimeGroupMessageList,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';

const { Text } = Typography;

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
  images?: ImageCardData[];
  offenders?: OffenderCardData[];
  incidents?: IncidentCardData[];
  vehicles?: VehicleData[];
  crimeGroups?: CrimeGroupData[];
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
  vehicles,
  crimeGroups,
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
        <>
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
                    <Col
                      key={image.id}
                      span={getImageSpan(images.length, index)}
                    >
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
              <OffenderMessageCard key={offender.id} offender={offender} />
            ))}
          {incidents &&
            incidents.length > 0 &&
            incidents.map((incident) => (
              <IncidentMessageCard key={incident.id} incident={incident} />
            ))}
          {vehicles &&
            vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <VehicleMessageCard key={vehicle.id} vehicle={vehicle} />
            ))}

          {crimeGroups && crimeGroups.length > 0 && (
            <CrimeGroupMessageList crimeGroups={crimeGroups} />
          )}
          {content && (
            <Row key={id}>
              <div className="message-content-bubble">
                <Col>
                  <Text>{getContent(content)}</Text>
                </Col>
              </div>
            </Row>
          )}
        </>
      </div>
    </Col>
  </Row>
);

export default Content;
