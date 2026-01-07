import type { UserSelectOption } from '#/components/form-components/UsersSelect/UsersSelectFetchMore.view';
import type { GroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import type { SelectOptions } from 'types/DataType';

import { notification } from 'antd';
import { useUpdateGroupMutation } from 'graphql/group/mutation/__generated__/update_group.generated';
import { useGroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import { Role } from 'graphql/types';
import { useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FormData {
  approvers: string[];
  description: string;
  name: string;
  showAge: boolean;
  showAlias: boolean;
  showBuild: boolean;
  showComment: boolean;
  showDateOfBirth: boolean;
  showDateOfBirthSource: boolean;
  showEthnicity: boolean;
  showGender: boolean;
  showHair: boolean;
  showHeight: boolean;
  showIdVerified: boolean;
  showImages: boolean;
  showName: boolean;
  showPeculiarities: boolean;
  users: string[];
}
interface Props {
  groupId: string;
  onClose: () => void;
}
interface Return {
  adminUsersData: SelectOptions[] | undefined;
  data: GroupQuery | undefined;
  loading: boolean;
  onSubmit: (value: FormData) => void;
  onUsersOptionsChange: (options: UserSelectOption[]) => void;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  setShowOffenderSettings: (value: boolean) => void;
  showOffenderSettings: boolean;
}

const useEditGroup = ({ groupId, onClose }: Props): Return => {
  const intl = useIntl();
  const [saving, setSaving] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();
  const [showOffenderSettings, setShowOffenderSettings] = useState(false);
  const [usersWithRoles, setUsersWithRoles] = useState<UserSelectOption[]>([]);

  const { data: groupData, loading } = useGroupQuery({
    onCompleted: ({ group }) =>
      setSelectedUsers(group?.users.map(({ id }) => id)),
    variables: {
      where: {
        id: groupId,
      },
    },
  });

  const onUsersOptionsChange = useCallback((options: UserSelectOption[]) => {
    setUsersWithRoles(options);
  }, []);

  const [updateGroup] = useUpdateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The group has been updated.',
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
    if (groupId)
      void updateGroup({
        variables: {
          data: {
            approver:
              data.approvers && data.approvers.length > 0
                ? {
                    set: data.approvers.map((id) => ({ id })),
                  }
                : undefined,
            description: { set: data.description },
            name: { set: data.name },
            offenderSettings: showOffenderSettings
              ? {
                  update: {
                    age: data.showAge,
                    alias: data.showAlias,
                    build: data.showBuild,
                    comment: data.showComment,
                    dateOfBirth: data.showDateOfBirth,
                    dateOfBirthSource: data.showDateOfBirthSource,
                    ethnicity: data.showEthnicity,
                    gender: data.showGender,
                    hair: data.showHair,
                    height: data.showHeight,
                    idVerified: data.showIdVerified,
                    images: data.showImages,
                    name: data.showName,
                    peculiarities: data.showPeculiarities,
                  },
                }
              : undefined,
            users: {
              set: data.users.map((id) => ({ id })),
            },
          },
          where: {
            id: groupId,
          },
        },
      });
  };

  return {
    adminUsersData: usersWithRoles
      .filter((user) => user.role === Role.SchemeAdmin)
      .map((user) => ({
        label: user.label,
        value: user.value,
      })),
    data: groupData,
    loading,
    onSubmit,
    onUsersOptionsChange,
    saving,
    selectedUsers,
    setSelectedUsers,
    setShowOffenderSettings,
    showOffenderSettings,
  };
};

export default useEditGroup;
