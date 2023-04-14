import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery, ImagePosition } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faCarSide,
  faPalette,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import UpdateContent from '../UpdateContent';

const { Title, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewVehicle?: boolean;
}

const ImageContainer = ({
  src,
  position,
}: {
  src: string;
  position: ImagePosition;
}) => (
  <div
    style={{
      width: 140,
      height: 160,
      borderRadius: 5,
    }}
  >
    <WatermarkImage url={src} position={position} />
  </div>
);
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
    updates,
    images,
    totalOffenders,
    reference,
  } = feedItem?.vehicle || {};

  return (
    <Link to={`/app/vehicles/view/${id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        {(isNewVehicle || isNewImage) && images && images.length > 0 ? (
          <Col>
            <ImageContainer
              src={images[0].optimised || images[0].url || ''}
              position={images[0].position}
            />
          </Col>
        ) : null}
        {!isNewImage && updates && updates[0]?.images[0] ? (
          <Col>
            <ImageContainer
              src={
                updates[0].images[0].optimised || updates[0].images[0].url || ''
              }
              position={updates[0].images[0].position}
            />
          </Col>
        ) : null}

        <Col flex={1}>
          {isNewVehicle ? (
            <>
              <Title level={4} ellipsis>
                {registration ||
                  `Alert ID: ${reference}` ||
                  'Unidentified Vehicle'}
              </Title>

              {registration ? (
                <Row style={{ marginTop: -5, marginBottom: 5 }}>
                  <Col>
                    <Text style={{ fontSize: 14 }} type="secondary">
                      Alert ID: {reference}
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
                    Members: {totalOffenders || 0}
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
                    Make: {make || 'Unknown'}
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
                    Model: {model || 'Unknown'}
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
                    Colour: {colour || 'Unknown'}
                  </Text>
                </Col>
              </Row>
            </>
          ) : updates && updates.length > 0 ? (
            <UpdateContent
              title={
                registration ||
                `Alert ID: ${reference}` ||
                'Unidentified Vehicle'
              }
              update={updates[0]}
            />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default VehicleFeed;
