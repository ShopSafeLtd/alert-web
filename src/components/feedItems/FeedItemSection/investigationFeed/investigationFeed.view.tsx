/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUsers } from '@fortawesome/pro-light-svg-icons';
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
  isNewInvestigation?: boolean;
}

const InvestigationFeed = ({
  feedItem,
  isNewImage,
  isNewInvestigation,
}: Props): JSX.Element => {
  const {
    latestUpdate,
    name,
    description,
    reference,
    totalOffenders,
    totalIncidents,
    id,
  } = feedItem?.investigation || {};
  const intl = useIntl();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/investigations/view/${id}`}>
      <Row gutter={15} wrap={false} key={id || ''} style={{ width: '100%' }}>
        {!isNewImage && latestUpdate && latestUpdate.feedImage ? (
          <Col>
            <ImageContainer
              src={latestUpdate.feedImage.low || ''}
              position={latestUpdate.feedImage.position}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10, marginLeft: 15 }}>
          {isNewInvestigation ? (
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
              <Row>
                <Col>
                  <FontAwesomeIcon
                    size="sm"
                    className="feedItem-card-icon"
                    icon={faUsers}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {intl.formatMessage(
                      { defaultMessage: 'Members: {members}', id: '8gjK3b' },
                      {
                        members: totalOffenders || 0,
                      }
                    )}
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
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Total Incidents: {members}',
                        id: 'yEyRrH',
                      },
                      {
                        members: totalIncidents || 0,
                      }
                    )}
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
                    icon={faUsers}
                  />
                  <Text style={{ fontSize: 14 }} type="secondary">
                    {createdBy?.fullName} - {createdBy?.businesses[0]?.name}
                  </Text>
                </Col>
              </Row> */}
            </>
          ) : latestUpdate ? (
            <UpdateContent title={name || ''} update={latestUpdate} />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default InvestigationFeed;
