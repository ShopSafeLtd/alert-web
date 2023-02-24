import React from 'react';
import { Card, Col, Row, Tag, Typography } from 'antd';
import { ArticlePriority, ArticlesQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';

const { Title, Paragraph, Text } = Typography;

interface Props {
  article:
    | Exclude<ArticlesQuery['articles'], undefined | null>[0]
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
    <Card
      key={id}
      // style={{ height: 250 }}
      className="feedItem-card"
    >
      <Link to={`/app/article/view/${id}`}>
        {previewImage ? (
          <div
            className="feedItem-card-image"
            style={{
              backgroundImage: `url(${previewImage})`,
            }}
            key={id}
          />
        ) : (
          <div style={{ marginTop: 10 }} />
        )}
        <div className="feedItem-card-content">
          <Title level={4}>
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
          <Paragraph className="feedItem-card-desc" ellipsis={{ rows: 3 }}>
            {previewText}
          </Paragraph>
          {/* {tags && tags.length ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 5 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null} */}
          {tags && tags.length ? (
            <Row
              wrap={false}
              style={{
                overflowX: 'auto',
                marginBottom: 10,
                alignItems: 'flex-end',
                alignContent: 'flex-end',
              }}
              gutter={5}
            >
              {tags.map((tag, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={i}>
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
      </Link>
    </Card>
  );
};

export default ArticleFeed;
