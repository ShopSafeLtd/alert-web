import type { ChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';

import { Modal, notification } from 'antd';
import { useDeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';
import { useChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;
interface Return {
  data: ChatQuery | undefined;
  deleteConfirm: () => void;
  editChat: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditChat: () => void;
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
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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

      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the chat group?',
      }),
    });
  };

  return {
    data,
    deleteConfirm,
    editChat,
    loading,
    saving,
    toggleEditChat,
  };
};

export default useChatDetail;
