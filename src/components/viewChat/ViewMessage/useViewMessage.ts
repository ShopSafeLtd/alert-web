import {
  useEffect,
  // useRef,
  useState,
} from 'react';
import {
  ChatQuery,
  CreateMessageMutation,
  DeleteMessageMutation,
  DeleteChatMutation,
  MessagesDocument,
  MessagesQuery,
  MessagesSubscriptionDocument,
  Role,
  useChatQuery,
  useCreateMessageMutation,
  useDeleteChatMutation,
  useDeleteMessageMutation,
  useMessagesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import moment, { Moment } from 'moment';
import { MessageType } from 'types/enums';
import { notification, Form, FormInstance, Modal } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';

const { confirm } = Modal;

const { useForm } = Form;
interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}
interface DatedMessages {
  type: string;
  date?: string;
  id?: string;
  sameUser?: boolean | null;
  sent?: boolean | null;
  content?: string;
  createdAt?: Moment;
  from?: { id: string; fullName: string; organisation: string };
  chat?: { id: string; name: string };
}

interface FormData {
  newMessage: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  loading: boolean;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  deleteMessageConfirm: (value: string) => void;
  adminRights: boolean;
  deleteChatConfirm: () => void;
  manageChat: boolean;
  toggleManageChat: () => void;
  // ref: React.MutableRefObject<HTMLDivElement | null>;
}

const useViewMessages = ({ chatId, updateUserChatList }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [after, setAfter] = useState('');
  const [datedMessages, setDatedMessages] = useState<DatedMessages[]>([]);
  const [currentChatId, setCurrentChatId] = useState('');

  const [loadMore, setLoadMore] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [manageChat, setManageChat] = useState(false);

  // const ref = useRef<HTMLDivElement | null>(null);
  // useEffect(() => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'end',
  //       inline: 'nearest',
  //     });
  //   }
  // }, [datedMessages]);

  useEffect(() => {
    if (chatId !== currentChatId) setCurrentChatId(chatId);
  }, [chatId]);

  const handleMessagesData = (
    messages: Exclude<MessagesQuery['messages'], undefined | null> | undefined,
    clear?: boolean
  ) => {
    if (messages && messages.length > 0) {
      let existingData = datedMessages;
      if (clear) {
        existingData = [];
      }

      const finalMessages = messages?.map((message, index) => {
        if (index === 0 && clear) {
          return [
            {
              type: MessageType.date,
              date: moment(message.createdAt).format('dddd, MMMM Do'),
            },
            { type: MessageType.message, sameUser: false, ...message },
          ];
        }
        if (
          moment(messages[index - 1].createdAt).format('dddd, MMMM Do') ===
          moment(message.createdAt).format('dddd, MMMM Do')
        ) {
          if (messages[index - 1].from.id === message.from.id) {
            return [
              ...existingData,
              { type: MessageType.message, sameUser: true, ...message },
            ];
          }
          return [
            ...existingData,
            { type: MessageType.message, sameUser: false, ...message },
          ];
        }
        return [
          ...existingData,
          {
            type: MessageType.date,
            date: moment(message.createdAt).format('dddd, MMMM Do'),
          },
          { type: MessageType.message, sameUser: false, ...message },
        ];
      });

      setDatedMessages(finalMessages.flat());
    } else setDatedMessages([]);
  };

  const {
    subscribeToMore,
    loading,
    // data: messagesData,
    fetchMore,
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      chat: currentChatId,
    },
    onCompleted: (res) => {
      if (res.messages.length > 0) {
        setAfter(res.messages.slice(-1)[0].id);
        handleMessagesData(res.messages, true);
      }
      if (res.messages.length === 0) {
        handleMessagesData([], true);
      }
    },
  });
  const { data: chatData } = useChatQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: currentChatId,
      },
    },
  });

  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      variables: {
        chat: currentChatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        const test = prev.messages.find(
          ({ id }) => id === subscriptionData.data.messages[0].id
        );

        if (test === undefined) {
          return {
            ...prev,
            messages: [...prev.messages, ...subscriptionData.data.messages],
          };
        }
        return {
          ...prev,
        };
      },
    });
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useEffect(() => subscribeToNewMessage(), [currentChatId]);

  const scrolledToTop = async () => {
    if (loadMore && !fetching) {
      setFetching(true);
      const test = await fetchMore({
        query: MessagesDocument,
        variables: {
          chat: currentChatId,
          after: {
            id: after,
          },
        },
      });
      if (!test.data.messages) {
        setLoadMore(false);
      }
      handleMessagesData(test.data.messages);
    }
  };

  // send message
  const updateData: MutationUpdaterFn<CreateMessageMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createMessage === null || res?.createMessage === undefined) return;

    const existingData = store.readQuery<MessagesQuery>({
      query: MessagesDocument,
      variables: {
        chat: currentChatId,
      },
    });

    if (existingData === null || existingData === undefined) return;

    store.writeQuery<MessagesQuery>({
      query: MessagesDocument,
      data: {
        messages: [...existingData.messages, res.createMessage],
        __typename: 'Query',
      },
      variables: {
        chat: currentChatId,
      },
    });
  };

  const [sendMessage] = useCreateMessageMutation({
    onCompleted: () => {
      setSaving(false);
      form.resetFields();
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    update: updateData,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (data.newMessage)
      sendMessage({
        variables: {
          data: {
            chat: {
              connect: {
                id: currentChatId,
              },
            },
            scheme: {
              connect: {
                id: schemeId,
              },
            },
            from: {
              connect: {
                id: userId,
              },
            },
            content: data.newMessage,
          },
        },
      });
  };

  // delete
  // update list after deleting a message
  const updateMessageList: MutationUpdaterFn<DeleteMessageMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<MessagesQuery>({
      query: MessagesDocument,
      variables: {
        chat: currentChatId,
      },
    });

    if (existingData === null) return;

    store.writeQuery<MessagesQuery>({
      query: MessagesDocument,
      data: {
        messages: existingData.messages.filter(
          (message) => message.id !== res?.deleteMessage?.id
        ),
        __typename: 'Query',
      },
      variables: {
        chat: currentChatId,
      },
    });
  };

  const [deleteMessage] = useDeleteMessageMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The message has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateMessageList,
  });
  const openDelete = (currentId: string) => {
    setSaving(true);
    if (currentId) {
      deleteMessage({
        variables: {
          id: currentId,
        },
      });
    }
  };
  const deleteMessageConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the message?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete(currentId);
      },
    });
  };
  const [deleteChat] = useDeleteChatMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('/app/chat');
      notification.success({
        message: 'Successfully Deleted!',
        description: 'The chat has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateUserChatList,
  });
  const deleteChatConfirm = () => {
    confirm({
      title: 'Do you want to delete the chat?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      onOk() {
        setSaving(true);
        if (currentChatId)
          deleteChat({
            variables: {
              id: currentChatId,
            },
          });
      },
    });
  };
  const toggleManageChat = () => {
    setManageChat(!manageChat);
  };

  return {
    onSubmit,
    loading,
    chatData,
    form,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    deleteMessageConfirm,
    adminRights: role !== Role.User,
    deleteChatConfirm,
    manageChat,
    toggleManageChat,
    // ref,
  };
};

export default useViewMessages;
