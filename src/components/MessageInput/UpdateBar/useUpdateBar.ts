/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type { FormInstance } from 'antd';
import { Form, message } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import Upload from 'antd/lib/upload';
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import type {
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
  VehicleQuery,
  VehicleQueryVariables,
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/generated';
import {
  CrimeGroupDocument,
  Role,
  SortOrder,
  TodoType,
  UpdateIcon,
  UpdateType,
  useCreateUpdateOnCrimeGroupMutation,
  useCreateUpdateOnIncidentMutation,
  useCreateUpdateOnInvestigationMutation,
  useCreateUpdateOnOffenderMutation,
  useCreateUpdateOnVehicleMutation,
  useListSchemeUsersQuery,
  useSubscribeToCrimeGroupMutation,
  useSubscribeToIncidentMutation,
  useSubscribeToInvestigationMutation,
  useSubscribeToOffenderMutation,
  useSubscribeToVehicleMutation,
  useUpdateTodoMentionMutation,
  VehicleDocument,
  ViewIncidentDocument,
  ViewInvestigationDocument,
  ViewOffenderDocument,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreState } from 'state';
import update from 'immutability-helper';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  OffenderData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import { appendDuplicates, getText } from 'utils/getMentions/get-mention-text';

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
  removeArticle: (value: string | undefined) => void;
  schemeUsers: SchemeUserData[] | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleShowUpdatePicker: () => void;
  toggleLinkVehicle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkArticle: () => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidents: IncidentCardData[];
  updateInput: string;
  updateIncidentList: (value: IncidentCardData) => void;
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateArticleList: (value: ArticleData) => void;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  linkCrimeGroup: boolean;
  linkArticle: boolean;
  updateOffenders: OffenderData[];
  crimeGroupsData: CrimeGroupData[];
  vehiclesData: VehicleData[];
  articlesData: ArticleData[];
  saving: boolean;
  adminRights: boolean;
  handleMarkAsRead: () => void;
  hideIncident: boolean;
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

  const { restrictIncidentAccess, id: schemeId } = useStoreState(
    (state) => state.scheme
  );
  const {
    role: userRole,
    id: userId,
    groups: userGroups,
  } = useStoreState((state) => state.user);
  const groupsId = userGroups.map((group) => group.id);
  const [saving, setSaving] = useState(false);
  const [showUpdatePicker, setShowUpdatePicker] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [linkArticle, setLinkArticle] = useState(false);

  const [updateInput, setUpdateInput] = useState('');
  const [schemeUsers, setSchemeUsers] = useState<SchemeUserData[] | undefined>(
    []
  );
  const [mentionedUser, setMentionedUser] = useState<
    { id: string; value: string }[]
  >([]);
  const [updateFileList, setUpdateFileList] = useState<UploadFile[]>([]);
  const [updateIncidents, setUpdateIncidents] = useState<IncidentCardData[]>(
    []
  );
  const [updateOffenders, setUpdateOffenders] = useState<OffenderData[]>([]);
  const [crimeGroupsData, setCrimeGroupsData] = useState<CrimeGroupData[]>([]);
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);
  const [articlesData, setArticlesData] = useState<ArticleData[]>([]);

  useEffect(() => {
    if (setOptionRowShow)
      if (
        (updateFileList && updateFileList.length > 0) ||
        (updateOffenders && updateOffenders.length > 0) ||
        (updateIncidents && updateIncidents.length > 0) ||
        (vehiclesData && vehiclesData.length > 0) ||
        (crimeGroupsData && crimeGroupsData.length > 0) ||
        (articlesData && articlesData.length > 0)
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
    articlesData,
    setOptionRowShow,
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
        OR: [Role.User, Role.ContentAdmin, Role.GroupAdmin].includes(userRole)
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
        fullName: SortOrder.Asc,
      },
      schemesWhere: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    onCompleted: (res) => {
      if (res.users) {
        setSchemeUsers(
          appendDuplicates(
            res.users.map((user) => ({
              fullName: user.origName,
              oldFullName: user.origName,
              id: user.id,
              businesses: user.businesses,
              firstLetter: user.firstLetter,
            }))
          )
        );
      }
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
    setArticlesData([]);
  };
  const [createIncidentUpdate] = useCreateUpdateOnIncidentMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const [createOffenderUpdate] = useCreateUpdateOnOffenderMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const [createVehicleUpdate] = useCreateUpdateOnVehicleMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const [createCrimeGroupUpdate] = useCreateUpdateOnCrimeGroupMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const [createInvestigationUpdate] = useCreateUpdateOnInvestigationMutation({
    onCompleted: () => {},
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const intl = useIntl();
  const beforeUpdateImageUpload = (value: RcFile) => {
    const isFileDuplicate = updateFileList.find(
      (item) => item.name === value.name
    );
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
  const onSubmitUpdate = () => {
    if (
      updateInput.length === 0 &&
      updateFileList.length === 0 &&
      updateOffenders.length === 0 &&
      updateIncidents?.length === 0 &&
      vehiclesData.length === 0 &&
      crimeGroupsData.length === 0 &&
      articlesData.length === 0
    ) {
      void message.info(
        intl.formatMessage({
          defaultMessage: 'The message cannot be empty!',
          id: 'wkhZ0u',
        })
      );
    } else {
      if (!subscribed) {
        if (crimeGroupId) {
          void subscribeToCrimeGroup({
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
          void subscribeToVehicle({
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
          void subscribeToInvestigation({
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
          void subscribeToIncident({
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
          void subscribeToOffender({
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
        if (articlesData.length > 0) return UpdateType.LinkedArticle;
        return UpdateType.Text;
      };
      // const newResponse = {
      //   // __typename: 'Update',
      //   createdAt: new Date(),
      //   id: `optimistic-${new Date().toISOString()}`,
      //   createdBy: {
      //     fullName,
      //     origName: fullName,
      //     id: userId,
      //     businesses,
      //     // __typename: 'User',
      //   },
      //   images:
      //     updateFileList.length > 0
      //       ? updateFileList.map((image) => ({
      //           id: image.uid,
      //           // __typename: 'Image',
      //           card: image.url,
      //           optimised: image.url,
      //           url: image.url,
      //           position: ImagePosition.CenterCenter,
      //           rotation: 0,
      //         }))
      //       : [],
      //   replies: [],
      //   type: getUpdateType(),
      //   text: getText(updateInput, schemeUsers),
      //   linkedIncidents:
      //     updateIncidents && updateIncidents.length > 0
      //       ? updateIncidents.map((incident) => ({
      //           id: incident.id,
      //           images:
      //             incident.images?.map((image) => ({
      //               ...image,
      //               position: ImagePosition.CenterCenter,
      //               rotation: 0,
      //             })) || [],
      //           reference: incident.reference,
      //           subject: incident.subject,
      //           description: incident.description || '',
      //           dayTime: incident.dayTime || '',
      //           totalValue: incident.totalValue || 0,
      //           totalRecoveredValue: incident.totalRecoveredValue || 0,
      //         }))
      //       : [],
      //   linkedOffenders:
      //     updateOffenders && updateOffenders.length > 0
      //       ? updateOffenders.map((offender) => ({
      //           id: offender.id,
      //           images:
      //             offender.images?.map((image) => ({
      //               ...image,
      //               position: ImagePosition.CenterCenter,
      //               rotation: 0,
      //             })) || [],
      //           updatedAt: offender.updatedAt || new Date(),
      //           age: offender.age,
      //           build: offender.build,
      //           dateOfBirth: offender.dateOfBirth,
      //           gender: offender.gender,
      //           name: offender.name,
      //           race: offender.race,
      //         }))
      //       : [],
      //   linkedVehicles:
      //     vehiclesData && vehiclesData.length > 0
      //       ? vehiclesData.map((vehicle) => ({
      //           id: vehicle.id,
      //           images:
      //             vehicle.images?.map((image) => ({
      //               ...image,
      //               position: ImagePosition.CenterCenter,
      //               rotation: 0,
      //             })) || [],
      //           reference: vehicle.reference,
      //           registration: vehicle.registration,
      //           colour: vehicle.colour,
      //           make: vehicle.make,
      //           model: vehicle.model,
      //         }))
      //       : [],
      //   linkedCrimeGroups:
      //     crimeGroupsData && crimeGroupsData.length > 0
      //       ? crimeGroupsData.map((crimeGroup) => ({
      //           id: crimeGroup.id,
      //           reference: crimeGroup.reference,
      //           alias: crimeGroup.alias,
      //           totalOffenders: crimeGroup.totalOffenders || 0,
      //           totalIncidents: crimeGroup.totalIncidents || 0,
      //           totalRecoveredValue: crimeGroup.totalRecoveredValue || 0,
      //           totalTheftSuccess: crimeGroup.totalTheftSuccess || 0,
      //           totalValue: crimeGroup.totalValue || 0,
      //         }))
      //       : [],
      //   linkedArticles:
      //     articlesData && articlesData.length > 0
      //       ? articlesData.map((article) => ({
      //           id: article.id,
      //           images:
      //             article.images?.map((image) => ({
      //               ...image,
      //               position: ImagePosition.CenterCenter,
      //               rotation: 0,
      //             })) || [],
      //           title: article.title,
      //           updatedAt: article.updatedAt || new Date(),
      //           watermarkImage: article.watermarkImage || false,
      //           previewText: article.previewText,
      //           priority: article.priority,
      //           createdBy: {
      //             id: article.createdBy?.id || '',
      //             fullName: article.createdBy?.fullName || '',
      //           },
      //         }))
      //       : [],
      // };

      const data = {
        icon: UpdateIcon.Comment,
        type: getUpdateType(),
        text: getText(updateInput, schemeUsers),
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
          vehiclesData && vehiclesData.length > 0
            ? vehiclesData.map(({ id }) => ({ id }))
            : undefined,
        linkedCrimeGroups:
          crimeGroupsData && crimeGroupsData.length > 0
            ? crimeGroupsData.map(({ id }) => ({ id }))
            : undefined,
        linkedArticles:
          articlesData && articlesData.length > 0
            ? articlesData.map(({ id }) => ({ id }))
            : undefined,
        mentionedUsers:
          mentionedUser.length > 0
            ? mentionedUser.map(({ id }) => ({ id }))
            : undefined,
      };

      if (incidentId) {
        void createIncidentUpdate({
          variables: {
            data,
            incident: {
              id: incidentId,
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
                                .indexOf(replyTo?.id)]: {
                                replies: {
                                  $push: [
                                    {
                                      ...result.data.createUpdateOnIncident,
                                      linkedIncidents:
                                        result.data.createUpdateOnIncident.linkedIncidents?.map(
                                          (inc) => ({
                                            ...inc,
                                            totalValue: 0,
                                            totalRecoveredValue: 0,
                                          })
                                        ),
                                    },
                                  ],
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
        void createOffenderUpdate({
          variables: {
            data,
            offender: {
              id: offenderId,
            },
          },
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createUpdateOnOffender: newResponse,
          // },
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
                  banWhere: {
                    groups:
                      userRole === Role.User ||
                      userRole === Role.ContentAdmin ||
                      userRole === Role.GroupAdmin
                        ? { some: { id: { in: groupsId } } }
                        : undefined,
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
                      banWhere: {
                        groups:
                          userRole === Role.User ||
                          userRole === Role.ContentAdmin ||
                          userRole === Role.GroupAdmin
                            ? { some: { id: { in: groupsId } } }
                            : undefined,
                      },
                    },
                    data: {
                      offender: {
                        ...oldData.offender,
                        // TODO check types
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore,
                        updates: replyTo
                          ? update(oldData.offender.updates, {
                              [oldData.offender.updates
                                .map((item) => item.id)
                                .indexOf(replyTo.id)]: {
                                replies: {
                                  $push: [
                                    {
                                      ...result.data.createUpdateOnOffender,
                                      linkedIncidents:
                                        result.data.createUpdateOnOffender.linkedIncidents?.map(
                                          (inc) => ({
                                            ...inc,
                                            totalValue: 0,
                                            totalRecoveredValue: 0,
                                          })
                                        ),
                                    },
                                  ],
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
        void createInvestigationUpdate({
          variables: {
            data,
            investigation: {
              id: investigationId,
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
                      // TODO check types
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      updates: replyTo
                        ? update(oldData.investigation.updates, {
                            [oldData.investigation.updates
                              .map((item) => item.id)
                              .indexOf(replyTo.id)]: {
                              replies: {
                                $push: [
                                  {
                                    ...result.data.createUpdateOnInvestigation,
                                    linkedIncidents:
                                      result.data.createUpdateOnInvestigation.linkedIncidents?.map(
                                        (inc) => ({
                                          ...inc,
                                          totalValue: 0,
                                          totalRecoveredValue: 0,
                                        })
                                      ),
                                  },
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
        void createCrimeGroupUpdate({
          variables: {
            data,
            crimeGroup: {
              id: crimeGroupId,
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
                                $push: [
                                  {
                                    ...result.data.createUpdateOnCrimeGroup,
                                    linkedIncidents:
                                      result.data.createUpdateOnCrimeGroup.linkedIncidents?.map(
                                        (inc) => ({
                                          ...inc,
                                          totalValue: 0,
                                          totalRecoveredValue: 0,
                                        })
                                      ),
                                  },
                                ],
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
        void createVehicleUpdate({
          variables: {
            data,
            vehicle: {
              id: vehicleId,
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

              if (oldData?.vehicle) {
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
                                $push: [
                                  {
                                    ...result.data.createUpdateOnVehicle,
                                    linkedIncidents:
                                      result.data.createUpdateOnVehicle.linkedIncidents?.map(
                                        (inc) => ({
                                          ...inc,
                                          totalValue: 0,
                                          totalRecoveredValue: 0,
                                        })
                                      ),
                                  },
                                ],
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
        reader.addEventListener('load', () => resolve(reader.result as string));
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
  const removeArticle = (value: string | undefined) => {
    if (value) {
      setArticlesData(articlesData?.filter((article) => article.id !== value));
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
  const toggleLinkArticle = () => {
    setLinkArticle(!linkArticle);
  };
  const toggleShowUpdatePicker = () => {
    setShowUpdatePicker(!showUpdatePicker);
  };
  const updateIncidentList = (selectedIncident: IncidentCardData) => {
    if (selectedIncident) {
      setUpdateIncidents([...updateIncidents, selectedIncident]);
    }
  };
  // const updateIncidentList = (selectedIncidentId: string) => {
  //   if (
  //     listIncidentsData?.listIncidents?.incidents &&
  //     listIncidentsData?.listIncidents?.total > 0
  //   ) {
  //     if (updateIncidents && updateIncidents.length > 0) {
  //       setUpdateIncidents([
  //         ...updateIncidents,
  //         // eslint-disable-next-line no-unsafe-optional-chaining
  //         ...listIncidentsData?.listIncidents?.incidents.filter(
  //           (incident) => selectedIncidentId === incident.id
  //         ),
  //       ]);
  //     } else {
  //       setUpdateIncidents(
  //         listIncidentsData?.listIncidents?.incidents.filter(
  //           (incident) => selectedIncidentId === incident.id
  //         )
  //       );
  //     }
  //   }
  // };
  const updateOffendersList = (selectedOffender: OffenderData) => {
    if (selectedOffender) {
      setUpdateOffenders([...updateOffenders, selectedOffender]);
    }
  };
  const updateCrimeGroupList = (selectedCrimeGroup: CrimeGroupData) => {
    if (selectedCrimeGroup) {
      setCrimeGroupsData([...updateIncidents, selectedCrimeGroup]);
    }
  };

  const updateVehicleList = (selectedVehicle: VehicleData) => {
    if (selectedVehicle) {
      setVehiclesData([...vehiclesData, selectedVehicle]);
    }
  };
  const updateArticleList = (selectedArticle: ArticleData) => {
    if (selectedArticle) {
      setArticlesData([...articlesData, selectedArticle]);
    }
  };
  const [updateTodoMention] = useUpdateTodoMentionMutation();
  const getWhereArgs = () => {
    if (incidentId) return { incidentId, type: TodoType.IncidentUpdate };
    if (offenderId) return { offenderId, type: TodoType.OffenderUpdate };
    if (vehicleId) return { vehicleId, type: TodoType.VehicleUpdate };
    if (crimeGroupId) return { crimeGroupId, type: TodoType.CrimegroupUpdate };
    if (investigationId)
      return { investigationId, type: TodoType.InvestigationUpdate };
    return { type: TodoType.IncidentUpdate };
  };
  const [updated, setUpdated] = useState(false);
  const handleMarkAsRead = () => {
    if (!updated) {
      void updateTodoMention({
        variables: {
          where: {
            userId,
            ...getWhereArgs(),
          },
        },
      });
      setUpdated(true);
    }
  };

  return {
    beforeUpdateImageUpload,
    onSubmitUpdate,
    onUpdateImageChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onUpdateImagePreview,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    removeCrimeGroup,
    removeVehicle,
    removeArticle,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleShowUpdatePicker,
    toggleLinkVehicle,
    toggleLinkCrimeGroup,
    toggleLinkArticle,
    updateFileList,
    updateForm,
    updateIncidents,
    updateInput,
    updateIncidentList,
    updateOffendersList,
    updateVehicleList,
    updateCrimeGroupList,
    updateArticleList,
    linkIncident,
    linkOffender,
    linkVehicle,
    linkCrimeGroup,
    linkArticle,
    updateOffenders,
    crimeGroupsData,
    vehiclesData,
    articlesData,
    saving,
    adminRights: userRole !== Role.User,
    handleMarkAsRead,
    hideIncident: userRole === Role.User && restrictIncidentAccess,
  };
};

export default useUpdateBar;
