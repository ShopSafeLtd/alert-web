/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import type { FeedItemsQuery } from 'graphql/feedItems/queries/__generated__/feed-items.generated';

import {
  faCar,
  faCarSide,
  faClock,
  faPalette,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import ImageContainer from '../ImageContainer';
import UpdateContent from '../UpdateContent';
import useStyles from './VehicleFeed.styles';

const { Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  adminRights: boolean;
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], null | undefined>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewVehicle?: boolean;
  onDeleteFeedItem: (value: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
  saving: boolean;
}

const VehicleFeed = ({
  adminRights,
  feedItem,
  isNewImage,
  isNewVehicle,
  onDeleteFeedItem,
  openLightbox,
  saving,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    colour,
    feedImage,
    // totalUpdates,
    id,
    latestUpdate,
    make,
    model,
    reference,
    registration,
    totalOffenders,
  } = feedItem?.vehicle || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Row key={id || ''} wrap={false}>
      <div style={{ cursor: 'pointer', zIndex: 2 }}>
        {(isNewVehicle || isNewImage) && feedImage ? (
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
              position={latestUpdate.feedImage.position}
              src={latestUpdate.feedImage.low || ''}
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

        <Link to={`/app/vehicles/view/${id || ''}`}>
          <div className={classes.content}>
            {isNewVehicle && latestUpdate ? (
              <UpdateContent
                title={
                  registration ||
                  intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                    },
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
                    <Title ellipsis level={4} style={{ marginBottom: 3 }}>
                      {registration ||
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
                  {registration && (
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
                  <Col flex={1}>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faCar}
                      size="sm"
                    />
                    <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: 'Make: {make}' },
                        {
                          make:
                            make ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
                        }
                      )}
                    </Text>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faCarSide}
                      size="sm"
                    />
                    <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: 'Model: {model}' },
                        {
                          model:
                            model ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
                        }
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row wrap={false}>
                  <Col flex={1}>
                    <FontAwesomeIcon
                      className={classes.icon}
                      icon={faPalette}
                      size="sm"
                    />
                    <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        { defaultMessage: 'Colour: {colour}' },
                        {
                          colour:
                            colour ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                            }),
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
                  icon={faUser}
                  size="sm"
                />
              </Col>
              <Col flex={1}>
                <Text ellipsis style={{ fontSize: 14 }} type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: 'Members: {members}' },
                    {
                      members: totalOffenders || 0,
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

export default VehicleFeed;
