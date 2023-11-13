import React, { useRef } from 'react';
import {
  Button,
  Carousel,
  Col,
  Dropdown,
  Menu,
  Modal,
  Row,
  Typography,
} from 'antd';
import type { ListArticlesQuery } from 'graphql/generated';
import { ArticlePriority } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import type { CarouselRef } from 'antd/lib/carousel';
import { Link } from 'react-router-dom';
import WatermarkImage from 'components/images/WatermarkImage.view';
import SkeletonImage from 'components/images/SkeletonImage.view';
import FormatCalendar from 'utils/format-calendar-24h';
import { FormattedMessage, useIntl } from 'react-intl';
import useStyles from './ArticleCard.styles';

const { Title, Text, Paragraph } = Typography;
const { confirm } = Modal;

interface Props {
  article:
    | Exclude<
        ListArticlesQuery['listArticles'],
        undefined | null
      >['articles'][0]
    | null
    | undefined;
  deleteRights: boolean;
  menuRights: boolean;
  openLightbox: (elements: { src: string }[], index: number) => void;
  onNavigate: (id: string) => void;
  onDelete: (id: string) => void;
}

const ArticleCard = ({
  article,
  deleteRights,
  menuRights,
  openLightbox,
  onNavigate,
  onDelete,
}: Props): JSX.Element => {
  const intl = useIntl();
  const imagesRef = useRef<CarouselRef>(null);
  const classes = useStyles();
  const {
    id,
    title,
    images,
    previewText,
    updatedAt,
    priority,
    createdBy,
    // tags,
    watermarkImage,
  } = article || {};
  return (
    <div className={classes.card}>
      {menuRights && (
        <Dropdown
          trigger={['click']}
          overlay={
            <Menu
              items={[
                {
                  key: 0,
                  label: (
                    <FormattedMessage
                      id="oZPIFV"
                      defaultMessage="Edit Article"
                    />
                  ),
                  onClick: () => onNavigate(id || ''),
                  icon: <FontAwesomeIcon icon={faEdit} />,
                },
                {
                  key: 1,
                  label: (
                    <FormattedMessage
                      id="fbn/t1"
                      defaultMessage="Delete Article"
                    />
                  ),
                  onClick: () =>
                    confirm({
                      title: (
                        <FormattedMessage
                          id="2oCaym"
                          defaultMessage="Are you sure?"
                        />
                      ),
                      content: (
                        <FormattedMessage
                          id="sZjntV"
                          defaultMessage="Click delete if you wish to delete this article. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted."
                        />
                      ),
                      okText: (
                        <FormattedMessage id="K3r6DQ" defaultMessage="Delete" />
                      ),
                      onOk: () => onDelete(id || ''),
                    }),
                  icon: <FontAwesomeIcon icon={faTrash} />,
                },
              ].filter((item) => item.key !== 1 || deleteRights)}
            />
          }
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <Button className={classes.menuButton}>
            <FontAwesomeIcon
              // size="5x"
              style={{ height: '100%' }}
              icon={faEllipsisV}
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
            <div key={id} className={classes.image}>
              <WatermarkImage
                url={image.optimised}
                rotation={image.rotation}
                position={image.position}
                showWatermark={watermarkImage}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <SkeletonImage height={280} />
      )}
      {images && images.length > 1 && (
        <Row className={classes.controls}>
          <Col>
            <FontAwesomeIcon
              className={classes.control}
              icon={faAngleLeft}
              onClick={() => imagesRef.current?.prev()}
            />
          </Col>
          <Col flex={1} />
          <Col>
            <FontAwesomeIcon
              className={classes.control}
              icon={faAngleRight}
              onClick={() => imagesRef.current?.next()}
            />
          </Col>
        </Row>
      )}
      {images && images.length > 0 && (
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
            {/* @ts-expect-error TODO fix */}
            <Text>{FormatCalendar(updatedAt)}</Text>
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

        <Row justify="center" style={{ marginBottom: -5, padding: 0 }}>
          <Col>
            {/* eslint-disable-next-line @typescript-eslint/restrict-template-expressions */}
            <Link to={`/app/article/view/${id}`}>
              <Button size="small" type="text">
                {intl.formatMessage({
                  defaultMessage: 'View Full Article',
                  id: 'Pgum6c',
                })}
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ArticleCard;
