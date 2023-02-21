import { useEffect, useState } from 'react';
import {
  ChatQuery,
  CreateMessageMutation,
  DeleteMessageMutation,
  DeleteChatMutation,
  MessagesSubscriptionDocument,
  Role,
  useChatQuery,
  useCreateMessageMutation,
  useDeleteChatMutation,
  useDeleteMessageMutation,
  ListIncidentsQuery,
  SortOrder,
  useListIncidentsQuery,
  Age,
  Gender,
  Race,
  Build,
  useChatMessagesQuery,
  ChatMessagesQuery,
  ChatMessagesDocument,
  ChatMessagesQueryVariables,
  MessageItemType,
} from 'graphql/generated';
import { useStoreState } from 'state';
import {
  notification,
  Form,
  FormInstance,
  Modal,
  message,
  Upload,
  Mentions,
} from 'antd';
import { MutationUpdaterFn } from '@apollo/client';
import { useNavigate } from 'react-router';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';

const { confirm } = Modal;
const { getMentions } = Mentions;
const { useForm } = Form;

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
  userChatRefetch: () => void;
}
interface OffenderData {
  id: string;
  updatedAt?: Date;
  name?: string | null;
  age?: Age | null;
  gender?: Gender | null;
  race?: Race | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  hair?: string | null;
  dateSource?: string | null;
  peculiarities?: string | null;
  approved?: boolean | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  images?: {
    id: string;
    optimised?: string | null;
    url?: string | null;
    fileName?: string | null;
    type?: string | null;
    new?: boolean;
  }[];
  imageUid?: string[] | undefined;
}
interface MemberData {
  id: string;
  fullName: string;
  organisation: string;
  firstLetter?: string | null;
}
interface Return {
  onSubmit: () => void;
  data: ChatMessagesQuery | undefined;
  loading: boolean;
  chatData: ChatQuery | undefined;
  form: FormInstance<FormData>;
  saving: boolean;
  scrolledToTop: () => void;
  userId: string | undefined;
  messageSent: boolean;
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
  updateOffendersList: (value: OffenderData) => void;
  offendersData: OffenderData[];
  incidentsData:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined;
  linkIncident: boolean;
  linkOffender: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  updateIncidentList: (value: string) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  mentionedUser: { id: string; value: string }[];
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  setMessageSent: (value: boolean) => void;
}

const useViewMessages = ({
  chatId,
  updateUserChatList,
  userChatRefetch,
}: Props): Return => {
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const userFullName = useStoreState((state) => state.user.fullName);
  const schemeId = useStoreState((state) => state.scheme.id);
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [after, setAfter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [messageSent, setMessageSent] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [manageChat, setManageChat] = useState(false);
  const [membersData, setMembersData] = useState<MemberData[] | undefined>([]);
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);

  const [incidentsData, setIncidentsData] = useState<
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined
  >();

  useEffect(() => {
    setLoading(true);
  }, [chatId]);

  const toggleShowPicker = () => setShowPicker(!showPicker);
  const errorNotification = () =>
    notification.error({
      message: 'Error!',
      description: 'Whoops, there are some errors. Please try again. ',
      placement: 'bottomRight',
    });

  const { subscribeToMore, data, fetchMore } = useChatMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        chat: {
          id: chatId,
        },
      },
      skip: 0,
      take: 10,
    },
    skip: !chatId,
    onCompleted: () => {
      setLoadMore(false);
      setLoading(false);
      setFetching(false);
      setAfter(after + 10);
    },
  });

  const { data: chatData } = useChatQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: chatId,
      },
    },
    onCompleted: ({ chat }) => {
      if (chat?.members && chat.members.length > 0) {
        setMembersData(
          chat.members
            .map((userChat) => userChat.user)
            .map((member, i, arr) => {
              const arrBeforeMember = arr
                .slice(0, i)
                .map(({ fullName }) => fullName);
              if (arrBeforeMember.includes(member.fullName)) {
                const { length } = arrBeforeMember.filter(
                  (item) => item === member.fullName
                );
                return {
                  ...member,
                  fullName: `${member.fullName.replace(' ', '_')}_${length}`,
                };
              }
              return {
                ...member,
                fullName: member.fullName.replace(' ', '_'),
              };
            })
        );
      }
    },
  });
  const { data: listIncidentsData } = useListIncidentsQuery({
    variables: {
      scheme: {
        id: schemeId,
      },
      order: {
        createdAt: SortOrder.Asc,
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      variables: {
        chat: chatId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (prev && prev.chatMessages) {
          const test = prev.chatMessages.find(
            ({ id }) => id === subscriptionData.data.chatMessages[0]?.id
          );

          if (test === undefined) {
            return {
              ...prev,
              chatMessages: [
                ...prev.chatMessages,
                ...subscriptionData.data.chatMessages,
              ],
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
  useEffect(() => subscribeToNewMessage(), [chatId]);

  const scrolledToTop = async () => {
    if (!loadMore && !fetching) {
      setLoadMore(true);
      setFetching(true);
      await fetchMore({
        variables: {
          skip: data?.chatMessages.length || 0,
        },
      });
      setLoadMore(false);
      setFetching(false);
    }
  };

  // send message
  const updateData: MutationUpdaterFn<CreateMessageMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createMessage === null || res?.createMessage === undefined) return;

    const existingData = store.readQuery<
      ChatMessagesQuery,
      ChatMessagesQueryVariables
    >({
      query: ChatMessagesDocument,
      variables: {
        where: {
          chat: {
            id: chatId,
          },
        },
        skip: 0,
        take: 10,
      },
    });

    if (existingData === null || existingData === undefined) return;

    store.writeQuery<ChatMessagesQuery, ChatMessagesQueryVariables>({
      query: ChatMessagesDocument,
      data: {
        chatMessages: [res.createMessage, ...existingData.chatMessages],
        __typename: 'Query',
      },
      variables: {
        where: {
          chat: {
            id: chatId,
          },
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

    const existingData = store.readQuery<
      ChatMessagesQuery,
      ChatMessagesQueryVariables
    >({
      query: ChatMessagesDocument,
      variables: {
        where: {
          chat: {
            id: chatId,
          },
        },
      },
    });

    if (existingData === null) return;

    store.writeQuery<ChatMessagesQuery, ChatMessagesQueryVariables>({
      query: ChatMessagesDocument,
      data: {
        chatMessages: existingData.chatMessages.filter(
          (el) => el.id !== res?.deleteMessage?.id
        ),
        __typename: 'Query',
      },
      variables: {
        where: {
          chat: {
            id: chatId,
          },
        },
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
        if (chatId)
          deleteChat({
            variables: {
              id: chatId,
            },
          });
      },
    });
  };
  const toggleManageChat = () => {
    setManageChat(!manageChat);
  };
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const updateIncidentList = (selectedIncidentId: string) => {
    if (
      listIncidentsData?.listIncidents?.incidents &&
      listIncidentsData?.listIncidents?.total > 0
    ) {
      if (incidentsData && incidentsData.length > 0) {
        setIncidentsData(
          incidentsData.concat(
            listIncidentsData?.listIncidents?.incidents.filter(
              (incident) => selectedIncidentId === incident.id
            )
          )
        );
      } else {
        setIncidentsData(
          listIncidentsData?.listIncidents?.incidents.filter(
            (incident) => selectedIncidentId === incident.id
          )
        );
      }
    }
  };
  const removeOffender = (offenderId: string | undefined) => {
    if (offenderId) {
      setOffendersData(
        offendersData?.filter((offender) => offender.id !== offenderId)
      );
    }
  };
  const removeIncident = (incidentId: string | undefined) => {
    if (incidentId) {
      setIncidentsData(
        incidentsData?.filter((incident) => incident.id !== incidentId)
      );
    }
  };
  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!offendersData?.find(({ id }) => id === selectedOffender.id)) {
      setOffendersData([...offendersData, selectedOffender]);
    }
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

  const imgChange: UploadProps['onChange'] = (info) => {
    if (info.file.response) {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
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

  const [sendMessage] = useCreateMessageMutation({
    onCompleted: () => {},
    onError: () => {
      errorNotification();
      setSaving(false);
    },
    update: updateData,
  });
  const onSubmit = async () => {
    const getText = (text: string) => {
      const mentions = getMentions(text);
      let newText = text;

      for (let i = 0; i < mentions.length; i++) {
        const mention = mentions[i];

        const mentioned = membersData?.find(
          (member) => mention.value === member.fullName
        );
        if (mentioned)
          newText = newText.replace(
            `@${mention.value}`,
            `@[${mentioned.fullName}](${mentioned.id})`
          );
      }

      return newText;
    };

    if (!inputStr && !fileList && !incidentsData && !offendersData) {
      message.info('The message cannot be empty!');
    } else {
      setSaving(true);
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
            mentions: {
              connect:
                mentionedUser && mentionedUser.length > 0
                  ? mentionedUser.map(({ id }) => ({ id }))
                  : undefined,
            },
            content: getText(inputStr),
            images:
              imageChange && fileList.length > 0
                ? fileList
                    .map((item) => ({
                      filename: item.fileName || '',
                      mimetype: item.type || '',
                      url: item.url || '',
                    }))
                    .filter((obj) => obj.url !== undefined)
                : undefined,
            incidents: {
              connect:
                incidentsData && incidentsData.length > 0
                  ? incidentsData.map(({ id }) => ({ id }))
                  : undefined,
            },
            offenders: {
              connect:
                offendersData && offendersData.length > 0
                  ? offendersData.map(({ id }) => ({ id }))
                  : undefined,
            },
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            content: getText(inputStr),
            createdAt: new Date(),
            id: `${Math.random()}`,
            images:
              imageChange && fileList.length > 0
                ? fileList
                    .map((item) => ({
                      id: item.fileName || '',
                      optimised: item.url || '',
                      url: item.url || '',
                    }))
                    .filter((obj) => obj.url !== undefined)
                : [],
            incidents:
              incidentsData && incidentsData.length > 0 ? incidentsData : [],
            offenders:
              offendersData && offendersData.length > 0 ? offendersData.map((offender) => ({
                id: offender.id,
                images: offender.images || [],
                updatedAt: offender.updatedAt,
                age: offender.age,
                build: offender.build,
                dateOfBirth: offender.dateOfBirth,
                gender: offender.gender,
                name: offender.name,
                race: offender.race
              })) : [],
            sent: false,
            type: MessageItemType.Message,
            currentUser: true,
            formattedDateTime: moment().format('HH:mm'),
            from: {
              fullName: userFullName,
              id: userId,
              firstLetter: userFullName.slice(1)[0],
            },
            paddingTop: true,
            showUser: false,
          },
        },
      });
      setMessageSent(true);
      setSaving(false);
      userChatRefetch();
      form.resetFields();
      setInputStr('');
      setFileList([]);
      setIncidentsData([]);
      setOffendersData([]);
      setMentionedUser([]);
    }
  };

  return {
    onSubmit,
    data,
    loading,
    chatData,
    form,
    saving,
    scrolledToTop,
    userId,
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
    offendersData,
    incidentsData,
    linkIncident,
    linkOffender,
    toggleLinkIncident,
    toggleLinkOffender,
    updateIncidentList,
    updateOffendersList,
    removeOffender,
    removeIncident,
    removeImage,
    mentionedUser,
    setMentionedUser,
    deleteImageConfirm: () => {},
    deleteIncidentConfirm: () => {},
    deleteOffenderConfirm: () => {},
    messageSent,
    setMessageSent,
  };
};

export default useViewMessages;
