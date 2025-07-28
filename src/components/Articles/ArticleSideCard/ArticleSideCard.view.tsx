import type { ListArticlesQuery } from '#/graphql/article/queries/__generated__/list_articles.generated';

import {
  faClock,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Skeleton, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ArticlePriority } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ArticleSideCard.styles';

const { Text } = Typography;

interface Props {
  article:
    | Exclude<
        ListArticlesQuery['listArticles'],
        null | undefined
      >['articles'][number]
    | null
    | undefined;
}

const ArticleSideCard = ({ article }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  const { createdBy, id, images, previewText, priority, title, updatedAt } =
    article || {};

  return (
    <Link style={{ textDecoration: 'none' }} to={`/app/article/view/${id}`}>
      <Row className={classes.cardRow} wrap={false}>
        <Col>
          {images && images.length > 0 ? (
            <div className={classes.image}>
              <WatermarkImage
                position={images[0]?.position}
                url={images[0]?.optimised || images[0]?.url || ''}
              />
            </div>
          ) : (
            <Skeleton.Image className={classes.imageSkeleton} />
          )}
        </Col>
        <Col className={classes.content} flex={1}>
          <Text
            className={classes.title}
            ellipsis={{
              tooltip: title?.replace(/^\S/, (s) => s.toUpperCase()),
            }}
          >
            {priority === ArticlePriority.High && (
              <FontAwesomeIcon
                className={classes.priorityIcon}
                icon={faExclamationCircle}
              />
            )}
            {title?.replace(/^\S/, (s) => s.toUpperCase())}
          </Text>
          {previewText && (
            <div className={classes.description}>{previewText}</div>
          )}
          <div className={classes.meta}>
            <Text className={classes.detail} ellipsis>
              <FontAwesomeIcon className={classes.icon} icon={faUser} />
              {createdBy?.fullName}
            </Text>
            <Text className={classes.detail}>
              <FontAwesomeIcon className={classes.icon} icon={faClock} />
              {FormatCalendar(updatedAt || new Date(), intl)}
            </Text>
          </div>
        </Col>
      </Row>
    </Link>
  );
};

export default ArticleSideCard;
