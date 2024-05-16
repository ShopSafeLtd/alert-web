import React from 'react';
import { Button, Card, Col, List, Row, Typography } from 'antd';
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
import FormatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl'; // Import useIntl hook
import { createUseStyles } from 'react-jss';
import type { ReturnProps as Props } from './types/ViewArticle';
import IncidentCard from '../../../components/incidents/IncidentCard';
import OffenderCard from '../../../components/offenders/OffenderCard';

const { Title, Text } = Typography;

const useStyles = createUseStyles(() => ({
  viewArticle: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  content: {
    width: '100%',
    height: '100vh',
  },
  detailsContainer: {
    height: '100%',
  },
}));

const ViewArticleView = ({
  data,
  loading,
  openLightbox,
  lightBoxOpen,
  lightboxElements,
  onDeleteArticle,
  role,
  editArticle,
}: Props) => {
  const classes = useStyles();

  const intl = useIntl();
  return (
    <>
      <div className={classes.viewArticle}>
        <Row className={classes.content}>
          <Col span={24} className={classes.detailsContainer}>
            {role === Role.SchemeAdmin && (
              <Row style={{ padding: '10px 20px 15px' }} justify="end">
                <Col style={{ marginRight: 10 }}>
                  <Button onClick={editArticle}>
                    <FontAwesomeIcon
                      style={{ marginRight: 10 }}
                      icon={faEdit}
                    />
                    {intl.formatMessage({
                      id: 'zTaC7h',
                      defaultMessage: 'Edit Bulletin',
                    })}
                  </Button>
                </Col>
                <Col>
                  <Button onClick={onDeleteArticle}>
                    <FontAwesomeIcon
                      style={{ marginRight: 10 }}
                      icon={faTrash}
                    />
                    {intl.formatMessage({
                      id: 'yTVc8S',
                      defaultMessage: 'Delete Bulletin',
                    })}
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
                  <Text style={{ fontSize: 16, fontWeight: 400 }}>
                    {intl.formatMessage({
                      id: 'Q8XddZ',
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
                  <Text style={{ fontSize: 16, fontWeight: 400 }}>
                    {intl.formatMessage({
                      id: '7iDdU4',
                      defaultMessage: 'Published:',
                    })}
                  </Text>
                  <Text>
                    {FormatCalendar(data?.article?.createdAt as Date)}
                  </Text>
                  {data?.article?.createdAt !== data?.article?.updatedAt && (
                    <>
                      <Text style={{ fontSize: 16, fontWeight: 400 }}>
                        {intl.formatMessage({
                          id: '9apQnO',
                          defaultMessage: '| Updated:',
                        })}
                      </Text>
                      <Text>
                        {FormatCalendar(data?.article?.updatedAt as Date)}
                      </Text>
                    </>
                  )}
                </Col>
              </Row>
              <Row style={{ marginBottom: 5 }} gutter={60}>
                <Col>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      marginTop: 20,
                    }}
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: data?.article?.rows[0].columns[0].text || '',
                    }}
                  />
                </Col>
              </Row>
            </Card>
            {data?.article?.rows[0].columns[0].incidents &&
              data?.article?.rows[0].columns[0].incidents.length > 0 && (
                <Card style={{ marginLeft: 20, marginRight: 20 }}>
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      id: 'mtr3R4',
                      defaultMessage: 'Incidents',
                    })}
                  </Typography.Title>
                  <Row>
                    {data?.article?.rows[0].columns[0].incidents.map((el) => (
                      <Col sm={24} md={12} lg={12} xl={8} xxl={6} key={el?.id}>
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
                <Card style={{ marginLeft: 20, marginRight: 20 }}>
                  <Typography.Title level={2}>
                    {intl.formatMessage({
                      id: 'xb54TN',
                      defaultMessage: 'Offenders',
                    })}
                  </Typography.Title>
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
            {data?.article?.documents &&
              data?.article?.documents.length > 0 && (
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
          </Col>
        </Row>
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
          slide: (slide: WatermarkSlideType) => (
            <WatermarkSlide slide={slide} />
          ),
        }}
      />
    </>
  );
};

export default ViewArticleView;
