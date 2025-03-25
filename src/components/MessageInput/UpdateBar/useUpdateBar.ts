/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import type {
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import type { FormInstance } from 'antd';
import type { RcFile } from 'antd/lib/upload';
import type { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import type {
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import type {
  ViewInvestigationQuery,
  ViewInvestigationQueryVariables,
} from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import type {
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type {
  VehicleQuery,
  VehicleQueryVariables,
} from 'graphql/vehicles/queries/__generated__/view-vehicle.generated';
import type {
  ArticleData,
  CrimeGroupData,
  IncidentCardData,
  OffenderData,
  SchemeUserData,
  VehicleData,
} from 'types/DataType';

import { useMentionableUsersQuery } from '#/components/MessageInput/UpdateBar/graphql/queries/__generated__/users-to-mention.generated';
import { useGroupsContext } from '#/context/groups-context';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import { ViewIncidentDocument } from '#/views/incidents/ViewIncident/__generated__/view-incident.generated';
import { Form, message } from 'antd';
import Upload from 'antd/lib/upload';
import { useSubscribeToCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/subscribe-to-crime-group.generated';
import { CrimeGroupDocument } from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import { useSubscribeToIncidentMutation } from 'graphql/incidents/mutations/__generated__/subscribe-to-incident.generated';
import { useSubscribeToInvestigationMutation } from 'graphql/investigations/mutations/__generated__/subscribe-to-investigation.generated';
import { ViewInvestigationDocument } from 'graphql/investigations/queries/__generated__/view-investigation.generated';
import { useCreateUpdateOnCrimeGroupMutation } from 'graphql/mutations/__generated__/create-update-on-crime-group.generated';
import { useCreateUpdateOnIncidentMutation } from 'graphql/mutations/__generated__/create-update-on-incident.generated';
import { useCreateUpdateOnInvestigationMutation } from 'graphql/mutations/__generated__/create-update-on-investigation.generated';
import { useCreateUpdateOnOffenderMutation } from 'graphql/mutations/__generated__/create-update-on-offender.generated';
import { useCreateUpdateOnVehicleMutation } from 'graphql/mutations/__generated__/create-update-on-vehicle.generated';
import { useSubscribeToOffenderMutation } from 'graphql/offenders/mutations/__generated__/subscribe-to-offender.generated';
import { ViewOffenderDocument } from 'graphql/offenders/queries/__generated__/view-offender.generated';
import { useUpdateTodoMentionMutation } from 'graphql/todos/mutations/__generated__/update_todo_mention.generated';
import {
  PermissionMethod,
  PermissionModel,
  TodoType,
  UpdateIcon,
  UpdateType,
} from 'graphql/types';
import { useSubscribeToVehicleMutation } from 'graphql/vehicles/mutations/__generated__/subscribe-to-vehicle.generated';
import { VehicleDocument } from 'graphql/vehicles/queries/__generated__/view-vehicle.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';
import { getText } from 'utils/getMentions/get-mention-text';

interface Return {
  articlesData: ArticleData[];
  beforeUpdateImageUpload: (value: RcFile) => void;
  crimeGroupsData: CrimeGroupData[];
  handleMarkAsRead: () => void;
  hideIncident: boolean;
  linkArticle: boolean;
  linkCrimeGroup: boolean;
  linkIncident: boolean;
  linkOffender: boolean;
  linkVehicle: boolean;
  onSubmitUpdate: () => void;
  onUpdateImageChange: UploadProps['onChange'];
  onUpdateImagePreview: (value: UploadFile) => void;
  removeArticle: (value: string | undefined) => void;
  removeCrimeGroup: (value: string | undefined) => void;
  removeUpdateImage: (uid: string) => void;
  removeUpdateIncident: (value: string | undefined) => void;
  removeUpdateOffender: (value: string | undefined) => void;
  removeVehicle: (value: string | undefined) => void;
  saving: boolean;
  schemeUsers: Map<string, SchemeUserData> | undefined;
  setMentionedUser: (value: { id: string; value: string }[]) => void;
  setUpdateInput: (value: string) => void;
  showUpdatePicker: boolean;
  toggleLinkArticle: () => void;
  toggleLinkCrimeGroup: () => void;
  toggleLinkUpdateIncident: () => void;
  toggleLinkUpdateOffender: () => void;
  toggleLinkVehicle: () => void;
  toggleShowUpdatePicker: () => void;
  updateArticleList: (value: ArticleData) => void;
  updateCrimeGroupList: (value: CrimeGroupData) => void;
  updateFileList: UploadFile[];
  updateForm: FormInstance<FormData>;
  updateIncidentList: (value: IncidentCardData) => void;
  updateIncidents: IncidentCardData[];
  updateInput: string;
  updateOffenders: OffenderData[];
  updateOffendersList: (value: OffenderData) => void;
  updateVehicleList: (value: VehicleData) => void;
  vehiclesData: VehicleData[];
}

interface Props {
  crimeGroupId?: string;
  incidentId?: string;
  investigationId?: string;
  offenderId?: string;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  setOptionRowShow?: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  subscribed: boolean;
  vehicleId?: string;
}

const useUpdateBar = ({
  crimeGroupId,
  incidentId,
  investigationId,
  offenderId,
  replyTo,
  setOptionRowShow,
  setReplyTo,
  subscribed,
  vehicleId,
}: Props): Return => {
  const [updateForm] = Form.useForm<FormData>();
  const [formTouched, setFormTouched] = useState(false);
  const currentUser = useAtomValue(currentUserAtom);
  const { groups } = useGroupsContext();
  const groupsId = groups.map((group) => group.value);
  const [saving, setSaving] = useState(false);
  const [showUpdatePicker, setShowUpdatePicker] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [linkVehicle, setLinkVehicle] = useState(false);
  const [linkCrimeGroup, setLinkCrimeGroup] = useState(false);
  const [linkArticle, setLinkArticle] = useState(false);

  const [updateInput, setUpdateInput] = useState('');

  const [schemeUsers, setSchemeUsers] = useState(
    new Map<string, SchemeUserData>()
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

  const { data: mentionableUsersData } = useMentionableUsersQuery({
    fetchPolicy: 'cache-first',
    skip: !formTouched,
  });

  useEffect(() => {
    if (mentionableUsersData?.mentionableUsers) {
      const updatedSchemeUsers = new Map<string, SchemeUserData>();
      // eslint-disable-next-line no-restricted-syntax
      for (const user of mentionableUsersData.mentionableUsers) {
        updatedSchemeUsers.set(user.fullName, {
          businessesName: user.businessesName,
          firstLetter: user.firstLetter, // You might want to include this as well.
          fullName: user.fullName,
          // Here, I suggest using user.id as the key instead of user.fullName for uniqueness.
          id: user.id,
          oldFullName: user.oldFullName,
        });
      }
      setSchemeUsers(updatedSchemeUsers); // Update the state with the updated map.
    }
  }, [mentionableUsersData]); // Ensuring useEffect is called when mentionableUsersData changes.

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
        })
      );
    } else {
      if (!subscribed) {
        if (crimeGroupId) {
          void subscribeToCrimeGroup({
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToCrimeGroup: {
                __typename: 'CrimeGroup',
                id: crimeGroupId,
                subscribed: true,
              },
            },
            variables: {
              where: {
                id: crimeGroupId,
              },
            },
          });
        }
        if (vehicleId) {
          void subscribeToVehicle({
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToVehicle: {
                __typename: 'Vehicle',
                id: vehicleId,
                subscribed: true,
              },
            },
            variables: {
              where: {
                id: vehicleId,
              },
            },
          });
        }
        if (investigationId) {
          void subscribeToInvestigation({
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToInvestigation: {
                __typename: 'Investigation',
                id: investigationId,
                subscribed: true,
              },
            },
            variables: {
              where: {
                id: investigationId,
              },
            },
          });
        }
        if (incidentId) {
          void subscribeToIncident({
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToIncident: {
                __typename: 'Incident',
                id: incidentId,
                subscribed: true,
              },
            },
            variables: {
              where: {
                id: incidentId,
              },
            },
          });
        }
        if (offenderId) {
          void subscribeToOffender({
            optimisticResponse: {
              __typename: 'Mutation',
              subscribeToOffender: {
                __typename: 'Offender',
                id: offenderId,
                subscribed: true,
              },
            },
            variables: {
              where: {
                id: offenderId,
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
        images:
          updateFileList.length > 0
            ? updateFileList.map((image) => ({
                filename: image.fileName || '',
                mimetype: image.type || '',
                url: image.url || '',
              }))
            : undefined,
        linkedArticles:
          articlesData && articlesData.length > 0
            ? articlesData.map(({ id }) => ({ id }))
            : undefined,
        linkedCrimeGroups:
          crimeGroupsData && crimeGroupsData.length > 0
            ? crimeGroupsData.map(({ id }) => ({ id }))
            : undefined,
        linkedIncidents:
          updateIncidents && updateIncidents.length > 0
            ? updateIncidents.map(({ id }) => ({ id }))
            : undefined,
        linkedOffenders:
          updateOffenders.length > 0
            ? updateOffenders.map(({ id }) => ({ id }))
            : undefined,
        linkedVehicles:
          vehiclesData && vehiclesData.length > 0
            ? vehiclesData.map(({ id }) => ({ id }))
            : undefined,
        mentionedUsers:
          mentionedUser.length > 0
            ? mentionedUser.map(({ id }) => ({ id }))
            : undefined,
        replyTo: replyTo
          ? {
              id: replyTo.id,
            }
          : undefined,
        text: getText(updateInput, schemeUsers),
        type: getUpdateType(),
      };

      if (incidentId) {
        void createIncidentUpdate({
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
                                            totalRecoveredValue: 0,
                                            totalValue: 0,
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
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                  }
                );
            }
          },

          variables: {
            data,
            incident: {
              id: incidentId,
            },
          },
        });
      }
      if (offenderId) {
        void createOffenderUpdate({
          // },
          update: (store, result) => {
            if (result.data?.createUpdateOnOffender) {
              const oldData = store.readQuery<
                ViewOffenderQuery,
                ViewOffenderQueryVariables
              >({
                query: ViewOffenderDocument,
                variables: {
                  banWhere: {
                    groups: { some: { id: { in: groupsId } } },
                  },
                  where: {
                    id: offenderId,
                  },
                },
              });

              if (oldData?.offender)
                store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(
                  {
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
                                            totalRecoveredValue: 0,
                                            totalValue: 0,
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
                    query: ViewOffenderDocument,
                    variables: {
                      banWhere: {
                        groups: { some: { id: { in: groupsId } } },
                      },
                      where: {
                        id: offenderId,
                      },
                    },
                  }
                );
            }
          },
          // optimisticResponse: {
          //   __typename: 'Mutation',
          //   createUpdateOnOffender: newResponse,
          variables: {
            data,
            offender: {
              id: offenderId,
            },
          },
        });
      }
      if (investigationId) {
        void createInvestigationUpdate({
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
                                          totalRecoveredValue: 0,
                                          totalValue: 0,
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
                  query: ViewInvestigationDocument,
                  variables: {
                    where: {
                      id: investigationId,
                    },
                  },
                });
            }
          },

          variables: {
            data,
            investigation: {
              id: investigationId,
            },
          },
        });
      }
      if (crimeGroupId) {
        void createCrimeGroupUpdate({
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
                                          totalRecoveredValue: 0,
                                          totalValue: 0,
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
                  query: CrimeGroupDocument,
                  variables: {
                    where: {
                      id: crimeGroupId,
                    },
                  },
                });
            }
          },

          variables: {
            crimeGroup: {
              id: crimeGroupId,
            },
            data,
          },
        });
      }
      if (vehicleId) {
        void createVehicleUpdate({
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
                                          totalRecoveredValue: 0,
                                          totalValue: 0,
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
                  query: VehicleDocument,
                  variables: {
                    where: {
                      id: vehicleId,
                    },
                  },
                });
              }
            }
          },

          variables: {
            data,
            vehicle: {
              id: vehicleId,
            },
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
          fileName: info.file.response[0].blobName,
          type: info.file.response[0].mimetype,
          url: info.file.response[0].url,
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
  const [updateTodoMention] = useUpdateTodoMentionMutation({
    ignoreResults: true,
  });
  const getWhereArgs = () => {
    if (incidentId) return { incidentId, type: TodoType.IncidentUpdate };
    if (offenderId) return { offenderId, type: TodoType.OffenderUpdate };
    if (vehicleId) return { type: TodoType.VehicleUpdate, vehicleId };
    if (crimeGroupId) return { crimeGroupId, type: TodoType.CrimegroupUpdate };
    if (investigationId)
      return { investigationId, type: TodoType.InvestigationUpdate };
    return { type: TodoType.IncidentUpdate };
  };
  const [updated, setUpdated] = useState(false);
  const handleMarkAsRead = () => {
    if (!formTouched) {
      setFormTouched(true);
    }
    if (!updated) {
      void updateTodoMention({
        variables: {
          where: {
            userId: currentUser?.id ?? '',
            ...getWhereArgs(),
          },
        },
      });
      setUpdated(true);
    }
  };

  return {
    articlesData,
    beforeUpdateImageUpload,
    crimeGroupsData,
    handleMarkAsRead,
    hideIncident: hasRolePermission({
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Incidents,
      },
    }),
    linkArticle,
    linkCrimeGroup,
    linkIncident,
    linkOffender,
    linkVehicle,
    onSubmitUpdate,
    onUpdateImageChange,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onUpdateImagePreview,
    removeArticle,
    removeCrimeGroup,
    removeUpdateImage,
    removeUpdateIncident,
    removeUpdateOffender,
    removeVehicle,
    saving,
    schemeUsers,
    setMentionedUser,
    setUpdateInput,
    showUpdatePicker,
    toggleLinkArticle,
    toggleLinkCrimeGroup,
    toggleLinkUpdateIncident,
    toggleLinkUpdateOffender,
    toggleLinkVehicle,
    toggleShowUpdatePicker,
    updateArticleList,
    updateCrimeGroupList,
    updateFileList,
    updateForm,
    updateIncidentList,
    updateIncidents,
    updateInput,
    updateOffenders,
    updateOffendersList,
    updateVehicleList,
    vehiclesData,
  };
};

export default useUpdateBar;
