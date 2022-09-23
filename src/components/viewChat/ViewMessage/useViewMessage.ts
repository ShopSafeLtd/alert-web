import { useEffect, useState } from 'react';
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
import { notification, Form, FormInstance, Modal, message, Upload } from 'antd';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

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
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}
// interface FormData {
//   newMessage: string;
// }
interface Return {
  // onSubmit: (value: string) => void;
  onSubmit: () => void;
  data: MessagesQuery | undefined;
  loading: boolean;
  chatData: ChatQuery | undefined;
  // form: FormInstance<FormData>;
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
  membersData: MemberData[] | undefined;
  inputStr: string;
  setInputStr: (value: string) => void;
  showPicker: boolean;
  toggleShowPicker: () => void;
  imgChange: UploadProps['onChange'];
  onPreview: (value: UploadFile) => void;
  beforeUpload: (value: RcFile) => void;
  fileList: UploadFile[];
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
  const [membersData, setMembersData] = useState<MemberData[] | undefined>([]);
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  console.log(imageChange);

  const toggleShowPicker = () => setShowPicker(!showPicker);
  const errorNotification = () =>
    notification.error({
      message: 'Error!',
      description: 'Whoops, there are some errors. Please try again. ',
      placement: 'bottomRight',
    });

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

      const finalMessages = messages?.map((el, index) => {
        if (index === 0 && clear) {
          return [
            {
              type: MessageType.date,
              date: moment(el.createdAt).format('dddd, MMMM Do'),
            },
            { type: MessageType.message, sameUser: false, ...el },
          ];
        }
        if (
          moment(messages[index - 1].createdAt).format('dddd, MMMM Do') ===
          moment(el.createdAt).format('dddd, MMMM Do')
        ) {
          if (messages[index - 1].from.id === el.from.id) {
            return [
              ...existingData,
              { type: MessageType.message, sameUser: true, ...el },
            ];
          }
          return [
            ...existingData,
            { type: MessageType.message, sameUser: false, ...el },
          ];
        }
        return [
          ...existingData,
          {
            type: MessageType.date,
            date: moment(el.createdAt).format('dddd, MMMM Do'),
          },
          { type: MessageType.message, sameUser: false, ...el },
        ];
      });

      setDatedMessages(finalMessages.flat());
    } else setDatedMessages([]);
  };

  const { subscribeToMore, data, loading, fetchMore } = useMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      chat: currentChatId,
    },
    onCompleted: (res) => {
      if (res.messages.length > 0) {
        setAfter(res.messages.slice(-1)[0].id);
        handleMessagesData(res.messages, true);
      } else {
        handleMessagesData([]);
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
    onCompleted: ({ chat }) => {
      if (chat?.members && chat.members.length > 0) {
        setMembersData(chat.members.map((userChat) => userChat.user));
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
        if (prev && prev.messages) {
          const test = prev.messages.find(
            ({ id }) => id === subscriptionData.data.messages[0].id
          );

          if (test === undefined) {
            return {
              ...prev,
              messages: [...prev.messages, ...subscriptionData.data.messages],
            };
          }
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
      errorNotification();
      setSaving(false);
    },
    // setSaving(true);
    update: updateData,
    // setSaving(false);
  });

  const onSubmit = () => {
    if (!inputStr || !fileList) {
      message.info('The message cannot be empty!');
    } else {
      setSaving(true);
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
            content: inputStr,
          },
        },
      });
      setInputStr('');
      setFileList([]);
    }
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
          (el) => el.id !== res?.deleteMessage?.id
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
      errorNotification();
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
      errorNotification();
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
  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      message.error(
        'This image has already existed, please choose another one.'
      );
    }

    return !isFileDuplicate || Upload.LIST_IGNORE;
  };
  const imgChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImageChange(true);
  };
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return {
    onSubmit,
    data,
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
    membersData,
    inputStr,
    setInputStr,
    showPicker,
    toggleShowPicker,
    imgChange,
    onPreview,
    beforeUpload,
    fileList,
  };
};

export default useViewMessages;
