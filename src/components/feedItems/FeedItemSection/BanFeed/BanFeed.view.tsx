import React from 'react';
import { Button, Col, Divider, Modal, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarPen,
  faCalendarStar,
  faClock,
  faLocationDot,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl';
import ImageContainer from '../ImageContainer';
import useStyles from './BanFeed.styles';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const BanFeed = ({
  feedItem,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  // const offender?.imagesRef = useRef<CarouselRef>(null);

  const {
    endDate,
    startDate,
    // updatedAt,
    title,
    expired,
    location,
    offender,
    feedImage,
  } = feedItem?.ban || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    // <Link to={`/app/offenders/view/${offender?.id}`}>
    <Row wrap={false} key={offender?.id || ''}>
      {feedImage ? (
        <Col
          style={{ cursor: 'pointer', zIndex: 2 }}
          onClick={() =>
            openLightbox(
              [
                {
                  src: feedImage?.low || '',
                },
              ],
              0
            )
          }
        >
          <ImageContainer
            position={feedImage.position}
            src={feedImage.low || ''}
          />
        </Col>
      ) : null}

      <Col flex={1} className={classes.contentContainer}>
        <Row className={classes.contentHeader} align="middle" wrap={false}>
          <Col flex={1}>
            <Title style={{ margin: 0, fontSize: 14 }} level={4} ellipsis>
              {feedItem?.message}
            </Title>
          </Col>
          <Col>
            {adminRights && (
              <Button
                type="text"
                style={{ height: 28, width: 25 }}
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    style={{ marginBottom: 2 }}
                    icon={faTrash}
                    size="sm"
                  />
                }
                onClick={() => {
                  confirm({
                    title: intl.formatMessage({
                      defaultMessage: 'Do you want to delete the feed item?',
                      id: 'VZeM4L',
                    }),
                    content: intl.formatMessage({
                      defaultMessage: 'This action cannot be undone.',
                      id: 'JDJoIZ',
                    }),
                    onOk() {
                      onDeleteFeedItem(feedItem?.id || '');
                    },
                  });
                }}
                size="small"
              />
            )}
          </Col>
        </Row>
        <Divider style={{ margin: 0 }} />
        <Link to={`/app/offenders/view/${offender?.id || ''}`}>
          <div className={classes.content}>
            <Row>
              <Col flex={1}>
                <Title level={4} ellipsis>
                  {title || offender?.name}
                </Title>
              </Col>
              <Col
                style={{ marginTop: -5, marginBottom: 10, marginRight: -10 }}
              >
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
              </Col>
              {/* <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                      id: '377fsC',
                    },
                    {
                      reference: offender.,
                    }
                  )}
                </Text>
              </Col> */}
            </Row>

            <Row gutter={8} style={{ marginBottom: 10 }}>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faCalendarPen}
                />
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Start: {date} ',
                      id: 'IUhT8d',
                    },
                    {
                      date: FormatCalendar(startDate || new Date()),
                    }
                  )}
                </Text>
              </Col>
              <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: '-- --',
                    id: 'TWi2vv',
                  })}
                </Text>
              </Col>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faCalendarStar}
                />
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'End: ',
                    id: 'bOhJPQ',
                  })}
                  {FormatCalendar(endDate || new Date())}
                </Text>
              </Col>
            </Row>
            {/* {type && (
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className={classes.icon}
                    
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
            )} */}

            <Row wrap={false} className={classes.bottomRow}>
              {location ? (
                <>
                  <Col>
                    <FontAwesomeIcon
                      size="sm"
                      className={classes.icon}
                      icon={faLocationDot}
                    />
                  </Col>
                  <Col flex={1}>
                    <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                      {location}
                    </Text>
                  </Col>
                </>
              ) : (
                <Col flex={1} />
              )}

              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faClock}
                />
              </Col>
              <Col>
                <Text type="secondary" style={{ fontSize: 14 }}>
                  {FormatCalendar(feedItem?.updatedAt || new Date())}
                </Text>
              </Col>
            </Row>
          </div>
        </Link>
      </Col>
    </Row>
  );
};

export default BanFeed;
