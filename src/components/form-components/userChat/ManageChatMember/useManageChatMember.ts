import { useState } from 'react';
import { useStoreState } from 'state';

import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { ListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { useListSchemeUsersQuery } from 'graphql/users/queries/list-scheme-users.generated';
import { useChatQuery } from 'graphql/chat/queries/chat.generated';
import { SortOrder } from 'graphql/types';
import { useUpdateChatMutation } from 'graphql/chat/mutation/update_chat.generated';

interface FormData {
  user: string[];
}

export interface MemberData {
  id: string;
  fullName: string;
  businesses: { id: string; name: string }[];
  firstLetter?: string | null | undefined;
  origName: string;
  origFirstLetter?: string | null | undefined;
}
// type MemberData =
//   | Exclude<
//       ListSchemeUsersQuery['users'],
//       undefined | null
//     >[0]
//   | null
//   | undefined;
interface Props {
  onClose: () => void;
  chatId: string;
}

interface Return {
  onSubmit: () => void;
  addMemberUpdate: (value: FormData) => void;
  loading: boolean;
  usersData:
    | Exclude<ListSchemeUsersQuery['users'], undefined | null>
    | null
    | undefined;
  saving: boolean;
  addMember: boolean;
  toggleAddMember: () => void;
  membersData: MemberData[] | undefined;
  deleteConfirm: (value: string) => void;
}

const useEditChat = ({ onClose, chatId }: Props): Return => {
  const intl = useIntl();
  const schemeId = useStoreState((state) => state.scheme.id);
  const [saving, setSaving] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const toggleAddMember = () => {
    setAddMember(!addMember);
  };

  const [membersData, setMembersData] = useState<MemberData[] | undefined>([]);
  const { data: chatData, loading } = useChatQuery({
    variables: {
      where: {
        id: chatId,
      },
    },
    onCompleted: ({ chat }) => {
      if (chat?.members && chat.members.length > 0) {
        setMembersData(chat.members.map((userChat) => userChat.user));
      }
    },
  });

  const { data: usersData } = useListSchemeUsersQuery({
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

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The chat group has been updated.',
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
          where: {
            id: chatId,
          },
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
                  user: { connect: { id } },
                  newMessages: true,
                })),
              delete: chatData?.chat?.members
                .filter(
                  (userChat) =>
                    !membersData?.map(({ id }) => id).includes(userChat.user.id)
                )
                .map((userChat) => ({ id: userChat.id })),
            },
          },
        },
      });
  };

  return {
    onSubmit,
    addMemberUpdate,
    loading,
    usersData: usersData?.users
      .filter((user) => !membersData?.map((el) => el.id).includes(user.id))
      .map((user) => user),
    saving,
    addMember,
    toggleAddMember,
    membersData,
    deleteConfirm,
  };
};

export default useEditChat;
