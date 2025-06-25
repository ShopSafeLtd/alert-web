import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';

import {
  faClock,
  faEdit,
  faPrint,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card, Col, List, Row, Typography } from 'antd';
import InlineWatermarkProcessor from 'components/images/InlineWatermarkProcessor';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom'; // Import useIntl hook
import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { createUseStyles } from 'react-jss';

import type { ReturnProps as Props } from './types/ViewArticle';

import IncidentCard from '../../../components/incidents/IncidentCard';
import OffenderCard from '../../../components/offenders/OffenderCard';

const { Text, Title } = Typography;

const useStyles = createUseStyles(() => ({
  articleContent: {
    '& .article-content': {
      '& img': {
        height: 'auto',
        maxWidth: '100%',
      },
      marginTop: 20,
      width: '100%',
    },
    '@media print': {
      '& .watermark-overlay': {
        '-webkit-print-color-adjust': 'exact',
        opacity: '0.3 !important',
        'print-color-adjust': 'exact',
      },
    },
  },
  content: {
    height: '100vh',
    width: '100%',
  },
  detailsContainer: {
    height: '100%',
  },
  viewArticle: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '15px',
    width: '100%',
  },
}));

const ViewArticleView = ({
  componentRef,
  data,
  editArticle,
  handlePrint,
  lightBoxOpen,
  lightboxElements,
  loading,
  onDeleteArticle,
  openLightbox,
}: Props) => {
  const classes = useStyles();

  const intl = useIntl();

  // Image click handling is now managed by InlineWatermarkProcessor

  return (
    <>
      <div className={classes.viewArticle}>
        <Row className={classes.content}>
          <Col className={classes.detailsContainer} span={24}>
            <Row justify="end" style={{ padding: '10px 20px 15px' }}>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Articles,
                }}
                unauthorizedElement={<div />}
              >
                <Col style={{ marginRight: 10 }}>
                  <Button onClick={handlePrint}>
                    <FontAwesomeIcon
                      icon={faPrint}
                      style={{ marginRight: 10 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Print',
                    })}
                  </Button>
                </Col>
              </PermissionCheckWrapper>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Edit,
                  model: PermissionModel.Articles,
                }}
                unauthorizedElement={<div />}
              >
                <Col style={{ marginRight: 10 }}>
                  <Button onClick={editArticle}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      style={{ marginRight: 10 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Edit Bulletin',
                    })}
                  </Button>
                </Col>
              </PermissionCheckWrapper>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Delete,
                  model: PermissionModel.Articles,
                }}
                unauthorizedElement={<div />}
              >
                <Col>
                  <Button onClick={onDeleteArticle}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ marginRight: 10 }}
                    />
                    {intl.formatMessage({
                      defaultMessage: 'Delete Bulletin',
                    })}
                  </Button>
                </Col>
              </PermissionCheckWrapper>
            </Row>
            <Card
              loading={loading}
              style={{
                marginLeft: 20,
                marginRight: 20,
              }}
            >
              <Title level={2}>{data?.article?.title}</Title>
              <Row gutter={60} style={{ marginBottom: 5 }}>
                <Col>
                  <FontAwesomeIcon
                    className="feedItem-card-icon"
                    icon={faUser}
                    size="sm"
                    style={{ marginRight: 5 }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 400,
                    }}
                  >
                    {intl.formatMessage({
                      defaultMessage: 'Author:',
                    })}
                  </Text>
                  <Text>{data?.article?.createdBy?.fullName}</Text>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    className="feedItem-card-icon"
                    icon={faClock}
                    style={{ marginRight: 5 }}
                  />
                  {data?.article?.completedAt ? (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Published:',
                        })}
                      </Text>
                      <Text>
                        {FormatCalendar(data?.article?.completedAt, intl)}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 400,
                        }}
                      >
                        {intl.formatMessage({
                          defaultMessage: 'Updated:',
                        })}
                      </Text>
                      <Text>
                        {FormatCalendar(data?.article?.updatedAt as Date, intl)}
                      </Text>
                    </>
                  )}
                  {data?.article?.completedAt &&
                    data?.article?.completedAt !== data?.article?.updatedAt && (
                      <>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 400,
                          }}
                        >
                          {intl.formatMessage({
                            defaultMessage: '| Updated:',
                          })}
                        </Text>
                        <Text>
                          {FormatCalendar(data?.article?.updatedAt, intl)}
                        </Text>
                      </>
                    )}
                </Col>
              </Row>
              <Row gutter={60} style={{ marginBottom: 5 }}>
                <Col className={classes.articleContent}>
                  <div ref={componentRef}>
                    <InlineWatermarkProcessor
                      className="article-content"
                      htmlContent={data?.article?.rows[0].columns[0].text || ''}
                      onImageClick={(src, index) => {
                        const container = componentRef.current;
                        if (!container) return;

                        const imageNodes = container.querySelectorAll('img');
                        const allImageUrls = [...imageNodes].map(
                          (img) => img.src
                        );

                        openLightbox(
                          allImageUrls.map((url) => ({ src: url })),
                          index
                        );
                      }}
                    />
                  </div>
                </Col>
              </Row>
            </Card>
            {data?.article?.rows[0].columns[0].incidents &&
              data?.article?.rows[0].columns[0].incidents.length > 0 && (
                <Card
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Incidents',
                    })}
                  </Typography.Title>
                  <Row>
                    {data?.article?.rows[0].columns[0].incidents.map((el) => (
                      <Col key={el?.id} lg={12} md={12} sm={24} xl={8} xxl={6}>
                        <IncidentCard
                          incident={{
                            ...el,
                            totalImages: el?.images?.length,
                          }}
                          openLightbox={openLightbox}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              )}
            {data?.article?.rows[0].columns[0].offenders &&
              data?.article?.rows[0].columns[0].offenders.length > 0 && (
                <Card
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                >
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      defaultMessage: 'Offenders',
                    })}
                  </Typography.Title>
                  <Row>
                    {data?.article?.rows[0].columns[0].offenders.map((el) => (
                      <Col key={el?.id} lg={12} md={12} sm={24} xl={8} xxl={6}>
                        <OffenderCard
                          isArticle
                          offender={el}
                          openLightbox={openLightbox}
                        />
                      </Col>
                    ))}
                  </Row>
                </Card>
              )}
            {data?.article?.documents &&
              data?.article?.documents.length > 0 && (
                <List
                  dataSource={data?.article?.documents}
                  grid={{
                    column: 4,
                    gutter: 16,
                  }}
                  renderItem={(item) => (
                    <List.Item>
                      <Card>
                        <Typography.Title level={4}>
                          <a href={item.url} rel="noreferrer" target="_blank">
                            {item.name}
                          </a>
                        </Typography.Title>
                      </Card>
                    </List.Item>
                  )}
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                />
              )}
          </Col>
        </Row>
      </div>
      <Lightbox
        close={() => openLightbox([], 0)}
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
    </>
  );
};

export default ViewArticleView;
