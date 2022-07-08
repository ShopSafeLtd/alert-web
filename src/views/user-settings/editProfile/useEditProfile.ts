import { useState } from 'react';
import { useStoreState } from 'state';
import {
  CurrentUserQuery,
  useCurrentUserQuery,
  useUpdateUserMutation,
} from 'graphql/generated';
import { notification, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

interface FormData {
  fullName: string;
  email: string;
  organisation: string;
  postcode: string;
  street: string;
  townCity: string;
  building: string;
  county: string;
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
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const useEditUser = (): Return => {
  const navigate = useNavigate();
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const openNotification = (type: NotificationType) => {
    if (type === 'success') {
      notification.success({
        message: 'Success!',
        description: 'Your Profile has been updated! ',
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
  const onClose = () => navigate('/app/incidents');

  const { data: userData, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      openNotification('success');
    },
    onError: () => {
      openNotification('error');
      setSaving(false);
    },
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (userId)
      updateUser({
        variables: {
          where: {
            id: userId,
          },
          data: {
            addresses: {
              update: [
                {
                  data: {
                    postcode: { set: data.postcode || '' },
                    street: { set: data.street || '' },
                    townCity: { set: data.townCity || '' },
                    building: { set: data.building || '' },
                    county: { set: data.county || '' },
                  },
                  where: {
                    id: userData?.currentUser?.addresses[0].id,
                  },
                },
              ],
            },
            email: { set: data.email },
            fullName: { set: data.fullName },
            organisation: { set: data.organisation },
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
      });
  };

  const resetConfirm = () => {
    confirm({
      title: 'Do you Want to reset your password?',
      content: 'You will receive a reset email.',
      onOk() {
        // openInvite();
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

export default useEditUser;
