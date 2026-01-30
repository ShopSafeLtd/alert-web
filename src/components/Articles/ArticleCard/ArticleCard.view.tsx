import type { ListArticlesFeedQuery } from '#/views/article/ArticleFeed/graphql/queries/__generated__/list-articles-feed.generated';
import type { CarouselRef } from 'antd/lib/carousel';

import hasRolePermission from '#/utils/has-role-permission';
import {
  faClock,
  faEdit,
  faEllipsisV,
  faExclamationCircle,
  faTrash,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faArrowsMaximize,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Badge,
  Button,
  Carousel,
  Col,
  Dropdown,
  Menu,
  Modal,
  Row,
  Tag,
  Typography,
} from 'antd';
import SkeletonImage from 'components/images/SkeletonImage.view';
import WatermarkImage from 'components/images/WatermarkImage.view';
import { formatDistanceToNow } from 'date-fns';
import {
  ArticlePriority,
  CompleteStatus,
  PermissionMethod,
  PermissionModel,
} from 'graphql/types';
import React, { useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import FormatCalendar from 'utils/format-calendar-24h';

import useStyles from './ArticleCard.styles';

const { Paragraph, Text, Title } = Typography;
const { confirm } = Modal;

interface Props {
  article:
    | NonNullable<
        ListArticlesFeedQuery['listArticlesRelay']
      >['edges'][0]['node']
    | null
    | undefined;
  onDelete: (id: string) => void;
  onNavigate: (id: string) => void;
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const ArticleCard = ({
  article,
  onDelete,
  onNavigate,
  openLightbox,
}: Props): JSX.Element => {
  const intl = useIntl();
  const navigate = useNavigate();
  const imagesRef = useRef<CarouselRef>(null);
  const classes = useStyles();
  const {
    createdBy,
    criticalExpiry,
    id,
    images,
    previewText,
    priority,
    status,
    title,
    updatedAt,
    // tags,
    watermarkImage,
  } = article || {};

  const menuItems = [
    {
      icon: <FontAwesomeIcon icon={faEdit} />,
      key: 0,
      label: <FormattedMessage defaultMessage="Edit Article" />,
      onClick: (info: { domEvent: React.MouseEvent }) => {
        info.domEvent.stopPropagation();
        onNavigate(id || '');
      },
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Articles,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} />,
      key: 1,
      label: <FormattedMessage defaultMessage="Delete Article" />,
      onClick: (info: { domEvent: React.MouseEvent }) => {
        info.domEvent.stopPropagation();
        confirm({
          content: (
            <FormattedMessage defaultMessage="Click delete if you wish to delete this article. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted." />
          ),
          okText: <FormattedMessage defaultMessage="Delete" />,
          onOk: () => onDelete(id || ''),
          title: <FormattedMessage defaultMessage="Are you sure?" />,
        });
      },
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Articles,
      },
    },
  ].filter(
    (item) =>
      item &&
      hasRolePermission({
        permission: item.permission,
      })
  );

  return (
    <div
      className={classes.card}
      onClick={() => navigate(`/app/article/view/${id}`)}
      role="button"
      style={{ cursor: 'pointer' }}
      tabIndex={0}
    >
      {menuItems.length > 0 && (
        <Dropdown
          arrow={{ pointAtCenter: true }}
          overlay={<Menu items={menuItems} />}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button
            className={classes.menuButton}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon
              icon={faEllipsisV}
              // size="5x"
              style={{ height: '100%' }}
            />
          </Button>
        </Dropdown>
      )}
      {/* <div className={classes.tags}>
        <Row gutter={8}>
          {tags?.slice(0, 2).map((tag) => (
            <Col key={tag.id}>
              <Tag className={classes.tag}>{tag.name}</Tag>
            </Col>
          ))}
          {tags && tags.length > 2 && (
            <Tooltip title={tags.map((item) => ` ${item.name}`).toString()}>
              <Tag className="incident-card-tag" color="red">
                {intl.formatMessage(
                  {
                    defaultMessage: '+ {num} more',
                    id: 'fi2Xie',
                  },
                  {
                    num: tags.length - 1,
                  }
                )}
              </Tag>
            </Tooltip>
          )}
        </Row>
      </div> */}
      {images && images.length > 0 ? (
        <Carousel ref={imagesRef}>
          {images.map((image) => (
            <div className={classes.image} key={id}>
              <WatermarkImage
                position={image.position}
                rotation={image.rotation}
                showWatermark={watermarkImage}
                url={image.optimised}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <SkeletonImage height={250} />
      )}
      {images && images.length > 1 && (
        <Row className={classes.controls}>
          <Col>
            <FontAwesomeIcon
              className={classes.control}
              icon={faAngleLeft}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                imagesRef.current?.prev();
              }}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              className={classes.control}
              icon={faAngleRight}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                imagesRef.current?.next();
              }}
            />
          </Col>
        </Row>
      )}
      {images && images.length > 0 && (
        <FontAwesomeIcon
          className={classes.imageExpand}
          icon={faArrowsMaximize}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openLightbox(
              images.map((image) => ({
                src: image.optimised || '',
              })) || [],
              0
            );
          }}
          size="lg"
        />
      )}
      {status === CompleteStatus.InProgress && (
        <Tag className={classes.status} color="processing">
          {intl.formatMessage({
            defaultMessage: 'In Progress',
          })}
        </Tag>
      )}
      {/* {status === CompleteStatus.InProgress ? (
        <Tag className={classes.status} color="processing">
          {intl.formatMessage({
            defaultMessage: 'In Progress',
          })}
        </Tag>
      ) : (
        <Tag className={classes.status} color="error">
          {intl.formatMessage({
            defaultMessage: 'Completed',
          })}
        </Tag>
      )} */}
      <div className={classes.content}>
        <div className={classes.details}>
          {priority === ArticlePriority.Critical && (
            <div style={{ marginBottom: 8 }}>
              <Badge
                count={intl.formatMessage({ defaultMessage: 'CRITICAL' })}
                style={{
                  backgroundColor: '#ff4d4f',
                  fontSize: 11,
                  fontWeight: 'bold',
                }}
              />
              {criticalExpiry && (
                <Text
                  style={{
                    color: '#ff4d4f',
                    display: 'block',
                    fontSize: 11,
                    marginTop: 4,
                  }}
                >
                  <FontAwesomeIcon icon={faClock} style={{ marginRight: 4 }} />
                  {intl.formatMessage(
                    { defaultMessage: 'Expires {time}' },
                    {
                      time: formatDistanceToNow(criticalExpiry, {
                        addSuffix: true,
                      }),
                    }
                  )}
                </Text>
              )}
            </div>
          )}
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

        <Row>
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
            {/* @ts-expect-error TODO fix */}
            <Text>{FormatCalendar(updatedAt, intl)}</Text>
          </Col>
        </Row>
        {/* {groups && groups.length > 0 ? (
          <Row wrap={false} className={classes.tagRow}>
            {groups.map((group) => (
              <Col key={group.id}>
                <Tag color="red" key={group.id}>
                  {group.name}
                </Tag>
              </Col>
            ))}
          </Row>
        ) : (
          <div style={{ marginBottom: 5 }} />
        )} */}
      </div>
    </div>
  );
};

export default ArticleCard;
