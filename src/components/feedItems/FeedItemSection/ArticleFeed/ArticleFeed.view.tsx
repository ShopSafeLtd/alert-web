import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

import {
  faClock,
  faExclamationCircle,
  faNewspaper,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import { ArticlePriority } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import ImageContainer from '../ImageContainer';
import useStyles from './ArticleFeed.styles';

const { Paragraph, Text, Title } = Typography;
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

const ArticleFeed = ({
  adminRights,
  feedItem,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const { createdBy, id, image, previewText, priority, title } =
    feedItem?.article || {};
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Row key={id || ''} wrap={false}>
      {image ? (
        <Col
          onClick={() =>
            openLightbox(
              [
                {
                  src: image.optimised || '',
                },
              ],
              0
            )
          }
          style={{ cursor: 'pointer', zIndex: 2 }}
        >
          <ImageContainer
            position={image.position}
            rotation={image.rotation}
            src={image.optimised || image.url || ''}
          />
        </Col>
      ) : null}

      <Col className={classes.contentContainer} flex={1}>
        <Row align="middle" className={classes.contentHeader} wrap={false}>
          <Col flex={1}>
            <Title ellipsis level={4} style={{ fontSize: 16, margin: 0 }}>
              <FontAwesomeIcon className={classes.icon} icon={faNewspaper} />
              {feedItem?.message}
            </Title>
          </Col>
          <Col>
            {adminRights && (
              <Button
                disabled={saving}
                icon={
                  <FontAwesomeIcon icon={faTrash} style={{ marginBottom: 2 }} />
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
                style={{
                  height: 28,
                  width: 25,
                }}
                type="text"
              />
            )}
          </Col>
        </Row>
        <Divider style={{ margin: 0 }} />
        <Link to={`/app/article/view/${id || ''}`}>
          <div className={classes.content}>
            <Title ellipsis italic level={4} style={{ marginBottom: 2 }}>
              {priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faExclamationCircle}
                />
              )}
              {title?.replace(/^\S/, (s) => s.toUpperCase())}
            </Title>
            {previewText && (
              <Paragraph
                ellipsis={{ rows: 1 }}
                style={{ fontSize: 14 }}
                type="secondary"
              >
                {previewText}
              </Paragraph>
            )}
            <Row className={classes.bottomRow} wrap={false}>
              <Col>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faUser}
                  size="sm"
                />
              </Col>
              <Col flex={1}>
                <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                  {createdBy?.fullName}
                </Text>
              </Col>
              <Col>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faClock}
                  size="sm"
                />
              </Col>
              <Col>
                <Text style={{ fontSize: 14 }} type="secondary">
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

export default ArticleFeed;
