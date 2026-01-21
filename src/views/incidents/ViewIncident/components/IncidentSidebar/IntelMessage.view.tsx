import type { ViewIncidentQuery } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { Theme } from 'configs/ThemeConfig';

import UpdateContent from '#/components/ViewPage/IntelSection/Update.view';
import { faEdit, faReply, faTrash } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Popover, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  messageActions: {
    '& button': {
      fontSize: 12,
      height: 24,
      padding: '0 8px',
    },
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },
  messageAuthor: {
    color: theme.headerColor,
    fontSize: 14,
    fontWeight: 500,
    marginLeft: 8,
  },
  messageAvatar: {
    flexShrink: 0,
  },
  messageContent: {
    '& .ant-card': {
      '&:hover': {
        border: `1px solid ${theme.borderColor}`,
        boxShadow:
          theme.colorScheme === 'dark'
            ? '0 2px 4px rgba(0, 0, 0, 0.3)'
            : '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      background: theme.componentBackground,
      border: `1px solid ${theme.borderColor}`,
      borderRadius: 8,
      marginTop: 8,
    },
    '& .update-collage-image': {
      '& img': {
        borderRadius: 8,
      },
      borderRadius: 8,
      overflow: 'hidden',
    },
    '& .update-content-bubble': {
      '& .ant-typography': {
        color: theme.text as string,
        lineHeight: 1.6,
      },
      background: 'transparent',
      padding: 0,
    },
    '& .update-content-card': {
      '&:hover': {
        border: `1px solid ${theme.borderColor}`,
        boxShadow:
          theme.colorScheme === 'dark'
            ? '0 2px 8px rgba(0, 0, 0, 0.3)'
            : '0 2px 8px rgba(0, 0, 0, 0.15)',
      },
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.04)'
          : 'rgba(0, 0, 0, 0.02)',
      border: `1px solid ${theme.borderColor}`,
      borderRadius: 12,
      padding: '12px 16px',
      position: 'relative',
    },
    marginTop: 4,
  },
  messageHeader: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: 4,
  },
  messageTime: {
    color: theme.secondaryText,
    fontSize: 11,
    marginLeft: 8,
    opacity: 0.8,
    transition: 'opacity 0.2s',
  },
  messageWrapper: {
    '&:hover': {
      '& $messageTime': {
        opacity: 1,
      },
    },
    marginBottom: 16,
    position: 'relative',
  },
  replyWrapper: {
    borderLeft: `2px solid ${theme.borderColor}`,
    marginLeft: 12,
    marginTop: 8,
    paddingLeft: 16,
  },
  systemMessage: {
    '& .update-content-card': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.04)',
      borderLeft: `3px solid ${theme.borderColor}`,
      fontStyle: 'italic',
    },
  },
}));

interface Props {
  confirmDeleteUpdate: (updateId: string) => void;
  editRights: boolean;
  loadMore: boolean;
  onOpenLightbox?: (elements: { src: string }[], index?: number) => void;
  optionRowShow: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  setEditUpdate: (update: { id: string; text: string } | null) => void;
  setReplyTo: (
    reply: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  update: Exclude<
    Exclude<ViewIncidentQuery['incident'], null | undefined>['updates'],
    null | undefined
  >[0];
  userId: string;
}

const IntelMessage: React.FC<Props> = ({
  confirmDeleteUpdate,
  editRights,
  onOpenLightbox,
  saving,
  setEditUpdate,
  setReplyTo,
  update,
  userId,
}) => {
  const classes = useStyles();
  const intl = useIntl();

  const isSystemMessage = update.type === 'SYSTEM';
  const isOwnMessage = update.createdBy.id === userId;

  const messageContent = (
    <>
      {!isSystemMessage && (
        <div className={classes.messageHeader}>
          <div className={classes.messageAvatar}>
            <Avatar size={20} style={{ backgroundColor: '#1890ff' }}>
              {update.createdBy.fullName
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || intl.formatMessage({ defaultMessage: '?' })}
            </Avatar>
          </div>
          <Typography.Text className={classes.messageAuthor}>
            {isOwnMessage
              ? intl.formatMessage({ defaultMessage: 'You' })
              : update.createdBy.fullName}
          </Typography.Text>
          <Typography.Text className={classes.messageTime}>
            {dayjs(update.createdAt).format('DD/MM/YYYY HH:mm')}
          </Typography.Text>
        </div>
      )}
      <div className={classes.messageContent}>
        <UpdateContent
          articles={update.linkedArticles}
          content={update.text}
          createdAt={dayjs(update.createdAt)}
          crimeGroups={update.linkedCrimeGroups}
          from={update.createdBy}
          id={update.id}
          images={update.images}
          incidents={update.linkedIncidents}
          offenders={update.linkedOffenders}
          onOpenLightbox={onOpenLightbox}
          showDate={false}
          showUser={false}
          userId={userId}
          vehicles={update.linkedVehicles}
        />
      </div>
      {!isSystemMessage && (
        <div className={classes.messageActions}>
          <Button
            icon={<FontAwesomeIcon icon={faReply} />}
            onClick={() =>
              setReplyTo({
                createdAt: update.createdAt.toString(),
                createdBy: isOwnMessage
                  ? intl.formatMessage({ defaultMessage: 'You' })
                  : `${update.createdBy.fullName} - ${update.createdBy.businesses[0]?.name}`,
                id: update.id,
                text: update.text || '',
              })
            }
            size="small"
            type="text"
          >
            {intl.formatMessage({ defaultMessage: 'Reply' })}
          </Button>
        </div>
      )}
    </>
  );

  // If user has edit rights and it's not a system message, wrap in popover for context menu
  if (editRights && !isSystemMessage) {
    return (
      <Popover
        content={
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faEdit}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => {
                setEditUpdate({
                  id: update.id,
                  text: update.text || '',
                });
              }}
              size="small"
              type="text"
            >
              {intl.formatMessage({ defaultMessage: 'Edit Update' })}
            </Button>
            <Button
              disabled={saving}
              icon={
                <FontAwesomeIcon
                  icon={faTrash}
                  size="lg"
                  style={{ marginRight: 5 }}
                />
              }
              onClick={() => {
                confirmDeleteUpdate(update.id);
              }}
              size="small"
              type="text"
            >
              {intl.formatMessage({ defaultMessage: 'Delete Update' })}
            </Button>
          </div>
        }
        overlayClassName="message-popover"
        placement={isOwnMessage ? 'left' : 'right'}
        trigger={['contextMenu']}
      >
        <div
          className={`${classes.messageWrapper} ${isSystemMessage ? classes.systemMessage : ''}`}
        >
          {messageContent}
        </div>
      </Popover>
    );
  }

  return (
    <div
      className={`${classes.messageWrapper} ${isSystemMessage ? classes.systemMessage : ''}`}
    >
      {messageContent}
    </div>
  );
};

export default IntelMessage;
