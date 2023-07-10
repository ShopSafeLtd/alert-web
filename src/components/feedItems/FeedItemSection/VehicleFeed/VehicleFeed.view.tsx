/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */

import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faCarSide,
  faPalette,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import UpdateContent from '../UpdateContent';
import ImageContainer from '../ImageContainer';

const { Title, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewVehicle?: boolean;
}

const VehicleFeed = ({
  feedItem,
  isNewImage,
  isNewVehicle,
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
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/vehicles/view/${id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        {(isNewVehicle || isNewImage) && feedImage ? (
          <Col>
            <ImageContainer
              src={feedImage.optimised || feedImage.url || ''}
              position={feedImage.position}
            />
          </Col>
        ) : null}
        {!isNewImage && latestUpdate && latestUpdate.feedImage ? (
          <Col>
            <ImageContainer
              src={
                latestUpdate.feedImage.optimised ||
                latestUpdate.feedImage.url ||
                ''
              }
              position={latestUpdate.feedImage.position}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10, marginLeft: 15 }}>
          {isNewVehicle ? (
            <>
              <Title level={4} ellipsis>
                {registration ||
                  intl.formatMessage(
                    { defaultMessage: 'Alert ID: {reference}', id: '377fsC' },
                    {
                      reference,
                    }
                  ) ||
                  intl.formatMessage({
                    defaultMessage: " 'Unidentified Vehicle'",
                    id: '1/BQcU',
                  })}
              </Title>

              {registration ? (
                <Row style={{ marginTop: -5, marginBottom: 5 }}>
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
              ) : null}

              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faUser}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Members: {members}', id: '8gjK3b' },
                      {
                        members: totalOffenders || 0,
                      }
                    )}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faCar}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
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
              </Row>
              <Row>
                <Col flex={1}>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faCarSide}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
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
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faPalette}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
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
          ) : latestUpdate ? (
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
                ) ||
                intl.formatMessage({
                  defaultMessage: 'Unidentified Vehicle',
                  id: 'I3q18K',
                })
              }
              update={latestUpdate}
            />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default VehicleFeed;
