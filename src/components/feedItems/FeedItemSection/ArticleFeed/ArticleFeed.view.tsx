import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import type { FeedItemsQuery, ImagePosition } from 'graphql/generated';
import { ArticlePriority } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faExclamationCircle, faUser } from '@fortawesome/pro-light-svg-icons';
import WatermarkImage from 'components/images/WatermarkImage.view';

const { Title, Paragraph, Text } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}
const ImageContainer = ({
  src,
  position,
}: {
  src: string;
  position: ImagePosition;
}) => (
  <div
    style={{
      width: 150,
      height: 180,
    }}
  >
    <WatermarkImage url={src} position={position} />
  </div>
);
const ArticleFeed = ({ feedItem }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const { id, title, tags, image, previewText, priority, createdBy } =
    feedItem?.article || {};

  return (
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    <Link to={`/app/article/view/${id}`}>
      <Row gutter={15} wrap={false} key={id || ''} style={{ width: '100%' }}>
        {image ? (
          <Col>
            <ImageContainer
              position={image.position}
              src={image.optimised || image.url || ''}
            />
          </Col>
        ) : null}

        <Col flex={1} style={{ padding: 10 }}>
          <Title style={{ marginBottom: 2 }} level={4} ellipsis>
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

          <Row style={{ marginTop: 10 }}>
            <Col>
              <FontAwesomeIcon
                size="sm"
                style={{ marginRight: 5 }}
                className="feedItem-card-icon"
                icon={faUser}
              />
              <Text type="secondary">{createdBy?.fullName}</Text>
            </Col>
          </Row>
          <Paragraph
            type="secondary"
            style={{ fontSize: 14, marginTop: 10 }}
            // className="feedItem-card-desc"
            ellipsis={{ rows: 3 }}
          >
            {previewText}
          </Paragraph>
          {tags && tags.length > 0 ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 10 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null}
        </Col>
      </Row>
    </Link>
  );
};

export default ArticleFeed;
