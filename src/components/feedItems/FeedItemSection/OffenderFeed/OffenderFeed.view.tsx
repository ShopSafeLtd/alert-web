import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
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
  isNewOffender?: boolean;
}

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
    latestUpdate,
    feedImage,
    tags,
    // lastActive,
    // incidents,
  } = feedItem?.offender || {};
  const intl = useIntl();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/offenders/view/${id}`}>
      <Row gutter={15} wrap={false} style={{ width: '100%' }}>
        {(isNewOffender || isNewImage) && feedImage ? (
          <Col>
            <ImageContainer
              position={feedImage.position}
              src={feedImage.low || ''}
            />
          </Col>
        ) : null}
        {!isNewImage && latestUpdate && latestUpdate?.feedImage ? (
          <Col>
            <ImageContainer
              src={latestUpdate?.feedImage.low || ''}
              position={latestUpdate?.feedImage.position}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10, marginLeft: 15 }}>
          {isNewOffender ? (
            <>
              <Title level={4} ellipsis>
                {name}
              </Title>
              <Row style={{ marginTop: -5, marginBottom: 5 }}>
                <Col>
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Alert ID: {reference}', id: '377fsC' },
                      {
                        reference,
                      }
                    )}
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
                    {intl.formatMessage({
                      defaultMessage: 'Age: ',
                      id: 'anqdpr',
                    })}
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
                    {intl.formatMessage({
                      defaultMessage: 'Build: ',
                      id: 'iXQkAi',
                    })}
                    {getOffenderBuild(build)}
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
                    {intl.formatMessage({
                      defaultMessage: 'Sex: ',
                      id: 'j3ULId',
                    })}
                    {getOffenderGender(gender)}
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
                    {intl.formatMessage({
                      defaultMessage: 'Ethnicity: ',
                      id: 'H+Sv5C',
                    })}
                    {getOffenderRace(race, false)}
                  </Text>
                </Col>
              </Row>
            </>
          ) : latestUpdate ? (
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
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default OffenderFeed;
