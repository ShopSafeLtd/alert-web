/* eslint-disable react/require-default-props */
import type { WatermarkSlideType } from '#/components/images/WatermartkSlide.view';
import type { Theme } from 'configs/ThemeConfig';
import type {
  ArticleData,
  CrimeGroupData,
  ImageCardData,
  IncidentCardData,
  OffenderCardData,
  VehicleData,
} from 'types/DataType';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import WatermarkSlide from '#/components/images/WatermartkSlide.view';
import downloadImage from '#/utils/images/download-image';
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
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

const { Text } = Typography;
const useStyles = createUseStyles((theme: Theme) => ({
  button: {
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    border: 'none',
    borderRadius: 6,
    bottom: 8,
    color: '#fff',
    cursor: 'pointer',
    height: 32,
    padding: '0px 8px',
    position: 'absolute',
    right: 8,

    zIndex: 10,
  },
  entityCard: {
    '& > a': {
      textDecoration: 'none',
    },
    '& > a > div, & > div': {
      backgroundColor: 'transparent !important',
      border: 'none !important',
      borderRadius: 8,
      cursor: 'pointer',
      margin: 0,
      padding: '8px 0',
      transition: 'all 0.2s ease',
    },

    '&:hover': {
      '& > a > div': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.02)'
            : 'rgba(0, 0, 0, 0.01)',
        transform: 'translateX(2px)',
      },
    },

    '&:last-child': {
      marginBottom: 0,
    },

    marginBottom: 8,
  },
  imageContainer: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  imageGrid: {
    display: 'grid',
    gap: 4,
    marginBottom: 8,
  },
  messageContentWrapper: {
    margin: 0,
    padding: 0,
  },
  messageText: {
    margin: 0,
    wordWrap: 'break-word',
  },
  multiImageGrid: {
    '& > div': {
      borderRadius: 8,
      overflow: 'hidden',
    },
  },
  singleImage: {
    borderRadius: 8,
    cursor: 'pointer',
    height: 300,
    minWidth: 250,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
}));
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
  date,
  from,
  images,
  incidents,
  offenders,
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
    <div className={classes.messageContentWrapper}>
      {/* Show user info and date only if requested (legacy support) */}
      {showUser && date && (
        <Row
          style={{
            marginBottom: 8,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
          }}
        >
          <Col style={{ marginRight: 20 }}>
            <Text strong style={{ fontSize: 13 }}>
              {/* eslint-disable-next-line formatjs/no-literal-string-in-jsx */}
              {`${from?.fullName}${
                from?.businesses && from?.businesses[0]?.fullName
                  ? `(${from?.businesses[0].fullName})`
                  : ''
              }`}
            </Text>
          </Col>
          <Col>
            <Text style={{ fontSize: 13 }} type="secondary">
              {date}
            </Text>
          </Col>
        </Row>
      )}

      {images && images.length > 0 && (
        <div className={classes.imageGrid}>
          {images.length === 1 ? (
            images.map((image, index) => (
              <div className={classes.singleImage} key={image.id}>
                <PermissionCheckWrapper
                  permission={{
                    method: PermissionMethod.Edit,
                    model: PermissionModel.Chat,
                  }}
                  unauthorizedElement={<div />}
                >
                  <Button className={classes.button}>
                    <FontAwesomeIcon
                      icon={faDownload}
                      onClick={(e) => {
                        e.stopPropagation();
                        void downloadImage(
                          image.optimised || image.url || '',
                          `${image.id}`
                        );
                      }}
                      size="sm"
                    />
                  </Button>
                </PermissionCheckWrapper>
                <div
                  onClick={() => {
                    triggerLightbox(
                      images.map((el) => ({
                        src: el.optimised || '',
                      })) || [],
                      index
                    );
                  }}
                  style={{ height: 300, width: '100%' }}
                >
                  <WatermarkImage url={image.optimised} />
                </div>
              </div>
            ))
          ) : (
            <div className={classes.multiImageGrid}>
              <Row style={{ width: '100%' }}>
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
            </div>
          )}
        </div>
      )}
      {offenders && offenders.length > 0 && (
        <div>
          {offenders.map((offender) => (
            <div className={classes.entityCard} key={offender.id}>
              <Link to={`/app/offenders/${offender.id}`}>
                <OffenderMessageCard
                  offender={offender}
                  triggerLightbox={triggerLightbox}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      {incidents && incidents.length > 0 && (
        <div>
          {incidents.map((incident) => (
            <div className={classes.entityCard} key={incident.id}>
              <Link to={`/app/incidents/${incident.id}`}>
                <IncidentMessageCard
                  incident={incident}
                  triggerLightbox={triggerLightbox}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      {vehicles && vehicles.length > 0 && (
        <div>
          {vehicles.map((vehicle) => (
            <div className={classes.entityCard} key={vehicle.id}>
              <Link to={`/app/vehicles/${vehicle.id}`}>
                <VehicleMessageCard
                  triggerLightbox={triggerLightbox}
                  vehicle={vehicle}
                />
              </Link>
            </div>
          ))}
        </div>
      )}

      {crimeGroups && crimeGroups.length > 0 && (
        <div className={classes.entityCard}>
          <CrimeGroupMessageList crimeGroups={crimeGroups} />
        </div>
      )}

      {articles && articles.length > 0 && (
        <div>
          {articles.map((article) => (
            <div className={classes.entityCard} key={article.id}>
              <Link to={`/app/bulletins/${article.id}`}>
                <ArticleMessageCard
                  article={article}
                  triggerLightbox={triggerLightbox}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
      {content && (
        <div className={classes.messageText}>
          <Text>{getContent(content)}</Text>
        </div>
      )}

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
