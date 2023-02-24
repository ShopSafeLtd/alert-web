import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import { ArticlePriority, FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 140,
      height: 150,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
);
const ArticleFeed = ({ feedItem }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const {
    id,
    title,
    tags,
    previewImage,
    previewText,
    priority,
    createdBy,
    updatedAt,
  } = feedItem?.article || {};

  return (
    <Row gutter={15} wrap={false} key={id || ''}>
      {previewImage ? (
        <Col>
          <ImageContainer src={previewImage} />
        </Col>
      ) : null}

      <Link to={`/app/article/view/${id}`}>
        <Col flex={1}>
          <Title style={{ marginBottom: 2 }} level={4} ellipsis>
            {title?.replace(/^\S/, (s) => s.toUpperCase())}

            {priority === ArticlePriority.High && (
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faStar}
                style={{ marginLeft: 5 }}
              />
            )}
          </Title>

          <Row style={{ marginTop: 10 }}>
            <Col>
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faUser}
              />
              <Text type="secondary">
                {createdBy?.fullName} - - {moment(updatedAt).calendar()}
              </Text>
            </Col>
          </Row>
          <Paragraph
            type="secondary"
            style={{ fontSize: 14, marginTop: 10, height: 80 }}
            className="feedItem-card-desc"
            ellipsis={{ rows: 3 }}
          >
            {previewText}
          </Paragraph>
          {tags && tags.length ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 10 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null}
        </Col>
      </Link>
    </Row>
  );
};

export default ArticleFeed;
