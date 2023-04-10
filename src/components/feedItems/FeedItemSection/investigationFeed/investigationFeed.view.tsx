import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUser } from '@fortawesome/pro-light-svg-icons';
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
  isNewInvestigation?: boolean;
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
const InvestigationFeed = ({
  feedItem,
  isNewImage,
  isNewInvestigation,
}: Props): JSX.Element => {
  const {
    updates,
    name,
    description,
    reference,
    totalOffenders,
    totalIncidents,
    id,
  } = feedItem?.investigation || {};

  return (
    <Link to={`/app/investigations/view/${id}`}>
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

        <Col flex={1}>
          {isNewInvestigation ? (
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
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUser}
                    style={{ marginRight: 5 }}
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
                    className="feedItem-card-icon"
                    icon={faExclamationCircle}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Total Incidents: {totalIncidents || 0}
                  </Text>
                </Col>
              </Row>

              {description && (
                <Paragraph
                  type="secondary"
                  style={{ fontSize: 14, marginTop: 10 }}
                  ellipsis={{ rows: 3 }}
                >
                  {description}
                </Paragraph>
              )}
              {/* <Row>
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
              </Row> */}
            </>
          ) : updates && updates.length > 0 ? (
            <UpdateContent title={name || ''} update={updates[0]} />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default InvestigationFeed;
