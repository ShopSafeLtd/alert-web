/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Row,
  Col,
  Typography,
  List,
  Avatar,
  Button,
  Drawer,
  Empty,
} from 'antd';
import {
  CreateChatMutation,
  DeleteChatMutation,
  UserChatsQuery,
} from 'graphql/generated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCommentPlus,
  faPlus,
  faUser,
} from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import ViewMessage from 'components/viewChat/ViewMessage';
import moment from 'moment';
import AddChat from 'components/form-components/chat/AddChat';
import { MutationUpdaterFn } from '@apollo/client';

const { Title, Paragraph } = Typography;
interface Props {
  data: UserChatsQuery | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  chatId: string;
  addChat: boolean;
  toggleAddChat: () => void;
  updateAddUserChat: MutationUpdaterFn<CreateChatMutation>;
  updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation>;
  adminRights: boolean;
}

const ViewOffender = ({
  data,
  loading,
  saving,
  handleMarkAsRead,
  chatId,
  addChat,
  toggleAddChat,
  updateAddUserChat,
  updateDeletedUserChat,

  adminRights,
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={7}>
        <div className="chats-side-list">
          <Row style={{ margin: '20px 5px 5px 10px' }}>
            <Col flex={1}>
              <Title level={2} style={{ marginTop: 5 }}>
                Chat Groups
              </Title>
            </Col>
            {adminRights && (
              <Col>
                <Button
                  type="primary"
                  onClick={toggleAddChat}
                  icon={
                    <FontAwesomeIcon
                      icon={faPlus}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                  }
                >
                  Create Chat
                </Button>
              </Col>
            )}
          </Row>
          {data?.user?.chats && data.user.chats.length > 0 ? (
            <List
              itemLayout="horizontal"
              loading={loading}
              split
              dataSource={data?.user?.chats}
              renderItem={({
                id: userChatId,
                newMessages,
                chat: { id, name, firstLetter, messages, totalMembers },
              }) => (
                <Link to={`/app/chat/${id}`} key={id}>
                  <List.Item
                    className={
                      chatId === id ? 'chat-item current' : 'chat-item'
                    }
                    onClick={() => !saving && handleMarkAsRead(userChatId)}
                    key={id}
                  >
                    <List.Item.Meta
                      style={{ marginTop: 10 }}
                      avatar={
                        <Avatar className="chat-item-avatar">
                          {firstLetter}
                        </Avatar>
                      }
                      title={
                        <Row style={{ marginRight: 5 }}>
                          <Col>
                            <Title level={4}>{name}</Title>
                          </Col>
                          <Col flex={1}>
                            <span className="chat-item-tag" color="red">
                              <FontAwesomeIcon
                                size="lg"
                                icon={faUser}
                                style={{
                                  marginRight: 3,
                                  color: 'rgb(222, 68, 54)',
                                }}
                              />
                              <span style={{ fontSize: '14px' }}>
                                ({totalMembers})
                              </span>
                            </span>
                          </Col>
                          <Col>
                            <Row>
                              {messages && messages.length > 0 && (
                                <Col>
                                  {moment(
                                    messages?.slice(-1)[0].createdAt
                                  ).format('MM/DD/YYYY')}
                                </Col>
                              )}
                            </Row>
                          </Col>
                        </Row>
                      }
                      description={
                        <Row wrap={false} style={{ marginRight: 5 }}>
                          <Col flex={1}>
                            <Paragraph ellipsis>
                              {messages && messages.length > 0
                                ? `${messages[0].from.fullName} : ${messages[0].content}`
                                : 'No Messages'}
                            </Paragraph>
                          </Col>
                          <Col>
                            {!newMessages && (
                              <FontAwesomeIcon
                                size="2x"
                                icon={faCommentPlus}
                                style={{
                                  marginLeft: 10,
                                  color: 'rgb(222, 68, 54)',
                                }}
                              />
                            )}
                          </Col>
                        </Row>
                      }
                    />
                  </List.Item>
                </Link>
              )}
            />
          ) : (
            <Empty style={{ marginTop: 30 }} />
          )}
        </div>
      </Col>
      <Col span={17}>
        <ViewMessage
          chatId={chatId}
          updateUserChatList={updateDeletedUserChat}
        />
      </Col>
    </Row>
    <Drawer
      title="Create A New Chat"
      visible={addChat}
      width="400"
      onClose={toggleAddChat}
    >
      {addChat ? (
        <AddChat update={updateAddUserChat} onClose={toggleAddChat} />
      ) : (
        <div />
      )}
    </Drawer>
  </div>
);

export default ViewOffender;
