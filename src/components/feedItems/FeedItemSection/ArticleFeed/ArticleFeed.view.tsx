import React from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { ArticlePriority } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import {
  faClock,
  faExclamationCircle,
  faNewspaper,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import FormatCalendar from 'utils/format-calendar-24h';
import { useIntl } from 'react-intl';
import ImageContainer from '../ImageContainer';
import useStyles from './ArticleFeed.styles';

const { Title, Paragraph, Text } = Typography;
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

const ArticleFeed = ({
  feedItem,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const { id, title, image, previewText, priority, createdBy } =
    feedItem?.article || {};
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Row wrap={false} key={id || ''}>
      {image ? (
        <Col
          style={{ cursor: 'pointer', zIndex: 2 }}
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
        >
          <ImageContainer
            rotation={image.rotation}
            position={image.position}
            src={image.optimised || image.url || ''}
          />
        </Col>
      ) : null}

      <Col flex={1} className={classes.contentContainer}>
        <Row className={classes.contentHeader} align="middle" wrap={false}>
          <Col flex={1}>
            <Title style={{ margin: 0, fontSize: 16 }} level={4} ellipsis>
              <FontAwesomeIcon icon={faNewspaper} className={classes.icon} />
              {feedItem?.message}
            </Title>
          </Col>
          <Col>
            {adminRights && (
              <Button
                type="text"
                style={{
                  height: 28,
                  width: 25,
                }}
                disabled={saving}
                icon={
                  <FontAwesomeIcon style={{ marginBottom: 2 }} icon={faTrash} />
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
        <Link to={`/app/article/view/${id || ''}`}>
          <div className={classes.content}>
            <Title style={{ marginBottom: 2 }} italic level={4} ellipsis>
              {priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className={classes.icon}
                />
              )}
              {title?.replace(/^\S/, (s) => s.toUpperCase())}
            </Title>
            {previewText && (
              <Paragraph
                type="secondary"
                style={{ fontSize: 14 }}
                ellipsis={{ rows: 1 }}
              >
                {previewText}
              </Paragraph>
            )}
            <Row wrap={false} className={classes.bottomRow}>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faUser}
                />
              </Col>
              <Col flex={1}>
                <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                  {createdBy?.fullName}
                </Text>
              </Col>
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

export default ArticleFeed;
