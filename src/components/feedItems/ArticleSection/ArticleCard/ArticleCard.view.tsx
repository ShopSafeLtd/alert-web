import React from 'react';
import { Col, Row, Skeleton, Tag, Typography } from 'antd';
import { ArticlePriority, ListArticlesQuery } from 'graphql/generated';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';

import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';
import moment from 'moment';
import WatermarkImage from 'components/images/WatermarkImage.view';
import useStyles from './ArticleCard.styles';

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
    image,
    previewText,
    updatedAt,
    priority,
    createdBy,
  } = article || {};
  const classes = useStyles();

  return (
    <Link to={`/app/article/view/${id}`}>
      <div className={classes.card}>
        {image ? (
          <div
            style={{
              width: '100%',
              height: 150,
              marginBottom: 10,
            }}
            key={id}
          >
            <WatermarkImage url={image.optimised || image.url || ''} />
          </div>
        ) : (
          <Skeleton.Image className={classes.skeletonImage} />
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
      </div>
    </Link>
  );
};

export default ArticleFeed;
