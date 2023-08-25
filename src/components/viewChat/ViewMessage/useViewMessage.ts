import { useEffect, useState } from 'react';
import type {
  Age,
  Build,
  ChatMessagesQuery,
  ChatMessagesQueryVariables,
  ChatQuery,
  ChatQueryVariables,
  CreateMessageMutation,
  DeleteChatMutation,
  DeleteMessageMutation,
  Gender,
  Race,
  UserChatsQuery,
  UserChatsQueryVariables,
} from 'graphql/generated';
import {
  ChatDocument,
  ChatMessagesDocument,
  ImagePosition,
  MessageItemType,
  MessagesSubscriptionDocument,
  Role,
  SortOrder,
  useChatMessagesQuery,
  useChatQuery,
  useCreateMessageMutation,
  useDeleteChatMutation,
  useDeleteMessageMutation,
  UserChatsDocument,
} from 'graphql/generated';
import { useStoreState } from 'state';
import type { FormInstance } from 'antd';
import { Form, Mentions, message, Modal, notification, Upload } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import moment from 'moment';
import update from 'immutability-helper';
import type {
  CrimeGroupData,
  IncidentCardData,
  VehicleData,
} from 'types/DataType';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

const { confirm } = Modal;
const { getMentions } = Mentions;
const { useForm } = Form;

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}

export interface OffenderData {
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
  origName: string;
  businesses: { id: string; name: string }[];
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
  offendersData: OffenderData[];
  incidentsData: IncidentCardData[];
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  updateOffendersList: (value: OffenderData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  removeOffender: (value: string | undefined) => void;
  removeIncident: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  mentionedUser: { id: string; value: string }[];
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  setMessageSent: (value: boolean) => void;
  totalChats: number;
  restrictIncidentAccess: boolean;
}

const useViewMessages = ({ chatId, updateUserChatList }: Props): Return => {
  const apolloStore = useApolloClient();
  const intl = useIntl();
  const {
    role,
    id: userId,
    origName: userOrigName,
    businesses: userBusinesses,
  } = useStoreState((state) => state.user);
  const restrictIncidentAccess =
    useStoreState((state) => state.scheme.restrictIncidentAccess) &&
    role === Role.User;

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
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);

  const [incidentsData, setIncidentsData] = useState<IncidentCardData[]>([]);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    setLoading(true);
  }, [chatId]);

  const { subscribeToMore, data, fetchMore } = useChatMessagesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        chat: {
          id: chatId,
        },
      },
      skip: 0,
      take: 20,
    },
    skip: !chatId,
    onCompleted: () => {
      setLoadMore(false);
      setLoading(false);
      setFetching(false);
      setAfter(after + 20);
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
                .map(({ origName }) => origName);
              if (arrBeforeMember.includes(member.origName)) {
                const { length } = arrBeforeMember.filter(
                  (item) => item === member.origName
                );
                return {
                  ...member,
                  origName: `${member.origName.replace(' ', '_')}_${length}`,
                };
              }
              return {
                ...member,
                origName: member.origName.replace(' ', '_'),
              };
            })
        );
      }
    },
  });

  console.log(chatData?.chat?.totalMessages);

  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      variables: {
        chat: chatId,
        user: userId,
      },
      updateQuery: (prev, { subscriptionData, variables }) => {
        const existingChatListData = apolloStore.readQuery<
          UserChatsQuery,
          UserChatsQueryVariables
        >({
          query: UserChatsDocument,
          variables: {
            where: {
              id: userId,
            },
            scheme: schemeId,
            orderBy: {
              chat: {
                updatedAt: SortOrder.Desc,
              },
            },
          },
        });

        const existingChat = apolloStore.readQuery<
          ChatQuery,
          ChatQueryVariables
        >({
          query: ChatDocument,
          variables: {
            where: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              id: variables?.where?.chat?.id as string,
            },
          },
        });
        if (existingChat && existingChat.chat)
          apolloStore.writeQuery<ChatQuery, ChatQueryVariables>({
            query: ChatDocument,
            variables: {
              where: {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                id: variables?.where?.chat?.id as string,
              },
            },
            data: {
              chat: {
                ...existingChat?.chat,
                totalMessages:
                  ((existingChat?.chat?.totalMessages as number) || 0) + 1,
              },
            },
          });

        const newMessage = subscriptionData.data.chatMessages[0];
        if (newMessage && existingChatListData?.user) {
          const chatIndex = existingChatListData.user.chats
            .map(({ chat }) => chat.id)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            .indexOf((variables?.where?.chat?.id as string) || chatId);

          apolloStore.writeQuery<UserChatsQuery, UserChatsQueryVariables>({
            query: UserChatsDocument,
            data: {
              user: {
                id: existingChatListData.user.id,
                totalChats: existingChatListData.user.totalChats,
                chats: update(existingChatListData.user.chats, {
                  [chatIndex]: {
                    chat: {
                      messages: {
                        $set: [
                          {
                            content: newMessage.content,
                            createdAt: newMessage?.createdAt,
                            from: {
                              origName: newMessage.from?.fullName || '',
                              id: newMessage.id || '',
                            },
                            id: newMessage.id,
                            images: newMessage.images,
                            incidents: newMessage.incidents,
                            offenders: newMessage.offenders,
                            vehicles: newMessage.vehicles,
                            crimeGroups: newMessage.crimeGroups,
                          },
                        ],
                      },
                    },
                  },
                }),
              },
              __typename: 'Query',
            },
            variables: {
              where: {
                id: userId,
              },
              scheme: schemeId,
              orderBy: {
                chat: {
                  name: SortOrder.Asc,
                },
              },
            },
          });
        }
        if (
          prev &&
          prev.chatMessages &&
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          chatId === variables?.where?.chat?.id
        ) {
          const test = prev.chatMessages.find(
            ({ id }) => id === subscriptionData.data.chatMessages[0]?.id
          );
          if (test === undefined) {
            return {
              ...prev,

              chatMessages: [
                {
                  ...subscriptionData.data.chatMessages[0],
                  content: subscriptionData.data.chatMessages[0]?.content || '',
                  createdAt:
                    subscriptionData.data.chatMessages[0]?.createdAt || '',

                  id: subscriptionData.data.chatMessages[0]?.id || '',
                  sent: subscriptionData.data.chatMessages[0]?.sent || false,
                  incidents:
                    subscriptionData.data.chatMessages[0]?.incidents || [],
                  offenders:
                    subscriptionData.data.chatMessages[0]?.offenders || [],
                  images: subscriptionData.data.chatMessages[0]?.images || [],
                  crimeGroups:
                    subscriptionData.data.chatMessages[0]?.crimeGroups || [],
                  currentUser:
                    subscriptionData.data.chatMessages[0]?.from?.id === userId,
                  formattedDateTime:
                    subscriptionData.data.chatMessages[0]?.formattedDateTime ||
                    '',
                  paddingTop:
                    subscriptionData.data.chatMessages[0]?.paddingTop || false,
                  type:
                    subscriptionData.data.chatMessages[0]?.type || 'MESSAGE',
                  showUser:
                    subscriptionData.data.chatMessages[0]?.showUser || false,
                  vehicles:
                    subscriptionData.data.chatMessages[0]?.vehicles || [],
                  from: {
                    fullName:
                      subscriptionData.data.chatMessages[0]?.from?.fullName ||
                      '',
                    businesses:
                      subscriptionData.data.chatMessages[0]?.from?.businesses ||
                      [],
                    firstLetter:
                      subscriptionData.data.chatMessages[0]?.from?.fullName?.charAt(
                        0
                      ) || '',
                    origName:
                      subscriptionData.data.chatMessages[0]?.from?.fullName ||
                      '',
                    origFirstLetter:
                      subscriptionData.data.chatMessages[0]?.from?.fullName?.charAt(
                        0
                      ) || '',
                    id: subscriptionData.data.chatMessages[0]?.from?.id || '',
                  },
                },
                ...prev.chatMessages,
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

  useEffect(() => subscribeToNewMessage(), [chatId, subscribeToNewMessage]);

  const scrolledToTop = async () => {
    if (!loadMore && !fetching) {
      setLoadMore(true);
      setFetching(true);
      await fetchMore({
        variables: {
          skip:
            data?.chatMessages?.filter((chat) => chat?.type !== 'DATE')
              .length || 0,
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
        take: 20,
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

    // update chat list
    const existingChatListData = store.readQuery<
      UserChatsQuery,
      UserChatsQueryVariables
    >({
      query: UserChatsDocument,
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            name: SortOrder.Asc,
          },
        },
      },
    });

    if (
      existingChatListData?.user === null ||
      existingChatListData?.user === undefined
    )
      return;
    const chatIndex = existingChatListData.user.chats
      .map(({ chat }) => chat.id)
      .indexOf(chatId);

    store.writeQuery<UserChatsQuery, UserChatsQueryVariables>({
      query: UserChatsDocument,
      data: {
        user: {
          id: existingChatListData.user.id,
          chats: update(existingChatListData.user.chats, {
            [chatIndex]: {
              chat: {
                messages: {
                  $set: [
                    {
                      content: res.createMessage.content,
                      createdAt: res.createMessage.createdAt,
                      from: {
                        origName: res.createMessage.from?.fullName || '',
                        id: res.createMessage.id || '',
                      },
                      id: res.createMessage.id,
                      images: res.createMessage.images,
                      incidents: res.createMessage.incidents,
                      offenders: res.createMessage.offenders,
                      crimeGroups: res.createMessage.crimeGroups,
                      vehicles: res.createMessage.vehicles,
                    },
                  ],
                },
              },
            },
          }),
        },
        __typename: 'Query',
      },
      variables: {
        where: {
          id: userId,
        },
        scheme: schemeId,
        orderBy: {
          chat: {
            name: SortOrder.Asc,
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
        message: intl.formatMessage({
          id: 'dvDKi/',
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          id: 'ihAHg9',
          defaultMessage: 'The task has been deleted!',
        }),
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
      void deleteMessage({
        variables: {
          id: currentId,
        },
      });
    }
  };
  const deleteMessageConfirm = (currentId: string) => {
    confirm({
      title: intl.formatMessage({
        id: 'Dg5ys8',
        defaultMessage: 'Do you want to delete the task?',
      }),
      content: intl.formatMessage({
        id: 'JDJoIZ',
        defaultMessage: 'This action cannot be undone.',
      }),
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
        message: intl.formatMessage({
          id: 'dvDKi/',
          defaultMessage: 'Successfully Deleted!',
        }),
        description: intl.formatMessage({
          id: 'ihAHg9',
          defaultMessage: 'The task has been deleted!',
        }),
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
      title: intl.formatMessage({
        id: 'XX7iFo',
        defaultMessage: 'Do you want to delete the chat?',
      }),
      content: intl.formatMessage({
        id: 'JDJoIZ',
        defaultMessage: 'This action cannot be undone.',
      }),
      okText: intl.formatMessage({
        id: 'K3r6DQ',
        defaultMessage: 'Delete',
      }),
      onOk() {
        setSaving(true);
        if (chatId)
          void deleteChat({
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
  const toggleShowPicker = () => setShowPicker(!showPicker);

  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const toggleLinkVehicle = () => {
    setLinkVehicle(!linkVehicle);
  };
  const toggleLinkCrimeGroup = () => {
    setLinkCrimeGroup(!linkCrimeGroup);
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!offendersData?.find(({ id }) => id === selectedOffender.id)) {
      setOffendersData([...offendersData, selectedOffender]);
    }
  };
  const updateIncidentList = (selectedIncident: IncidentCardData) => {
    if (selectedIncident) {
      setIncidentsData([...incidentsData, selectedIncident]);
    }
  };
  const updateCrimeGroupList = (selectedCrimeGroup: CrimeGroupData) => {
    if (selectedCrimeGroup) {
      setCrimeGroupsData([...crimeGroupsData, selectedCrimeGroup]);
    }
  };
  const updateVehicleList = (selectedVehicle: VehicleData) => {
    if (!vehiclesData?.find(({ id }) => id === selectedVehicle.id)) {
      setVehiclesData([...vehiclesData, selectedVehicle]);
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
  const removeCrimeGroup = (crimeGroupId: string | undefined) => {
    if (crimeGroupId) {
      setCrimeGroupsData(
        crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== crimeGroupId)
      );
    }
  };
  const removeVehicle = (vehicleId: string | undefined) => {
    if (vehicleId) {
      setVehiclesData(
        vehiclesData?.filter((vehicle) => vehicle.id !== vehicleId)
      );
    }
  };
  const removeImage = (uid: string) => {
    setFileList(fileList.filter((image) => image.uid !== uid));
  };

  const beforeUpload = (file: RcFile) => {
    const isFileDuplicate = fileList.find((item) => item.name === file.name);
    if (isFileDuplicate) {
      void message.error(
        intl.formatMessage({
          defaultMessage:
            'This image already exists, please choose another one.',
          id: 'ILB9M+',
        })
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          url: info.file.response[0].url,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          fileName: info.file.response[0].blobName,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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
        reader.addEventListener('load', () => resolve(reader.result as string));
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const onClear = () => {
    setMessageSent(true);
    setSaving(false);
    form.resetFields();
    setInputStr('');
    setFileList([]);
    setIncidentsData([]);
    setOffendersData([]);
    setVehiclesData([]);
    setCrimeGroupsData([]);
    setMentionedUser([]);
  };
  const [sendMessage] = useCreateMessageMutation({
    onCompleted: () => {
      onClear();
    },
    onError: () => {
      errorNotification();
      setSaving(false);
    },
    update: updateData,
  });

  const getText = (text: string) => {
    const mentions = getMentions(text);
    let newText = text;

    // eslint-disable-next-line no-restricted-syntax
    for (const mention of mentions) {
      const mentioned = membersData?.find(
        (member) => mention.value === member.origName
      );
      if (mentioned)
        newText = newText.replace(
          `@${mention.value}`,
          `@[${mentioned.origName}]`
        );
    }

    return newText;
  };
  const onSubmit = async () => {
    if (
      inputStr.length === 0 &&
      fileList.length === 0 &&
      !(incidentsData && incidentsData.length > 0) &&
      offendersData.length === 0 &&
      vehiclesData.length === 0 &&
      crimeGroupsData.length === 0
    ) {
      void message.info(
        intl.formatMessage({
          defaultMessage: 'The message cannot be empty!',
          id: 'wkhZ0u',
        })
      );
    } else {
      setSaving(true);
      void sendMessage({
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
            vehicles: {
              connect:
                vehiclesData && vehiclesData.length > 0
                  ? vehiclesData.map(({ id }) => ({ id }))
                  : undefined,
            },
            crimeGroups: {
              connect:
                crimeGroupsData && crimeGroupsData.length > 0
                  ? crimeGroupsData.map(({ id }) => ({ id }))
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
                      position: ImagePosition.CenterCenter,
                      rotation: 0,
                    }))
                    .filter((obj) => obj.url !== undefined)
                : [],
            incidents:
              incidentsData && incidentsData.length > 0
                ? incidentsData.map((incident) => ({
                    id: incident.id,
                    images:
                      incident.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    reference: incident.reference,
                    subject: incident.subject,
                    description: incident.description || '',
                    dayTime: incident.dayTime,
                  }))
                : [],
            offenders:
              offendersData && offendersData.length > 0
                ? offendersData.map((offender) => ({
                    id: offender.id,
                    images:
                      offender.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    updatedAt: offender.updatedAt || new Date(),
                    age: offender.age,
                    build: offender.build,
                    dateOfBirth: offender.dateOfBirth,
                    gender: offender.gender,
                    name: offender.name,
                    race: offender.race,
                  }))
                : [],
            vehicles:
              incidentsData && vehiclesData.length > 0
                ? vehiclesData.map((vehicle) => ({
                    id: vehicle.id,
                    images:
                      vehicle.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    reference: vehicle.reference,
                    registration: vehicle.registration,
                    colour: vehicle.colour,
                    make: vehicle.make,
                    model: vehicle.model,
                  }))
                : [],
            crimeGroups:
              crimeGroupsData && crimeGroupsData.length > 0
                ? crimeGroupsData.map((crimeGroup) => ({
                    id: crimeGroup.id,
                    reference: crimeGroup.reference,
                    alias: crimeGroup.alias,
                    totalOffenders: crimeGroup.totalOffenders,
                  }))
                : [],
            sent: false,
            type: MessageItemType.Message,
            currentUser: true,
            formattedDateTime: moment().format('HH:mm'),
            from: {
              fullName: userOrigName,
              id: userId,
              firstLetter: userOrigName.slice(1)[0],
              origName: userOrigName,
              businesses: [
                {
                  id: userBusinesses[0].id,
                  fullName: userBusinesses[0].fullName,
                },
              ],
            },
            paddingTop: true,
            showUser: false,
          },
        },
      });
      setMessageSent(true);
      setSaving(false);
      form.resetFields();
      setInputStr('');
      setFileList([]);
      setIncidentsData([]);
      setOffendersData([]);
      setVehiclesData([]);
      setCrimeGroupsData([]);
      setMentionedUser([]);
    }
  };

  return {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    data,
    loading,
    chatData,
    form,
    saving,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPreview,
    beforeUpload,
    fileList,
    offendersData,
    incidentsData,
    crimeGroupsData,
    vehiclesData,
    linkIncident,
    linkOffender,
    linkVehicle,
    linkCrimeGroup,
    toggleLinkIncident,
    toggleLinkOffender,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    removeOffender,
    removeIncident,
    removeImage,
    removeCrimeGroup,
    removeVehicle,
    mentionedUser,
    setMentionedUser,
    deleteImageConfirm: () => {},
    deleteIncidentConfirm: () => {},
    deleteOffenderConfirm: () => {},
    messageSent,
    setMessageSent,
    totalChats: chatData?.chat?.totalMessages || 0,
    restrictIncidentAccess,
  };
};

export default useViewMessages;
