import type { CarouselRef } from 'antd/lib/carousel';
import type { Age, Build, Gender, Race } from 'graphql/types';

import publicOffenderDob from '#/utils/public-offender-dob';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Carousel, Col, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import moment from 'moment';
import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';
import {
  calcAge,
  getOffenderAge,
  getOffenderBuild,
  getOffenderGender,
  getOffenderRace,
} from 'utils/offender/get-offender-desc';

const { Text, Title } = Typography;

interface Props {
  offender: {
    age?: Age | null | undefined;
    build?: Build | null | undefined;
    dateOfBirth?: Date | null | undefined;
    gender?: Gender | null | undefined;
    id: string;
    images:
      | {
          id: string;
          optimised?: string;
          optimisedPersisted?: string;
        }[]
      | null
      | undefined;
    name?: null | string | undefined;
    race?: Race | null | undefined;
    reference?: null | number | undefined;
    totalIncidents?: number;
    updatedAt?: Date | null | undefined;
  };
}

const OffenderCard = ({ offender }: Props): JSX.Element => {
  const imagesRef = useRef<CarouselRef>(null);
  const intl = useIntl();

  const publicOffenderDOB = publicOffenderDob();
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
              <div className="offender-card-image">
                <WatermarkImage
                  url={image.optimisedPersisted ?? image.optimised}
                />
              </div>
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
              className="offender-card-control"
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
              size="lg"
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              className="offender-card-control"
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
              size="lg"
            />
          </Col>
        </Row>
      )}
      {offender && offender.images && offender.images.length > 0 && (
        <FontAwesomeIcon
          className="offender-card-expand"
          icon={faArrowsMaximize}
          size="lg"
        />
      )}
      <div className="offender-card-content">
        <div className="offender-card-desc">
          <Row gutter={8}>
            <Col flex={1}>
              <Title ellipsis level={4} style={{ marginBottom: 0 }}>
                {offender?.name}
              </Title>
            </Col>
            <Col>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ fontSize: 18, marginRight: 5, width: 20 }}
              />
              <Text style={{ fontSize: 16 }} type="secondary">
                {offender?.totalIncidents}
              </Text>
            </Col>
          </Row>
          <Text type="secondary">
            {intl.formatMessage(
              {
                defaultMessage: 'Alert ID: {ref}',
              },
              {
                ref: offender?.reference,
              }
            )}
          </Text>
          <Row style={{ marginBottom: 10, marginTop: 5 }}>
            <Col>
              <FontAwesomeIcon
                className="offender-card-icon"
                icon={faClock}
                size="sm"
              />
              <Text type="secondary">
                {intl.formatMessage(
                  {
                    defaultMessage: 'Last updated: {date}',
                  },
                  {
                    date: FormatCalendar(offender?.updatedAt || moment()),
                  }
                )}
              </Text>
            </Col>
          </Row>
        </div>

        <Row gutter={16}>
          {publicOffenderDOB && (
            <Col>
              <FontAwesomeIcon
                className="offender-card-icon"
                icon={faUserClock}
                size="sm"
              />
              <Text type="secondary">
                {intl.formatMessage({
                  defaultMessage: 'Age: ',
                })}
                {offender.dateOfBirth
                  ? calcAge(offender.dateOfBirth)
                  : getOffenderAge(offender.age)}
              </Text>
            </Col>
          )}
          <Col>
            <FontAwesomeIcon
              className="offender-card-icon"
              icon={faUserTag}
              size="sm"
            />
            <Text type="secondary">
              {intl.formatMessage({
                defaultMessage: 'Build: ',
              })}
              {getOffenderBuild(offender.build)}
            </Text>
          </Col>
          <Col flex={1}>
            <FontAwesomeIcon
              className="offender-card-icon"
              icon={faMarsAndVenus}
              size="sm"
            />
            <Text type="secondary">
              {intl.formatMessage({
                defaultMessage: 'Sex: ',
              })}
              {getOffenderGender(offender.gender)}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col>
            <FontAwesomeIcon
              className="offender-card-icon"
              icon={faEarth}
              size="sm"
            />
            <Text type="secondary">
              {intl.formatMessage({
                defaultMessage: 'Ethnicity: ',
              })}
              {getOffenderRace(offender.race, false)}
            </Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default OffenderCard;
