import React from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLocationDot,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import UpdateContent from '../UpdateContent';
import ImageContainer from '../ImageContainer';
import useStyles from './IncidentFeed.styles';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewIncident?: boolean;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const IncidentFeed = ({
  feedItem,
  isNewImage,
  isNewIncident,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  const {
    feedImage,
    latestUpdate,
    description,
    business,
    subject,
    reference,
    id,
    // totalOffenders,
    // offenders,
  } = feedItem?.incident || {};
  const intl = useIntl();
  const classes = useStyles();
  const hasImage =
    (!isNewImage && latestUpdate && latestUpdate.feedImage) ||
    ((isNewIncident || isNewImage) && feedImage);
  return (
    <Row wrap={false} key={id || ''}>
      <div style={{ cursor: 'pointer', zIndex: 2 }}>
        {!isNewImage && latestUpdate && latestUpdate.feedImage ? (
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
              src={latestUpdate.feedImage.low || ''}
              position={latestUpdate.feedImage.position}
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
              src={feedImage.low || ''}
              position={feedImage.position}
            />
          </Col>
        ) : null}
      </div>

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
        <Link to={`/app/incidents/view/${id || ''}`}>
          <div className={classes.content}>
            {!isNewIncident && latestUpdate ? (
              <UpdateContent title={subject || ''} update={latestUpdate} />
            ) : (
              <>
                <Row>
                  <Col flex={1}>
                    <Title level={4} ellipsis>
                      {subject}
                    </Title>
                  </Col>
                  <Col>
                    <Text style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Alert ID: {reference}',
                          id: '377fsC',
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
                      type="secondary"
                      style={{
                        fontSize: 14,
                        // width: '100%',
                      }}
                      ellipsis={{ rows: 1 }}
                    >
                      {description}
                    </Paragraph>
                  )}
                </div>
              </>
            )}

            <Row wrap={false} className={classes.bottomRow}>
              <Col>
                <FontAwesomeIcon
                  size="sm"
                  className={classes.icon}
                  icon={faLocationDot}
                />
              </Col>
              <Col flex={1}>
                <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                  {business?.name ||
                    intl.formatMessage({
                      defaultMessage: 'Unknown',
                      id: '5jeq8P',
                    })}
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

export default IncidentFeed;
