import React from 'react';
import { Col, Row, Tag, Typography } from 'antd';
import { ArticlePriority, FeedItemsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

interface Props {
  feedItem:
    | Exclude<FeedItemsQuery['listFeedItems'], undefined | null>['feedItems'][0]
    | null
    | undefined;
}
const ImageContainer = ({ src }: { src: string }) => (
  <div
    style={{
      width: 140,
      height: 150,
      backgroundImage: `url(${src})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      borderRadius: 5,
    }}
  />
);
const ArticleFeed = ({ feedItem }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);

  const { id, title, tags, previewImage, previewText, priority } =
    feedItem?.article || {};

  return (
    <Row gutter={15} wrap={false} key={id || ''}>
      {previewImage ? (
        <Col>
          <ImageContainer src={previewImage} />
        </Col>
      ) : null}

      <Link to={`/app/article/view/${id}`}>
        <Col flex={1}>
          <Title level={4} ellipsis>
            {title}

            {priority === ArticlePriority.High && (
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faStar}
                style={{ marginLeft: 5 }}
              />
            )}
          </Title>
          {/* <Row>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faClock}
            />
            <Text type="secondary">{moment(updatedAt).calendar()}</Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <FontAwesomeIcon
              size="sm"
              className="feedItem-card-icon"
              icon={faUser}
            />
            <Text type="secondary">
              {createdBy?.fullName} - {createdBy?.organisation}
            </Text>
          </Col>
        </Row> */}

          <Paragraph type="secondary" style={{ fontSize: 12 }}>
            {previewText}
          </Paragraph>
          {tags && tags.length > 0 ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 15 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null}
        </Col>
      </Link>
    </Row>
  );
};

export default ArticleFeed;
