/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Row, Col, Card, Typography, List, Avatar, Divider } from 'antd';
import { UserChatsQuery } from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentPlus } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
// import ChatSideList from 'components/viewChat/ChatSideList';
import ViewMessage from 'components/viewChat/ViewMessage';

const { Title, Paragraph } = Typography;
interface Props {
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  // setCurrentId: (value: string) => void;
  chatId: string;
}

const ViewOffender = ({
  data,
  loading,
  saving,
  handleMarkAsRead,
  // setCurrentId,
  chatId,
}: Props): JSX.Element => (
  <div className="page-container">
    <Card style={{ minHeight: '100vh' }}>
      <Row>
        <Col span={7}>
          <div
            className="chats-side-list"
            style={{ marginLeft: '-20px', minHeight: '100vh' }}
          >
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
                <Link to={`/app/chat/${id}`} className="chat-link">
                  <List.Item
                    onClick={() =>
                      !saving &&
                      // setCurrentId(id) &&
                      handleMarkAsRead(userChatId)
                    }
                    key={id}
                    className={
                      chatId === id
                        ? 'chat-item current !!important'
                        : 'chat-item'
                    }
                    // style={{ borderBottom: 'black, 1px' }}
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
                              // icon="fa-solid fa-comment-plus"
                              icon={faCommentPlus}
                              style={{
                                marginLeft: 10,
                                color: 'rgb(222, 68, 54)',
                              }}
                            />
                          )}
                          {/* {!newMessages && (
                    <Tag
                      // className="incident-card-tag"
                      color="red"
                      style={{ marginLeft: 10, color: 'rgb(222, 68, 54)' }}
                    >
                      <FontAwesomeIcon size="lg" icon={faCommentPlus} />
                    </Tag>
                  )} */}
                        </Title>

                        <Paragraph ellipsis>
                          {messages && messages.length > 0
                            ? `${messages[0].from.fullName} : ${messages[0].content}`
                            : 'No Messages'}
                        </Paragraph>
                      </Col>
                    </Row>

                    {/* <Paragraph strong={chatId === id} ellipsis>
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
                  </List.Item>
                </Link>
              )}
            />

            <Divider className="chat-item-divider" />
          </div>
        </Col>
        <Col span={17}>
          <ViewMessage
            chatId={chatId}
            // subscribeToNewMessage={() => subscribeToNewMessage()}
          />
        </Col>
      </Row>
    </Card>
  </div>
);

export default ViewOffender;
