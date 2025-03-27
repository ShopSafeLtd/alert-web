/* eslint-disable react/require-default-props */
import type { Dayjs } from 'dayjs';
import type {
  ArticleData,
  CrimeGroupData,
  ImageCardData,
  IncidentCardData,
  OffenderCardData,
  VehicleData,
} from 'types/DataType';

import downloadImage from '#/utils/images/download-image';
import { EyeOutlined } from '@ant-design/icons';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row, Typography } from 'antd';
import {
  ArticleMessageCard,
  CrimeGroupMessageList,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import WatermarkImage from 'components/images/WatermarkImage.view';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);

const { Text } = Typography;
const useStyles = createUseStyles({
  button: {
    bottom: 5,
    color: 'fff',
    cursor: ' pointer',
    height: 30,
    padding: '0px 5px',
    position: 'absolute',
    right: 5,
    zIndex: 10,
  },
});
interface DatedMessages {
  articles?: ArticleData[];
  content?: null | string | undefined;
  createdAt?: Dayjs;
  crimeGroups?: CrimeGroupData[];
  from?: {
    businesses: { fullName: string; id: string; name: string }[];
    id: string;
    origName: string;
  };
  id?: string;
  images?: ImageCardData[];
  incidents?: IncidentCardData[];
  offenders?: OffenderCardData[];
  vehicles?: VehicleData[];
}

const getMessageDate = (date?: Dayjs) => {
  if (date?.week() === dayjs().week()) {
    if (date.format('DD/MM/YY') === dayjs().add(-1, 'days').format('DD/MM/YY'))
      return `Yesterday ${date?.format('HH:mm')}`;
    if (date?.dayOfYear() === dayjs().dayOfYear()) return date.format('HH:mm');
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
  index: number;
  length: number;
  onDownload: () => void;
  src?: null | string | undefined;
}

const CollageImage = ({
  index,
  length,
  onDownload,
  src,
}: CollageImageProps) => {
  const classes = useStyles();
  return (
    <div
      className="update-collage-image"
      role="button"
      style={{
        backgroundColor: 'grey',
        height: getImageHeight(length, index),
        margin: getImageMargin(length, index),
      }}
      tabIndex={index}
    >
      <Button className={classes.button}>
        <FontAwesomeIcon icon={faDownload} onClick={onDownload} size="sm" />
      </Button>
      <WatermarkImage url={src} />
      <div className="chat-collage-image-overlay">
        <EyeOutlined style={{ marginRight: 5 }} />
        <FormattedMessage defaultMessage="Preview" />
      </div>
      <div>
        <WatermarkImage url={src} />
      </div>
    </div>
  );
};

interface Props extends DatedMessages {
  onOpenLightbox?: (
    elements: {
      src: string;
    }[],
    index?: number
  ) => void;
  showDate?: boolean;
  showUser?: boolean;
  userId: string | undefined;
}

const getContent = (content: string) =>
  content.split(/(@\[.*?])/).map((item) => {
    if (item.startsWith('@[')) {
      return (
        <Text key={item} strong>
          {item.replace('@[', '').replace(']', '')}
        </Text>
      );
    }
    return <Text key={item}>{item}</Text>;
  });

const UpdateContent = ({
  articles,
  content,
  createdAt,
  crimeGroups,
  from,
  id,
  images,
  incidents,
  offenders,
  onOpenLightbox,
  showDate,
  showUser,
  userId,
  vehicles,
}: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Row
      className="update-container"
      gutter={8}
      // justify={userId === from?.id ? 'end' : 'start'}
      style={{
        marginTop: showDate ? 10 : 0,
      }}
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
                marginBottom: 0,
                marginLeft: 15,
                marginRight: 10,
                marginTop: 8,
              }}
            >
              <Col
                flex={1}
                style={{
                  marginRight: 20,
                }}
              >
                <Text ellipsis strong style={{ fontSize: 13 }}>
                  {userId === from?.id
                    ? intl.formatMessage({
                        defaultMessage: 'You',
                      })
                    : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions,formatjs/no-literal-string-in-jsx
                      `${from?.origName}${
                        from?.businesses?.[0]?.fullName
                          ? `(${from?.businesses[0].fullName})`
                          : ''
                      }`}
                </Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 13 }} type="secondary">
                  {getMessageDate(dayjs(createdAt))}
                </Text>
              </Col>
            </Row>
          )}
          {images && images.length > 0 && (
            <Row style={{ margin: 5 }}>
              {images.length === 1 ? (
                images.map((image) => (
                  <Col key={image.id}>
                    <Button className={classes.button}>
                      <FontAwesomeIcon
                        icon={faDownload}
                        onClick={() =>
                          // eslint-disable-next-line no-void
                          void downloadImage(
                            image.optimised || image.url || '',
                            `${image.id}`
                          )
                        }
                        size="sm"
                      />
                    </Button>
                    <div
                      onClick={() => {
                        if (onOpenLightbox)
                          onOpenLightbox(
                            images.map((item) => ({
                              src: item.optimised ?? '',
                            })),
                            0
                          );
                      }}
                      style={{ cursor: 'pointer', height: 240, width: 240 }}
                    >
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
                        onDownload={() =>
                          // eslint-disable-next-line no-void
                          void downloadImage(
                            image.optimised || image.url || '',
                            `${image.id}`
                          )
                        }
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
              <OffenderMessageCard
                key={offender.id}
                offender={offender}
                triggerLightbox={onOpenLightbox}
              />
            ))}
          {incidents &&
            incidents.length > 0 &&
            incidents.map((incident) => (
              <IncidentMessageCard
                incident={incident}
                key={incident.id}
                triggerLightbox={onOpenLightbox}
              />
            ))}
          {vehicles &&
            vehicles.length > 0 &&
            vehicles.map((vehicle) => (
              <VehicleMessageCard
                key={vehicle.id}
                triggerLightbox={onOpenLightbox}
                vehicle={vehicle}
              />
            ))}

          {crimeGroups && crimeGroups.length > 0 && (
            <CrimeGroupMessageList crimeGroups={crimeGroups} isIntel />
          )}
          {articles &&
            articles.length > 0 &&
            articles.map((article) => (
              <ArticleMessageCard
                article={article}
                key={article.id}
                triggerLightbox={onOpenLightbox}
              />
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
};

export default UpdateContent;
