import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import type { SelectOptions } from 'types/DataType';

import { notification } from 'antd';
import { useCreateGroupMutation } from 'graphql/groups/mutations/__generated__/create-group.generated';
import { SortOrder } from 'graphql/types';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useListUsersToAddQuery } from './__graphql__/queries/__generated__/list-users.generated';

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
  onClose: () => void;
  update: MutationUpdaterFn<CreateGroupMutation>;
}

interface Return {
  adminUsersData: SelectOptions[] | undefined;
  onSubmit: (value: FormData) => void;
  saving: boolean;
  selectedUsers: string[] | undefined;
  setSelectedUsers: (value: string[]) => void;
  setShowOffenderSettings: (value: boolean) => void;
  showOffenderSettings: boolean;
  usersData: SelectOptions[] | undefined;
  usersLoading: boolean;
}

const useAddGroup = ({ onClose, update }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [showOffenderSettings, setShowOffenderSettings] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>();

  const { data: usersData, loading: usersLoading } = useListUsersToAddQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      orderBy: {
        fullName: SortOrder.Asc,
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

  const [createGroup] = useCreateGroupMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The group has been added.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Added!',
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
          approver:
            data.approvers && data.approvers.length > 0
              ? { connect: data.approvers.map((id) => ({ id })) }
              : undefined,
          description: data.description,
          name: data.name,
          offenderSettings: showOffenderSettings
            ? {
                create: {
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
          scheme: {
            connect: {
              id: schemeId,
            },
          },
          users: { connect: data.users.map((id) => ({ id })) },
        },
      },
    });
  };

  return {
    adminUsersData: [],
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
export default useAddGroup;
