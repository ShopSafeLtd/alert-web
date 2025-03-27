import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

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
import UpdateContent from '../UpdateContent';
import useStyles from './IncidentFeed.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  adminRights: boolean;
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], null | undefined>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewIncident?: boolean;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const IncidentFeed = ({
  adminRights,
  feedItem,
  isNewImage,
  isNewIncident,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  const {
    business,
    description,
    feedImage,
    id,
    latestUpdate,
    reference,
    subject,
    // totalOffenders,
    // offenders,
  } = feedItem?.incident || {};
  const intl = useIntl();
  const classes = useStyles();
  const hasImage =
    (!isNewImage && latestUpdate?.feedImage) ||
    ((isNewIncident || isNewImage) && feedImage);

  return (
    <Row key={id || ''} wrap={false}>
      <div style={{ cursor: 'pointer', zIndex: 2 }}>
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
          >
            <ImageContainer
              position={latestUpdate.feedImage.position}
              src={latestUpdate.feedImage.low || ''}
            />
          </Col>
        ) : null}
        {(isNewIncident || isNewImage) && feedImage ? (
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
          >
            <ImageContainer
              position={feedImage.position}
              src={feedImage.low || ''}
            />
          </Col>
        ) : null}
      </div>

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
                style={{ height: 28, width: 25 }}
                type="text"
              />
            )}
          </Col>
        </Row>
        <Divider style={{ margin: 0 }} />
        <Link to={`/app/incidents/view/${id || ''}`}>
          <div className={classes.content}>
            {!isNewIncident && latestUpdate ? (
              <UpdateContent title={subject || ''} update={latestUpdate} />
            ) : (
              <>
                <Row>
                  <Col flex={1}>
                    <Title ellipsis level={4}>
                      {subject}
                    </Title>
                  </Col>
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
                </Row>
                <div style={hasImage ? { height: 35 } : undefined}>
                  {description && (
                    <Paragraph
                      ellipsis={{ rows: 1 }}
                      style={{
                        fontSize: 14,
                        // width: '100%',
                      }}
                      type="secondary"
                    >
                      {description}
                    </Paragraph>
                  )}
                </div>
              </>
            )}

            <Row className={classes.bottomRow} wrap={false}>
              <Col>
                <FontAwesomeIcon
                  className={classes.icon}
                  icon={faLocationDot}
                  size="sm"
                />
              </Col>
              <Col flex={1}>
                <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                  {business?.name ||
                    intl.formatMessage({
                      defaultMessage: 'Unknown',
                    })}
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

export default IncidentFeed;
