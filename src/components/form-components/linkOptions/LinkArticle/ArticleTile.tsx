import type { ArticleData } from 'types/DataType';

import {
  faClock,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { ArticlePriority } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import FormatCalendar from 'utils/format-calendar-24h';

const { Paragraph, Text, Title } = Typography;

const useStyles = createUseStyles({
  content: {
    overflow: 'hidden',
    padding: 10,
    width: '100%',
    // display: 'flex',
    // direction: 'row',
  },
  details: {
    flex: 1,
    marginBottom: '5px !important',
  },
  image: {
    height: 130,
    width: 140,
    zIndex: 10,
  },
  text: {
    marginBottom: '5px !important',
  },
});

interface Props {
  article: ArticleData;
  onClick: () => void;
}

const ArticleTile = ({ article, onClick }: Props): JSX.Element => {
  const intl = useIntl();
  const classes = useStyles();
  return (
    <Tooltip
      placement="bottom"
      title={intl.formatMessage(
        {
          defaultMessage: 'Add {title} to incident',
        },
        { title: article.title }
      )}
    >
      <Card
        bodyStyle={{
          borderRadius: '0.625rem',
          cursor: 'pointer',
          display: 'flex',
          height: 130,
          overflow: 'hidden',
          // position: 'relative',
          padding: 0,
        }}
        onClick={onClick}
      >
        {article.images && article.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={article.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.content}>
          <div className={classes.details}>
            <Title
              ellipsis={{
                tooltip: article.title?.replace(/^\S/, (s) => s.toUpperCase()),
              }}
              level={4}
            >
              {article.priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  size="sm"
                  style={{ marginRight: 5 }}
                />
              )}
              {article.title?.replace(/^\S/, (s) => s.toUpperCase())}
            </Title>
            <Paragraph className={classes.text} ellipsis={{ rows: 2 }}>
              {article.previewText}
            </Paragraph>
          </div>

          <Row style={{ marginBottom: 5 }}>
            <Col flex={1}>
              <FontAwesomeIcon
                icon={faUser}
                size="sm"
                style={{ marginRight: 5 }}
              />
              <Text>{article.createdBy?.fullName}</Text>
            </Col>
            <Col>
              <FontAwesomeIcon
                icon={faClock}
                size="sm"
                style={{ marginRight: 5 }}
              />
              {/* @ts-expect-error TODO fix */}
              <Text>{FormatCalendar(article.updatedAt, intl)}</Text>
            </Col>
          </Row>
        </div>
      </Card>
    </Tooltip>
  );
};

export default ArticleTile;
