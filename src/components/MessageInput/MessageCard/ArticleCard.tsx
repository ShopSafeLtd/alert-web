import React from 'react';
import {
  faCircleXmark,
  faExclamationCircle,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Col,
  Descriptions,
  Popconfirm,
  Row,
  Typography,
} from 'antd';
import WatermarkImage from 'components/images/WatermarkImage.view';
import type { ArticleData } from 'types/DataType';
import { useIntl } from 'react-intl';

import FormatCalendar from 'utils/format-calendar-24h';
import { ArticlePriority } from 'graphql/types';

const { Title } = Typography;

interface Props {
  article: ArticleData;
  removeArticle?: (value: string | undefined) => void;
  saving?: boolean;
}

const ArticleCard = ({ article, removeArticle, saving }: Props) => {
  const intl = useIntl();
  const hasImage = article.images && article.images.length > 0;
  return (
    <Card
      style={{
        margin: removeArticle ? 0 : 5,
        width: hasImage ? 300 : 200,
        overflow: 'hidden',
      }}
      bodyStyle={{
        padding: 0,
        marginLeft: -2,
      }}
      size="small"
      className="message-card"
    >
      <Row gutter={5} wrap={false}>
        {removeArticle && (
          <Popconfirm
            placement="topLeft"
            trigger="click"
            title={intl.formatMessage({
              defaultMessage: 'Remove the article?',
            })}
            onConfirm={() => removeArticle(article.id)}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            overlayInnerStyle={{ padding: 10 }}
          >
            <Button
              size="small"
              disabled={saving}
              style={{ position: 'absolute', top: -5, right: -5, zIndex: 100 }}
              shape="circle"
              type="text"
              icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
            />
          </Popconfirm>
        )}

        <Col>
          {hasImage && (
            <div style={{ width: 100, height: 100 }}>
              <WatermarkImage
                // @ts-expect-error  null
                url={article.images[0].optimised || article.images[0].url || ''}
              />
            </div>
          )}
        </Col>

        <Col flex={1} style={{ marginTop: 10, marginLeft: 5 }}>
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
          {/* <Paragraph ellipsis>{article.previewText}</Paragraph> */}
          {/* <Paragraph ellipsis>
            {intl.formatMessage(
              {
                defaultMessage: 'Created By: {ref}',
                id: 'uAfuJA',
              },
              { ref: article?.createdBy?.fullName }
            )}
          </Paragraph> */}

          <Descriptions column={1} size="small">
            <Descriptions.Item
              // className={classes.descItem}
              style={{ paddingBottom: 0 }}
              label={
                <span>
                  {/* <FontAwesomeIcon className={classes.descIcon} icon={faUser} /> */}
                  {intl.formatMessage({
                    defaultMessage: 'Created By',
                  })}
                </span>
              }
            >
              {article?.createdBy?.fullName}
            </Descriptions.Item>
            <Descriptions.Item
              // className={classes.descItem}
              label={
                <span>
                  {/* <FontAwesomeIcon
                    className={classes.descIcon}
                    icon={faClock}
                  /> */}
                  {intl.formatMessage({
                    defaultMessage: 'Updated At',
                  })}
                </span>
              }
            >
              {FormatCalendar(article?.updatedAt || new Date())}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default ArticleCard;
