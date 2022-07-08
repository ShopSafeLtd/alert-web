import { useState } from 'react';
import {
  useChatQuery,
  ChatQuery,
  useDeleteChatMutation,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
import { notification } from 'antd';

interface Return {
  data: ChatQuery | undefined;
  loading: boolean;
  editChat: boolean;
  toggleEditChat: () => void;
  saving: boolean;
  openDelete: () => void;
}
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useChatDetail = (): Return => {
  const chatId = useParams().id;
  const [editChat, setEditChat] = useState(false);
  const [saving, setSaving] = useState(false);

  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'The chat group has been deleted!',
        placement: 'bottomRight',
      });
    } else if (type === 'error') {
      notification.error({
        message: 'error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    }
  };
  const { data, loading } = useChatQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: chatId,
      },
    },
  });

  const [deleteChat] = useDeleteChatMutation({
    onCompleted: () => {
      setSaving(false);
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
    },
  });

  const openDelete = () => {
    setSaving(true);
    if (chatId)
      deleteChat({
        variables: {
          id: chatId,
        },
      });
  };

  const toggleEditChat = () => {
    setEditChat(!editChat);
  };
  return {
    data,
    loading,
    editChat,
    toggleEditChat,
    saving,
    openDelete,
  };
};

export default useChatDetail;
