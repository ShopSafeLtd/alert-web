import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery, ImagePosition } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';

import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
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
  isNewOffender?: boolean;
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
const OffenderFeed = ({
  feedItem,
  isNewImage,
  isNewOffender,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    age,
    build,
    gender,
    name,
    race,
    dateOfBirth,
    reference,
    id,
    updates,
    images,
    tags,
    // lastActive,
    // incidents,
  } = feedItem?.offender || {};

  return (
    <Link to={`/app/offenders/view/${id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        {(isNewOffender || isNewImage) && images && images.length > 0 ? (
          <Col>
            <ImageContainer
              position={images[0].position}
              src={images[0].optimised || images[0].url || ''}
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
          {isNewOffender ? (
            <>
              <Title level={4} ellipsis>
                {name}
              </Title>
              <Row style={{ marginTop: -5, marginBottom: 5 }}>
                <Col>
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Alert ID: {reference}
                  </Text>
                </Col>
              </Row>
              {tags && tags.length > 0 ? (
                <Row style={{ marginBottom: 5 }}>
                  {tags.map((tag) => (
                    <Col key={tag.id}>
                      <Tag color="red">{tag.name}</Tag>
                    </Col>
                  ))}
                </Row>
              ) : (
                <div style={{ marginBottom: 5 }} />
              )}
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faUserClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Age:
                    {dateOfBirth ? calcAge(dateOfBirth) : getOffenderAge(age)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faUserTag}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Build:{getOffenderBuild(build)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col flex={1}>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faMarsAndVenus}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Sex: {getOffenderGender(gender)}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faEarth}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Ethnicity: {getOffenderRace(race, false)}
                  </Text>
                </Col>
              </Row>
            </>
          ) : updates && updates.length > 0 ? (
            <UpdateContent
              title={name || 'Unidentified Offender'}
              update={updates[0]}
            />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default OffenderFeed;
