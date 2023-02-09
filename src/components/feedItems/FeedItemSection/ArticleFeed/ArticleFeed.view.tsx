import React, { useState } from 'react';
import { Col, Image, Row, Tag, Typography } from 'antd';
import { ArticlePriority, FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}
const ImageContainer = ({ src }: { src: string }) => (
  <Image width={200} height={200} style={{ borderRadius: 5 }} src={src} />
);
const ArticleFeed = ({ feedItem }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    id,
    title,
    updatedAt,
    tags,
    previewImage,
    previewText,
    priority,
    createdBy,
  } = feedItem?.article || {};

  return (
    <Row gutter={15} wrap={false} key={id || ''}>
      <Col style={{ marginLeft: 10 }}>
        {previewImage ? <ImageContainer src={previewImage} /> : null}
      </Col>

      {/* <Link to={`/app/incidents/view/${id}`}> */}
      <Col
        flex={1}
        style={{
          marginTop: 5,
        }}
      >
        <Title level={4} ellipsis>
          {title}

          {priority === ArticlePriority.High && (
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faStar}
              style={{ marginLeft: 5 }}
            />
          )}
        </Title>
        <Row>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faClock}
            />
            <Text type="secondary">{moment(updatedAt)}</Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faUser}
            />
            <Text type="secondary">
              {createdBy?.fullName} - {createdBy?.organisation}
            </Text>
          </Col>
        </Row>

        <Paragraph type="secondary" style={{ marginTop: 10 }}>
          {previewText}
        </Paragraph>
        {tags && tags.length ? (
          <Row wrap={false} style={{ overflowX: 'auto', marginTop: 15 }}>
            {tags.map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </Row>
        ) : null}
      </Col>
      {/* </Link> */}
    </Row>
  );
};

export default ArticleFeed;
