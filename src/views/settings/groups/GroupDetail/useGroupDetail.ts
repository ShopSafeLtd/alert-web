import { useState } from 'react';

import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { GroupQuery } from 'graphql/group/queries/group.generated';
import { useGroupQuery } from 'graphql/group/queries/group.generated';
import { useDeleteGroupMutation } from 'graphql/group/mutation/delete_group.generated';

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
        }),
        description: intl.formatMessage({
          defaultMessage: 'The group has been deleted.',
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
        defaultMessage: 'Do you want to delete the group?',
      }),
      content: intl.formatMessage({
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
