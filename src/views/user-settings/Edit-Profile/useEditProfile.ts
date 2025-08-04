import type { CurrentUserQuery } from '#/hooks/user/queries/__generated__/current-user.generated';
import type { SelectOptions } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import { useCurrentUserQuery } from '#/hooks/user/queries/__generated__/current-user.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import {
  currentSchemeDefaultGroups,
  currentUserAtom,
} from '#/providers/UserProvider/UserProvider';
import { notification } from 'antd';
import { useUpdateUserMutation } from 'graphql/user/mutation/__generated__/update_user.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FormData {
  bulletinEmails: boolean;
  bulletinPush: boolean;
  defaultGroups: string[];
  defaultScheme: string;
  email: string;
  fullName: string;
  incidentEmail: boolean;
  incidentPush: boolean;
  messagePush: boolean;
  offenderEmail: boolean;
  offenderPush: boolean;
}

interface Return {
  data: CurrentUserQuery | undefined;
  groups: SelectOptions[] | undefined;
  loading: boolean;
  onClose: () => void;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  userDefaultGroups: string[] | undefined;
}

const useEditProfile = (): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const defaultGroups = useAtomValue(currentSchemeDefaultGroups);
  const userId = useAtomValue(currentUserAtom)?.id ?? '';
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const onClose = () => navigate('/app/incidents');

  const { data: userData, loading } = useCurrentUserQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { groups } = useGroupsContext();

  const [updateUser] = useUpdateUserMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'Your Profile has been updated.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
      const defaultGroupIds = defaultGroups?.map((item) => item.id);
      const connectDefaultGroups = data.defaultGroups.filter(
        (id) => !defaultGroupIds?.includes(id)
      );
      const disconnectDefaultGroups = defaultGroupIds?.filter(
        (id) => !data.defaultGroups.includes(id)
      );
      void updateUser({
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
          data: {
            bulletinEmails: { set: data.bulletinEmails },
            bulletinPush: { set: data.bulletinPush },
            defaultGroups: {
              connect: connectDefaultGroups
                ? connectDefaultGroups.map((id) => ({ id }))
                : undefined,
              disconnect: disconnectDefaultGroups
                ? disconnectDefaultGroups.map((id) => ({ id }))
                : undefined,
            },
            defaultScheme: data.defaultScheme
              ? { set: data.defaultScheme }
              : undefined,
            email: { set: data.email },
            fullName: { set: data.fullName },
            incidentEmail: { set: data.incidentEmail },
            incidentPush: { set: data.incidentPush },
            messagePush: { set: data.messagePush },
            offenderEmail: { set: data.offenderEmail },
            offenderPush: { set: data.offenderPush },
          },
          groupWhere: {
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
      }).finally(() => {
        setSaving(false);
      });
    }
  };

  return {
    data: userData,
    groups,
    loading,
    onClose,
    onSubmit,
    saving,
    userDefaultGroups: defaultGroups?.map(({ id }) => id),
  };
};

export default useEditProfile;
