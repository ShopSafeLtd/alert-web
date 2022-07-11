import { useState } from 'react';
import {
  useChatQuery,
  ChatQuery,
  useDeleteChatMutation,
} from 'graphql/generated';
import { useParams } from 'react-router-dom';
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
  const toggleEditChat = () => {
    setEditChat(!editChat);
  };
  const [deleteChat] = useDeleteChatMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
      setSaving(false);
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
  const deleteConfirm = () => {
    confirm({
      title: 'Do you want to delete the chat group?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete();
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
