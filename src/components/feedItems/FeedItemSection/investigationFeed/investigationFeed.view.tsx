/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
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
import useStyles from './investigationFeed.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

interface Props extends FeedItem {
  adminRights: boolean;

  isNewImage?: boolean;
  isNewInvestigation?: boolean;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const InvestigationFeed = ({
  adminRights,
  feedItem: initNode,
  isNewImage,
  isNewInvestigation,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  const { node: feedItem } = initNode || {};

  const {
    description,
    id,
    latestUpdate,
    name,
    reference,
    totalIncidents,
    totalOffenders,
  } = feedItem?.investigation || {};
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
        <Link to={`/app/investigations/view/${id || ''}`}>
          <div className={classes.content}>
            {isNewInvestigation && latestUpdate ? (
              <UpdateContent title={name || ''} update={latestUpdate} />
            ) : (
              <>
                <Row>
                  <Col flex={1}>
                    <Title ellipsis level={4}>
                      {name}
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

                {description && (
                  <Paragraph
                    ellipsis={{ rows: 1 }}
                    style={{ fontSize: 14 }}
                    type="secondary"
                  >
                    {description}
                  </Paragraph>
                )}
                {/* <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUsers}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {createdBy?.fullName} - {createdBy?.businesses[0]?.name}
                  </Text>
                </Col>
              </Row> */}
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

export default InvestigationFeed;
