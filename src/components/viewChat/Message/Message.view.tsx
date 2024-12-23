/* eslint-disable react/require-default-props */
import type { WatermarkSlideType } from '#/components/images/WatermartkSlide.view';
import type {
  ArticleData,
  CrimeGroupData,
  ImageCardData,
  IncidentCardData,
  OffenderCardData,
  VehicleData,
} from 'types/DataType';

import WatermarkSlide from '#/components/images/WatermartkSlide.view';
import downloadImage from '#/utils/images/download-image';
import { faDownload } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Col, Row, Typography } from 'antd';
import {
  ArticleMessageCard,
  CrimeGroupMessageList,
  IncidentMessageCard,
  OffenderMessageCard,
  VehicleMessageCard,
} from 'components/MessageInput/MessageCard';
import WatermarkImage from 'components/images/WatermarkImage.view';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
const { Text } = Typography;
const useStyles = createUseStyles({
  button: {
    bottom: 5,
    color: 'fff',
    cursor: ' pointer',
    height: 30,
    padding: '0px 8px',
    position: 'absolute',
    right: 5,
    zIndex: 10,
  },
});
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
      className="chat-collage-image"
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
      {/* TODO: add in the preview functionality  */}
      {/* <div */}
      {/*   style={{ */}
      {/*     color: 'black', */}
      {/*   }} */}
      {/*   className="chat-collage-image-overlay" */}
      {/* > */}
      {/*   <EyeOutlined style={{ marginRight: 5 }} /> */}
      {/*   <FormattedMessage defaultMessage="Preview" id="TJo5E6" /> */}
      {/* </div> */}
    </div>
  );
};

interface Props {
  articles?: ArticleData[];
  content: string;
  crimeGroups?: CrimeGroupData[];
  currentUser?: boolean | null | undefined;
  date: null | string | undefined;
  from?:
    | {
        businesses: { fullName: string; id: string }[] | null;
        firstLetter?: null | string | undefined;
        fullName?: null | string | undefined;
        id: string;
        origFirstLetter?: null | string | undefined;
        origName?: null | string | undefined;
      }
    | null
    | undefined;
  id: string;
  images?: ImageCardData[];
  incidents?: IncidentCardData[];
  offenders?: OffenderCardData[];
  paddingTop?: boolean | null | undefined;
  showUser?: boolean | null | undefined;
  vehicles?: VehicleData[];
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

const Content = ({
  articles,
  content,
  crimeGroups,
  currentUser,
  date,
  from,
  id,
  images,
  incidents,
  offenders,

  paddingTop,
  showUser,
  vehicles,
}: Props): JSX.Element => {
  const classes = useStyles();
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        index,
        open: !lightBoxOpen.open,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            index,
            open: !lightBoxOpen.open,
          }),
        0.3
      );
    }
  };
  return (
    <div>
      <Row
        gutter={8}
        justify={currentUser ? 'end' : 'start'}
        style={{ marginTop: paddingTop ? 15 : 0 }}
      >
        {showUser && (
          <Col>
            <Avatar className="message-avatar">{from?.origFirstLetter}</Avatar>
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
                marginBottom: 0,
                marginLeft: 15,
                marginRight: 10,
                marginTop: 8,
              }}
            >
              {showUser && (
                <Col
                  style={{
                    marginRight: 20,
                  }}
                >
                  <Text strong style={{ fontSize: 13 }}>
                    {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions,formatjs/no-literal-string-in-jsx */}
                    {`${from?.fullName}${
                      from?.businesses && from?.businesses[0]?.fullName
                        ? `(${from?.businesses[0].fullName})`
                        : ''
                    }`}
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
                  images.map((image, index) => (
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
                          triggerLightbox(
                            images.map((el) => ({
                              src: el.optimised || '',
                            })) || [],
                            index
                          );
                        }}
                        style={{ height: 300, width: 300 }}
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
                        onClick={() => {
                          triggerLightbox(
                            images.map((el) => ({
                              src: el.optimised || '',
                            })) || [],
                            index
                          );
                        }}
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
                  triggerLightbox={triggerLightbox}
                />
              ))}
            {incidents &&
              incidents.length > 0 &&
              incidents.map((incident) => (
                <IncidentMessageCard
                  incident={incident}
                  key={incident.id}
                  triggerLightbox={triggerLightbox}
                />
              ))}
            {vehicles &&
              vehicles.length > 0 &&
              vehicles.map((vehicle) => (
                <VehicleMessageCard
                  key={vehicle.id}
                  triggerLightbox={triggerLightbox}
                  vehicle={vehicle}
                />
              ))}

            {crimeGroups && crimeGroups.length > 0 && (
              <CrimeGroupMessageList crimeGroups={crimeGroups} />
            )}
            {articles &&
              articles.length > 0 &&
              articles.map((article) => (
                <ArticleMessageCard
                  article={article}
                  key={article.id}
                  triggerLightbox={triggerLightbox}
                />
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
      {lightboxElements && lightBoxOpen && (
        <Lightbox
          close={() => triggerLightbox([], 0)}
          controller={{
            closeOnBackdropClick: true,
          }}
          index={lightBoxOpen.index}
          open={lightBoxOpen.open}
          plugins={[Zoom]}
          render={{
            slide: (slide: WatermarkSlideType) => (
              <WatermarkSlide slide={slide} />
            ),
          }}
          slides={lightboxElements}
        />
      )}
    </div>
  );
};
export default Content;
