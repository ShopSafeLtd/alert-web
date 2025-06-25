/* eslint-disable formatjs/no-literal-string-in-jsx */
import type { MutationUpdaterFn } from '@apollo/client';
import type { Theme } from 'configs/ThemeConfig';
import type { DeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';
import type { CreateChatMutation } from 'graphql/chats/mutations/__generated__/create-chat.generated';
import type { UserChatsQuery } from 'graphql/userChat/queries/__generated__/user_chats.generated';

import PermissionCheckWrapper from '#/components/PermissionCheck/PermissionCheckWrapper';
import { faPenToSquare, faUser } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Badge, Button, Col, Drawer, Empty, Row, Skeleton } from 'antd';
import AddChat from 'components/form-components/chat/AddChat';
import ViewMessage from 'components/viewChat/ViewMessage';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { formatDate } from 'utils';

const useStyles = createUseStyles((theme: Theme) => ({
  chatAvatar: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.06)',
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 600,
    transition: 'transform 0.2s ease',
  },
  chatItem: {
    '&:hover': {
      '& $chatAvatar': {
        transform: 'scale(1.02)',
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.04)',
      borderColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-1px)',
    },
    backgroundColor: theme.componentBackground,
    border:
      theme.colorScheme === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.04)'
        : '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: 16,
    cursor: 'pointer',
    margin: '6px 12px',
    padding: '16px',
    transition: 'all 0.2s ease',
    width: 'calc(100% - 24px)',
  },
  chatItemActive: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? `${theme.primary}15`
        : `${theme.primary}08`,
    borderColor: theme.primary,
    boxShadow:
      theme.colorScheme === 'dark'
        ? `0 4px 20px ${theme.primary}30`
        : `0 4px 20px ${theme.primary}20`,
    overflow: 'hidden',
    position: 'relative',
    transform: 'scale(1.02)',
  },
  chatItemUnread: {
    '&::before': {
      backgroundColor: '#ff4d4f',
      borderRadius: '50%',
      content: '""',
      height: 8,
      left: 8,
      position: 'absolute',
      top: 8,
      width: 8,
    },
    borderColor: '#ff4d4f20',
    position: 'relative',
  },
  chatList: {
    backgroundColor: 'transparent',
    height: '100vh',
    overflowY: 'auto',
    padding: '16px 0 80px 0',
    position: 'relative',
  },
  chatMeta: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    overflow: 'hidden',
  },
  chatName: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 500,
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chatNameUnread: {
    fontWeight: 600,
  },
  chatPreview: {
    color: theme.secondaryText,
    fontSize: 14,
    lineHeight: '20px',
    margin: 0,
    marginTop: 4,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  chatPreviewUnread: {
    color: theme.headerColor,
    fontWeight: 500,
  },
  chatSidebar: {
    backgroundColor: 'transparent',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
  },
  chatTime: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 400,
    margin: 0,
    opacity: 0.7,
  },
  chatTimeUnread: {
    color: '#ff4d4f',
    fontWeight: 500,
    opacity: 1,
  },
  chatTitle: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  floatingActionButton: {
    '&:hover': {
      backgroundColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? `0 8px 30px ${theme.primary}40`
          : `0 8px 30px ${theme.primary}30`,
      transform: 'scale(1.05)',
    },
    backgroundColor: theme.primary,
    border: 'none',
    borderRadius: '50%',
    bottom: 20,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.3)'
        : '0 4px 20px rgba(0, 0, 0, 0.15)',
    color: '#fff',
    fontSize: 18,
    height: 56,
    position: 'absolute',
    right: 20,
    transition: 'all 0.3s ease',
    width: 56,
    zIndex: 1000,
  },
  memberCount: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.04)',
    borderRadius: 12,
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 11,
    fontWeight: 500,
    marginLeft: 8,
    padding: '2px 8px',
  },
  mentionTag: {
    backgroundColor: '#ff4d4f',
    borderRadius: 6,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.5px',
    marginRight: 6,
    padding: '3px 8px',
    textTransform: 'uppercase',
  },
  skeletonItem: {
    backgroundColor: theme.componentBackground,
    border:
      theme.colorScheme === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.04)'
        : '1px solid rgba(0, 0, 0, 0.04)',
    borderRadius: 16,
    margin: '6px 12px',
    padding: '16px',
    width: 'calc(100% - 24px)',
  },
}));

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
  const classes = useStyles();
  const intl = useIntl();
  const list = () => {
    if (loading && !data?.user?.chats?.length)
      return (
        <>
          <div className={classes.skeletonItem}>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </div>
          <div className={classes.skeletonItem}>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </div>
          <div className={classes.skeletonItem}>
            <Skeleton active avatar paragraph={{ rows: 1 }} />
          </div>
        </>
      );
    if (!data?.user?.totalChats)
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            height: 'calc(100vh - 200px)',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Empty
            description={intl.formatMessage({
              defaultMessage:
                'No chats yet. Create your first chat to get started!',
            })}
            style={{
              color: 'inherit',
            }}
          />
        </div>
      );
    return (
      <div className={classes.chatList}>
        {data?.user?.chats?.map(
          ({
            chat: {
              firstLetter,
              id,
              messageCount,
              messages,
              name,
              totalMembers,
            },
            createdAt,
            id: userChatId,
            mentioned,
            newMessages,
          }) => {
            const isActive = chatId === id;
            const hasUnread = newMessages || mentioned;

            console.log('Chat Debug:', { chatId, id, isActive }); // Debug log

            const messagePreview = () => {
              if (messages && messages.length > 0) {
                const lastMessage = messages.at(-1);
                const content =
                  getContent(lastMessage?.content ?? '') ||
                  (lastMessage?.images?.length &&
                    intl.formatMessage({ defaultMessage: 'Sent an image' })) ||
                  (lastMessage?.offenders?.length &&
                    intl.formatMessage({
                      defaultMessage: 'Linked an offender',
                    })) ||
                  (lastMessage?.incidents?.length &&
                    intl.formatMessage({
                      defaultMessage: 'Linked an incident',
                    })) ||
                  (lastMessage?.vehicles?.length &&
                    intl.formatMessage({
                      defaultMessage: 'Linked a vehicle',
                    })) ||
                  (lastMessage?.crimeGroups?.length &&
                    intl.formatMessage({
                      defaultMessage: 'Linked a crime group',
                    })) ||
                  (lastMessage?.articles?.length &&
                    intl.formatMessage({
                      defaultMessage: 'Linked an article',
                    }));

                return `${lastMessage?.from.origName}: ${content}`;
              }
              return intl.formatMessage({ defaultMessage: 'No Messages' });
            };

            return (
              <Link
                key={id}
                style={{ textDecoration: 'none' }}
                to={`/app/chat/${id}`}
              >
                <div
                  className={`${classes.chatItem} ${isActive ? classes.chatItemActive : ''} ${hasUnread ? classes.chatItemUnread : ''}`}
                  onClick={() => !saving && handleMarkAsRead(userChatId)}
                >
                  <div style={{ alignItems: 'flex-start', display: 'flex' }}>
                    <Badge
                      count={messageCount || 0}
                      offset={[6, 0]}
                      overflowCount={99}
                      size="small"
                    >
                      <Avatar className={classes.chatAvatar} size={32}>
                        {firstLetter}
                      </Avatar>
                    </Badge>

                    <div className={classes.chatMeta}>
                      <div className={classes.chatTitle}>
                        <div
                          style={{
                            alignItems: 'center',
                            display: 'flex',
                            flex: 1,
                            overflow: 'hidden',
                          }}
                        >
                          <span
                            className={`${classes.chatName} ${hasUnread ? classes.chatNameUnread : ''}`}
                          >
                            {name}
                          </span>
                          <div className={classes.memberCount}>
                            <FontAwesomeIcon
                              icon={faUser}
                              style={{ marginRight: 4 }}
                            />
                            {totalMembers}
                          </div>
                        </div>
                        <span
                          className={`${classes.chatTime} ${hasUnread ? classes.chatTimeUnread : ''}`}
                        >
                          {messages && messages.length > 0
                            ? formatDate(
                                messages.at(-1)?.createdAt ?? new Date()
                              )
                            : formatDate(createdAt)}
                        </span>
                      </div>

                      <div style={{ alignItems: 'center', display: 'flex' }}>
                        {mentioned && (
                          <span className={classes.mentionTag}>
                            {intl.formatMessage({
                              defaultMessage: 'MENTIONED',
                            })}
                          </span>
                        )}
                        <span
                          className={`${classes.chatPreview} ${hasUnread ? classes.chatPreviewUnread : ''}`}
                        >
                          {messagePreview()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        )}
      </div>
    );
  };

  return (
    <div className="page-container">
      <Row>
        <Col span={7}>
          <div className={classes.chatSidebar}>
            {list()}
            <PermissionCheckWrapper
              permission={{
                method: PermissionMethod.Write,
                model: PermissionModel.Chat,
              }}
              unauthorizedElement={<div />}
            >
              <Button
                className={classes.floatingActionButton}
                icon={<FontAwesomeIcon icon={faPenToSquare} />}
                onClick={toggleAddChat}
                shape="circle"
                type="primary"
              />
            </PermissionCheckWrapper>
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
