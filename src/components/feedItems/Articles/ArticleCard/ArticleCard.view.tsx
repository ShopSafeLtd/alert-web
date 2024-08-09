import type { ListArticlesQuery } from 'graphql/article/queries/__generated__/list_articles.generated';

import {
  faArrowsMaximize,
  faClock,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { faExclamationCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Typography } from 'antd';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ArticlePriority } from 'graphql/types';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ArticleCard.styles';

const { Paragraph, Text, Title } = Typography;

interface Props {
  article:
    | Exclude<
        ListArticlesQuery['listArticles'],
        null | undefined
      >['articles'][number]
    | null
    | undefined;
  openLightbox?: (elements: { src: string }[], index: number) => void;
}

const ArticleCard = ({ article, openLightbox }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const { createdBy, id, images, previewText, priority, title, updatedAt } =
    article || {};
  const classes = useStyles();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/article/view/${id}`}>
      <div className={classes.card}>
        {images && images.length > 0 ? (
          <div
            key={id}
            style={{
              height: 250,
              width: '100%',
            }}
          >
            <WatermarkImage
              position={images[0]?.position}
              url={images[0]?.optimised || images[0]?.url || ''}
            />
          </div>
        ) : (
          <SkeletonImage height={250} />
        )}
        {openLightbox && images && images.length > 0 && (
          <FontAwesomeIcon
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
            size="lg"
          />
        )}
        <div className={classes.content}>
          <div className={classes.details}>
            <Title
              ellipsis={{
                rows: 2,
                tooltip: title?.replace(/^\S/, (s) => s.toUpperCase()),
              }}
              level={4}
            >
              {priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  className="feedItem-card-icon"
                  icon={faExclamationCircle}
                  size="sm"
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
                className="feedItem-card-icon"
                icon={faUser}
                size="sm"
                style={{ marginRight: 5 }}
              />
              <Text>{createdBy?.fullName}</Text>
            </Col>
            <Col>
              <FontAwesomeIcon
                className="feedItem-card-icon"
                icon={faClock}
                size="sm"
                style={{ marginRight: 5 }}
              />
              <Text>{FormatCalendar(updatedAt || moment())}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
