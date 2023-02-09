import React from 'react';
import { Col, Divider, Image, Row, Space, Tag, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
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
  const { id, title, updatedAt, tags, previewImage, previewText, createdBy } =
    articleData?.article || {};

  return (
    <Link to={`/app/article/view/${id}`}>
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
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Title level={4}>{title}</Title>
          <Paragraph style={{ marginBottom: 5 }}>{previewText}</Paragraph>
          <Row wrap={false} style={{ marginTop: 10 }}>
            <Col flex={1}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {formatDate(updatedAt)}
              </Text>
            </Col>
            <Col>
              <Text type="secondary" style={{ fontSize: 12 }}>
                {createdBy?.fullName}
              </Text>
            </Col>
          </Row>
          {tags && tags.length ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 15 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null}
        </div>
      </Space>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    </Link>
  );
};

export default ArticleFeed;
