import React from 'react';
import { Card, Col, Descriptions, Row, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';

import moment from 'moment';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewOffender?: boolean;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 180,
      height: 200,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
);
const OffenderFeed = ({
  feedItem,
  isNewImage,
  isNewOffender,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
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
  const {
    age,
    build,
    gender,
    name,
    race,
    dateOfBirth,
    updatedAt,
    // createdAt,
    // bans,
    // totalUpdates,
    id,
    updates,
    images,
    // lastActive,
    // incidents,
  } = feedItem?.offender || {};

  return (
    <Row gutter={20} wrap={false}>
      {(isNewOffender || isNewImage) && images && images.length ? (
        <Col>
          <ImageContainer src={images[0].optimised || images[0].url || ''} />
        </Col>
      ) : null}
      {!isNewImage && updates && updates[0]?.images[0] ? (
        <Col>
          <ImageContainer
            src={
              updates[0].images[0].optimised || updates[0].images[0].url || ''
            }
          />
        </Col>
      ) : null}

      <Link to={`/app/offenders/view/${id}`}>
        <Col flex={1}>
          {isNewOffender ? (
            <>
              <Title style={{ marginBottom: 10 }} level={4} ellipsis>
                {name}
              </Title>
              <Row style={{ marginBottom: 10 }}>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faClock}
                    style={{ marginBottom: -1 }}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Last updated:
                    {moment(updatedAt || moment()).format(
                      `ddd MMM DD YYYY - HH:mm`
                    )}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUserClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Age:
                    {dateOfBirth ? calcAge(dateOfBirth) : getOffenderAge(age)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUserTag}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Build:{getOffenderBuild(build)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col flex={1}>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faMarsAndVenus}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Sex: {getOffenderGender(gender)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faEarth}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Ethnicity: {getOffenderRace(race, false)}
                  </Text>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {updates && updates[0]?.text ? (
                <>
                  <Title level={4} style={{ marginBottom: 2 }} ellipsis>
                    {name}
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
        </Col>
      </Link>
    </Row>
  );
};

export default OffenderFeed;
