import type { ViewportData } from '#/types/DataType';
import type { ViewUserQuery } from '#/views/settings/users/UserDetail/graphql/queries/__generated__/view-user.generated';
import type { Role } from 'graphql/types';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import useReportPrint from '#/utils/reportPrint/usePrintReports';
import { useViewUserQuery } from '#/views/settings/users/UserDetail/graphql/queries/__generated__/view-user.generated';
import { Modal, notification } from 'antd';
import { UserStatus } from 'graphql/types';
import { useDeleteUserFromSchemeMutation } from 'graphql/user/mutation/__generated__/delete_user_from_scheme.generated';
import { useSendInviteMutation } from 'graphql/user/mutation/__generated__/send_invite.generated';
import { useUpdateUserDisableMutation } from 'graphql/user/mutation/__generated__/update_user_disable.generated';
import { useAtomValue } from 'jotai/index';
import { type RefObject, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;

interface Return {
  componentRef: RefObject<HTMLDivElement>;
  data: ViewUserQuery | undefined;
  deleteConfirm: () => void;
  demId: null | string | undefined;
  demLink: boolean;
  disableConfirm: () => void;
  editPassword: boolean;
  editUser: boolean;
  enableConfirm: () => void;
  handlePrint: () => void;
  inviteConfirm: () => void;
  isOwn: boolean;
  isPrinting: boolean;
  isSessionsModalOpen: boolean;
  loading: boolean;
  saving: boolean;
  setIsSessionsModalOpen: (value: boolean) => void;
  setViewport: (value: ViewportData | null) => void;
  toggleDemLink: () => void;
  toggleEditPassword: () => void;
  toggleEditUser: () => void;
  userRole: Role | undefined;
  viewport: ViewportData | null;
}

const useUserDetail = (userId: string): Return => {
  const { componentRef, handlePrint, isPrinting } = useReportPrint();
  const navigate = useNavigate();
  const { id: currentUserId } = useStoreState((state) => state.user);
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [demLink, setDemLink] = useState(false);
  const [isSessionsModalOpen, setIsSessionsModalOpen] = useState(false);
  const toggleDemLink = () => {
    setDemLink(!demLink);
  };
  // TODO: need to change this to be based on current business
  const business = useStoreState((state) => state.user.businesses);
  const demId = business.map((item) => item.demId)[0];
  const isOwn = currentUserId === userId;
  const [editPassword, setEditPassword] = useState(false);
  const [viewport, setViewport] = useState<ViewportData | null>(null);

  const toggleEditPassword = () => {
    setEditPassword(!editPassword);
  };

  const { data, loading } = useViewUserQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      chatWhere: {
        chat: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
      groupWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      schemeWhere: {
        id: {
          equals: schemeId,
        },
      },
      sessionWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
      where: {
        id: userId,
      },
    },
  });

  // send invite
  const [sendInvite] = useSendInviteMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: 'The invitation has been sent!',
        message: 'Successfully invited!',
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
      content: intl.formatMessage({
        defaultMessage:
          'Resending the invite will reset the users password and send them an new invite containing the new password.',
      }),
      onOk() {
        openInvite();
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to send the invite?',
      }),
    });
  };

  // disable
  const [updateUser] = useUpdateUserDisableMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The status of user has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
          data: {
            disabled: { set: disabled },
            status: {
              set: disabled ? UserStatus.Disabled : UserStatus.Active,
            },
          },
          where: {
            id: userId,
          },
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  const enableConfirm = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Enabling this user will allow them to log back into the system.',
      }),
      onOk() {
        openDisableUser(false);
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to enable the user?',
      }),
    });
  };

  const disableConfirm = () => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Disabling this user will prevent them from logging into alert but will not delete them or any content they have added.',
      }),
      onOk() {
        openDisableUser(true);
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to disable the user?',
      }),
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
        description: intl.formatMessage({
          defaultMessage: 'The user has been deleted.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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
      content: intl.formatMessage({
        defaultMessage:
          'Deleting this user will remove them from the scheme and any groups, it will not remove any content that they have submitted. This action can not be undone.',
      }),
      onOk() {
        openDelete();
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the user from the scheme?',
      }),
    });
  };

  return {
    componentRef,
    data,
    deleteConfirm,
    demId,
    demLink,
    disableConfirm,
    editPassword,
    editUser,
    enableConfirm,
    handlePrint,
    inviteConfirm,
    isOwn,
    isPrinting,
    isSessionsModalOpen,
    loading,
    saving,
    setIsSessionsModalOpen,
    setViewport,
    toggleDemLink,
    toggleEditPassword,
    toggleEditUser,
    userRole: data?.user?.schemes.find((el) => el.schemeId === schemeId)?.role,
    viewport,
  };
};

export default useUserDetail;
