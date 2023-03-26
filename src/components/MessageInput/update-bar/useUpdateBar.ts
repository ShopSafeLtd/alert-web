import { Form, FormInstance, Mentions, message, notification } from 'antd';
import Upload, { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import {
  CrimeGroupDocument,
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
  Role,
  SortOrder,
  UpdateIcon,
  UpdateType,
  useCreateUpdateOnCrimeGroupMutation,
  useCreateUpdateOnIncidentMutation,
  useCreateUpdateOnInvestigationMutation,
  useCreateUpdateOnOffenderMutation,
  useCreateUpdateOnVehicleMutation,
  useListCrimeGroupsQuery,
  useListIncidentsQuery,
  useListSchemeUsersQuery,
  useSubscribeToCrimeGroupMutation,
  useSubscribeToIncidentMutation,
  useSubscribeToInvestigationMutation,
  useSubscribeToOffenderMutation,
  useSubscribeToVehicleMutation,
  VehicleDocument,
  VehicleQuery,
  VehicleQueryVariables,
  ViewIncidentDocument,
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
  ViewInvestigationDocument,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
  ViewOffenderDocument,
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import update from 'immutability-helper';
import {
  CrimeGroupData,
  OffenderData,
  SchemeUserData,
  VehicleData,
  IncidentsData,
} from 'types/DataType';

const { getMentions } = Mentions;

interface Return {
  beforeUpdateImageUpload: (value: RcFile) => void;
  onSubmitUpdate: () => void;
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  removeUpdateImage: (uid: string) => void;
  removeUpdateIncident: (value: string | undefined) => void;
  removeUpdateOffender: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  schemeUsers: SchemeUserData[] | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleShowUpdatePicker: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidents: IncidentsData;
  updateInput: string;
  updateIncidentList: (value: string) => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: string) => void;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  updateOffenders: OffenderData[];
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  saving: boolean;
  adminRights: boolean;
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
  investigationId?: string;
  vehicleId?: string;
  crimeGroupId?: string;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  subscribed: boolean;
  setOptionRowShow?: (value: boolean) => void;
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
  investigationId,
  vehicleId,
  crimeGroupId,
  offenderId,
  setOptionRowShow,
}: Props): Return => {
  const [updateForm] = Form.useForm<FormData>();

  const schemeId = useStoreState((state) => state.scheme.id);
  const userRole = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const fullName = useStoreState((state) => state.user.fullName);
  const businesses = useStoreState((state) => state.user.businesses);
  const userGroups = useStoreState((state) => state.user.groups);

  const [saving, setSaving] = useState(false);
  const [showUpdatePicker, setShowUpdatePicker] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);

  const [updateInput, setUpdateInput] = useState('');
  const [schemeUsers, setSchemeUsers] = useState<SchemeUserData[] | undefined>(
    []
  );
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);
  const [updateFileList, setUpdateFileList] = useState<UploadFile[]>([]);
  const [updateIncidents, setUpdateIncidents] = useState<IncidentsData>();
  const [updateOffenders, setUpdateOffenders] = useState<OffenderData[]>([]);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);

  useEffect(() => {
    if (setOptionRowShow)
      if (
        (updateFileList && updateFileList.length > 0) ||
        (updateOffenders && updateOffenders.length > 0) ||
        (updateIncidents && updateIncidents.length > 0) ||
        (vehiclesData && vehiclesData.length > 0) ||
        (crimeGroupsData && crimeGroupsData.length > 0)
      ) {
        setOptionRowShow(true);
      } else {
        setOptionRowShow(false);
      }
  }, [
    updateFileList,
    updateOffenders,
    updateIncidents,
    vehiclesData,
    crimeGroupsData,
  ]);

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
  const { data: listCrimeGroupsData } = useListCrimeGroupsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: schemeId,
            },
          },
        },
      },
    },
  });
  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [subscribeToOffender] = useSubscribeToOffenderMutation();
  const [subscribeToInvestigation] = useSubscribeToInvestigationMutation();
  const [subscribeToVehicle] = useSubscribeToVehicleMutation();
  const [subscribeToCrimeGroup] = useSubscribeToCrimeGroupMutation();

  const onClear = () => {
    setUpdateInput('');
    setReplyTo(null);
    setSaving(false);

    setUpdateFileList([]);
    setUpdateIncidents([]);
    setUpdateOffenders([]);
    setVehiclesData([]);
    setCrimeGroupsData([]);
  };
  const [createIncidentUpdate] = useCreateUpdateOnIncidentMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const [createOffenderUpdate] = useCreateUpdateOnOffenderMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const [createVehicleUpdate] = useCreateUpdateOnVehicleMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const [createCrimeGroupUpdate] = useCreateUpdateOnCrimeGroupMutation({
    onCompleted: () => {},
    onError: () => {
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });
  const [createInvestigationUpdate] = useCreateUpdateOnInvestigationMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
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
    if (
      !updateInput.length &&
      !updateFileList.length &&
      !updateOffenders.length &&
      !updateIncidents?.length &&
      !vehiclesData.length &&
      !crimeGroupsData.length
    ) {
      message.info('The message cannot be empty!');
    } else {
      if (!subscribed) {
        if (crimeGroupId) {
          subscribeToCrimeGroup({
            variables: {
              where: {
                id: crimeGroupId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToCrimeGroup: {
                id: crimeGroupId,
                __typename: 'CrimeGroup',
                subscribed: true,
              },
            },
          });
        }
        if (vehicleId) {
          subscribeToVehicle({
            variables: {
              where: {
                id: vehicleId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToVehicle: {
                id: vehicleId,
                __typename: 'Vehicle',
                subscribed: true,
              },
            },
          });
        }
        if (investigationId) {
          subscribeToInvestigation({
            variables: {
              where: {
                id: investigationId,
              },
            },
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToInvestigation: {
                id: investigationId,
                __typename: 'Investigation',
                subscribed: true,
              },
            },
          });
        }
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
        if (vehiclesData.length > 0) return UpdateType.LinkedVehicle;
        if (crimeGroupsData.length > 0) return UpdateType.LinkedCrimeGroup;
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
      const data = {
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
        linkedVehicles:
          vehiclesData && vehiclesData.length
            ? vehiclesData.map(({ id }) => ({ id }))
            : undefined,
        linkedCrimeGroups:
          crimeGroupsData && crimeGroupsData.length
            ? crimeGroupsData.map(({ id }) => ({ id }))
            : undefined,
        mentionedUsers:
          mentionedUser.length > 0
            ? mentionedUser.map(({ id }) => ({ id }))
            : undefined,
      };

      if (incidentId) {
        createIncidentUpdate({
          variables: {
            data,
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
              linkedCrimeGroups: [],
              linkedVehicles: [],
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
            data,
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
              linkedCrimeGroups: [],
              linkedVehicles: [],
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
      if (investigationId) {
        createInvestigationUpdate({
          variables: {
            data,
            investigation: {
              id: investigationId,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUpdateOnInvestigation: {
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
              linkedCrimeGroups: [],
              linkedVehicles: [],
            },
          },
          update: (store, result) => {
            if (result.data?.createUpdateOnInvestigation) {
              const oldData = store.readQuery<
                ViewInvestigationQuery,
                ViewInvestigationQueryVariables
              >({
                query: ViewInvestigationDocument,
                variables: {
                  where: {
                    id: investigationId,
                  },
                },
              });

              if (oldData?.investigation)
                store.writeQuery<
                  ViewInvestigationQuery,
                  ViewInvestigationQueryVariables
                >({
                  query: ViewInvestigationDocument,
                  variables: {
                    where: {
                      id: investigationId,
                    },
                  },
                  data: {
                    investigation: {
                      ...oldData.investigation,
                      updates: replyTo
                        ? update(oldData.investigation.updates, {
                            [oldData.investigation.updates
                              .map((item) => item.id)
                              .indexOf(replyTo.id)]: {
                              replies: {
                                $push: [
                                  result.data.createUpdateOnInvestigation,
                                ],
                              },
                            },
                          })
                        : [
                            result.data.createUpdateOnInvestigation,
                            ...oldData.investigation.updates,
                          ],
                    },
                  },
                });
            }
          },
        });
      }
      if (crimeGroupId) {
        createCrimeGroupUpdate({
          variables: {
            data,
            crimeGroup: {
              id: crimeGroupId,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUpdateOnCrimeGroup: {
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
              linkedCrimeGroups: [],
              linkedVehicles: [],
            },
          },
          update: (store, result) => {
            if (result.data?.createUpdateOnCrimeGroup) {
              const oldData = store.readQuery<
                CrimeGroupQuery,
                CrimeGroupQueryVariables
              >({
                query: CrimeGroupDocument,
                variables: {
                  where: {
                    id: crimeGroupId,
                  },
                },
              });

              if (oldData?.crimeGroup)
                store.writeQuery<CrimeGroupQuery, CrimeGroupQueryVariables>({
                  query: CrimeGroupDocument,
                  variables: {
                    where: {
                      id: crimeGroupId,
                    },
                  },
                  data: {
                    crimeGroup: {
                      ...oldData.crimeGroup,
                      updates: replyTo
                        ? update(oldData.crimeGroup.updates, {
                            [oldData.crimeGroup.updates
                              .map((item) => item.id)
                              .indexOf(replyTo.id)]: {
                              replies: {
                                $push: [result.data.createUpdateOnCrimeGroup],
                              },
                            },
                          })
                        : [
                            result.data.createUpdateOnCrimeGroup,
                            ...oldData.crimeGroup.updates,
                          ],
                    },
                  },
                });
            }
          },
        });
      }
      if (vehicleId) {
        createVehicleUpdate({
          variables: {
            data,
            vehicle: {
              id: vehicleId,
            },
          },
          optimisticResponse: {
            __typename: 'Mutation',
            createUpdateOnVehicle: {
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
              linkedCrimeGroups: [],
              linkedVehicles: [],
            },
          },
          update: (store, result) => {
            if (result.data?.createUpdateOnVehicle) {
              const oldData = store.readQuery<
                VehicleQuery,
                VehicleQueryVariables
              >({
                query: VehicleDocument,
                variables: {
                  where: {
                    id: vehicleId,
                  },
                },
              });

              if (oldData?.vehicle)
                store.writeQuery<VehicleQuery, VehicleQueryVariables>({
                  query: VehicleDocument,
                  variables: {
                    where: {
                      id: vehicleId,
                    },
                  },
                  data: {
                    vehicle: {
                      ...oldData.vehicle,
                      updates: replyTo
                        ? update(oldData.vehicle.updates, {
                            [oldData.vehicle.updates
                              .map((item) => item.id)
                              .indexOf(replyTo.id)]: {
                              replies: {
                                $push: [result.data.createUpdateOnVehicle],
                              },
                            },
                          })
                        : [
                            result.data.createUpdateOnVehicle,
                            ...oldData.vehicle.updates,
                          ],
                    },
                  },
                });
            }
          },
        });
      }
      onClear();
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
  const removeCrimeGroup = (value: string | undefined) => {
    if (value) {
      setCrimeGroupsData(
        crimeGroupsData?.filter((crimeGroup) => crimeGroup.id !== value)
      );
    }
  };
  const removeVehicle = (value: string | undefined) => {
    if (value) {
      setVehiclesData(vehiclesData?.filter((vehicle) => vehicle.id !== value));
    }
  };

  const toggleLinkUpdateIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleLinkUpdateOffender = () => {
    setLinkOffender(!linkOffender);
  };
  const toggleLinkVehicle = () => {
    setLinkVehicle(!linkVehicle);
  };
  const toggleLinkCrimeGroup = () => {
    setLinkCrimeGroup(!linkCrimeGroup);
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
  const updateCrimeGroupList = (selectedCrimeGroupId: string) => {
    if (
      listCrimeGroupsData?.listCrimeGroups?.crimeGroups &&
      listCrimeGroupsData.listCrimeGroups.total > 0
    ) {
      const selectedCrimeGroup =
        listCrimeGroupsData?.listCrimeGroups?.crimeGroups.filter(
          ({ id }) => id === selectedCrimeGroupId
        );
      setCrimeGroupsData([...crimeGroupsData, ...selectedCrimeGroup]);
    }
  };
  const updateVehicleList = (selectedVehicle: VehicleData) => {
    if (!vehiclesData?.find(({ id }) => id === selectedVehicle.id)) {
      setVehiclesData([...vehiclesData, selectedVehicle]);
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
    removeCrimeGroup,
    removeVehicle,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    linkOffender,
    linkIncident,
    linkVehicle,
    linkCrimeGroup,
    updateFileList,
    updateIncidents,
    updateInput,
    updateOffenders,
    crimeGroupsData,
    vehiclesData,
    saving,
    adminRights: userRole !== Role.User,
  };
};

export default useUpdateBar;
