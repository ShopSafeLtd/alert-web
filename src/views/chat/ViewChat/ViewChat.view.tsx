/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
  Avatar,
  Button,
  Col,
  Drawer,
  Empty,
  List,
  Row,
  Skeleton,
  Typography,
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

import AddChat from 'components/form-components/chat/AddChat';
import { MutationUpdaterFn } from '@apollo/client';
import { formatDate } from 'utils';

const { Title, Paragraph, Text } = Typography;

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
  loading: boolean;
}

const getContent = (content: string) =>
  content
    .split(/(@\[.*?\]\(.*?\))/)
    .map((item) => {
      if (item.includes('@[')) {
        return `${item.replace('@[', '').replace(/(]\(.*?\))/, '')} `;
      }
      return item;
    })
    .join('');

const ViewOffender = ({
  data,
  saving,
  handleMarkAsRead,
  chatId,
  addChat,
  toggleAddChat,
  updateAddUserChat,
  updateDeletedUserChat,
  loading,
  adminRights,
}: Props): JSX.Element => {
  const list = () => {
    if (loading && !data?.user?.chats?.length)
      return (
        <>
          <Skeleton
            className="chat-item"
            avatar
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            active
          />
          <Skeleton
            className="chat-item"
            avatar
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            active
          />
          <Skeleton
            className="chat-item"
            avatar
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
            active
          />
        </>
      );
    if (!data?.user?.totalChats) return <Empty description="No chats" />;
    return (
      <List
        itemLayout="horizontal"
        // loading={loading}
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
              className={chatId === id ? 'chat-item current' : 'chat-item'}
              onClick={() => !saving && handleMarkAsRead(userChatId)}
              key={id}
            >
              <List.Item.Meta
                avatar={
                  <Avatar className="chat-item-avatar">{firstLetter}</Avatar>
                }
                title={
                  <Row style={{ marginRight: 5 }}>
                    <Col>
                      <Paragraph
                        style={{
                          fontSize: 16,
                          marginBottom: 0,
                          fontWeight: newMessages || mentioned ? 600 : 400,
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
                              fontWeight: newMessages || mentioned ? 600 : 400,
                            }}
                          >
                            {messages && messages.length > 0
                              ? formatDate(messages?.slice(-1)[0].createdAt)
                              : formatDate(createdAt)}
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
                              getContent(messages?.slice(-1)[0].content) ||
                              (messages?.slice(-1)[0].images &&
                                messages?.slice(-1)[0].images.length &&
                                'Sent an image') ||
                              (messages?.slice(-1)[0].offenders &&
                                messages?.slice(-1)[0].offenders.length &&
                                'Linked an offender') ||
                              (messages?.slice(-1)[0].incidents &&
                                messages?.slice(-1)[0].incidents.length &&
                                'Linked an incident') ||
                              (messages?.slice(-1)[0].vehicles &&
                                messages?.slice(-1)[0].vehicles.length &&
                                'Linked a vehicle') ||
                              (messages?.slice(-1)[0].crimeGroups &&
                                messages?.slice(-1)[0].crimeGroups.length &&
                                'Linked a crime group')
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
    );
  };

  return (
    <div className="page-container">
      <Row>
        <Col span={7}>
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
            {list()}
          </div>
        </Col>
        <Col span={17}>
          {chatId ? (
            <ViewMessage
              chatId={chatId}
              updateUserChatList={updateDeletedUserChat}
            />
          ) : (
            <Empty
              style={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
              description="Select or create a chat to view messages"
            />
          )}
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
};

export default ViewOffender;
