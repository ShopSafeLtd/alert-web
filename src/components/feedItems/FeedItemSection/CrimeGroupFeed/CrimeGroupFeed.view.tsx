import React from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faExclamationCircle,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import UpdateContent from '../UpdateContent';
import useStyles from './CrimeGroupFeed.styles';
import ImageContainer from '../ImageContainer';
import type { FeedItemsQuery } from 'graphql/feedItems/queries/feed-items.generated';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewCrimeGroup?: boolean;
  isNewImage?: boolean;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const CrimeGroupFeed = ({
  feedItem,
  isNewImage,
  isNewCrimeGroup,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    totalIncidents,
    alias,
    // totalUpdates,
    id,
    latestUpdate,
    totalOffenders,
    reference,
    // totalValue,
  } = feedItem?.crimeGroup || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Row wrap={false} key={id || ''}>
      {!isNewImage && latestUpdate && latestUpdate.feedImage ? (
        <Col
          style={{ cursor: 'pointer', zIndex: 2 }}
          onClick={() =>
            openLightbox(
              [
                {
                  src: latestUpdate.feedImage?.low || '',
                },
              ],
              0
            )
          }
        >
          <ImageContainer
            src={latestUpdate.feedImage.low || ''}
            position={latestUpdate.feedImage.position}
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
                    }),
                    content: intl.formatMessage({
                      defaultMessage: 'This action cannot be undone.',
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

        <Link to={`/app/crimeGroups/view/${id || ''}`}>
          <div className={classes.content}>
            {isNewCrimeGroup && latestUpdate ? (
              <UpdateContent
                title={
                  alias ||
                  intl.formatMessage(
                    { defaultMessage: 'Alert ID: {reference}' },
                    {
                      reference,
                    }
                  )
                }
                update={latestUpdate}
              />
            ) : (
              <>
                <Row>
                  <Col flex={1}>
                    <Title level={4} ellipsis>
                      {alias ||
                        intl.formatMessage(
                          {
                            defaultMessage: 'Alert ID: {reference}',
                          },
                          {
                            reference,
                          }
                        )}
                    </Title>
                  </Col>
                  {alias && (
                    <Col>
                      <Text style={{ fontSize: 14 }} type="secondary">
                        {intl.formatMessage(
                          {
                            defaultMessage: 'Alert ID: {reference}',
                          },
                          {
                            reference,
                          }
                        )}
                      </Text>
                    </Col>
                  )}
                </Row>

                <Row>
                  <Col>
                    <FontAwesomeIcon
                      size="sm"
                      icon={faUsers}
                      className={classes.icon}
                    />
                    <Text style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: 'Members: {members}' },
                        {
                          members: totalOffenders || 0,
                        }
                      )}
                    </Text>
                  </Col>
                </Row>
              </>
            )}
            <Row wrap={false} className={classes.bottomRow}>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faExclamationCircle}
                />
              </Col>
              <Col flex={1}>
                <Text style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Total Incidents: {members}',
                    },
                    {
                      members: totalIncidents || 0,
                    }
                  )}
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

export default CrimeGroupFeed;
