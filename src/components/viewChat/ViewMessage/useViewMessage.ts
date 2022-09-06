import { useEffect, useState } from 'react';
import {
  // CreateMessageMutation,
  MessagesDocument,
  MessagesQuery,
  // MessagesQuery,
  MessagesSubscriptionDocument,
  useCreateMessageMutation,
  useMessagesQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import moment, { Moment } from 'moment';
import { notification, Form, FormInstance } from 'antd';
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
  newMessage: string;
}
interface Return {
  onSubmit: (value: FormData) => void;
  form: FormInstance<FormData>;
  // data: MessagesQuery | undefined;
  loading: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  datedMessages: DatedMessages[];
  userId: string | undefined;
  loadMore: boolean;
  // subscribeToNewMessage: () => void;
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
  const [currentUser, setCurrentUser] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const [loadMore, setLoadMore] = useState(false);
  const [fetching, setFetching] = useState(false);
  // const [newReceived, setReceived] = useState(false);
  // const [refetched, setRefetched] = useState(false);

  // const [info, setInfo] = useState({
  //   loadingMore: false,
  //   refetch: true,
  //   lastMessage: '',
  //   sentMessage: '',
  //   pristine: true,
  //   recentMessage: '',
  //   newMessageText: '',
  // });

  const handleMessagesData = (
    messages: Exclude<MessagesQuery['messages'], undefined | null> | undefined,
    clear?: boolean
  ) => {
    if (messages && messages.length > 0) {
      let oldData = datedMessages;
      if (clear) {
        oldData = [
          {
            type: 'DATE',
            date: moment(messages[0]?.createdAt).format('dddd, MMMM Do'),
          },
        ];
      }

      messages?.forEach((message) => {
        if (currentDate === moment(message.createdAt).format('DD/MM/YY')) {
          if (currentUser === message.from.id) {
            setDatedMessages([
              ...oldData,
              { type: 'MESSAGE', sameUser: true, ...message },
            ]);
          } else {
            setDatedMessages([
              ...oldData,
              { type: 'MESSAGE', sameUser: false, ...message },
            ]);
          }
        } else {
          setCurrentDate(moment(message.createdAt).format('DD/MM/YY'));
          setCurrentUser(message.from.id);
          setDatedMessages([
            ...oldData,
            {
              type: 'DATE',
              date: moment(message.createdAt).format('dddd, MMMM Do'),
            },
            { type: 'MESSAGE', sameUser: false, ...message },
          ]);
        }
      });
    }
  };
  console.log(datedMessages);
  console.log(userId);

  const {
    // data: messagesData,
    loading,
    subscribeToMore,
    // refetch,
    fetchMore,
  } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      chat: chatId,
    },
    onCompleted: (res) => {
      if (res.messages.length > 0) {
        setAfter(res.messages.slice(-1)[0].id);
        setCurrentDate(moment(res.messages[0].createdAt).format('DD/MM/YY'));
        // setDatedMessages([
        //   {
        //     type: 'DATE',
        //     date: moment(res.messages[0].createdAt).format('dddd, MMMM Do'),
        //   },
        // ]);
        handleMessagesData(res.messages, true);
      }
    },
  });
  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      variables: {
        chat: chatId,
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
  useEffect(() => subscribeToNewMessage(), [chatId]);

  const scrolledToTop = async () => {
    if (loadMore && !fetching) {
      setFetching(true);
      const test = await fetchMore({
        query: MessagesDocument,
        variables: {
          chat: chatId,
          after: {
            id: after,
          },
        },
        //   updateQuery: (previousResult, { fetchMoreResult }) => {
        //     if (fetchMoreResult?.messages.length === 0) {
        //       setLoadMore(false);
        //     }
        //     if (fetchMoreResult && fetchMoreResult.messages.length > 0) {
        //       return {
        //         messages: [
        //           ...fetchMoreResult.messages,
        //           ...previousResult.messages,
        //         ],
        //       };
        //     }
        //     return {
        //       messages: [...previousResult.messages],
        //     };
        //   },
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
  //       chat: chatId,
  //     },
  //   });

  //   if (existingData === null) return;
  //   // if (existingData?.listOffenders?.offenders === undefined) return;

  //   store.writeQuery<MessagesQuery>({
  //     query: MessagesDocument,
  //     data: {
  //       messages: [...existingData.messages, res.createMessage],
  //       __typename: 'Query',
  //     },
  //     variables: {
  //       chat: chatId,
  //     },
  //   });
  // };

  const [sendMessage] = useCreateMessageMutation({
    onCompleted: () => {
      setSaving(false);
      // notification.success({
      //   message: 'Successfully Sent!',
      //   description: 'Your has been added!',
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
    if (data.newMessage)
      sendMessage({
        variables: {
          data: {
            chat: {
              connect: {
                id: chatId,
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

  return {
    onSubmit,
    form,
    // data: messagesData,
    loading,
    saving,
    scrolledToTop,
    datedMessages,
    userId,
    loadMore,
    // subscribeToNewMessage,
  };
};

export default useViewMessages;
