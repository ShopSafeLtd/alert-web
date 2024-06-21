import { useState } from 'react';
import { useStoreState } from 'state';

import { notification } from 'antd';
import type { SelectOptions } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { GroupQuery } from 'graphql/group/queries/group.generated';
import { useGroupQuery } from 'graphql/group/queries/group.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { Role, SortOrder } from 'graphql/types';
import { useUpdateGroupMutation } from 'graphql/group/mutation/update_group.generated';

export interface FormData {
  name: string;
  description: string;
  users: string[];
  approvers: string[];
  showName: boolean;
  showAlias: boolean;
  showEthnicity: boolean;
  showGender: boolean;
  showBuild: boolean;
  showHeight: boolean;
  showHair: boolean;
  showAge: boolean;
  showDateOfBirth: boolean;
  showDateOfBirthSource: boolean;
  showIdVerified: boolean;
  showPeculiarities: boolean;
  showComment: boolean;
  showImages: boolean;
}
interface Props {
  onClose: () => void;
  groupId: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  data: GroupQuery | undefined;
  loading: boolean;
  usersData: SelectOptions[] | undefined;
  adminUsersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  showOffenderSettings: boolean;
  setShowOffenderSettings: (value: boolean) => void;
}

const useEditGroup = ({ onClose, groupId }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();
  const [showOffenderSettings, setShowOffenderSettings] = useState(false);

  const { data: groupData, loading } = useGroupQuery({
    variables: {
      where: {
        id: groupId,
      },
    },
    onCompleted: ({ group }) =>
      setSelectedUsers(group?.users.map(({ id }) => id)),
  });

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            scheme: {
              id: {
                equals: schemeId,
              },
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
      orderBy: {
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
  });

  const [updateGroup] = useUpdateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The group has been updated.',
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
          where: {
            id: groupId,
          },
          data: {
            name: { set: data.name },
            description: { set: data.description },
            users: {
              set: data.users.map((id) => ({ id })),
            },
            approver:
              data.approvers && data.approvers.length > 0
                ? {
                    set: data.approvers.map((id) => ({ id })),
                  }
                : undefined,
            offenderSettings: showOffenderSettings
              ? {
                  update: {
                    name: data.showName,
                    alias: data.showAlias,
                    ethnicity: data.showEthnicity,
                    gender: data.showGender,
                    build: data.showBuild,
                    height: data.showHeight,
                    hair: data.showHair,
                    age: data.showAge,
                    dateOfBirth: data.showDateOfBirth,
                    dateOfBirthSource: data.showDateOfBirthSource,
                    idVerified: data.showIdVerified,
                    peculiarities: data.showPeculiarities,
                    comment: data.showComment,
                    images: data.showImages,
                  },
                }
              : undefined,
          },
        },
      });
  };

  return {
    onSubmit,
    data: groupData,
    loading,
    usersData: usersData?.users.map((user) => ({
      value: user.id,
      label: user.fullName,
    })),
    adminUsersData: usersData?.users
      .filter((user) => user.schemes[0].role === Role.SchemeAdmin)
      .map((user) => ({
        value: user.id,
        label: user.fullName,
      })),
    usersLoading,
    saving,
    selectedUsers,
    setSelectedUsers,
    showOffenderSettings,
    setShowOffenderSettings,
  };
};

export default useEditGroup;
