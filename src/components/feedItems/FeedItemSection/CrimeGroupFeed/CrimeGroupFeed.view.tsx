import type { FeedItem } from '#/components/feedItems/FeedItemSection/types/FeedItem';

import {
  faClock,
  faExclamationCircle,
  faTrash,
  faUsers,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import ImageContainer from '../ImageContainer';
import UpdateContent from '../UpdateContent';
import useStyles from './CrimeGroupFeed.styles';

const { Text, Title } = Typography;
const { confirm } = Modal;

interface Props extends FeedItem {
  adminRights: boolean;
  isNewCrimeGroup?: boolean;
  isNewImage?: boolean;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const CrimeGroupFeed = ({
  adminRights,
  feedItem,
  isNewCrimeGroup,
  isNewImage,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    alias,
    // totalUpdates,
    id,
    latestUpdate,
    reference,
    totalIncidents,
    totalOffenders,
    // totalValue,
  } = feedItem?.crimeGroup || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Row key={id || ''} wrap={false}>
      {!isNewImage && latestUpdate?.feedImage ? (
        <Col
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
          style={{ cursor: 'pointer', zIndex: 2 }}
        >
          <ImageContainer
            position={latestUpdate.feedImage.position}
            src={latestUpdate.feedImage.low || ''}
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
                    <Title ellipsis level={4}>
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
                      className={classes.icon}
                      icon={faUsers}
                      size="sm"
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
            <Row className={classes.bottomRow} wrap={false}>
              <Col>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faExclamationCircle}
                  size="sm"
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

export default CrimeGroupFeed;
