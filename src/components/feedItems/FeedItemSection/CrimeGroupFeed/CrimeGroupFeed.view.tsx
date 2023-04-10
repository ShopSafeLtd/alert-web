import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationCircle,
  faSterlingSign,
  faUser,
} from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import UpdateContent from '../UpdateContent';

const { Title, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewCrimeGroup?: boolean;
}

const CrimeGroupFeed = ({ feedItem, isNewCrimeGroup }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    totalIncidents,
    alias,
    // totalUpdates,
    id,
    updates,
    totalOffenders,
    reference,
    totalValue,
  } = feedItem?.crimeGroup || {};

  return (
    <Link to={`/app/crimeGroups/view/${id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        <Col flex={1}>
          {isNewCrimeGroup ? (
            <>
              <Title level={4} ellipsis>
                {alias || `Alert ID: ${reference}`}
              </Title>
              {alias ? (
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
                    icon={faExclamationCircle}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Total Incidents: {totalIncidents || 0}
                  </Text>
                </Col>
              </Row>
              <Row>
                <Col flex={1}>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faSterlingSign}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Total Lost value: {`${totalValue || 0}`}
                  </Text>
                </Col>
              </Row>
            </>
          ) : updates && updates.length > 0 ? (
            <UpdateContent
              title={alias || `Alert ID: ${reference}`}
              update={updates[0]}
            />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default CrimeGroupFeed;
