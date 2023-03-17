import React from 'react';
import { Col, Row, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
  const { updates, name, description, updatedAt, createdBy, id } =
    feedItem?.investigation || {};

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

      <Col flex={1}>
        <Link to={`/app/investigations/view/${id}`}>
          {isNewInvestigation ? (
            <>
              <Title style={{ marginBottom: 2 }} level={4} ellipsis>
                {name}
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
                    {moment(updatedAt).calendar()}
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
            </>
          ) : (
            <>
              {updates && updates.length ? (
                <UpdateContent title={name || ''} update={updates[0]} />
              ) : null}
            </>
          )}
        </Link>
      </Col>
    </Row>
  );
};

export default InvestigationFeed;
