import { useState } from 'react';
import { useStoreState } from 'state';
import type { CurrentUserQuery } from 'graphql/generated';
import {
  useCurrentUserQuery,
  useResetPasswordMutation,
  useUpdateUserMutation,
} from 'graphql/generated';
import { Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

const { confirm } = Modal;

interface FormData {
  fullName: string;
  email: string;
  incidentEmail: boolean;
  incidentPush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
  messagePush: boolean;
}

interface Return {
  onSubmit: (value: FormData) => void;
  onClose: () => void;
  resetConfirm: () => void;
  data: CurrentUserQuery | undefined;
  loading: boolean;
  saving: boolean;
}

const useEditProfile = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);

  const onClose = () => navigate('/app/incidents');

  const { data: userData, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Your Profile has been updated.',
          id: 'PYtwbu',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (userId) {
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            email: { set: data.email },
            fullName: { set: data.fullName },
            incidentEmail: { set: data.incidentEmail },
            incidentPush: { set: data.incidentPush },
            offenderEmail: { set: data.offenderEmail },
            offenderPush: { set: data.offenderPush },
            messagePush: { set: data.messagePush },
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
      }).finally(() => {
        setSaving(false);
      });
    }
  };

  const [resetPassword] = useResetPasswordMutation();
  const resetConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'bnCsAu',
        defaultMessage: 'Do you Want to reset your password?',
      }),
      content: intl.formatMessage({
        id: 'tPTbL8',
        defaultMessage: 'You will receive a reset email.',
      }),
      async onOk() {
        await resetPassword({
          variables: {
            data: {
              userId,
            },
          },
        });
      },
    });
  };
  return {
    onSubmit,
    onClose,
    resetConfirm,
    data: userData,
    loading,
    saving,
  };
};

export default useEditProfile;
