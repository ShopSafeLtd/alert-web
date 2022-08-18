import { useState } from 'react';
import {
  useUserQuery,
  UserQuery,
  useSendInviteMutation,
  useUpdateUserDisableMutation,
  useDeleteUserFromSchemeMutation,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import { notification, Modal } from 'antd';

const { confirm } = Modal;

interface Return {
  data: UserQuery | undefined;
  loading: boolean;
  saving: boolean;
  editUser: boolean;
  toggleEditUser: () => void;
  inviteConfirm: () => void;
  enableConfirm: () => void;
  disableConfirm: () => void;
  deleteConfirm: () => void;
}

const useUserDetail = (userId: string): Return => {
  const navigate = useNavigate();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [editUser, setEditUser] = useState(false);

  const errorNotification = () => {
    notification.error({
      message: 'Error!',
      description: 'Whoops, there are some errors. Please try again. ',
      placement: 'bottomRight',
    });
  };

  const { data, loading } = useUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: userId,
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      chatWhere: {
        chat: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });

  // send invite
  const [sendInvite] = useSendInviteMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully invited!',
        description: 'The invitation has been sent!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
      setSaving(false);
    },
  });

  const openInvite = () => {
    setSaving(true);
    if (userId)
      sendInvite({
        variables: {
          user: userId,
        },
      });
  };
  const inviteConfirm = () => {
    confirm({
      title: 'Do you want to send the invite?',
      content:
        'Resending the invite will reset the users password and send them an new invite containing the new password.',
      onOk() {
        openInvite();
      },
    });
  };

  // disable
  const [updateUser] = useUpdateUserDisableMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully updated!',
        description: 'The status of user has been updated!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
      setSaving(false);
    },
  });

  const openDisableUser = (disabled: boolean) => {
    setSaving(true);
    if (userId)
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            disabled: { set: disabled },
          },
        },
      });
  };
  const enableConfirm = () => {
    confirm({
      title: 'Do you want to enable the user?',
      content:
        'Enabling this user will allow them to log back into the system.',
      onOk() {
        openDisableUser(false);
      },
    });
  };

  const disableConfirm = () => {
    confirm({
      title: 'Do you want to disable the user?',
      content:
        'Disabling this user will prevent them from logging into alert but will not delete them or any content they have added.',
      onOk() {
        openDisableUser(true);
      },
    });
  };
  const toggleEditUser = () => {
    setEditUser(!editUser);
  };
  // delete data
  const [deleteUserFromScheme] = useDeleteUserFromSchemeMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('users');
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The user has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
      setSaving(false);
    },
  });

  const openDelete = () => {
    setSaving(true);
    if (userId)
      deleteUserFromScheme({
        variables: {
          id: userId,
          scheme: schemeId,
        },
      });
  };

  const deleteConfirm = () => {
    confirm({
      title: 'Do you want to delete the user from the scheme?',
      content:
        'Deleting this user will remove them from the scheme and any groups, it will not remove any content that they have submitted. This action can not be undone.',
      onOk() {
        openDelete();
      },
    });
  };
  return {
    data,
    loading,
    editUser,
    saving,
    toggleEditUser,
    inviteConfirm,
    enableConfirm,
    disableConfirm,
    deleteConfirm,
  };
};

export default useUserDetail;
