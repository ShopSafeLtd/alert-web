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
import { faPenToSquare, faUser } from '@fortawesome/pro-light-svg-icons';
import { Link } from 'react-router-dom';
import ViewMessage from 'components/viewChat/ViewMessage';
import moment from 'moment';
import AddChat from 'components/form-components/chat/AddChat';
import { MutationUpdaterFn } from '@apollo/client';

const { Title, Paragraph, Text } = Typography;

const formatChatDate = (date: Date) => {
  if (moment(date).format('DD/MM/YY') === moment().format('DD/MM/YY'))
    return moment(date).format('hh:mm');
  return moment(date).format('hh:mm DD/MM');
};

interface Props {
  data: UserChatsQuery | undefined;
  saving: boolean;
  handleMarkAsRead: (value: string | undefined) => void;
  chatId: string;
  addChat: boolean;
  toggleAddChat: () => void;
  updateAddUserChat: MutationUpdaterFn<CreateChatMutation>;
  updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation>;
  adminRights: boolean;
  refetch: () => void;
}

const ViewOffender = ({
  data,
  saving,
  handleMarkAsRead,
  chatId,
  addChat,
  toggleAddChat,
  updateAddUserChat,
  updateDeletedUserChat,
  refetch,
  adminRights,
}: Props): JSX.Element => (
  <div className="page-container">
    <Row>
      <Col span={7} style={{ backgroundColor: '#FFF' }}>
        <div className="chats-side-list">
          <Row style={{ margin: '12px 5px 5px 10px' }}>
            <Col flex={1}>
              <Title level={3} style={{ marginTop: 5 }}>
                Chats
              </Title>
            </Col>
            {adminRights && (
              <Col>
                <Button
                  type="ghost"
                  danger
                  size="small"
                  onClick={toggleAddChat}
                  icon={
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ marginRight: 5 }}
                    />
                  }
                >
                  New Chat
                </Button>
              </Col>
            )}
          </Row>
          {data?.user?.chats && data.user.chats.length > 0 ? (
            <List
              itemLayout="horizontal"
              loading={!data}
              split
              dataSource={data?.user?.chats}
              renderItem={({
                id: userChatId,
                newMessages,
                createdAt,
                mentioned,
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
                      avatar={
                        <Avatar className="chat-item-avatar">
                          {firstLetter}
                        </Avatar>
                      }
                      title={
                        <Row style={{ marginRight: 5 }}>
                          <Col>
                            <Paragraph
                              style={{
                                fontSize: 16,
                                marginBottom: 0,
                                fontWeight:
                                  newMessages || mentioned ? 600 : 400,
                              }}
                            >
                              {name}
                            </Paragraph>
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
                            <Row align="middle">
                              <Col>
                                <Paragraph
                                  style={{
                                    fontSize: 13,
                                    marginTop: 3,
                                    marginBottom: 3,
                                    fontWeight:
                                      newMessages || mentioned ? 600 : 400,
                                  }}
                                >
                                  {messages && messages.length > 0
                                    ? formatChatDate(
                                        messages?.slice(-1)[0].createdAt
                                      )
                                    : formatChatDate(createdAt)}
                                </Paragraph>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      }
                      description={
                        <Row wrap={false} style={{ marginRight: 5 }}>
                          <Col flex={1}>
                            <Paragraph
                              style={{
                                fontSize: 12,
                                marginBottom: 0,
                              }}
                              ellipsis
                              strong={newMessages || mentioned || false}
                            >
                              {mentioned && (
                                <Text type="danger" style={{ marginRight: 3 }}>
                                  [You were mentioned]
                                </Text>
                              )}
                              {messages && messages.length
                                ? `${messages?.slice(-1)[0].from.fullName} : ${
                                    messages?.slice(-1)[0].content ||
                                    (messages?.slice(-1)[0].images &&
                                      messages?.slice(-1)[0].images.length &&
                                      'Sent an image') ||
                                    (messages?.slice(-1)[0].offenders &&
                                      messages?.slice(-1)[0].offenders.length &&
                                      'Linked an offender') ||
                                    (messages?.slice(-1)[0].incidents &&
                                      messages?.slice(-1)[0].incidents.length &&
                                      'Linked an incident')
                                  }`
                                : 'No Messages'}
                            </Paragraph>
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
          userChatRefetch={refetch}
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
