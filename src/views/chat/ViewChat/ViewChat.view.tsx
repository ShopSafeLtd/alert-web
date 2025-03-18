/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';
import type { CreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';
import type { UserChatsQuery } from 'graphql/userChat/queries/__generated__/user_chats.generated';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { faPenToSquare, faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Drawer,
  Empty,
  List,
  Row,
  Skeleton,
  Typography,
} from 'antd';
import AddChat from 'components/form-components/chat/AddChat';
import ViewMessage from 'components/viewChat/ViewMessage';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

const { Paragraph, Text, Title } = Typography;

interface Props {
  addChat: boolean;
  chatId: string;
  data: UserChatsQuery | undefined;
  handleMarkAsRead: (value: string | undefined) => void;
  loading: boolean;
  saving: boolean;
  toggleAddChat: () => void;
  updateAddUserChat: MutationUpdaterFn<CreateChatMutation>;
  updateDeletedUserChat: MutationUpdaterFn<DeleteChatMutation>;
}

const getContent = (content: string) =>
  content.replaceAll(/@\[([^]+?)]/g, '@$1');
// .split(/(@\[.*?]\(.*?\))/)
// .map((item) => {
//   if (item.includes('@[')) {
//     return `${item.replace('@[', '').replace(/(]\(.*?\))/, '')} `;
//   }
//   return item;
// })
// .join('');

const ViewOffender = ({
  addChat,
  chatId,
  data,
  handleMarkAsRead,
  loading,
  saving,
  toggleAddChat,
  updateAddUserChat,
  updateDeletedUserChat,
}: Props): JSX.Element => {
  const intl = useIntl();
  const list = () => {
    if (loading && !data?.user?.chats?.length)
      return (
        <>
          <Skeleton
            active
            avatar
            className="chat-item"
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <Skeleton
            active
            avatar
            className="chat-item"
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
          <Skeleton
            active
            avatar
            className="chat-item"
            paragraph={{ rows: 1 }}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          />
        </>
      );
    if (!data?.user?.totalChats)
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            // height: 'calc(100vh - 400px)',
          }}
        >
          <Empty
            description={intl.formatMessage({
              defaultMessage: 'No Chats',
            })}
          />
        </div>
      );
    return (
      <List
        dataSource={data?.user?.chats}
        itemLayout="horizontal"
        renderItem={({
          chat: { firstLetter, id, messageCount, messages, name, totalMembers },
          createdAt,
          id: userChatId,
          mentioned,
          newMessages,
        }) => (
          <Link key={id} to={`/app/chat/${id}`}>
            <List.Item
              className={chatId === id ? 'chat-item current' : 'chat-item'}
              key={id}
              onClick={() => !saving && handleMarkAsRead(userChatId)}
            >
              <List.Item.Meta
                avatar={
                  <Badge
                    count={messageCount || 0}
                    offset={[8, 0]}
                    overflowCount={99}
                    size="default"
                    style={{ right: 3, top: 5, zIndex: 100 }}
                  >
                    <Avatar className="chat-item-avatar">{firstLetter}</Avatar>
                  </Badge>
                }
                description={
                  <Row style={{ marginRight: 5 }} wrap={false}>
                    <Col flex={1}>
                      <Paragraph
                        ellipsis
                        strong={newMessages || mentioned || false}
                        style={{
                          fontSize: 12,
                          marginBottom: 0,
                        }}
                      >
                        {mentioned && (
                          <Text style={{ marginRight: 3 }} type="danger">
                            {intl.formatMessage({
                              defaultMessage: '[You were mentioned]',
                            })}
                          </Text>
                        )}
                        {messages && messages.length > 0
                          ? // eslint-disable-next-line formatjs/no-literal-string-in-jsx
                            `${messages?.slice(-1)[0].from.origName} : ${
                              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                              getContent(messages?.slice(-1)[0].content) ||
                              (messages?.slice(-1)[0].images &&
                                messages?.slice(-1)[0].images.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Sent an image',
                                })) ||
                              (messages?.slice(-1)[0].offenders &&
                                messages?.slice(-1)[0].offenders.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Linked an offender',
                                })) ||
                              (messages?.slice(-1)[0].incidents &&
                                messages?.slice(-1)[0].incidents.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Linked an incident',
                                })) ||
                              (messages?.slice(-1)[0].vehicles &&
                                messages?.slice(-1)[0].vehicles.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Linked a vehicle',
                                })) ||
                              (messages?.slice(-1)[0].crimeGroups &&
                                messages?.slice(-1)[0].crimeGroups.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Linked a crime group',
                                })) ||
                              (messages?.slice(-1)[0].articles &&
                                messages?.slice(-1)[0].articles.length &&
                                intl.formatMessage({
                                  defaultMessage: 'Linked an article',
                                }))
                            }`
                          : intl.formatMessage({
                              defaultMessage: 'No Messages',
                            })}
                      </Paragraph>
                    </Col>
                  </Row>
                }
                title={
                  <Row style={{ marginRight: 5 }}>
                    <Col>
                      <Paragraph
                        style={{
                          fontSize: 16,
                          fontWeight: newMessages || mentioned ? 600 : 400,
                          marginBottom: 0,
                        }}
                      >
                        {name}
                      </Paragraph>
                    </Col>
                    <Col flex={1}>
                      <span className="chat-item-tag" color="red">
                        <FontAwesomeIcon
                          icon={faUser}
                          size="lg"
                          style={{
                            color: 'rgb(222, 68, 54)',
                            marginRight: 3,
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
                              fontWeight: newMessages || mentioned ? 600 : 400,
                              marginBottom: 3,
                              marginTop: 3,
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
              />
            </List.Item>
          </Link>
        )}
        // loading={loading}
        split
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
                  {intl.formatMessage({
                    defaultMessage: 'Chats',
                  })}
                </Title>
              </Col>
              <PermissionCheckWrapper
                permission={{
                  method: PermissionMethod.Write,
                  model: PermissionModel.Chat,
                }}
                unauthorizedElement={<div />}
              >
                <Col>
                  <Button
                    danger
                    icon={
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        size="lg"
                        style={{ marginRight: 5 }}
                      />
                    }
                    onClick={toggleAddChat}
                    size="small"
                    type="ghost"
                  >
                    {intl.formatMessage({
                      defaultMessage: 'New Chat',
                    })}
                  </Button>
                </Col>
              </PermissionCheckWrapper>
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
              description={intl.formatMessage({
                defaultMessage: 'Select or create a chat to view messages',
              })}
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
              }}
            />
          )}
        </Col>
      </Row>
      <Drawer
        onClose={toggleAddChat}
        open={addChat}
        title={intl.formatMessage({
          defaultMessage: 'Create A New Chat',
        })}
        width="400"
      >
        {addChat ? (
          <AddChat onClose={toggleAddChat} update={updateAddUserChat} />
        ) : (
          <div />
        )}
      </Drawer>
    </div>
  );
};

export default ViewOffender;
