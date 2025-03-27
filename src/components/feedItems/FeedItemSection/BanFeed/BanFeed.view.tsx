import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

import { formatBanType } from '#/types/enums/ban-type';
import {
  faClock,
  faLocationDot,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import ImageContainer from '../ImageContainer';
import useStyles from './BanFeed.styles';

const { Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  adminRights: boolean;
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], null | undefined>['feedItems'][0]
    | null
    | undefined;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const BanFeed = ({
  adminRights,
  feedItem,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  // const offender?.imagesRef = useRef<CarouselRef>(null);

  const { feedImage, location, offender, title, type } = feedItem?.ban || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    // <Link to={`/app/offenders/view/${offender?.id}`}>
    <Row key={offender?.id || ''} wrap={false}>
      {feedImage ? (
        <Col
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
          style={{ cursor: 'pointer', zIndex: 2 }}
        >
          <ImageContainer
            position={feedImage.position}
            src={feedImage.low || ''}
          />
        </Col>
      ) : null}

      <Col className={classes.contentContainer} flex={1}>
        <Row align="middle" className={classes.contentHeader} wrap={false}>
          <Col flex={1}>
            <Title ellipsis level={4} style={{ fontSize: 14, margin: 0 }}>
              {feedItem?.message}
            </Title>
          </Col>
          <Col>
            {adminRights && (
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon
                    icon={faTrash}
                    size="sm"
                    style={{ marginBottom: 2 }}
                  />
                }
                onClick={() => {
                  confirm({
                    content: intl.formatMessage({
                      defaultMessage: 'This action cannot be undone.',
                    }),
                    onOk() {
                      onDeleteFeedItem(feedItem?.id || '');
                    },
                    title: intl.formatMessage({
                      defaultMessage: 'Do you want to delete the feed item?',
                    }),
                  });
                }}
                size="small"
                style={{ height: 28, width: 25 }}
                type="text"
              />
            )}
          </Col>
        </Row>
        <Divider style={{ margin: 0 }} />
        <Link to={`/app/offenders/view/${offender?.id || ''}`}>
          <div className={classes.content}>
            <Row>
              <Col flex={1}>
                <Title ellipsis level={4}>
                  {title || offender?.name}
                </Title>
              </Col>
            </Row>
            <Row style={{ height: 35 }}>
              <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage({
                    defaultMessage: 'Type:',
                  })}
                  {formatBanType(type)}
                </Text>
              </Col>
            </Row>

            <Row className={classes.bottomRow} wrap={false}>
              {location ? (
                <>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faLocationDot}
                      size="sm"
                    />
                  </Col>
                  <Col flex={1}>
                    <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                      {location}
                    </Text>
                  </Col>
                </>
              ) : (
                <Col flex={1} />
              )}

              <Col>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faClock}
                  size="sm"
                />
              </Col>
              <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
                  {FormatCalendar(feedItem?.updatedAt || new Date(), intl)}
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
