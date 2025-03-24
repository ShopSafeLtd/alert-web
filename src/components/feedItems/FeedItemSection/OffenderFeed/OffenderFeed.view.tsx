import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

import {
  faClock,
  faExclamationCircle,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';
import { getLastOffence } from 'utils/offender/get-offender-desc';

import ImageContainer from '../ImageContainer';
import UpdateContent from '../UpdateContent';
import useStyles from './OffenderFeed.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;
interface Props {
  adminRights: boolean;
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], null | undefined>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewOffender?: boolean;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const OffenderFeed = ({
  adminRights,
  feedItem,
  isNewImage,
  isNewOffender,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    // age,
    // build,
    feedImage,
    // race,
    id,
    // tags,
    latestIncident,
    latestUpdate,
    // gender,
    name,
    // dateOfBirth,
    reference,
    totalIncidents,
    // lastActive,
  } = feedItem?.offender || {};
  const intl = useIntl();
  const classes = useStyles();
  // const hasImage =
  //   (!isNewImage && latestUpdate && latestUpdate.feedImage) ||
  //   ((isNewOffender || isNewImage) && feedImage);

  // const publicOffenderDOB =
  //   role !== Role.User;
  return (
    <Row key={id || ''} wrap={false}>
      <div style={{ cursor: 'pointer', zIndex: 2 }}>
        {(isNewOffender || isNewImage) && feedImage ? (
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
              position={latestUpdate?.feedImage.position}
              src={latestUpdate?.feedImage.low || ''}
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
        <Link to={`/app/offenders/view/${id || ''}`}>
          <div className={classes.content}>
            {!isNewOffender && latestUpdate ? (
              <UpdateContent
                title={
                  name ||
                  intl.formatMessage({
                    defaultMessage: 'Unidentified Offender',
                  })
                }
                update={latestUpdate}
              />
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
                <Paragraph
                  ellipsis={{ rows: 1 }}
                  style={{
                    fontSize: 14,
                    // width: '100%',
                  }}
                  type="secondary"
                >
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Last offence: {lastOffence}',
                    },
                    {
                      lastOffence:
                        getLastOffence(
                          undefined,
                          undefined,
                          latestIncident ?? undefined
                        ).message ||
                        intl.formatMessage({
                          defaultMessage: 'Unknown',
                        }),
                    }
                  )}
                </Paragraph>
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
                <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Total Incident: {totalIncidents}',
                    },
                    {
                      totalIncidents,
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

export default OffenderFeed;
