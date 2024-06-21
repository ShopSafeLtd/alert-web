import { type RefObject, useState } from 'react';

import { useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import { Modal, notification } from 'antd';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import type { UserQuery } from 'graphql/user/queries/user.generated';
import { useUserQuery } from 'graphql/user/queries/user.generated';
import type { Role } from 'graphql/types';
import { UserStatus } from 'graphql/types';
import { useSendInviteMutation } from 'graphql/user/mutation/send_invite.generated';
import { useUpdateUserDisableMutation } from 'graphql/user/mutation/update_user_disable.generated';
import { useDeleteUserFromSchemeMutation } from 'graphql/user/mutation/delete_user_from_scheme.generated';

const { confirm } = Modal;

interface Return {
  data: UserQuery | undefined;
  loading: boolean;
  saving: boolean;
  editUser: boolean;
  isOwn: boolean;
  demLink: boolean;
  demId: string | undefined | null;
  toggleDemLink: () => void;
  toggleEditUser: () => void;
  inviteConfirm: () => void;
  enableConfirm: () => void;
  disableConfirm: () => void;
  deleteConfirm: () => void;
  userRole: Role | undefined;
  editPassword: boolean;
  toggleEditPassword: () => void;
  componentRef: RefObject<HTMLDivElement>;
  handlePrint: () => void;
  isPrinting: boolean;
}

const useUserDetail = (userId: string): Return => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const navigate = useNavigate();
  const { id: currentUserId } = useStoreState((state) => state.user);
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [demLink, setDemLink] = useState(false);
  const toggleDemLink = () => {
    setDemLink(!demLink);
  };
  // TODO: need to change this to be based on current business
  const business = useStoreState((state) => state.user.businesses);
  const demId = business.map((item) => item.demId)[0];
  const isOwn = currentUserId === userId;
  const [editPassword, setEditPassword] = useState(false);
  const toggleEditPassword = () => {
    setEditPassword(!editPassword);
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
      void sendInvite({
        variables: {
          user: userId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const inviteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to send the invite?',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Resending the invite will reset the users password and send them an new invite containing the new password.',
      }),
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The status of user has been updated.',
        }),
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
      void updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            disabled: { set: disabled },
            status: {
              set: disabled ? UserStatus.Disabled : UserStatus.Active,
            },
          },
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const enableConfirm = () => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to enable the user?',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Enabling this user will allow them to log back into the system.',
      }),
      onOk() {
        openDisableUser(false);
      },
    });
  };

  const disableConfirm = () => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to disable the user?',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Disabling this user will prevent them from logging into alert but will not delete them or any content they have added.',
      }),
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The user has been deleted.',
        }),
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
      void deleteUserFromScheme({
        variables: {
          id: userId,
          scheme: schemeId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  const deleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the user from the scheme?',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Deleting this user will remove them from the scheme and any groups, it will not remove any content that they have submitted. This action can not be undone.',
      }),
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
    demLink,
    toggleDemLink,
    demId,
    userRole: data?.user?.schemes.find((el) => el.schemeId === schemeId)?.role,
    editPassword,
    toggleEditPassword,
    isOwn,
    componentRef,
    handlePrint,
    isPrinting,
  };
};

export default useUserDetail;
