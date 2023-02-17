import React from 'react';
import {
  Card,
  Col,
  Divider,
  Image,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  ArticlePriority,
  ArticlesQuery,
  FeedItemsQuery,
} from 'graphql/generated';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/pro-solid-svg-icons';
import { faClock, faUser } from '@fortawesome/pro-light-svg-icons';

const { Title, Paragraph, Text } = Typography;

interface Props {
  article:
    | Exclude<ArticlesQuery['articles'], undefined | null>[0]
    | null
    | undefined;
}

const ArticleFeed = ({ article }: Props): JSX.Element => {
  // const imagesRef = useRef<CarouselRef>(null);
  const {
    id,
    title,
    tags,
    previewImage,
    previewText,
    updatedAt,
    priority,
    createdBy,
  } = article || {};

  return (
    <Card
      key={id}
      // style={{ height: 250 }}
      className="feedItem-card"
    >
      <Link to={`/app/article/view/${id}`}>
        {/* <Space direction="vertical" size="middle" style={{ display: 'flex' }}> */}
        {/* {previewImage && (
          <Image
            width="100%"
            height={100}
            style={{ borderRadius: 5 }}
            src={previewImage}
          />
        )} */}

        <div className="feedItem-card-tags">
          <Row gutter={8}>
            {tags?.map((tag, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Col key={i}>
                <Tag className="feedItem-card-tag" color="red">
                  {tag.name}
                </Tag>
              </Col>
            ))}
          </Row>
        </div>
        {previewImage ? (
          <div
            className="feedItem-card-image"
            style={{
              backgroundImage: `url(${previewImage})`,
            }}
            key={id}
          />
        ) : (
          <Skeleton.Image
            // style={{ height: 150, width: '100%' }}
            className="feedItem-card-image"
          />
          // <div style={{ marginTop: 10 }} />
        )}
        <div className="feedItem-card-content">
          <Title level={4}>
            {title?.replace(/^\S/, (s) => s.toUpperCase())}
            {priority === ArticlePriority.High && (
              <FontAwesomeIcon
                size="sm"
                className="feedItem-card-icon"
                icon={faStar}
                style={{ marginLeft: 5 }}
              />
            )}
          </Title>
          <Row style={{ marginBottom: 10 }}>
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
              <Text>{formatDate(updatedAt)}</Text>
            </Col>
          </Row>
          <Paragraph className="feedItem-card-desc" ellipsis={{ rows: 3 }}>
            {previewText}
          </Paragraph>
          {/* {tags && tags.length ? (
            <Row wrap={false} style={{ overflowX: 'auto', marginTop: 5 }}>
              {tags.map((tag) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Row>
          ) : null} */}
          {tags && tags.length ? (
            <Row
              wrap={false}
              style={{
                overflowX: 'auto',
                marginBottom: 10,
              }}
              gutter={5}
            >
              {tags.map((tag, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Col key={i}>
                  <Tag key={tag.id} className="feedItem-card-tag" color="red">
                    {tag.name}
                  </Tag>
                </Col>
              ))}
            </Row>
          ) : null}
        </div>
      </Link>
    </Card>
    // <Link to={`/app/article/view/${id}`}>
    //   <Row wrap={false}>
    //     <Col>
    //       {previewImage && (
    //         <Image
    //           width={100}
    //           height={100}
    //           style={{ borderRadius: 5, marginLeft: 10 }}
    //           src={previewImage}
    //         />
    //       )}
    //     </Col>
    //     <Col>
    //       <div style={{ paddingLeft: 20, paddingRight: 20, display: 'block' }}>
    //         <Title level={4} style={{ fontSize: 15, marginBottom: 5 }}>
    //           {title}
    //         </Title>
    //         <Paragraph
    //           style={{
    //             marginBottom: 0,
    //             height: 40,
    //             width: '100%',
    //             fontSize: 12,
    //             whiteSpace: 'normal',
    //             textOverflow: 'ellipsis',
    //           }}
    //           type="secondary"
    //           ellipsis
    //         >
    //           {previewText}
    //         </Paragraph>
    //         {tags && tags.length ? (
    //           <Row wrap={false} style={{ overflowX: 'auto', marginTop: 5 }}>
    //             {tags.map((tag) => (
    //               <Tag key={tag.id}>{tag.name}</Tag>
    //             ))}
    //           </Row>
    //         ) : null}
    //       </div>
    //     </Col>
    //   </Row>
    //   <Divider style={{ marginTop: 10, marginBottom: 10 }} />
    // </Link>
  );
};

export default ArticleFeed;
