import React from 'react';
import { Col, Divider, Row, Tag, Typography } from 'antd';
import { ArticlePriority, ListArticlesQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';

import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;

interface Props {
  article:
    | Exclude<
        ListArticlesQuery['listArticles'],
        undefined | null
      >['articles'][0]
    | null
    | undefined;
}

const ArticleFeed = ({ article }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    id,
    title,
    tags,
    previewImage,
    previewText,
    updatedAt,
    priority,
    createdBy,
  } = article || {};

  return (
    <Link to={`/app/article/view/${id}`}>
      <div>
        {previewImage ? (
          <div
            style={{
              backgroundImage: `url(${previewImage})`,
              width: '100%',
              height: 150,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              marginBottom: 10,
            }}
            key={id}
          />
        ) : (
          <div style={{ marginTop: 10 }} />
        )}
        <div
          className="feedItem-card-content"
          style={{ padding: '0 20px 20px' }}
        >
          <Title level={4}>
            {priority === ArticlePriority.High && (
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faExclamationCircle}
                style={{ marginRight: 8 }}
              />
            )}
            {title?.replace(/^\S/, (s) => s.toUpperCase())}
          </Title>
          <Paragraph className="feedItem-card-desc" ellipsis={{ rows: 3 }}>
            {previewText}
          </Paragraph>
          <Row style={{ marginBottom: 10 }}>
            <Col flex={1}>
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faUser}
                style={{ marginRight: 5 }}
              />
              <Text>{createdBy?.fullName}</Text>
            </Col>
            <Col>
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faClock}
                style={{ marginRight: 5 }}
              />
              <Text>{moment(updatedAt).calendar()}</Text>
            </Col>
          </Row>

          {tags && tags.length ? (
            <Row
              // wrap={false}
              style={{
                overflowX: 'auto',
                alignItems: 'flex-end',
                alignContent: 'flex-end',
              }}
              className="feedItem-card-tags-row"
              gutter={5}
            >
              {tags.map((tag) => (
                <Col
                  key={tag.id}
                  style={{
                    marginBottom: 5,
                  }}
                >
                  <Tag
                    key={tag.id}
                    className="feedItem-card-tag"
                    style={{ alignItems: 'flex-end', alignContent: 'flex-end' }}
                  >
                    {tag.name}
                  </Tag>
                </Col>
              ))}
            </Row>
          ) : null}
        </div>
        <Divider style={{ margin: 0 }} />
      </div>
    </Link>
  );
};

export default ArticleFeed;
