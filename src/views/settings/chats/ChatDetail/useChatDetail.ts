import { useState } from 'react';
import {
  useChatQuery,
  ChatQuery,
  useDeleteChatMutation,
} from 'graphql/generated';

import { notification, Modal } from 'antd';

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
        message: 'Successfully Deleted!',
        description: 'The chat group has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const deleteConfirm = () => {
    confirm({
      title: 'Do you want to delete the chat group?',
      content: 'This action cannot be undone.',
      okType: 'danger',
      okText: 'Delete',
      onOk() {
        setSaving(true);
        if (chatId)
          deleteChat({
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
