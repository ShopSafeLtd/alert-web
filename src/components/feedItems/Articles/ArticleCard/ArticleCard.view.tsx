import React from 'react';
import { Col, Row, Typography } from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { ArticlePriority } from 'graphql/generated';
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
import FormatCalendar from 'utils/format-calendar-24h';
import moment from 'moment';
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
  const { id, title, images, previewText, updatedAt, priority, createdBy } =
    article || {};
  const classes = useStyles();
  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/article/view/${id}`}>
      <div className={classes.card}>
        {images && images.length > 0 ? (
          <div
            style={{
              width: '100%',
              height: 250,
            }}
            key={id}
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
            <Title
              level={4}
              ellipsis={{
                rows: 2,
                tooltip: title?.replace(/^\S/, (s) => s.toUpperCase()),
              }}
            >
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
              <Text>{FormatCalendar(updatedAt || moment())}</Text>
            </Col>
          </Row>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
