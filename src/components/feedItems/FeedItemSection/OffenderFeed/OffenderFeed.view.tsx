import React from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faExclamationCircle,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';

import { getLastOffence } from 'utils/offender/get-offender-desc';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import useStyles from './OffenderFeed.styles';
import UpdateContent from '../UpdateContent';
import ImageContainer from '../ImageContainer';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;
interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewOffender?: boolean;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const OffenderFeed = ({
  feedItem,
  isNewImage,
  isNewOffender,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    // age,
    // build,
    // gender,
    name,
    // race,
    // dateOfBirth,
    reference,
    id,
    latestUpdate,
    feedImage,
    // tags,
    latestIncident,
    totalIncidents,
    // lastActive,
  } = feedItem?.offender || {};
  const intl = useIntl();
  const classes = useStyles();
  // const hasImage =
  //   (!isNewImage && latestUpdate && latestUpdate.feedImage) ||
  //   ((isNewOffender || isNewImage) && feedImage);
  // const role = useStoreState((state) => state.user.role);

  // const publicOffenderDOB =
  //   useStoreState((state) => state.scheme.defaultPublicOffenderDOB) ||
  //   role !== Role.User;
  return (
    <Row wrap={false} key={id || ''}>
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
        {!isNewImage && latestUpdate && latestUpdate?.feedImage ? (
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
              src={latestUpdate?.feedImage.low || ''}
              position={latestUpdate?.feedImage.position}
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
        <Link to={`/app/offenders/view/${id || ''}`}>
          <div className={classes.content}>
            {!isNewOffender && latestUpdate ? (
              <UpdateContent
                title={
                  name ||
                  intl.formatMessage({
                    defaultMessage: 'Unidentified Offender',
                    id: 'tHTxaO',
                  })
                }
                update={latestUpdate}
              />
            ) : (
              <>
                <Row>
                  <Col flex={1}>
                    <Title level={4} ellipsis>
                      {name}
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
                <Paragraph
                  type="secondary"
                  style={{
                    fontSize: 14,
                    // width: '100%',
                  }}
                  ellipsis={{ rows: 1 }}
                >
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Last offence: {lastOffence}',
                      id: '9eFYpD',
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
                          id: '5jeq8P',
                        }),
                    }
                  )}
                </Paragraph>
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
                <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                  {intl.formatMessage(
                    {
                      defaultMessage: 'Total Incident: {totalIncidents}',
                      id: 'gCseaV',
                    },
                    {
                      totalIncidents,
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

export default OffenderFeed;
