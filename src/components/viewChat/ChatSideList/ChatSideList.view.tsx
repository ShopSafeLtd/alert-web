import React from 'react';

import {
  // Row,
  // Col,
  // Skeleton,
  Typography,
  List,
  Avatar,
  Tag,
  Divider,
  Row,
  Col,
} from 'antd';
import { Link } from 'react-router-dom';
import { UserChatsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentPlus } from '@fortawesome/pro-light-svg-icons';

const { Title, Paragraph } = Typography;

interface Props {
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  currentId: string;
}

const OffenderSideList = ({
  data,
  loading,
  saving,
  handleMarkAsRead,
  currentId,
}: Props): JSX.Element => (
  <div className="offenders-side-list" style={{ marginLeft: '-20px' }}>
    <List
      header={
        <Title level={2} style={{ marginLeft: 30 }}>
          Chat Groups
        </Title>
      }
      itemLayout="horizontal"
      loading={loading}
      split
      dataSource={data?.user?.chats}
      renderItem={({
        id: userChatId,
        newMessages,
        chat: { id, name, firstLetter, messages },
      }) => (
        <Link to={`/app/chat/${id}`}>
          <List.Item
            onClick={() => !saving && handleMarkAsRead(userChatId)}
            key={id}
            className={
              currentId === id
                ? 'offender-item current !!important'
                : 'offender-item'
            }
          >
            <Row
              wrap={false}
              gutter={10}
              style={{
                marginLeft: 15,
                marginTop: 10,
                marginBottom: -10,
              }}
            >
              <Col>
                <Avatar
                  style={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf',
                    marginRight: 5,
                  }}
                >
                  {firstLetter}
                </Avatar>
              </Col>
              <Col flex={1}>
                <Title level={4}>
                  {name}
                  {!newMessages && (
                    <FontAwesomeIcon
                      size="lg"
                      icon={faCommentPlus}
                      style={{ marginLeft: 10, color: 'rgb(222, 68, 54)' }}
                    />
                  )}
                </Title>

                <Paragraph ellipsis>
                  {messages && messages.length > 0
                    ? `${messages[0].from.fullName} : ${messages[0].content}`
                    : 'No Messages'}
                </Paragraph>
              </Col>
            </Row>
            {/* <Paragraph strong={currentId === id} ellipsis>
                  {name}
                </Paragraph> */}
            {/* <List.Item.Meta
            avatar={
              <Avatar
                style={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                  marginRight: 5,
                }}
              >
                {firstLetter}
              </Avatar>
            }
            title={name}
            description={
              <Paragraph ellipsis>
                {messages && messages.length > 0
                  ? `${messages[0].from.fullName} : ${messages[0].content}`
                  : 'No Messages'}
              </Paragraph>
            }
          /> */}

            {!newMessages && (
              <div className="offender-card-tags">
                <Tag className="incident-card-tag" color="red">
                  <FontAwesomeIcon size="lg" icon={faCommentPlus} />
                </Tag>
              </div>
            )}
          </List.Item>
        </Link>
      )}
    />
    <Divider className="offender-item-divider" />
  </div>
);

export default OffenderSideList;
