import React from 'react';
import { Col, Divider, Image, Row, Tag, Typography } from 'antd';
import { FeedItemsQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface Props {
  articleData:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}

const ArticleFeed = ({ articleData }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const { id, title, tags, previewImage, previewText } =
    articleData?.article || {};

  return (
    <Link to={`/app/article/view/${id}`}>
      <Row wrap={false}>
        <Col>
          {previewImage && (
            <Image
              width={100}
              height={100}
              style={{ borderRadius: 5, marginLeft: 10 }}
              src={previewImage}
            />
          )}
        </Col>
        <Col>
          <div style={{ paddingLeft: 20, paddingRight: 20, display: 'block' }}>
            <Title level={4} style={{ fontSize: 15, marginBottom: 5 }}>
              {title}
            </Title>
            <Paragraph
              style={{
                marginBottom: 0,
                height: 40,
                width: '100%',
                fontSize: 12,
                whiteSpace: 'normal',
                textOverflow: 'ellipsis',
              }}
              type="secondary"
              ellipsis
            >
              {previewText}
            </Paragraph>
            {tags && tags.length ? (
              <Row wrap={false} style={{ overflowX: 'auto', marginTop: 5 }}>
                {tags.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </Row>
            ) : null}
          </div>
        </Col>
      </Row>
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    </Link>
  );
};

export default ArticleFeed;
