import React from 'react';
import { Button, Card, Col, List, Row, Tag, Typography } from 'antd';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import type { WatermarkSlideType } from 'components/images/WatermartkSlide.view';
import WatermarkSlide from 'components/images/WatermartkSlide.view';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEdit,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Role } from 'graphql/generated';
import formatCalendar from 'utils/format-calendar-24h';
import type { ReturnProps as Props } from './types/ViewArticle';
import IncidentCard from '../../../components/incidents/IncidentCard';
import OffenderCard from '../../../components/offenders/OffenderCard';

const { Title, Text } = Typography;

const ViewArticleView = ({
  data,
  loading,
  openLightbox,
  lightBoxOpen,
  lightboxElements,
  onDeleteArticle,
  role,
  editArticle,
}: Props) => (
  <>
    <div className="page-view">
      {role === Role.SchemeAdmin && (
        <Row style={{ padding: '10px 20px 15px' }} justify="end">
          <Col style={{ marginRight: 10 }}>
            <Button onClick={editArticle}>
              <FontAwesomeIcon style={{ marginRight: 10 }} icon={faEdit} />
              Edit Bulletin
            </Button>
          </Col>
          <Col>
            <Button onClick={onDeleteArticle}>
              <FontAwesomeIcon style={{ marginRight: 10 }} icon={faTrash} />
              Delete Bulletin
            </Button>
          </Col>
        </Row>
      )}
      <Card style={{ marginLeft: 20, marginRight: 20 }} loading={loading}>
        <Title level={2}>{data?.article?.title}</Title>
        <Row style={{ marginBottom: 5 }} gutter={60}>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faUser}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Author: </Text>
            <Text>{data?.article?.createdBy?.fullName}</Text>
          </Col>
          <Col>
            <FontAwesomeIcon
              className="feedItem-card-icon"
              icon={faClock}
              style={{ marginRight: 5 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Published: </Text>
            <Text>{formatCalendar(data?.article?.createdAt)} </Text>
            {data?.article?.createdAt !== data?.article?.updatedAt && (
              <>
                <Text style={{ fontSize: 16, fontWeight: 400 }}>
                  | Updated:
                </Text>
                <Text>{formatCalendar(data?.article?.updatedAt)}</Text>
              </>
            )}
          </Col>
        </Row>
        <Row align="middle">
          <Col style={{ marginRight: 5 }}>
            {/* <FontAwesomeIcon icon={faUsers} style={{ marginRight: 5 }} /> */}
            <Text style={{ fontSize: 16, fontWeight: 400 }}>Groups:</Text>
          </Col>

          {data?.article?.groups.map((group) => (
            <Col key={group.id}>
              <Tag key={group.id} color="red">
                {group.name}
              </Tag>
            </Col>
          ))}
        </Row>
        <div
          style={{ width: '100%', height: '100%', marginTop: 20 }}
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
