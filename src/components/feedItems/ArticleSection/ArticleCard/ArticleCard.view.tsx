import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { ArticlePriority } from 'graphql/generated';
import { Link } from 'react-router-dom';
import SkeletonImage from 'components/images/SkeletonImage.view';

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

const ArticleCard = ({ article }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    id,
    title,
    tags,
    images,
    previewText,
    updatedAt,
    priority,
    createdBy,
  } = article || {};
  const classes = useStyles();

  return (
    <Link to={`/app/article/view/${id}`}>
      <div className={classes.card}>
        {images && images.length > 0 ? (
          <div
            style={{
              width: '100%',
              height: 200,
            }}
            key={id}
          >
            <WatermarkImage
              position={images[0]?.position}
              url={images[0]?.optimised || images[0]?.url || ''}
            />
          </div>
        ) : (
          <SkeletonImage height={200} />
        )}
        <div
          className="feedItem-card-content"
          style={{ padding: '10px 20px 20px', alignItems: 'stretch' }}
        >
          <div style={{ height: 125 }}>
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
            <Paragraph className="feedItem-card-desc" ellipsis={{ rows: 2 }}>
              {previewText}
            </Paragraph>
          </div>
          <Row style={{ marginBottom: 10, alignItems: 'flex-end' }}>
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

          {tags && tags.length > 0 ? (
            <Row
              wrap={false}
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

export default ArticleCard;
