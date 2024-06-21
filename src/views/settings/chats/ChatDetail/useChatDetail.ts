import { useState } from 'react';

import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { ChatQuery } from 'graphql/chat/queries/chat.generated';
import { useChatQuery } from 'graphql/chat/queries/chat.generated';
import { useDeleteChatMutation } from 'graphql/chat/mutation/delete_chat.generated';

const { confirm } = Modal;
interface Return {
  data: ChatQuery | undefined;
  loading: boolean;
  editChat: boolean;
  toggleEditChat: () => void;
  saving: boolean;
  deleteConfirm: () => void;
}

const useChatDetail = (chatId: string): Return => {
  const intl = useIntl();

  const [editChat, setEditChat] = useState(false);
  const [saving, setSaving] = useState(false);

  const { data, loading } = useChatQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: chatId,
      },
    },
  });

  const toggleEditChat = () => {
    setEditChat(!editChat);
  };
  const [deleteChat] = useDeleteChatMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been deleted.',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const deleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the chat group?',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),

      onOk() {
        setSaving(true);
        if (chatId)
          void deleteChat({
            variables: {
              id: chatId,
            },
          });
      },
    });
  };

  return {
    data,
    loading,
    editChat,
    toggleEditChat,
    saving,
    deleteConfirm,
  };
};

export default useChatDetail;
