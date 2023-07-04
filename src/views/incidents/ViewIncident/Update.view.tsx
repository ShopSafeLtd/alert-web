/* eslint-disable react/require-default-props */
import React from 'react';
import { Col, Row, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';
import moment from 'moment';
import WatermarkImage from 'components/images/WatermarkImage.view';
import {
  CrimeGroupMessageList,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import type {
  CrimeGroupData,
  ImageCardData,
  IncidentCardData,
  OffenderCardData,
  VehicleData,
} from 'types/DataType';
import { FormattedMessage, useIntl } from 'react-intl';

const { Text } = Typography;

interface DatedMessages {
  id?: string;
  content?: string | undefined | null;
  from?: {
    id: string;
    origName: string;
    businesses: { id: string; name: string; fullName: string }[];
  };
  images?: ImageCardData[];
  offenders?: OffenderCardData[];
  incidents?: IncidentCardData[];
  vehicles?: VehicleData[];
  crimeGroups?: CrimeGroupData[];
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

const CollageImage = ({ index, length, src }: CollageImageProps) => (
  <div
    role="button"
    tabIndex={index}
    className="update-collage-image"
    style={{
      backgroundColor: 'grey',
      height: getImageHeight(length, index),
      margin: getImageMargin(length, index),
    }}
  >
    <WatermarkImage url={src} />
    <div className="chat-collage-image-overlay">
      <EyeOutlined style={{ marginRight: 5 }} />
      <FormattedMessage defaultMessage="Preview" id="TJo5E6" />
    </div>
    <div>
      <WatermarkImage url={src} />
    </div>
  </div>
);

interface Props extends DatedMessages {
  userId: string | undefined;
  showUser?: boolean;
  showDate?: boolean;
}
const getContent = (content: string) =>
  content.split(/(@\[.*?])/).map((item) => {
    if (item.startsWith('@[')) {
      return (
        <Text strong key={item}>
          {item.replace('@[', '').replace(']', '')}
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
  vehicles,
  crimeGroups,
  content,
  id,
  userId,
  showUser,
  showDate,
  createdAt,
}: Props): JSX.Element => {
  const intl = useIntl();

  return (
    <Row
      gutter={8}
      // justify={userId === from?.id ? 'end' : 'start'}
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
                  {userId === from?.id
                    ? intl.formatMessage({
                        defaultMessage: 'You',
                        id: 'kJ5W29',
                      })
                    : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,formatjs/no-literal-string-in-jsx
                      `${from?.origName}${
                        from?.businesses && from?.businesses[0]?.fullName
                          ? `(${from?.businesses[0].fullName})`
                          : ''
                      }`}
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
                    <div style={{ width: 240, height: 240 }}>
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
            <CrimeGroupMessageList crimeGroups={crimeGroups} isIntel />
          )}
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
};

export default UpdateContent;
