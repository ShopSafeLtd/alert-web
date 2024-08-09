import type { GroupQuery } from 'graphql/group/queries/__generated__/group.generated';

import { Modal, notification } from 'antd';
import { useDeleteGroupMutation } from 'graphql/group/mutation/__generated__/delete_group.generated';
import { useGroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Return {
  data: GroupQuery | undefined;
  deleteConfirm: () => void;
  editGroup: boolean;
  loading: boolean;
  saving: boolean;
  toggleEditGroup: () => void;
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
        description: intl.formatMessage({
          defaultMessage: 'The group has been deleted.',
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
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        openDelete();
      },

      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the group?',
      }),
    });
  };
  const toggleEditGroup = () => {
    setEditGroup(!editGroup);
  };
  return {
    data,
    deleteConfirm,
    editGroup,
    loading,
    saving,
    toggleEditGroup,
  };
};

export default useGroupDetail;
