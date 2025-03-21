import type { GroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import type { SelectOptions } from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { notification } from 'antd';
import { useUpdateGroupMutation } from 'graphql/group/mutation/__generated__/update_group.generated';
import { useGroupQuery } from 'graphql/group/queries/__generated__/group.generated';
import { Role, SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
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
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  setShowOffenderSettings: (value: boolean) => void;
  showOffenderSettings: boolean;
  usersData: SelectOptions[] | undefined;
  usersLoading: boolean;
}

const useEditGroup = ({ groupId, onClose }: Props): Return => {
  const intl = useIntl();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const [saving, setSaving] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();
  const [showOffenderSettings, setShowOffenderSettings] = useState(false);

  const { data: groupData, loading } = useGroupQuery({
    onCompleted: ({ group }) =>
      setSelectedUsers(group?.users.map(({ id }) => id)),
    variables: {
      where: {
        id: groupId,
      },
    },
  });

  const { data: usersData, loading: usersLoading } = useListSchemeUsersQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
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
    },
  });

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
    adminUsersData: usersData?.users
      .filter((user) => user.schemes[0].role === Role.SchemeAdmin)
      .map((user) => ({
        label: user.fullName,
        value: user.id,
      })),
    data: groupData,
    loading,
    onSubmit,
    saving,
    selectedUsers,
    setSelectedUsers,
    setShowOffenderSettings,
    showOffenderSettings,
    usersData: usersData?.users.map((user) => ({
      label: user.fullName,
      value: user.id,
    })),
    usersLoading,
  };
};

export default useEditGroup;
