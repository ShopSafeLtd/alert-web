import React from 'react';
import { Col, Row, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEarth,
  faMarsAndVenus,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';

import moment from 'moment';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';
import { Link } from 'react-router-dom';
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
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 140,
      height: 160,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
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
    updatedAt,
    // createdAt,
    // bans,
    // totalUpdates,
    id,
    updates,
    images,
    // lastActive,
    // incidents,
  } = feedItem?.offender || {};

  return (
    <Row gutter={20} wrap={false}>
      {/* <Button
        onClick={() => {
          console.log('images1', images);
        }}
      >
        onclick
      </Button> */}
      {(isNewOffender || isNewImage) && images && images.length ? (
        <Col>
          <ImageContainer src={images[0].optimised || images[0].url || ''} />
        </Col>
      ) : null}
      {!isNewImage && updates && updates[0]?.images[0] ? (
        <Col>
          <ImageContainer
            src={
              updates[0].images[0].optimised || updates[0].images[0].url || ''
            }
          />
        </Col>
      ) : null}

      <Link to={`/app/offenders/view/${id}`}>
        <Col flex={1}>
          {isNewOffender ? (
            <>
              <Title style={{ marginBottom: 10 }} level={4} ellipsis>
                {name}
              </Title>
              <Row style={{ marginBottom: 10 }}>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faClock}
                    style={{ marginBottom: -1 }}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Last updated:
                    {moment(updatedAt || moment()).format(
                      `ddd MMM DD YYYY - HH:mm`
                    )}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
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
                    className="feedItem-card-icon"
                    icon={faEarth}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Ethnicity: {getOffenderRace(race, false)}
                  </Text>
                </Col>
              </Row>
            </>
          ) : (
            <>
              {updates && updates.length ? (
                <UpdateContent
                  title={name || 'Unidentified Offender'}
                  update={updates[0]}
                />
              ) : null}
            </>
          )}
        </Col>
      </Link>
    </Row>
  );
};

export default OffenderFeed;
