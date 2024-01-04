import React from 'react';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import type { ArticleData } from 'types/DataType';
import { ArticlePriority } from 'graphql/generated';
import {
  faClock,
  faExclamationCircle,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormatCalendar from 'utils/format-calendar-24h';

const { Paragraph, Title, Text } = Typography;

const useStyles = createUseStyles({
  image: {
    height: 130,
    width: 140,
    zIndex: 10,
  },
  content: {
    padding: 10,
    overflow: 'hidden',
    width: '100%',
    // display: 'flex',
    // direction: 'row',
  },
  details: {
    flex: 1,
    marginBottom: '5px !important',
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
          id: '0dj72C',
        },
        { title: article.title }
      )}
    >
      <Card
        onClick={onClick}
        bodyStyle={{
          // position: 'relative',
          padding: 0,
          borderRadius: '0.625rem',
          overflow: 'hidden',
          display: 'flex',
          cursor: 'pointer',
          height: 130,
        }}
      >
        {article.images && article.images.length > 0 && (
          <div className={classes.image}>
            <WatermarkImage url={article.images[0]?.optimised} />
          </div>
        )}
        <div className={classes.content}>
          <div className={classes.details}>
            <Title
              level={4}
              ellipsis={{
                tooltip: article.title?.replace(/^\S/, (s) => s.toUpperCase()),
              }}
            >
              {article.priority === ArticlePriority.High && (
                <FontAwesomeIcon
                  size="sm"
                  icon={faExclamationCircle}
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
                size="sm"
                icon={faUser}
                style={{ marginRight: 5 }}
              />
              <Text>{article.createdBy?.fullName}</Text>
            </Col>
            <Col>
              <FontAwesomeIcon
                size="sm"
                icon={faClock}
                style={{ marginRight: 5 }}
              />
              {/* @ts-expect-error TODO fix */}
              <Text>{FormatCalendar(article.updatedAt)}</Text>
            </Col>
          </Row>
        </div>
      </Card>
    </Tooltip>
  );
};

export default ArticleTile;
