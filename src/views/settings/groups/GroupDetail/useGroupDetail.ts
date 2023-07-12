import { useState } from 'react';
import type { GroupQuery } from 'graphql/generated';
import { useDeleteGroupMutation, useGroupQuery } from 'graphql/generated';

import { Modal, notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The group has been deleted.',
          id: 'zwABBJ',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const openDelete = () => {
    setSaving(true);
    if (groupId)
      void deleteGroup({
        variables: {
          id: groupId,
        },
      });
  };
  const deleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'PKtIBm',
        defaultMessage: 'Do you want to delete the group?',
      }),
      content: intl.formatMessage({
        id: 'JDJoIZ',
        defaultMessage: 'This action cannot be undone.',
      }),

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
