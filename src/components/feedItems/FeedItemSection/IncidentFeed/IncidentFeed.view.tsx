import React from 'react';
import { Card, Col, Descriptions, Row, Tag, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLocationDot,
  faUser,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewIncident?: boolean;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 140,
      height: 150,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
);
const IncidentFeed = ({
  feedItem,
  isNewImage,
  isNewIncident,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    updates,
    images,
    dayTime,
    description,
    location,
    // totalUpdates,
    subject,
    // reference,
    // policeRef,
    createdBy,
    id,
    offenders,
  } = feedItem?.incident || {};

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
  return (
    <Row gutter={15} wrap={false} key={id || ''} style={{ width: '100%' }}>
      {!isNewImage && updates && updates[0]?.images[0] ? (
        <Col>
          <ImageContainer
            src={
              updates[0].images[0].optimised || updates[0].images[0].url || ''
            }
          />
        </Col>
      ) : null}
      {(isNewIncident || isNewImage) && images && images.length ? (
        <Col>
          <ImageContainer src={images[0].optimised || images[0].url || ''} />
        </Col>
      ) : null}

      <Col flex={1}>
        <Link to={`/app/incidents/view/${id}`}>
          {isNewIncident ? (
            <>
              <Title style={{ marginBottom: 2 }} level={4} ellipsis>
                {subject}
              </Title>

              <Paragraph style={{ fontSize: 14 }} type="secondary" ellipsis>
                {description}
              </Paragraph>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {dayTime}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUser}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {createdBy?.fullName} - {createdBy?.organisation}
                  </Text>
                </Col>
              </Row>
              <Row wrap={false} className="incident-card-location-row">
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faLocationDot}
                  />
                </Col>
                <Col>
                  <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                    {location?.full}
                  </Text>
                </Col>
              </Row>
              {offenders && offenders.length ? (
                <Row wrap={false} style={{ overflowX: 'auto', marginTop: 10 }}>
                  {offenders.map((offender) => (
                    <Link
                      to={
                        offender.id ? `/app/offenders/view/${offender.id}` : ``
                      }
                    >
                      <Tag key={offender.id}>
                        {offender.name || 'Unknown Offender'}
                      </Tag>
                    </Link>
                  ))}
                </Row>
              ) : null}
            </>
          ) : (
            <>
              {updates && updates[0]?.text ? (
                <>
                  <Title level={4} style={{ marginBottom: 2 }} ellipsis>
                    {subject}
                  </Title>
                  <Paragraph
                    style={{ fontSize: 14 }}
                    type="secondary"
                    ellipsis={{ rows: 3 }}
                  >
                    {getContent(updates[0]?.text)}
                  </Paragraph>
                </>
              ) : null}
              {!(updates && updates[0]?.text) ? (
                <>
                  {updates && updates[0]?.linkedIncidents[0] ? (
                    <Card
                      style={{ borderRadius: 5 }}
                      size="small"
                      className="message-card"
                    >
                      <Row gutter={5} wrap={false}>
                        <Col>
                          {updates[0]?.linkedIncidents[0].images &&
                          updates[0]?.linkedIncidents[0].images.length > 0 ? (
                            <ImageContainer
                              src={
                                updates[0]?.linkedIncidents[0].images[0]
                                  .optimised || ''
                              }
                            />
                          ) : // <Image
                          //   width={100}
                          //   height={100}
                          //   src={
                          //     updates[0]?.linkedIncidents[0].images[0]
                          //       .optimised || ''
                          //   }
                          // />
                          null}
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
                            {updates[0]?.linkedIncidents[0].subject}
                          </Paragraph>
                          <Descriptions size="small">
                            <Descriptions.Item label="Created At">
                              {updates[0]?.linkedIncidents[0].dayTime}
                            </Descriptions.Item>
                          </Descriptions>
                          <Paragraph
                            type="secondary"
                            ellipsis
                            style={{
                              marginBottom: '0.5rem',
                            }}
                          >
                            {updates[0]?.linkedIncidents[0].description}
                          </Paragraph>
                        </Col>
                      </Row>
                    </Card>
                  ) : null}
                  {updates && updates[0]?.linkedOffenders[0] ? (
                    <Card
                      style={{ borderRadius: 5 }}
                      size="small"
                      className="message-card"
                    >
                      <Row gutter={5} wrap={false}>
                        <Col>
                          {updates[0]?.linkedOffenders[0].images &&
                          updates[0]?.linkedOffenders[0].images.length > 0 ? (
                            <ImageContainer
                              src={
                                updates[0]?.linkedOffenders[0].images[0]
                                  .optimised || ''
                              }
                            />
                          ) : // <Image
                          //   width={100}
                          //   height={100}
                          //   src={
                          //     updates[0]?.linkedOffenders[0].images[0]
                          //       .optimised || ''
                          //   }
                          // />
                          null}
                        </Col>

                        <Col
                          flex={1}
                          style={{
                            marginTop: 10,
                            marginLeft: 5,
                          }}
                        >
                          <Title level={4}>
                            {updates[0]?.linkedOffenders[0].name}
                          </Title>
                          <Descriptions size="small">
                            <Descriptions.Item label="Last Active">
                              {moment(
                                updates[0]?.linkedOffenders[0].updatedAt ||
                                  moment()
                              ).format(`ddd MMM DD YYYY - HH:mm`)}
                            </Descriptions.Item>
                          </Descriptions>
                        </Col>
                      </Row>
                    </Card>
                  ) : null}
                </>
              ) : null}
            </>
          )}
        </Link>
      </Col>
    </Row>
  );
};

export default IncidentFeed;
