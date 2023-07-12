import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import UpdateContent from '../UpdateContent';
import ImageContainer from '../ImageContainer';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  isNewImage?: boolean;
  isNewIncident?: boolean;
}

const IncidentFeed = ({
  feedItem,
  isNewImage,
  isNewIncident,
}: Props): JSX.Element => {
  const {
    feedImage,
    latestUpdate,
    // dayTime,
    description,
    business,
    // totalUpdates,
    subject,
    reference,
    // policeRef,
    // createdBy,
    id,
    // totalOffenders,
    // offenders,
  } = feedItem?.incident || {};
  const intl = useIntl();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/incidents/view/${id}`}>
      <Row gutter={15} wrap={false} key={id || ''} style={{ width: '100%' }}>
        {!isNewImage && latestUpdate && latestUpdate.feedImage ? (
          <Col>
            <ImageContainer
              src={latestUpdate.feedImage.low || ''}
              position={latestUpdate.feedImage.position}
            />
          </Col>
        ) : null}
        {(isNewIncident || isNewImage) && feedImage ? (
          <Col>
            <ImageContainer
              src={feedImage.low || ''}
              position={feedImage.position}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10, marginLeft: 15 }}>
          {!isNewIncident && latestUpdate ? (
            <UpdateContent title={subject || ''} update={latestUpdate} />
          ) : (
            <>
              <Title level={4} ellipsis>
                {subject}
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

              {/* <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
                    className="feedItem-card-icon"
                    icon={faClock}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    Created At: {dayTime}
                  </Text>
                </Col>
              </Row> */}
              {/* <Row>
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
              </Row> */}

              {description && (
                <Paragraph
                  type="secondary"
                  style={{ fontSize: 14, marginTop: 10 }}
                  ellipsis={{ rows: 3 }}
                >
                  {description}
                </Paragraph>
              )}
              <Row wrap={false} className="incident-card-location-row">
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    style={{ marginRight: 5 }}
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
            </>
          )}
        </Col>
      </Row>
    </Link>
  );
};

export default IncidentFeed;
