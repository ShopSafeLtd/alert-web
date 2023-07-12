import { useState } from 'react';
import type { ChatQuery } from 'graphql/generated';
import { useChatQuery, useDeleteChatMutation } from 'graphql/generated';

import { Modal, notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

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
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been deleted.',
          id: 'FT0guS',
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
        id: 'QA9jAK',
        defaultMessage: 'Do you want to delete the chat group?',
      }),
      content: intl.formatMessage({
        id: 'JDJoIZ',
        defaultMessage: 'This action cannot be undone.',
      }),
      okText: intl.formatMessage({
        id: 'K3r6DQ',
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
