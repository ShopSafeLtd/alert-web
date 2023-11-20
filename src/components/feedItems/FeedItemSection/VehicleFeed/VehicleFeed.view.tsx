/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import React from 'react';
import { Button, Col, Divider, Modal, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faCarSide,
  faClock,
  faPalette,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import UpdateContent from '../UpdateContent';
import ImageContainer from '../ImageContainer';
import useStyles from './VehicleFeed.styles';

const { Title, Text } = Typography;
const { confirm } = Modal;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewVehicle?: boolean;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const VehicleFeed = ({
  feedItem,
  isNewImage,
  isNewVehicle,
  onDeleteFeedItem,
  saving,
  adminRights,
  openLightbox,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    make,
    model,
    registration,
    colour,
    // totalUpdates,
    id,
    feedImage,
    latestUpdate,
    totalOffenders,
    reference,
  } = feedItem?.vehicle || {};
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Row wrap={false} key={id || ''}>
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
              src={feedImage.low || ''}
              position={feedImage.position}
            />
          </Col>
        ) : null}
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

        <Link to={`/app/vehicles/view/${id || ''}`}>
          <div className={classes.content}>
            {isNewVehicle && latestUpdate ? (
              <UpdateContent
                title={
                  registration ||
                  intl.formatMessage(
                    {
                      defaultMessage: 'Alert ID: {reference}',
                      id: '377fsC',
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
                    <Title level={4} ellipsis style={{ marginBottom: 3 }}>
                      {registration ||
                        intl.formatMessage(
                          {
                            defaultMessage: 'Alert ID: {reference}',
                            id: '377fsC',
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
                            id: '377fsC',
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
                      size="sm"
                      className={classes.icon}
                      icon={faCar}
                    />
                    <Text style={{ fontSize: 14 }} type="secondary" ellipsis>
                      {intl.formatMessage(
                        { defaultMessage: 'Make: {make}', id: 'cPuur1' },
                        {
                          make:
                            make ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
                        }
                      )}
                    </Text>
                  </Col>
                  <Col>
                    <FontAwesomeIcon
                      size="sm"
                      className={classes.icon}
                      icon={faCarSide}
                    />
                    <Text style={{ fontSize: 14 }} type="secondary" ellipsis>
                      {intl.formatMessage(
                        { defaultMessage: 'Model: {model}', id: '6gT5ZW' },
                        {
                          model:
                            model ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
                        }
                      )}
                    </Text>
                  </Col>
                </Row>
                <Row wrap={false}>
                  <Col flex={1}>
                    <FontAwesomeIcon
                      size="sm"
                      className={classes.icon}
                      icon={faPalette}
                    />
                    <Text style={{ fontSize: 14 }} type="secondary" ellipsis>
                      {intl.formatMessage(
                        { defaultMessage: 'Colour: {colour}', id: 'pukOve' },
                        {
                          colour:
                            colour ||
                            intl.formatMessage({
                              defaultMessage: 'Unknown',
                              id: '5jeq8P',
                            }),
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
                  icon={faUser}
                />
              </Col>
              <Col flex={1}>
                <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                  {intl.formatMessage(
                    { defaultMessage: 'Members: {members}', id: '8gjK3b' },
                    {
                      members: totalOffenders || 0,
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

export default VehicleFeed;
