import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery, ImagePosition } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarPen,
  faCalendarStar,
  faLocationDot,
  faUserClock,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import formatCalendar from 'utils/format-calendar-24h';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}

const ImageContainer = ({
  src,
  position,
}: {
  src: string;
  position: ImagePosition;
}) => (
  <div
    style={{
      width: 150,
      height: 180,
    }}
  >
    <WatermarkImage url={src} position={position} />
  </div>
);
const BanFeed = ({ feedItem }: Props): JSX.Element => {
  // const offender?.imagesRef = useRef<CarouselRef>(null);

  const {
    endDate,
    startDate,
    // updatedAt,
    title,
    type,
    // active,
    expired,
    // id,
    location,
    offender,
    description,
  } = feedItem?.ban || {};

  return (
    <Link to={`/app/offenders/view/${offender?.id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        {offender?.images && offender?.images.length > 0 ? (
          <Col>
            <ImageContainer
              position={offender?.images[0].position}
              src={
                offender?.images[0].optimised || offender?.images[0].url || ''
              }
            />
          </Col>
        ) : null}

        <Col flex={1}>
          <>
            <Title level={4} ellipsis>
              {title || offender?.name}
            </Title>
            {/* <Row style={{ marginTop: -5, marginBottom: 5 }}>
              <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
                  Alert ID: {offender.reference}
                </Text>
              </Col>
            </Row> */}
            <div style={{ marginTop: -5, marginBottom: 10 }}>
              {expired ? (
                <Tag color="red">EXPIRED</Tag>
              ) : (
                <Tag color="green">ACTIVE</Tag>
              )}
            </div>

            <Row>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  style={{ marginRight: 5 }}
                  className="feedItem-card-icon"
                  icon={faCalendarPen}
                />
                <Text style={{ fontSize: 14 }} type="secondary">
                  Start:
                  {formatCalendar(startDate)}
                </Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  style={{ marginRight: 5 }}
                  className="feedItem-card-icon"
                  icon={faCalendarStar}
                />
                <Text style={{ fontSize: 14 }} type="secondary">
                  End:
                  {formatCalendar(endDate)}
                </Text>
              </Col>
            </Row>
            {type && (
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faUserClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Type:
                    {type}
                  </Text>
                </Col>
              </Row>
            )}
            <Row wrap={false}>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  style={{ marginRight: 5 }}
                  className="feedItem-card-icon"
                  icon={faLocationDot}
                />
              </Col>
              <Col>
                <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                  {location}
                </Text>
              </Col>
            </Row>
            {description && (
              <Paragraph
                type="secondary"
                style={{ fontSize: 14, marginTop: 10 }}
                ellipsis={{ rows: 3 }}
              >
                {description}
              </Paragraph>
            )}
          </>
        </Col>
      </Row>
    </Link>
  );
};

export default BanFeed;
