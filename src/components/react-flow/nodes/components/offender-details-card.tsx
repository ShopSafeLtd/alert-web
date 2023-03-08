import React, { useRef } from 'react';
import { Card, Carousel, Col, Row, Skeleton, Typography } from 'antd';

import { Age, Build, Gender, Race } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faEarth,
  faExclamationCircle,
  faMarsAndVenus,
  faUserClock,
  faUserTag,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

import moment from 'moment';
import { CarouselRef } from 'antd/lib/carousel';

const { Title, Text } = Typography;

interface Props {
  offender: {
    images:
      | {
          id: string;
          optimised: string;
        }[]
      | null
      | undefined;
    id: string;
    name?: string | null | undefined;
    totalIncidents?: number;
    reference?: number | null | undefined;
    updatedAt?: Date | null | undefined;
    age?: Age | null | undefined;
    dateOfBirth?: Date | null | undefined;
    build?: Build | null | undefined;
    gender?: Gender | null | undefined;
    race?: Race | null | undefined;
  };
}

const OffenderCard = ({ offender }: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);

  return (
    <Card
      className="offender-card"
      key={offender.id || ''}
      style={{ zIndex: 4 }}
    >
      {offender && offender.images && offender.images?.length > 0 ? (
        <Carousel ref={imagesRef}>
          {offender?.images?.map((image) => (
            <div key={image.id}>
              <div
                className="offender-card-image"
                style={{
                  backgroundImage: `url(${image.optimised})`,
                }}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Skeleton.Image />
      )}
      {offender && offender.images && offender.images.length > 1 && (
        <Row className="offender-card-controls">
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              size="lg"
              className="offender-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      )}
      {offender && offender.images && offender.images.length > 0 && (
        <FontAwesomeIcon
          size="lg"
          className="offender-card-expand"
          icon={faArrowsMaximize}
        />
      )}
      <div className="offender-card-content">
        <div className="offender-card-desc">
          <Row gutter={8}>
            <Col flex={1}>
              <Title level={4} ellipsis style={{ marginBottom: 0 }}>
                {offender?.name}
              </Title>
            </Col>
            <Col>
              <FontAwesomeIcon
                style={{ marginRight: 5, width: 20, fontSize: 18 }}
                icon={faExclamationCircle}
              />
              <Text style={{ fontSize: 16 }} type="secondary">
                {offender?.totalIncidents}
              </Text>
            </Col>
          </Row>
          <Text type="secondary">Alert ID: {offender?.reference}</Text>
          <Row style={{ marginTop: 5, marginBottom: 10 }}>
            <Col>
              <FontAwesomeIcon
                size="sm"
                className="offender-card-icon"
                icon={faClock}
              />
              <Text type="secondary">
                Last updated:{' '}
                {moment(offender?.updatedAt || moment()).format(
                  `ddd MMM DD YYYY - HH:mm`
                )}
              </Text>
            </Col>
          </Row>
        </div>

        <Row gutter={16}>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="offender-card-icon"
              icon={faUserClock}
            />
            <Text type="secondary">
              Age:{' '}
              {offender.dateOfBirth
                ? calcAge(offender.dateOfBirth)
                : getOffenderAge(offender.age)}
            </Text>
          </Col>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="offender-card-icon"
              icon={faUserTag}
            />
            <Text type="secondary">
              Build:{getOffenderBuild(offender.build)}
            </Text>
          </Col>
          <Col flex={1}>
            <FontAwesomeIcon
              size="sm"
              className="offender-card-icon"
              icon={faMarsAndVenus}
            />
            <Text type="secondary">
              Sex: {getOffenderGender(offender.gender)}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="offender-card-icon"
              icon={faEarth}
            />
            <Text type="secondary">
              Ethnicity: {getOffenderRace(offender.race, false)}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default OffenderCard;
