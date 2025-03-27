import type { ArticleData } from 'types/DataType';

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
import { ArticlePriority } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import FormatCalendar from 'utils/format-calendar-24h';

const { Title } = Typography;

interface Props {
  article: ArticleData;
  removeArticle?: (value: string | undefined) => void;
  saving?: boolean;
  triggerLightbox?: (elements: { src: string }[], index: number) => void;
}

const ArticleCard = ({
  article,
  removeArticle,
  saving,
  triggerLightbox,
}: Props) => {
  const intl = useIntl();
  const hasImage = article.images && article.images.length > 0;
  return (
    <Card
      bodyStyle={{
        marginLeft: -2,
        padding: 0,
      }}
      className="message-card"
      size="small"
      style={{
        margin: removeArticle ? 0 : 5,
        overflow: 'hidden',
        width: hasImage ? 300 : 200,
      }}
    >
      <Row gutter={5} wrap={false}>
        {removeArticle && (
          <Popconfirm
            cancelText={intl.formatMessage({
              defaultMessage: 'No',
            })}
            okText={intl.formatMessage({ defaultMessage: 'Yes' })}
            onConfirm={() => removeArticle(article.id)}
            overlayInnerStyle={{ padding: 10 }}
            placement="topLeft"
            title={intl.formatMessage({
              defaultMessage: 'Remove the article?',
            })}
            trigger="click"
          >
            <Button
              disabled={saving}
              icon={<FontAwesomeIcon icon={faCircleXmark} size="lg" />}
              shape="circle"
              size="small"
              style={{ position: 'absolute', right: -5, top: -5, zIndex: 100 }}
              type="text"
            />
          </Popconfirm>
        )}

        <Col>
          {hasImage && (
            <div style={{ height: 100, width: 100 }}>
              <WatermarkImage
                triggerLightbox={triggerLightbox}
                // @ts-expect-error  null
                url={article.images[0].optimised || article.images[0].url || ''}
              />
            </div>
          )}
        </Col>

        <Col flex={1} style={{ marginLeft: 5, marginTop: 10 }}>
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
              label={
                <span>
                  {/* <FontAwesomeIcon className={classes.descIcon} icon={faUser} /> */}
                  {intl.formatMessage({
                    defaultMessage: 'Created By',
                  })}
                </span>
              }
              // className={classes.descItem}
              style={{ paddingBottom: 0 }}
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
              {FormatCalendar(article?.updatedAt || new Date(), intl)}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
};

export default ArticleCard;
