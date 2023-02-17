import React from 'react';
import { Card, Col, Divider, Row, Typography } from 'antd';
import { FeedItemsQuery, FeedItemType } from 'graphql/generated';
import { formatDate } from 'utils';
import IncidentFeed from '../FeedItemSection/IncidentFeed';
import OffenderFeed from '../FeedItemSection/OffenderFeed';
import ArticleFeed from '../FeedItemSection/ArticleFeed';

const { Title, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
  // onDeleteFeedItem: (value: string) => void;
  // adminRights: boolean;
}

const FeedItemCard = ({
  feedItem,
}: // onDeleteFeedItem,
// adminRights,
Props): JSX.Element => (
  <Card
    style={{
      width: '100%',
      marginBottom: 10,
    }}
    key={feedItem?.id}
    bodyStyle={{ padding: 0, marginLeft: 5 }}
  >
    <>
      <Row style={{ margin: '10px 15px 5px' }}>
        <Col flex={1}>
          <Title style={{ margin: 0 }} level={5}>
            {feedItem?.message}
          </Title>
        </Col>
        <Col>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {formatDate(feedItem?.updatedAt)}
          </Text>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} />
      <div style={{ borderTop: '1px', padding: 10 }}>
        {/* create new incident/offender */}
        {feedItem?.type === FeedItemType.NewIncident && (
          <IncidentFeed feedItem={feedItem} isNewIncident />
        )}
        {feedItem?.type === FeedItemType.NewOffender && (
          <OffenderFeed feedItem={feedItem} isNewOffender />
        )}
        {/* update details  */}
        {feedItem?.type === FeedItemType.Incident && (
          <IncidentFeed feedItem={feedItem} />
        )}
        {feedItem?.type === FeedItemType.Offender && (
          <OffenderFeed feedItem={feedItem} />
        )}
        {/* add new images */}
        {feedItem?.type === FeedItemType.IncidentImage && (
          <IncidentFeed feedItem={feedItem} isNewImage />
        )}
        {feedItem?.type === FeedItemType.OffenderImage && (
          <OffenderFeed feedItem={feedItem} isNewImage />
        )}
        {/* add new intel */}
        {feedItem?.type === FeedItemType.IncidentIntel && (
          <IncidentFeed feedItem={feedItem} />
        )}
        {feedItem?.type === FeedItemType.OffenderIntel && (
          <OffenderFeed feedItem={feedItem} />
        )}

        {/* article */}
        {feedItem?.type === FeedItemType.NewArticle && (
          <ArticleFeed feedItem={feedItem} />
        )}
      </div>
    </>
  </Card>
);

export default FeedItemCard;
