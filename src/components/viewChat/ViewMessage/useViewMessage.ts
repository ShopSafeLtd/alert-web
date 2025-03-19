import type { MutationUpdaterFn } from '@apollo/client';
import type { FormInstance } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { DeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';
import type {
  ChatQuery,
  ChatQueryVariables,
} from 'graphql/chat/queries/__generated__/chat.generated';
import type { CreateMessageMutation } from 'graphql/messages/mutations/__generated__/create_message.generated';
import type { DeleteMessageMutation } from 'graphql/messages/mutations/__generated__/delete_message.generated';
import type {
  ChatMessagesQuery,
  ChatMessagesQueryVariables,
} from 'graphql/messages/queries/__generated__/chat-messages.generated';
import type { Age, Build, Gender, Race } from 'graphql/types';
import type {
  UserChatsQuery,
  UserChatsQueryVariables,
} from 'graphql/userChat/queries/__generated__/user_chats.generated';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';

import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { useApolloClient } from '@apollo/client';
import { Form, Modal, Upload, message, notification } from 'antd';
import { useDeleteChatMutation } from 'graphql/chat/mutation/__generated__/delete_chat.generated';
import {
  ChatDocument,
  useChatQuery,
} from 'graphql/chat/queries/__generated__/chat.generated';
import { useCreateMessageMutation } from 'graphql/messages/mutations/__generated__/create_message.generated';
import { useDeleteMessageMutation } from 'graphql/messages/mutations/__generated__/delete_message.generated';
import {
  ChatMessagesDocument,
  useChatMessagesQuery,
} from 'graphql/messages/queries/__generated__/chat-messages.generated';
import { MessagesSubscriptionDocument } from 'graphql/messages/subscriptions/__generated__/new_message.generated';
import {
  ImagePosition,
  MessageItemType,
  PermissionMethod,
  PermissionModel,
  SortOrder,
} from 'graphql/types';
import { UserChatsDocument } from 'graphql/userChat/queries/__generated__/user_chats.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import { appendDuplicates, getText } from 'utils/getMentions/get-mention-text';

const { confirm } = Modal;
const { useForm } = Form;

interface Props {
  chatId: string;
  updateUserChatList: MutationUpdaterFn<DeleteChatMutation>;
}

export interface OffenderData {
  age?: Age | null;
  approved?: boolean | null;
  build?: Build | null;
  dateOfBirth?: Date | null;
  dateSource?: null | string;
  gender?: Gender | null;
  groups?:
    | {
        id: string;
        name: string;
      }[]
    | undefined;
  hair?: null | string;
  id: string;
  imageUid?: string[] | undefined;
  images?: {
    fileName?: null | string;
    id: string;
    new?: boolean;
    optimised?: null | string;
    type?: null | string;
    url?: null | string;
  }[];
  name?: null | string;
  peculiarities?: null | string;
  race?: Race | null;
  updatedAt?: Date;
}

interface Return {
  adminRights: boolean;
  articlesData: ArticleData[];
  beforeUpload: (value: RcFile) => void;
  chatData: ChatQuery | undefined;
  crimeGroupsData: CrimeGroupData[];
  data: ChatMessagesQuery | undefined;
  deleteChatConfirm: () => void;
  deleteImageConfirm: (messageId: string, imageId: string) => void;
  deleteIncidentConfirm: (messageId: string, incidentId: string) => void;
  deleteMessageConfirm: (value: string) => void;
  deleteOffenderConfirm: (messageId: string, offenderId: string) => void;
  fileList: UploadFile[];
  form: FormInstance<FormData>;
  imgChange: UploadProps['onChange'];
  incidentsData: IncidentCardData[];
  inputStr: string;
  linkArticle: boolean;
  linkCrimeGroup: boolean;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  loading: boolean;
  manageChat: boolean;
  membersData: SchemeUserData[] | undefined;
  mentionedUser: { id: string; value: string }[];
  messageSent: boolean;
  offendersData: OffenderData[];
  onPreview: (value: UploadFile) => void;
  onSubmit: () => void;
  removeArticle: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeImage: (uid: string) => void;
  removeIncident: (value: string | undefined) => void;
  removeOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  restrictIncidentAccess: boolean;
  saving: boolean;
  scrolledToTop: () => void;
  setInputStr: (value: string) => void;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setMessageSent: (value: boolean) => void;
  showPicker: boolean;
  toggleLinkArticle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkIncident: () => void;
  toggleLinkOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleManageChat: () => void;
  toggleShowPicker: () => void;
  totalChats: number;
  updateArticleList: (value: ArticleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateIncidentList: (value: IncidentCardData) => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  userId: string | undefined;
  vehiclesData: VehicleData[];
}

const useViewMessages = ({ chatId, updateUserChatList }: Props): Return => {
  const apolloStore = useApolloClient();
  const intl = useIntl();
  const {
    businesses: userBusinesses,
    id: userId,
    origName: userOrigName,
  } = useStoreState((state) => state.user);
  const restrictIncidentAccess =
    useStoreState((state) => state.scheme.restrictIncidentAccess) &&
    hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Incidents,
      },
    });

  const schemeId = useAtomValue(currentSchemeIdAtom);
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [form] = useForm<FormData>();
  const [after, setAfter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [messageSent, setMessageSent] = useState(true);
  const [fetching, setFetching] = useState(true);
  const [manageChat, setManageChat] = useState(false);
  const [membersData, setMembersData] = useState<SchemeUserData[] | undefined>(
    []
  );
  const [inputStr, setInputStr] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [imageChange, setImageChange] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [linkArticle, setLinkArticle] = useState(false);
  const [offendersData, setOffendersData] = useState<OffenderData[]>([]);
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);

  const [incidentsData, setIncidentsData] = useState<IncidentCardData[]>([]);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);

  useEffect(() => {
    setLoading(true);
  }, [chatId]);

  const { data, fetchMore, subscribeToMore } = useChatMessagesQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setLoadMore(false);
      setLoading(false);
      setFetching(false);
      setAfter(after + 20);
    },
    skip: !chatId,
    variables: {
      skip: 0,
      take: 20,
      where: {
        chat: {
          id: chatId,
        },
      },
    },
  });

  const { data: chatData } = useChatQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ chat }) => {
      if (chat?.members && chat.members.length > 0) {
        setMembersData(
          appendDuplicates(
            chat.members
              .map((userChat) => userChat.user)
              .map((user) => ({
                businesses: user.businesses,
                firstLetter: user.firstLetter,
                fullName: user.origName,
                id: user.id,
                oldFullName: user.origName,
              }))
          )
          // chat.members
          //   .map((userChat) => userChat.user)
          //   .map((member, i, arr) => {
          //     const arrBeforeMember = arr
          //       .slice(0, i)
          //       .map(({ origName }) => origName);
          //     if (arrBeforeMember.includes(member.origName)) {
          //       const { length } = arrBeforeMember.filter(
          //         (item) => item === member.origName
          //       );
          //       return {
          //         ...member,
          //         origName: `${member.origName.replace(' ', '_')}_${length}`,
          //       };
          //     }
          //     return {
          //       ...member,
          //       origName: member.origName.replace(' ', '_'),
          //     };
          //   })
        );
      }
    },
    variables: {
      where: {
        id: chatId,
      },
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const subscribeToNewMessage = () => {
    subscribeToMore({
      document: MessagesSubscriptionDocument,
      updateQuery: (prev, { subscriptionData, variables }) => {
        const existingChatListData = apolloStore.readQuery<
          UserChatsQuery,
          UserChatsQueryVariables
        >({
          query: UserChatsDocument,
          variables: {
            orderBy: {
              chat: {
                updatedAt: SortOrder.Desc,
              },
            },
            scheme: schemeId,
            where: {
              id: userId,
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
            data: {
              chat: {
                ...existingChat?.chat,
                totalMessages: (existingChat?.chat?.totalMessages || 0) + 1,
              },
            },
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

        const newMessage = subscriptionData.data.chatMessages[0];
        if (newMessage && existingChatListData?.user) {
          const chatIndex = existingChatListData.user.chats
            .map(({ chat }) => chat.id)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            .indexOf((variables?.where?.chat?.id as string) || chatId);

          apolloStore.writeQuery<UserChatsQuery, UserChatsQueryVariables>({
            data: {
              __typename: 'Query',
              user: {
                chats: update(existingChatListData.user.chats, {
                  [chatIndex]: {
                    chat: {
                      messages: {
                        $set: [
                          {
                            articles: newMessage.articles,
                            content: newMessage.content,
                            createdAt: newMessage?.createdAt,
                            crimeGroups: newMessage.crimeGroups,
                            from: {
                              id: newMessage.id || '',
                              origName: newMessage.from?.fullName || '',
                            },
                            id: newMessage.id,
                            images: newMessage.images,
                            incidents: newMessage.incidents,
                            offenders: newMessage.offenders,
                            vehicles: newMessage.vehicles,
                          },
                        ],
                      },
                    },
                  },
                }),
                id: existingChatListData.user.id,
                totalChats: existingChatListData.user.totalChats,
              },
            },
            query: UserChatsDocument,
            variables: {
              orderBy: {
                chat: {
                  name: SortOrder.Asc,
                },
              },
              scheme: schemeId,
              where: {
                id: userId,
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
                  articles:
                    subscriptionData.data.chatMessages[0]?.articles || [],
                  content: subscriptionData.data.chatMessages[0]?.content || '',

                  createdAt:
                    subscriptionData.data.chatMessages[0]?.createdAt || '',
                  crimeGroups:
                    subscriptionData.data.chatMessages[0]?.crimeGroups || [],
                  currentUser:
                    subscriptionData.data.chatMessages[0]?.from?.id === userId,
                  formattedDateTime:
                    subscriptionData.data.chatMessages[0]?.formattedDateTime ||
                    '',
                  from: {
                    businesses:
                      subscriptionData.data.chatMessages[0]?.from?.businesses ||
                      [],
                    firstLetter:
                      subscriptionData.data.chatMessages[0]?.from?.fullName?.charAt(
                        0
                      ) || '',
                    fullName:
                      subscriptionData.data.chatMessages[0]?.from?.fullName ||
                      '',
                    id: subscriptionData.data.chatMessages[0]?.from?.id || '',
                    origFirstLetter:
                      subscriptionData.data.chatMessages[0]?.from?.fullName?.charAt(
                        0
                      ) || '',
                    origName:
                      subscriptionData.data.chatMessages[0]?.from?.fullName ||
                      '',
                  },
                  id: subscriptionData.data.chatMessages[0]?.id || '',
                  images: subscriptionData.data.chatMessages[0]?.images || [],
                  incidents:
                    subscriptionData.data.chatMessages[0]?.incidents || [],
                  offenders:
                    subscriptionData.data.chatMessages[0]?.offenders || [],
                  paddingTop:
                    subscriptionData.data.chatMessages[0]?.paddingTop || false,
                  sent: subscriptionData.data.chatMessages[0]?.sent || false,
                  showUser:
                    subscriptionData.data.chatMessages[0]?.showUser || false,
                  type:
                    subscriptionData.data.chatMessages[0]?.type || 'MESSAGE',
                  vehicles:
                    subscriptionData.data.chatMessages[0]?.vehicles || [],
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
      variables: {
        chat: chatId,
        user: userId,
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
            data?.chatMessages?.filter(
              (chat) => chat?.type !== MessageItemType.Date
            ).length || 0,
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
        skip: 0,
        take: 20,
        where: {
          chat: {
            id: chatId,
          },
        },
      },
    });

    if (existingData === null || existingData === undefined) return;

    store.writeQuery<ChatMessagesQuery, ChatMessagesQueryVariables>({
      data: {
        __typename: 'Query',
        chatMessages: [res.createMessage, ...existingData.chatMessages],
      },
      query: ChatMessagesDocument,
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
        orderBy: {
          chat: {
            name: SortOrder.Asc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
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
      data: {
        __typename: 'Query',
        user: {
          chats: update(existingChatListData.user.chats, {
            [chatIndex]: {
              chat: {
                messages: {
                  $set: [
                    {
                      articles: res.createMessage.articles,
                      content: res.createMessage.content,
                      createdAt: res.createMessage.createdAt,
                      crimeGroups: res.createMessage.crimeGroups,
                      from: {
                        id: res.createMessage.id || '',
                        origName: res.createMessage.from?.fullName || '',
                      },
                      id: res.createMessage.id,
                      images: res.createMessage.images,
                      incidents: res.createMessage.incidents,
                      offenders: res.createMessage.offenders,
                      vehicles: res.createMessage.vehicles,
                    },
                  ],
                },
              },
            },
          }),
          id: existingChatListData.user.id,
          totalChats: existingChatListData.user.totalChats,
        },
      },
      query: UserChatsDocument,
      variables: {
        orderBy: {
          chat: {
            name: SortOrder.Asc,
          },
        },
        scheme: schemeId,
        where: {
          id: userId,
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
      data: {
        __typename: 'Query',
        chatMessages: existingData.chatMessages.filter(
          (el) => el.id !== res?.deleteMessage?.id
        ),
      },
      query: ChatMessagesDocument,
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
        description: intl.formatMessage({
          defaultMessage: 'The task has been deleted!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        openDelete(currentId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the task?',
      }),
    });
  };

  const [deleteChat] = useDeleteChatMutation({
    onCompleted: () => {
      setSaving(false);
      navigate('/app/chat');
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The task has been deleted!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      okText: intl.formatMessage({
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
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete the chat?',
      }),
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
  const toggleLinkArticle = () => {
    setLinkArticle(!linkArticle);
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
  const updateArticleList = (selectedArticle: ArticleData) => {
    if (!articlesData?.find(({ id }) => id === selectedArticle.id)) {
      setArticlesData([...articlesData, selectedArticle]);
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
  const removeArticle = (articleId: string | undefined) => {
    if (articleId) {
      setArticlesData(
        articlesData?.filter((article) => article.id !== articleId)
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
        })
      );
    }
    return !isFileDuplicate || Upload.LIST_IGNORE;
  };

  const imgChange: UploadProps['onChange'] = (info) => {
    setSaving(true);
    if (info.file.response) {
      setFileList([
        ...fileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          fileName: info.file.response[0].blobName,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          type: info.file.response[0].mimetype,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          url: info.file.response[0].url,
        },
      ]);
      setImageChange(true);
    } else {
      setFileList(info.fileList);
      setImageChange(true);
    }
    setSaving(false);
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
    setArticlesData([]);
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

  const onSubmit = () => {
    if (
      inputStr.length === 0 &&
      fileList.length === 0 &&
      !(incidentsData && incidentsData.length > 0) &&
      offendersData.length === 0 &&
      vehiclesData.length === 0 &&
      crimeGroupsData.length === 0 &&
      articlesData.length === 0
    ) {
      void message.info(
        intl.formatMessage({
          defaultMessage: 'The message cannot be empty!',
        })
      );
    } else {
      setSaving(true);
      void sendMessage({
        optimisticResponse: {
          __typename: 'Mutation',
          createMessage: {
            articles:
              articlesData && articlesData.length > 0
                ? articlesData.map((article) => ({
                    createdBy: {
                      fullName: article.createdBy?.fullName || '',
                      id: article.createdBy?.id || '',
                    },
                    id: article.id,
                    images:
                      article.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    previewText: article.previewText,
                    priority: article.priority,
                    title: article.title,
                    updatedAt: article.updatedAt || new Date(),
                    watermarkImage: article.watermarkImage || false,
                  }))
                : [],
            content: getText(inputStr, membersData),
            createdAt: new Date(),
            crimeGroups:
              crimeGroupsData && crimeGroupsData.length > 0
                ? crimeGroupsData.map((crimeGroup) => ({
                    alias: crimeGroup.alias,
                    id: crimeGroup.id,
                    reference: crimeGroup.reference,
                    totalIncidents: crimeGroup.totalIncidents || 0,
                    totalOffenders: crimeGroup.totalOffenders || 0,
                    totalRecoveredValue: crimeGroup.totalRecoveredValue || 0,
                    totalTheftSuccess: crimeGroup.totalTheftSuccess || 0,
                    totalValue: crimeGroup.totalValue || 0,
                  }))
                : [],
            currentUser: true,
            formattedDateTime: moment().format('HH:mm'),
            from: {
              businesses: [
                {
                  fullName: userBusinesses[0].fullName,
                  id: userBusinesses[0].id,
                },
              ],
              firstLetter: userOrigName.slice(1)[0],
              fullName: userOrigName,
              id: userId,
              origFirstLetter: userOrigName.slice(1)[0],
              origName: userOrigName,
            },
            id: `${Math.random()}`,
            images:
              imageChange && fileList.length > 0
                ? fileList
                    .map((item) => ({
                      id: item.fileName || '',
                      optimised: item.url || '',
                      position: ImagePosition.CenterCenter,
                      rotation: 0,
                      url: item.url || '',
                    }))
                    .filter((obj) => obj.url !== undefined)
                : [],
            incidents:
              incidentsData && incidentsData.length > 0
                ? incidentsData.map((incident) => ({
                    dayTime: incident.dayTime || '',
                    description: incident.description || '',
                    id: incident.id,
                    images:
                      incident.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    reference: incident.reference,
                    subject: incident.subject ?? '',
                    totalRecoveredValue: incident.totalRecoveredValue || 0,
                    totalValue: incident.totalValue || 0,
                  }))
                : [],
            offenders:
              offendersData && offendersData.length > 0
                ? offendersData.map((offender) => ({
                    age: offender.age,
                    alias: [],
                    build: offender.build,
                    dateOfBirth: offender.dateOfBirth,
                    gender: offender.gender,
                    id: offender.id,
                    idVerified: false,
                    images:
                      offender.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    knownFor: [],
                    name: offender.name,
                    race: offender.race,
                    targetedGoods: [],
                    updatedAt: offender.updatedAt || new Date(),
                  }))
                : [],
            paddingTop: true,
            sent: false,
            showUser: false,
            type: MessageItemType.Message,
            vehicles:
              vehiclesData && vehiclesData.length > 0
                ? vehiclesData.map((vehicle) => ({
                    colour: vehicle.colour,
                    id: vehicle.id,
                    images:
                      vehicle.images?.map((image) => ({
                        ...image,
                        position: ImagePosition.CenterCenter,
                        rotation: 0,
                      })) || [],
                    make: vehicle.make,
                    model: vehicle.model,
                    reference: vehicle.reference,
                    registration: vehicle.registration,
                  }))
                : [],
          },
        },
        variables: {
          data: {
            articles: {
              connect:
                articlesData && articlesData.length > 0
                  ? articlesData.map(({ id }) => ({ id }))
                  : undefined,
            },
            chat: {
              connect: {
                id: chatId,
              },
            },
            content: getText(inputStr, membersData),
            crimeGroups: {
              connect:
                crimeGroupsData && crimeGroupsData.length > 0
                  ? crimeGroupsData.map(({ id }) => ({ id }))
                  : undefined,
            },
            from: {
              connect: {
                id: userId,
              },
            },
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
            mentions: {
              connect:
                mentionedUser && mentionedUser.length > 0
                  ? mentionedUser.map(({ id }) => ({ id }))
                  : undefined,
            },
            offenders: {
              connect:
                offendersData && offendersData.length > 0
                  ? offendersData.map(({ id }) => ({ id }))
                  : undefined,
            },
            scheme: {
              connect: {
                id: schemeId,
              },
            },
            vehicles: {
              connect:
                vehiclesData && vehiclesData.length > 0
                  ? vehiclesData.map(({ id }) => ({ id }))
                  : undefined,
            },
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
      setArticlesData([]);
      setCrimeGroupsData([]);
      setMentionedUser([]);
    }
  };

  return {
    adminRights: hasRolePermission({
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Chat,
      },
    }),
    articlesData,
    beforeUpload,
    chatData,
    crimeGroupsData,
    data,
    deleteChatConfirm,
    deleteImageConfirm: () => {},
    deleteIncidentConfirm: () => {},
    deleteMessageConfirm,
    deleteOffenderConfirm: () => {},
    fileList,
    form,
    imgChange,
    incidentsData,
    inputStr,
    linkArticle,
    linkCrimeGroup,
    linkIncident,
    linkOffender,
    linkVehicle,
    loading,
    manageChat,
    membersData,
    mentionedUser,
    messageSent,
    offendersData,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onPreview,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onSubmit,
    removeArticle,

    removeCrimeGroup,
    removeImage,
    removeIncident,
    removeOffender,
    removeVehicle,

    restrictIncidentAccess,
    saving,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    scrolledToTop,
    setInputStr,
    setMentionedUser,
    setMessageSent,
    showPicker,
    toggleLinkArticle,
    toggleLinkCrimeGroup,
    toggleLinkIncident,
    toggleLinkOffender,
    toggleLinkVehicle,
    toggleManageChat,
    toggleShowPicker,
    totalChats: chatData?.chat?.totalMessages || 0,
    updateArticleList,
    updateCrimeGroupList,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    userId,
    vehiclesData,
  };
};

export default useViewMessages;
