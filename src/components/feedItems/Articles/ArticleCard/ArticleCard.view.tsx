import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { ArticlePriority, Role } from 'graphql/generated';
import { Link } from 'react-router-dom';
import SkeletonImage from 'components/images/SkeletonImage.view';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';

import {
  faArrowsMaximize,
  faClock,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';
import formatCalendar from 'utils/format-calendar-24h';
import { useStoreState } from 'state';
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
  openLightbox?: (elements: { src: string }[], index: number) => void;
}

const ArticleCard = ({ article, openLightbox }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    id,
    title,
    groups,
    images,
    previewText,
    updatedAt,
    priority,
    createdBy,
  } = article || {};
  const classes = useStyles();
  const userGroups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
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
        {openLightbox && images && images.length > 0 && (
          <FontAwesomeIcon
            size="lg"
            className={classes.imageExpand}
            icon={faArrowsMaximize}
            onClick={() =>
              openLightbox(
                images.map((image) => ({
                  src: image.optimised || '',
                })) || [],
                0
              )
            }
          />
        )}
        <div className={classes.content}>
          <div className={classes.details}>
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
            <Paragraph ellipsis={{ rows: 3 }}>{previewText}</Paragraph>
          </div>

          <Row style={{ marginBottom: 5 }}>
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
              <Text>{formatCalendar(updatedAt || new Date())}</Text>
            </Col>
          </Row>
          {userGroups.length > 0 &&
          role !== Role.User &&
          groups &&
          groups.length > 0 ? (
            <Row wrap={false} className={classes.tagRow}>
              {groups.map((group) => (
                <Col key={group.id}>
                  <Tag key={group.id}>{group.name}</Tag>
                </Col>
              ))}
            </Row>
          ) : (
            <div style={{ marginBottom: 5 }} />
          )}
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
