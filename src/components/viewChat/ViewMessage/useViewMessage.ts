import {
  useEffect,
  // useRef,
  useState,
} from 'react';
import {
  CreateMessageMutation,
  // CreateMessageMutation,
  DeleteMessageMutation,
  // CreateMessageMutation,
  MessagesDocument,
  MessagesQuery,
  MessagesSubscriptionDocument,
  Role,
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useMessagesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import moment, { Moment } from 'moment';
import { MessageType } from 'types/enums';
import { notification, Form, FormInstance, Modal } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';

const { confirm } = Modal;

const { useForm } = Form;
interface Props {
  chatId: string;
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
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  deleteConfirm: (value: string) => void;
  deleteRights: boolean;
  // ref: React.MutableRefObject<HTMLDivElement | null>;
}

const useViewMessages = ({ chatId }: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [after, setAfter] = useState('');
  const [datedMessages, setDatedMessages] = useState<DatedMessages[]>([]);
  const [currentChatId, setCurrentChatId] = useState('');

  const [loadMore, setLoadMore] = useState(false);
  const [fetching, setFetching] = useState(false);
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
    console.log('datedMessages', datedMessages);
    if (messages && messages.length > 0) {
      let existingData = datedMessages;
      let date = '';
      let user = '';
      if (clear) {
        existingData = [];
      }
      if (existingData && existingData.length > 0) {
        date = moment(existingData?.slice(-1)[0].createdAt).format(
          'dddd, MMMM Do'
        );
        user = existingData.slice(-1)[0].from?.id || '';
      }

      const finalMessages = messages?.map((message, index) => {
        if (index === 0 && clear) {
          date = moment(message.createdAt).format('dddd, MMMM Do');
          user = message.from.id;
          return [
            {
              type: MessageType.date,
              date: moment(message.createdAt).format('dddd, MMMM Do'),
            },
            { type: MessageType.message, sameUser: false, ...message },
          ];
        }
        if (date === moment(message.createdAt).format('dddd, MMMM Do')) {
          if (user === message.from.id) {
            return [
              ...existingData,
              { type: MessageType.message, sameUser: true, ...message },
            ];
          }
          user = message.from.id;
          return [
            ...existingData,
            { type: MessageType.message, sameUser: false, ...message },
          ];
        }
        date = moment(message.createdAt).format('dddd, MMMM Do');
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
    // data: messagesData,
    // refetch,
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
    onCompleted: (res) => {
      setSaving(false);
      if (res.createMessage) {
        console.log(res.createMessage);
        // handleMessagesData([res.createMessage]);
      }
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
  // update list after deleting an item
  const update: MutationUpdaterFn<DeleteMessageMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    // get existing Incident list data from Apollo store
    const existingData = store.readQuery<MessagesQuery>({
      query: MessagesDocument,
      variables: {
        chat: currentChatId,
      },
    });

    if (existingData === null) return;

    // write the new data to the Apollo store
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
    onCompleted: (res) => {
      setSaving(false);
      if (datedMessages && datedMessages.length > 0 && res.deleteMessage) {
        console.log(res.deleteMessage);

        // const filteredData = messagesData?.messages.filter(
        //   (el) => el.id !== res.deleteMessage?.id
        // );
        // handleMessagesData(filteredData, true);
      }
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
    update,
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
  const deleteConfirm = (currentId: string) => {
    confirm({
      title: 'Do you want to delete the crime type?',
      content: 'This action cannot be undone.',
      onOk() {
        openDelete(currentId);
      },
    });
  };

  return {
    onSubmit,
    form,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    deleteConfirm,
    deleteRights: role !== Role.User,
    // ref,
  };
};

export default useViewMessages;
