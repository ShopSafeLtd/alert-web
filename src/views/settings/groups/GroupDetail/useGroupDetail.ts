import { useState } from 'react';
import type { GroupQuery } from 'graphql/generated';
import { useGroupQuery, useDeleteGroupMutation } from 'graphql/generated';

import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: GroupQuery | undefined;
  loading: boolean;
  editGroup: boolean;
  toggleEditGroup: () => void;
  saving: boolean;
  deleteConfirm: () => void;
}

const useGroupDetail = (groupId: string): Return => {
  const [saving, setSaving] = useState(false);
  const [editGroup, setEditGroup] = useState(false);

  const { data, loading } = useGroupQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: groupId,
      },
    },
  });

  const [deleteGroup] = useDeleteGroupMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The group has been deleted!',
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

  const openDelete = () => {
    setSaving(true);
    if (groupId)
      deleteGroup({
        variables: {
          id: groupId,
        },
      });
  };
  const deleteConfirm = () => {
    confirm({
      title: 'Do you want to delete the group?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete();
      },
    });
  };
  const toggleEditGroup = () => {
    setEditGroup(!editGroup);
  };
  return {
    data,
    loading,
    editGroup,
    toggleEditGroup,
    saving,
    deleteConfirm,
  };
};

export default useGroupDetail;
