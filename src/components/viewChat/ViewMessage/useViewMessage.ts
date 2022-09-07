import { useEffect, useState } from 'react';
import {
  // CreateMessageMutation,
  MessagesDocument,
  MessagesQuery,
  MessagesSubscriptionDocument,
  useCreateMessageMutation,
  useMessagesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import moment, { Moment } from 'moment';
import { MessageType } from 'types/enums';
import { notification, Form, FormInstance } from 'antd';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { MutationUpdaterFn } from '@apollo/client';

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
  newMessages: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  loading: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
}

const useViewMessages = ({ chatId }: Props): Return => {
  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [after, setAfter] = useState('');
  const [datedMessages, setDatedMessages] = useState<DatedMessages[]>([
    {
      type: '',
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    console.log('chatId', currentChatId);

    if (chatId !== currentChatId) setCurrentChatId(chatId);
  }, [chatId]);

  const handleMessagesData = (
    messages: Exclude<MessagesQuery['messages'], undefined | null> | undefined,
    clear?: boolean
  ) => {
    if (messages && messages.length > 0) {
      let existingData = datedMessages;

      let date = '';

      let user = '';

      if (datedMessages && datedMessages.length > 0) {
        date = moment(existingData?.slice(-1)[0].createdAt).format(
          'dddd, MMMM Do'
        );

        user = existingData.slice(-1)[0].from?.id || '';
      }
      // let existingData = datedMessages;
      // let date = moment(existingData.slice(-1)[0].createdAt).format(
      //   'dddd, MMMM Do'
      // );
      // let user = existingData.slice(-1)[0].from?.id;
      // let user = '';
      console.log('userId', existingData.slice(-1)[0].from?.id);

      if (clear) {
        existingData = [];
      }

      const finalMessages = messages?.map((message, index) => {
        if (index === 0 && clear) {
          date = moment(message.createdAt).format('dddd, MMMM Do');
          user = message.from.id;
          console.log('messages: ', [...existingData, message]);
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
      console.log('finalMessages', finalMessages);

      setDatedMessages(finalMessages.flat());
    } else setDatedMessages([]);
  };

  const {
    loading,
    subscribeToMore,
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

      console.log('res', res);
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

  // const update: MutationUpdaterFn<CreateMessageMutation> = (
  //   store,
  //   { data: res }
  // ) => {
  //   if (res === null || res === undefined) return;

  //   const existingData = store.readQuery<MessagesQuery>({
  //     query: MessagesDocument,
  //     variables: {
  //       chat: currentChatId,
  //     },
  //   });

  //   if (existingData === null) return;
  //   if (existingData.messages === undefined) return;

  //   store.writeQuery<MessagesQuery>({
  //     query: MessagesDocument,
  //     data: {
  //       messages: [...existingData.messages, res.createMessage],
  //       __typename: 'Query',
  //     },
  //     variables: {
  //       chat: currentChatId,
  //     },
  //   });
  // };

  const [sendMessage] = useCreateMessageMutation({
    onCompleted: (res) => {
      setSaving(false);
      if (res.createMessage) {
        handleMessagesData([res.createMessage]);
      }
      form.resetFields();

      // notification.success({
      //   message: 'Successfully Sent!',
      //   description: 'Your message has been sent!',
      //   placement: 'bottomRight',
      // });
    },
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
      setSaving(false);
    },
    // update,
  });

  const onSubmit = (data: FormData) => {
    setSaving(true);
    if (data.newMessages)
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
            content: data.newMessages,
          },
        },
      });
  };

  return {
    onSubmit,
    form,
    loading,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
  };
};

export default useViewMessages;
