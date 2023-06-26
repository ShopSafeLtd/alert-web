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
import { useIntl } from 'react-intl';
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
  const intl = useIntl();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/crimeGroups/view/${id}`}>
      <Row gutter={20} wrap={false} style={{ width: '100%' }}>
        <Col flex={1}>
          {isNewCrimeGroup ? (
            <>
              <Title level={4} ellipsis>
                {alias ||
                  intl.formatMessage(
                    { defaultMessage: 'Alert ID: {reference}', id: '377fsC' },
                    {
                      reference,
                    }
                  )}
              </Title>
              {alias ? (
                <Row style={{ marginTop: -5, marginBottom: 5 }}>
                  <Col>
                    <Text style={{ fontSize: 14 }} type="secondary">
                      {intl.formatMessage(
                        {
                          defaultMessage: 'Alert ID: {reference}',
                          id: '377fsC',
                        },
                        {
                          reference,
                        }
                      )}
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
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Members: {totalOffenders}',
                        id: 'j/FtxW',
                      },
                      {
                        totalOffenders: totalOffenders || 0,
                      }
                    )}
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
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Total Incidents: {totalIncidents}',
                        id: 'zlX6V5',
                      },
                      {
                        totalIncidents: totalIncidents || 0,
                      }
                    )}
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
                    {intl.formatMessage(
                      {
                        defaultMessage: 'Total Lost value: : {value}',
                        id: 'JLznCv',
                      },
                      {
                        value: totalValue || 0,
                      }
                    )}
                  </Text>
                </Col>
              </Row>
            </>
          ) : updates && updates.length > 0 ? (
            <UpdateContent
              title={
                alias ||
                intl.formatMessage(
                  { defaultMessage: 'Alert ID: {reference}', id: '377fsC' },
                  {
                    reference,
                  }
                )
              }
              update={updates[0]}
            />
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default CrimeGroupFeed;
