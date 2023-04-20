import React from 'react';
import { Button, Card, Col, List, Row, Typography } from 'antd';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-light-svg-icons';
import { Role } from 'graphql/generated';
import type { ReturnProps as Props } from './types/ViewArticle';
import IncidentCard from '../../../components/incidents/IncidentCard';
import OffenderCard from '../../../components/offenders/OffenderCard';

const ViewArticleView = ({
  data,
  loading,
  openLightbox,
  lightBoxOpen,
  lightboxElements,
  onDeleteArticle,
  role,
}: Props) => (
  <>
    <div className="page-view">
      {role === Role.SchemeAdmin && (
        <Row style={{ padding: '10px 20px 15px' }} justify="end">
          <Col>
            <Button onClick={onDeleteArticle}>
              <FontAwesomeIcon style={{ marginRight: 10 }} icon={faTrash} />
              Delete Bulletin
            </Button>
          </Col>
        </Row>
      )}
      <Card style={{ marginLeft: 20, marginRight: 20 }} loading={loading}>
        <Typography.Title level={2}>{data?.article?.title}</Typography.Title>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: data?.article?.rows[0].columns[0].text || '',
          }}
        />
      </Card>
      {data?.article?.rows[0].columns[0].incidents &&
        data?.article?.rows[0].columns[0].incidents.length > 0 && (
          <Card style={{ marginLeft: 20, marginRight: 20 }}>
            <Typography.Title level={2}>Incidents</Typography.Title>
            <Row>
              {data?.article?.rows[0].columns[0].incidents.map((el) => (
                <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={el?.id}>
                  <IncidentCard incident={el} openLightbox={openLightbox} />
                </Col>
              ))}
            </Row>
          </Card>
        )}
      {data?.article?.rows[0].columns[0].offenders &&
        data?.article?.rows[0].columns[0].offenders.length > 0 && (
          <Card style={{ marginLeft: 20, marginRight: 20 }}>
            <Typography.Title level={2}>Offenders</Typography.Title>
            <Row>
              {data?.article?.rows[0].columns[0].offenders.map((el) => (
                <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={el?.id}>
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
      {data?.article?.documents && data?.article?.documents.length > 0 && (
        <List
          style={{ marginLeft: 20, marginRight: 20 }}
          grid={{ gutter: 16, column: 4 }}
          dataSource={data?.article?.documents}
          renderItem={(item) => (
            <List.Item>
              <Card>
                <Typography.Title level={4}>
                  <a target="_blank" href={item.url} rel="noreferrer">
                    {item.name}
                  </a>
                </Typography.Title>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
    <Lightbox
      open={lightBoxOpen.open}
      close={() => openLightbox([], 0)}
      plugins={[Zoom]}
      index={lightBoxOpen.index}
      slides={lightboxElements}
      controller={{
        closeOnBackdropClick: true,
      }}
      render={{
        slide: (slide: WatermarkSlideType) => <WatermarkSlide slide={slide} />,
      }}
    />
  </>
);

export default ViewArticleView;
