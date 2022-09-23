import { useState } from 'react';
import { useStoreState } from 'state';
import {
  // ChatQuery,
  SortOrder,
  useListSchemeUsersQuery,
  useUpdateChatMutation,
  useChatQuery,
} from 'graphql/generated';
import { Modal, notification } from 'antd';

const { confirm } = Modal;
interface FormData {
  user: string[];
}
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}
interface Props {
  onClose: () => void;
  chatId: string;
}
interface Return {
  onSubmit: () => void;
  addMemberUpdate: (value: FormData) => void;
  loading: boolean;
  usersData: MemberData[] | undefined;
  saving: boolean;
  addMember: boolean;
  toggleAddMember: () => void;
  membersData: MemberData[] | undefined;
  deleteConfirm: (value: string) => void;
}

const useEditChat = ({ onClose, chatId }: Props): Return => {
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
    },
  });

  const [updateChat] = useUpdateChatMutation({
    onCompleted: () => {
      setSaving(false);
      onClose();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The chat group has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: (error) => {
      console.log(error);

      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const addMemberUpdate = (data: FormData) => {
    const addData = usersData?.users
      .filter(({ id }) => data.user.map((userId) => userId).includes(id))
      .map((userChat) => userChat);
    if (addData && addData.length > 0) {
      if (membersData && membersData.length > 0) {
        setMembersData(membersData.concat(addData));
      } else {
        setMembersData(addData);
      }
    }
  };
  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to remove this user from the chat group?',
      content: 'This action cannot be undone.',
      onOk() {
        setMembersData(membersData?.filter((el) => el.id !== currentId));
      },
    });
  };

  const onSubmit = () => {
    setSaving(true);
    if (chatId)
      updateChat({
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
