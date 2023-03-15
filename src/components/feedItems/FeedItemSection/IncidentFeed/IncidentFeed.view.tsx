import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClock,
  faLocationDot,
  faUser,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import UpdateContent from '../UpdateContent';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewIncident?: boolean;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 140,
      height: 160,
      borderRadius: 5,
    }}
  >
    <WatermarkImage url={src} />
  </div>
);
const IncidentFeed = ({
  feedItem,
  isNewImage,
  isNewIncident,
}: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    updates,
    images,
    dayTime,
    description,
    business,
    // totalUpdates,
    subject,
    // reference,
    // policeRef,
    createdBy,
    id,
    offenders,
  } = feedItem?.incident || {};

  return (
    <Row gutter={15} wrap={false} key={id || ''} style={{ width: '100%' }}>
      {!isNewImage && updates && updates[0]?.images[0] ? (
        <Col>
          <ImageContainer
            src={
              updates[0].images[0].optimised || updates[0].images[0].url || ''
            }
          />
        </Col>
      ) : null}
      {(isNewIncident || isNewImage) && images && images.length ? (
        <Col>
          <ImageContainer src={images[0].optimised || images[0].url || ''} />
        </Col>
      ) : null}

      <Col flex={1}>
        <Link to={`/app/incidents/view/${id}`}>
          {isNewIncident ? (
            <>
              <Title style={{ marginBottom: 2 }} level={4} ellipsis>
                {subject}
              </Title>

              <Paragraph style={{ fontSize: 14 }} type="secondary" ellipsis>
                {description}
              </Paragraph>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {dayTime}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUser}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {createdBy?.fullName} - {createdBy?.businesses[0]?.name}
                  </Text>
                </Col>
              </Row>
              <Row wrap={false} className="incident-card-location-row">
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faLocationDot}
                  />
                </Col>
                <Col>
                  <Text style={{ fontSize: 14 }} ellipsis type="secondary">
                    {business?.name}
                  </Text>
                </Col>
              </Row>
              {offenders && offenders.length ? (
                <Row wrap={false} style={{ overflowX: 'auto', marginTop: 10 }}>
                  {offenders.map((offender) => (
                    <Link
                      to={
                        offender.id ? `/app/offenders/view/${offender.id}` : ``
                      }
                    >
                      <Tag key={offender.id}>
                        {offender.name || 'Unknown Offender'}
                      </Tag>
                    </Link>
                  ))}
                </Row>
              ) : null}
            </>
          ) : (
            <>
              {updates && updates.length ? (
                <UpdateContent title={subject || ''} update={updates[0]} />
              ) : null}
            </>
          )}
        </Link>
      </Col>
    </Row>
  );
};

export default IncidentFeed;
