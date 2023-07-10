import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarPen,
  faCalendarStar,
  faLocationDot,
  faUserClock,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import formatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl';
import ImageContainer from '../ImageContainer';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}

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
    feedImage,
  } = feedItem?.ban || {};
  const intl = useIntl();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/offenders/view/${offender?.id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        {feedImage ? (
          <Col>
            <ImageContainer
              position={feedImage.position}
              src={feedImage.optimised || feedImage.url || ''}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10, marginLeft: 15 }}>
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
                <Tag color="red">
                  {intl.formatMessage({
                    defaultMessage: 'EXPIRED',
                    id: 'GftNg3',
                  })}
                </Tag>
              ) : (
                <Tag color="green">
                  {intl.formatMessage({
                    defaultMessage: 'ACTIVE',
                    id: 'LQPOVs',
                  })}
                </Tag>
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
                  {intl.formatMessage({
                    defaultMessage: 'Start: ',
                    id: 'npEJui',
                  })}
                  {formatCalendar(startDate || new Date())}
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
                  {intl.formatMessage({
                    defaultMessage: 'End: ',
                    id: 'bOhJPQ',
                  })}
                  {formatCalendar(endDate || new Date())}
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
                    {intl.formatMessage({
                      defaultMessage: 'Type: ',
                      id: 'iAfc5K',
                    })}
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
