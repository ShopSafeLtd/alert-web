import type { ListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';

import { notification } from 'antd';
import { useUpdateChatMutation } from 'graphql/chat/mutation/__generated__/update_chat.generated';
import { useChatQuery } from 'graphql/chat/queries/__generated__/chat.generated';
import { SortOrder } from 'graphql/types';
import { useListSchemeUsersQuery } from 'graphql/users/queries/__generated__/list-scheme-users.generated';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

interface FormData {
  user: string[];
}

export interface MemberData {
  businesses: { id: string; name: string }[];
  firstLetter?: null | string | undefined;
  fullName: string;
  id: string;
  origFirstLetter?: null | string | undefined;
  origName: string;
}
// type MemberData =
//   | Exclude<
//       ListSchemeUsersQuery['users'],
//       undefined | null
//     >[0]
//   | null
//   | undefined;
interface Props {
  chatId: string;
  onClose: () => void;
}

interface Return {
  addMember: boolean;
  addMemberUpdate: (value: FormData) => void;
  deleteConfirm: (value: string) => void;
  loading: boolean;
  membersData: MemberData[] | undefined;
  onSubmit: () => void;
  saving: boolean;
  toggleAddMember: () => void;
  usersData:
    | Exclude<ListSchemeUsersQuery['users'], null | undefined>
    | null
    | undefined;
}

const useEditChat = ({ chatId, onClose }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const toggleAddMember = () => {
    setAddMember(!addMember);
  };

  const [membersData, setMembersData] = useState<MemberData[] | undefined>([]);
  const { data: chatData, loading } = useChatQuery({
    onCompleted: ({ chat }) => {
      if (chat?.members && chat.members.length > 0) {
        setMembersData(chat.members.map((userChat) => userChat.user));
      }
    },
    variables: {
      where: {
        id: chatId,
      },
    },
  });

  const { data: usersData } = useListSchemeUsersQuery({
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

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been updated.',
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

  const addMemberUpdate = (data: FormData) => {
    const addData = usersData?.users
      .filter(({ id }) => data.user.map((userId) => userId).includes(id))
      .map((userChat) => userChat);
    if (addData && addData.length > 0) {
      if (membersData && membersData.length > 0) {
        setMembersData([...membersData, ...addData]);
      } else {
        setMembersData(addData);
      }
    }
  };
  const deleteConfirm = (currentId: string) => {
    setMembersData(membersData?.filter((el) => el.id !== currentId));
  };

  const onSubmit = () => {
    setSaving(true);
    if (chatId)
      void updateChat({
        variables: {
          data: {
            members: {
              create: membersData
                ?.filter(
                  ({ id }) =>
                    !chatData?.chat?.members
                      .map((userChat) => userChat.user.id)
                      .includes(id)
                )
                .map(({ id }) => ({
                  newMessages: true,
                  user: { connect: { id } },
                })),
              delete: chatData?.chat?.members
                .filter(
                  (userChat) =>
                    !membersData?.map(({ id }) => id).includes(userChat.user.id)
                )
                .map((userChat) => ({ id: userChat.id })),
            },
          },
          where: {
            id: chatId,
          },
        },
      });
  };

  return {
    addMember,
    addMemberUpdate,
    deleteConfirm,
    loading,
    membersData,
    onSubmit,
    saving,
    toggleAddMember,
    usersData: usersData?.users
      .filter((user) => !membersData?.map((el) => el.id).includes(user.id))
      .map((user) => user),
  };
};

export default useEditChat;
