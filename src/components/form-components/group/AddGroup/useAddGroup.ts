import { useState } from 'react';
import type { CreateGroupMutation } from 'graphql/generated';
import {
  Role,
  useCreateGroupMutation,
  useListSchemeUsersQuery,
  SortOrder,
} from 'graphql/generated';
import { notification } from 'antd';
import { useStoreState } from 'state';
import type { MutationUpdaterFn } from '@apollo/client';
import type { SelectOptions } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';

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
  update: MutationUpdaterFn<CreateGroupMutation>;
}

interface Return {
  onSubmit: (value: FormData) => void;
  usersData: SelectOptions[] | undefined;
  usersLoading: boolean;
  adminUsersData: SelectOptions[] | undefined;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  showOffenderSettings: boolean;
  setShowOffenderSettings: (value: boolean) => void;
}

const useAddGroup = ({ onClose, update }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [showOffenderSettings, setShowOffenderSettings] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();

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

  const [createGroup] = useCreateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
          id: '5Hvk21',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The group has been added.',
          id: 'dJ4Y8x',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    void createGroup({
      variables: {
        data: {
          name: data.name,
          description: data.description,
          users: { connect: data.users.map((id) => ({ id })) },
          approver:
            data.approvers && data.approvers.length > 0
              ? { connect: data.approvers.map((id) => ({ id })) }
              : undefined,
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          offenderSettings: showOffenderSettings
            ? {
                create: {
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
export default useAddGroup;
