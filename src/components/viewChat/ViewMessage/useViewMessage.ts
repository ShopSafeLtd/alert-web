import { useEffect, useState } from 'react';
import type {
  Age,
  Build,
  ChatMessagesQuery,
  ChatMessagesQueryVariables,
  ChatQuery,
  CreateMessageMutation,
  DeleteChatMutation,
  DeleteMessageMutation,
  Gender,
  Race,
  UserChatsQuery,
  UserChatsQueryVariables,
} from 'graphql/generated';
import {
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
}

const useViewMessages = ({ chatId, updateUserChatList }: Props): Return => {
  const apolloStore = useApolloClient();

  const {
    role,
    id: userId,
    origName: userOrigName,
  } = useStoreState((state) => state.user);
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

  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      variables: {
        chat: chatId,
        user: userId,
      },
      updateQuery: (prev, { subscriptionData }) => {
        // update chat list
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
        const newMessage = subscriptionData.data.chatMessages[0];
        if (newMessage && existingChatListData?.user) {
          const chatIndex = existingChatListData.user.chats
            .map(({ chat }) => chat.id)
            .indexOf(chatId);

          apolloStore.writeQuery<UserChatsQuery, UserChatsQueryVariables>({
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
                            content: newMessage.content,
                            createdAt: newMessage.createdAt,
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
      message.error('This image already exists, please choose another one.');
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
          `@[${mentioned.origName}](${mentioned.id})`
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
                      })) || [],
                    reference: incident.reference,
                    subject: incident.subject,
                    description: incident.description,
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
                      })) || [],
                    updatedAt: offender.updatedAt,
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
              // TODO
              businesses: [{ id: '', fullName: '' }],
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
  };
};

export default useViewMessages;
