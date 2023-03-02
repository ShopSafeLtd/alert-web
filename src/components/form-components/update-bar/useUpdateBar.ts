import { Form, FormInstance, Mentions, message, notification } from 'antd';
import Upload, { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import {
  Age,
  Build,
  Gender,
  ListIncidentsQuery,
  Race,
  Role,
  SortOrder,
  UpdateIcon,
  UpdateType,
  useCreateUpdateOnIncidentMutation,
  useCreateUpdateOnOffenderMutation,
  useListIncidentsQuery,
  useListSchemeUsersQuery,
  useSubscribeToIncidentMutation,
  useSubscribeToOffenderMutation,
  ViewIncidentDocument,
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
  ViewOffenderDocument,
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/generated';
import { useState } from 'react';
import { useStoreState } from 'state';
import update from 'immutability-helper';

const { getMentions } = Mentions;

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

interface SchemeUserData {
  id: string;
  fullName: string;
  businesses: { id: string; name: string }[];
  firstLetter?: string | null;
  oldFullName: string;
}

interface Return {
  beforeUpdateImageUpload: (value: RcFile) => void;
  onSubmitUpdate: () => void;
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  removeUpdateImage: (uid: string) => void;
  removeUpdateIncident: (value: string | undefined) => void;
  removeUpdateOffender: (value: string | undefined) => void;
  schemeUsers: SchemeUserData[] | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleShowUpdatePicker: () => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidents:
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined;
  updateInput: string;
  updateIncidentList: (value: string) => void;
  updateOffendersList: (value: OffenderData) => void;
  linkIncident: boolean;
  linkOffender: boolean;
  updateOffenders: OffenderData[];
}

interface Props {
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  incidentId?: string;
  offenderId?: string;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  subscribed: boolean;
}

const appendDuplicates = (arr: SchemeUserData[]) => {
  // to store number of instances for each type
  const counts: { [key: string]: number } = {};
  const fullNames: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    const elem = arr[i];

    if (counts[elem.fullName] === undefined) {
      fullNames.push(`[${elem.id}]${elem.fullName}`);
      counts[elem.fullName] = 0;
    } else {
      fullNames.push(
        `[${elem.id}]${elem.fullName}_${(counts[elem.fullName] += 1)}`
      );
      counts[elem.fullName] += 1;
    }
  }

  return arr.map((item) => ({
    ...item,
    fullName:
      fullNames
        .find((name) => name.split('[')[1].split(']')[0] === item.id)
        ?.split(']')[1]
        .replace(' ', '_') || '',
  }));
};

const useUpdateBar = ({
  replyTo,
  incidentId,
  setReplyTo,
  subscribed,
  offenderId,
}: Props): Return => {
  const [updateForm] = Form.useForm<FormData>();

  const schemeId = useStoreState((state) => state.scheme.id);
  const userRole = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const fullName = useStoreState((state) => state.user.fullName);
  const businesses = useStoreState((state) => state.user.businesses);
  const userGroups = useStoreState((state) => state.user.groups);

  const [showUpdatePicker, setShowUpdatePicker] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [schemeUsers, setSchemeUsers] = useState<SchemeUserData[] | undefined>(
    []
  );
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);
  const [updateFileList, setUpdateFileList] = useState<UploadFile[]>([]);
  const [updateIncidents, setUpdateIncidents] = useState<
    | Exclude<
        ListIncidentsQuery['listIncidents'],
        undefined | null
      >['incidents']
    | undefined
  >();
  const [updateOffenders, setUpdateOffenders] = useState<OffenderData[]>([]);

  useListSchemeUsersQuery({
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
        OR: [Role.User, Role.ContentAdmin].includes(userRole)
          ? [
              {
                groups: {
                  some: {
                    id: {
                      in: userGroups.map(({ id }) => id),
                    },
                  },
                },
                schemes: {
                  some: {
                    role: {
                      in: [Role.SchemeAdmin, Role.ShopsafeAdmin],
                    },
                    scheme: {
                      id: {
                        equals: schemeId,
                      },
                    },
                  },
                },
              },
            ]
          : undefined,
      },
      orderBy: {
        fullName: SortOrder.Desc,
      },
    },
    onCompleted: (res) => {
      if (res.users) {
        setSchemeUsers(
          appendDuplicates(
            res.users.map((user) => ({
              fullName: user.fullName,
              oldFullName: user.fullName,
              id: user.id,
              businesses: user.businesses,
              firstLetter: user.firstLetter,
            }))
          )
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

  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [subscribeToOffender] = useSubscribeToOffenderMutation();
  const [createIncidentUpdate] = useCreateUpdateOnIncidentMutation({
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const [createOffenderUpdate] = useCreateUpdateOnOffenderMutation({
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const beforeUpdateImageUpload = (value: RcFile) => {
    const isFileDuplicate = updateFileList.find(
      (item) => item.name === value.name
    );
    if (isFileDuplicate) {
      message.error(
        'This image has already existed, please choose another one.'
      );
    }
    return !isFileDuplicate || Upload.LIST_IGNORE;
  };
  const onSubmitUpdate = () => {
    if (updateInput) {
      setUpdateInput('');
      setReplyTo(null);
      setUpdateFileList([]);
      setUpdateIncidents([]);
      setUpdateOffenders([]);

      if (!subscribed) {
        if (incidentId) {
          subscribeToIncident({
            variables: {
              where: {
                id: incidentId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToIncident: {
                id: incidentId,
                __typename: 'Incident',
                subscribed: true,
              },
            },
          });
        }
        if (offenderId) {
          subscribeToOffender({
            variables: {
              where: {
                id: offenderId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToOffender: {
                id: offenderId,
                __typename: 'Offender',
                subscribed: true,
              },
            },
          });
        }
      }

      const getUpdateType = () => {
        if (updateFileList.length > 0) return UpdateType.Image;
        if (updateIncidents && updateIncidents.length > 0)
          return UpdateType.LinkedIncident;
        if (updateOffenders.length > 0) return UpdateType.LinkedOffender;
        return UpdateType.Text;
      };

      const getText = (text: string) => {
        const mentions = getMentions(text);
        let newText = text;

        for (let i = 0; i < mentions.length; i++) {
          const mention = mentions[i];

          const mentioned = schemeUsers?.find(
            (member) => mention.value === member.fullName
          );
          if (mentioned)
            newText = newText.replace(
              `@${mention.value}`,
              `@[${mentioned.oldFullName}](${mentioned.id})`
            );
        }

        return newText;
      };

      if (incidentId) {
        createIncidentUpdate({
          variables: {
            data: {
              icon: UpdateIcon.Comment,
              type: getUpdateType(),
              text: getText(updateInput),
              replyTo: replyTo
                ? {
                    id: replyTo.id,
                  }
                : undefined,
              images:
                updateFileList.length > 0
                  ? updateFileList.map((image) => ({
                      filename: image.fileName || '',
                      mimetype: image.type || '',
                      url: image.url || '',
                    }))
                  : undefined,
              linkedOffenders:
                updateOffenders.length > 0
                  ? updateOffenders.map(({ id }) => ({ id }))
                  : undefined,
              linkedIncidents:
                updateIncidents && updateIncidents.length > 0
                  ? updateIncidents.map(({ id }) => ({ id }))
                  : undefined,
              mentionedUsers:
                mentionedUser.length > 0
                  ? mentionedUser.map(({ id }) => ({ id }))
                  : undefined,
            },
            incident: {
              id: incidentId,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUpdateOnIncident: {
              createdAt: new Date(),
              createdBy: {
                fullName,
                id: userId,
                businesses,
                __typename: 'User',
              },
              id: `optimistic-${new Date().toISOString()}`,
              images:
                updateFileList.length > 0
                  ? updateFileList.map((image) => ({
                      id: image.uid,
                      __typename: 'Image',
                      card: image.url,
                      optimised: image.url,
                      url: image.url,
                    }))
                  : [],
              replies: [],
              type: getUpdateType(),
              __typename: 'Update',
              text: getText(updateInput),
              linkedIncidents: [],
              linkedOffenders: [],
            },
          },
          update: (store, result) => {
            if (result.data?.createUpdateOnIncident) {
              const oldData = store.readQuery<
                ViewIncidentQuery,
                ViewIncidentQueryVariables
              >({
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
                  },
                },
              });

              if (oldData?.incident)
                store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>(
                  {
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                    data: {
                      incident: {
                        ...oldData.incident,
                        updates: replyTo
                          ? update(oldData.incident.updates, {
                              [oldData.incident.updates
                                .map((item) => item.id)
                                .indexOf(replyTo.id)]: {
                                replies: {
                                  $push: [result.data.createUpdateOnIncident],
                                },
                              },
                            })
                          : [
                              result.data.createUpdateOnIncident,
                              ...oldData.incident.updates,
                            ],
                      },
                    },
                  }
                );
            }
          },
        });
      }
      if (offenderId) {
        createOffenderUpdate({
          variables: {
            data: {
              icon: UpdateIcon.Comment,
              type: getUpdateType(),
              text: getText(updateInput),
              replyTo: replyTo
                ? {
                    id: replyTo.id,
                  }
                : undefined,
              images:
                updateFileList.length > 0
                  ? updateFileList.map((image) => ({
                      filename: image.fileName || '',
                      mimetype: image.type || '',
                      url: image.url || '',
                    }))
                  : undefined,
              linkedOffenders:
                updateOffenders.length > 0
                  ? updateOffenders.map(({ id }) => ({ id }))
                  : undefined,
              linkedIncidents:
                updateIncidents && updateIncidents.length > 0
                  ? updateIncidents.map(({ id }) => ({ id }))
                  : undefined,
              mentionedUsers:
                mentionedUser.length > 0
                  ? mentionedUser.map(({ id }) => ({ id }))
                  : undefined,
            },
            offender: {
              id: offenderId,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUpdateOnOffender: {
              createdAt: new Date(),
              createdBy: {
                fullName,
                id: userId,
                businesses,
                __typename: 'User',
              },
              id: `optimistic-${new Date().toISOString()}`,
              images:
                updateFileList.length > 0
                  ? updateFileList.map((image) => ({
                      id: image.uid,
                      __typename: 'Image',
                      card: image.url,
                      optimised: image.url,
                      url: image.url,
                    }))
                  : [],
              replies: [],
              type: getUpdateType(),
              __typename: 'Update',
              text: getText(updateInput),
              linkedIncidents: [],
              linkedOffenders: [],
            },
          },
          update: (store, result) => {
            if (result.data?.createUpdateOnOffender) {
              const oldData = store.readQuery<
                ViewOffenderQuery,
                ViewOffenderQueryVariables
              >({
                query: ViewOffenderDocument,
                variables: {
                  where: {
                    id: offenderId,
                  },
                },
              });

              if (oldData?.offender)
                store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(
                  {
                    query: ViewOffenderDocument,
                    variables: {
                      where: {
                        id: offenderId,
                      },
                    },
                    data: {
                      offender: {
                        ...oldData.offender,
                        updates: replyTo
                          ? update(oldData.offender.updates, {
                              [oldData.offender.updates
                                .map((item) => item.id)
                                .indexOf(replyTo.id)]: {
                                replies: {
                                  $push: [result.data.createUpdateOnOffender],
                                },
                              },
                            })
                          : [
                              result.data.createUpdateOnOffender,
                              ...oldData.offender.updates,
                            ],
                      },
                    },
                  }
                );
            }
          },
        });
      }
    }
  };
  const onUpdateImageChange: UploadProps['onChange'] = (info) => {
    if (info.file.response) {
      setUpdateFileList([
        ...updateFileList.filter((item) => item.uid !== info.file.uid),
        {
          ...info.file,
          url: info.file.response[0].url,
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
        },
      ]);
    } else {
      setUpdateFileList(info.fileList);
    }
  };
  const onUpdateImagePreview = async (value: UploadFile) => {
    let src = value.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(value.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const removeUpdateImage = (uid: string) => {
    setUpdateFileList(updateFileList.filter((image) => image.uid !== uid));
  };
  const removeUpdateIncident = (value: string | undefined) => {
    if (value) {
      setUpdateIncidents(
        updateIncidents?.filter((incident) => incident.id !== value)
      );
    }
  };
  const removeUpdateOffender = (value: string | undefined) => {
    if (value) {
      setUpdateOffenders(
        updateOffenders?.filter((offender) => offender.id !== value)
      );
    }
  };
  const toggleLinkUpdateIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkUpdateOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const toggleShowUpdatePicker = () => {
    setShowUpdatePicker(!showUpdatePicker);
  };
  const updateIncidentList = (selectedIncidentId: string) => {
    if (
      listIncidentsData?.listIncidents?.incidents &&
      listIncidentsData?.listIncidents?.total > 0
    ) {
      if (updateIncidents && updateIncidents.length > 0) {
        setUpdateIncidents(
          updateIncidents.concat(
            listIncidentsData?.listIncidents?.incidents.filter(
              (incident) => selectedIncidentId === incident.id
            )
          )
        );
      } else {
        setUpdateIncidents(
          listIncidentsData?.listIncidents?.incidents.filter(
            (incident) => selectedIncidentId === incident.id
          )
        );
      }
    }
  };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (!updateOffenders?.find(({ id }) => id === selectedOffender.id)) {
      setUpdateOffenders([...updateOffenders, selectedOffender]);
    }
  };

  return {
    updateForm,
    beforeUpdateImageUpload,
    onSubmitUpdate,
    onUpdateImageChange,
    onUpdateImagePreview,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    updateFileList,
    updateIncidents,
    updateInput,
    updateIncidentList,
    updateOffendersList,
    linkOffender,
    linkIncident,
    updateOffenders,
  };
};

export default useUpdateBar;
