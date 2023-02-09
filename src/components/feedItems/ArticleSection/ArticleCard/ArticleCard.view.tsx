import React from 'react';
import { Card, Col, Image, Row, Space, Tag, Typography } from 'antd';
import { ArticlePriority, FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faStar, faUser } from '@fortawesome/pro-light-svg-icons';

import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

const { Title, Text, Paragraph } = Typography;

interface Props {
  articleData:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}

const ArticleFeed = ({ articleData }: Props): JSX.Element => {
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
  } = articleData?.article || {};

  return (
    <Card key={id}>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        {previewImage && (
          <Row>
            <Col>
              <Image
                width={100}
                height={100}
                style={{ borderRadius: 5 }}
                src={previewImage}
              />
            </Col>
          </Row>
        )}
        <Title>{title}</Title>
        <Row style={{ marginTop: 10 }}>
          <Col flex={1}>{formatDate(updatedAt)}</Col>{' '}
          <Col>{createdBy?.fullName}</Col>
        </Row>
        <Paragraph>{previewText}</Paragraph>
        {tags && tags.length ? (
          <Row wrap={false} style={{ overflowX: 'auto', marginTop: 15 }}>
            {tags.map((tag) => (
              <Tag key={tag.id}>{tag.name}</Tag>
            ))}
          </Row>
        ) : null}
      </Space>
    </Card>
  );
};

export default ArticleFeed;
