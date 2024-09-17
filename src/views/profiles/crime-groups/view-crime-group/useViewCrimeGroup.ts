import type { OffenderSearchDetailsFragment } from '#/components/form-components/offender/AddExistingOffender/graphql/queries/__generated__/search-offender.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type {
  SuggestedCrimeGroupMembersQuery,
  SuggestedCrimeGroupMembersQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/suggested-memebrs.generated';
import type {
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
} from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/__generated__/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { VehicleCreateWithoutCrimeGroupInput } from 'graphql/types';
import type { VehicleData } from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from '#/types/enums/profile-update-type';
import successNotification from '#/types/mutation_notifications/success_notification';
import hasPermission from '#/utils/has-permission';
import { Modal, notification } from 'antd';
import { useDeleteCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/delete_crime_group.generated';
import { useSubscribeToCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/subscribe-to-crime-group.generated';
import { useUnsubscribeToCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/unsubscribe-from-crime-group.generated';
import { useUpdateCrimeGroupMutation } from 'graphql/crime-groups/mutations/__generated__/update_crime_group.generated';
import {
  SuggestedCrimeGroupMembersDocument,
  useSuggestedCrimeGroupMembersQuery,
} from 'graphql/crime-groups/queries/__generated__/suggested-memebrs.generated';
import {
  CrimeGroupDocument,
  useCrimeGroupQuery,
} from 'graphql/crime-groups/queries/__generated__/view-crime-group.generated';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/__generated__/update-update.generated';
import { PermissionMethod, PermissionModel, TagType } from 'graphql/types';
import update from 'immutability-helper';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

const { confirm } = Modal;
interface Return {
  addAlias: boolean;
  addDocument: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addInvestigation: boolean;
  addNewVehicle: boolean;
  addOffender: boolean;
  confirmDeleteUpdate: (updateId: string) => void;
  data: CrimeGroupQuery | undefined;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  handleAddSuggestion: (id: string) => void;
  handleEditUpdate: () => void;
  loadMore: boolean;
  loading: boolean;
  offenderIds: string[];
  onCompletedAddOffender: () => void;
  onDeleteCrimeGroup: () => void;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setEditUpdateInput: (value: string) => void;
  setOptionRowShow: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  showIntel: boolean;
  submitNewVehicle: (value: VehicleData) => void;
  submitOffender: (value: OffenderSearchDetailsFragment[]) => void;
  submitVehicle: (value: string) => void;
  // submitNewOffender: (value: OffenderData) => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
  toggleAddAlias: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddInvestigation: () => void;
  toggleAddNewVehicle: () => void;
  toggleAddOffender: () => void;
  toggleShowIntel: () => void;
  toggleSubscribe: () => void;
  toggleViewSuggested: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
  vehicleIds: string[];
  viewSuggestedOpen: boolean;
}
const onCompletedAddOffender = () => {
  successNotification(
    ProfileUpdatedModel.Offender,
    ProfileUpdatedModel.Crime_Group,
    ProfileUpdatedType.added
  );
};
const useViewCrimeGroup = (crimeGroupId: string): Return => {
  const intl = useIntl();
  const { id: userId, schemes } = useStoreState((state) => state.user);
  const schemeId = useStoreState((state) => state.scheme.id);
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === schemeId),
    [schemes, schemeId]
  );
  const permissions = currentScheme?.permissions;
  const [saving, setSaving] = useState(false);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [offenderIds, setOffenderIds] = useState<string[]>([]);
  const [addNewVehicle, setAddNewVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [vehicleIds, setVehicleIds] = useState<string[]>([]);
  const [addAlias, setAddAlias] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [viewSuggestedOpen, setViewSuggestedOpen] = useState(false);
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [addDocument, setAddDocument] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [showIntel, setShowIntel] = useState(false);
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [replyTo, setReplyTo] = useState<{
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null>(null);
  const { groups } = useGroupsContext();
  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);
  const variables = {
    where: {
      id: crimeGroupId,
    },
  };
  const { data: crimeGroupsData, loading } = useCrimeGroupQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ crimeGroup }) => {
      if (crimeGroup?.offenders && crimeGroup.offenders.length > 0) {
        setOffenderIds(crimeGroup.offenders.map(({ id }) => id));
      }
      if (crimeGroup?.vehicles && crimeGroup.vehicles.length > 0) {
        setVehicleIds(crimeGroup.vehicles.map(({ id }) => id));
      }
    },
    variables,
  });

  const { data: suggestedData } = useSuggestedCrimeGroupMembersQuery({
    variables: {
      associatedCrimeGroup: {
        id: crimeGroupId,
      },
      crimeTypesWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
      },
      where: {
        id: crimeGroupId,
      },
    },
  });

  // function
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
  };
  const toggleAddNewVehicle = () => {
    setAddNewVehicle(!addNewVehicle);
  };

  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddAlias = () => {
    setAddAlias(!addAlias);
  };
  const [updateCrimeGroup] = useUpdateCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The crime group has been updated!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  // const submitNewOffender = (data: OffenderData) => {
  //   setSaving(true);
  //   void updateCrimeGroup({
  //     variables: {
  //       where: {
  //         id: crimeGroupId,
  //       },
  //       data: {
  //         offenders: {
  //           create: [
  //             {
  //               name: data.name,
  //               gender: data.gender || null,
  //               race: data.race || null,
  //               build: data.build || null,
  //               height: data.height || null,
  //               hair: data.hair || null,
  //               peculiarities: data.peculiarities || null,
  //               comment: data.comment || null,
  //               age: data.age || null,
  //               dateSource: data.dateSource || null,
  //               dateOfBirth: data.dateOfBirth || null,
  //               createdBy: { connect: { id: userId } },
  //               scheme: { connect: { id: schemeId } },
  //               groups: {
  //                 connect:
  //                   crimeGroupsData?.crimeGroup?.groups.map(({ id }) => ({
  //                     id,
  //                   })) || [],
  //               },
  //               images: {
  //                 upload:
  //                   data.images && data.images.length > 0
  //                     ? data.images.map((item) => ({
  //                         url: {
  //                           filename: item.fileName || '',
  //                           mimetype: item.type || '',
  //                           url: item.url || '',
  //                         },
  //                         position: item.position,
  //                         primary: item.primary,
  //                         policeImage: item.policeImage,
  //                         rotation: item.rotation || 0,
  //                       }))
  //                     : undefined,
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   });
  // };
  const submitOffender = (values: OffenderSearchDetailsFragment[]) => {
    setSaving(true);
    if (values) {
      void updateCrimeGroup({
        variables: {
          data: {
            offenders: {
              connect: values.map((value) => ({ id: value.id })),
            },
          },
          where: {
            id: crimeGroupId,
          },
        },
      });
    }
  };
  const submitVehicle = (value: string) => {
    setSaving(true);
    if (value) {
      void updateCrimeGroup({
        variables: {
          data: {
            vehicles: {
              connect: [{ id: value }],
            },
          },
          where: {
            id: crimeGroupId,
          },
        },
      });
      toggleAddNewVehicle();
    }
  };
  const submitNewVehicle = (data: VehicleData) => {
    setSaving(true);
    const getCustomGalleries =
      (): VehicleCreateWithoutCrimeGroupInput['customGalleries'] => {
        if (data.customGalleries) {
          const connectedCustomGalleries = data.customGalleries.filter(
            (id) =>
              !data.newCustomGalleriesData?.map((el) => el.id).includes(id)
          );
          return {
            connect:
              connectedCustomGalleries && connectedCustomGalleries.length > 0
                ? connectedCustomGalleries.map((id) => ({ id }))
                : undefined,
            create:
              data.newCustomGalleriesData &&
              data.newCustomGalleriesData.length > 0
                ? data.newCustomGalleriesData.map((value) => ({
                    description: value.description || '',
                    groups: {
                      connect:
                        crimeGroupsData?.crimeGroup?.groups &&
                        crimeGroupsData?.crimeGroup?.groups.length > 0
                          ? crimeGroupsData?.crimeGroup?.groups.map(
                              ({ id }) => ({
                                id,
                              })
                            )
                          : groups.map(({ value: id }) => ({ id })),
                    },
                    name: value.name,
                    schemes: { connect: [{ id: schemeId }] },
                  }))
                : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
        };
      };
    void updateCrimeGroup({
      variables: {
        data: {
          vehicles: {
            create: [
              {
                colour: data.colour || '',
                customGalleries: getCustomGalleries(),
                groups: {
                  connect:
                    crimeGroupsData?.crimeGroup?.groups &&
                    crimeGroupsData?.crimeGroup?.groups.length > 0
                      ? crimeGroupsData?.crimeGroup?.groups.map(({ id }) => ({
                          id,
                        }))
                      : groups.map(({ value: id }) => ({ id })),
                },
                incidents: {
                  connect:
                    data.incidents && data.incidents.length > 0
                      ? data.incidents.map((id) => ({ id }))
                      : undefined,
                },
                make: data.make || '',
                model: data.model || '',
                offenders: {
                  connect:
                    data.offenders && data.offenders.length > 0
                      ? data.offenders.map((id) => ({ id }))
                      : undefined,
                },
                registration: data.registration || '',
                schemes: { connect: [{ id: schemeId }] },
                // ???
                // images: {
                //   create:
                //     data.images && data.images.length > 0
                //       ? data.images.map((item) => ({
                //           url: {
                //             filename: item.fileName || '',
                //             mimetype: item.type || '',
                //             url: item.url || '',
                //           },
                //           position: item.position,
                //           primary: item.primary,
                //           policeImage: item.policeImage,
                //           scheme: {
                //             connect: { id: schemeId },
                //           },
                //           uploadedBy: { connect: { id: userId } },
                //         }))
                //       : undefined,
                // },
                // image: {
                //   upload:
                //     data.images && data.images.length > 0
                //       ? data.images.map((item) => ({
                //           url: {
                //             filename: item.fileName || '',
                //             mimetype: item.type || '',
                //             url: item.url || '',
                //           },
                //           position: item.position,
                //           primary: item.primary,
                //           policeImage: item.policeImage,
                //         }))
                //       : undefined,
                // },
              },
            ],
          },
        },
        where: {
          id: crimeGroupId,
        },
      },
    });
  };

  const updateAddOffenderList: MutationUpdaterFn<
    CreateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.createOffender === null || res?.createOffender === undefined)
      return;
    const existingData = store.readQuery<CrimeGroupQuery>({
      query: CrimeGroupDocument,
      variables,
    });

    if (!existingData?.crimeGroup) return;
    store.writeQuery<CrimeGroupQuery>({
      data: {
        __typename: 'Query',
        crimeGroup: {
          ...existingData.crimeGroup,
          offenders: [...existingData.crimeGroup.offenders, res.createOffender],
        },
      },
      query: CrimeGroupDocument,
      variables,
    });
  };

  const [deleteCrimeGroup] = useDeleteCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been deleted!',
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
  });

  const onDeleteCrimeGroup = () => {
    setSaving(true);
    void deleteCrimeGroup({
      variables: {
        id: crimeGroupId,
      },
    });
  };

  const [deleteUpdate] = useDeleteUpdateMutation();

  const handleDeleteUpdate = (updateId: string) => {
    void deleteUpdate({
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          __typename: 'Update',
          id: updateId,
          replyToId: '',
        },
      },
      update: (store, result) => {
        if (result.data?.deleteUpdate) {
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
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.crimeGroup.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<CrimeGroupQuery, CrimeGroupQueryVariables>({
                  data: {
                    crimeGroup: {
                      ...oldData.crimeGroup,
                      updates: update(oldData.crimeGroup.updates, {
                        [oldData.crimeGroup.updates
                          .map((item) => item.id)
                          .indexOf(result.data.deleteUpdate.replyToId)]: {
                          replies: {
                            $set: updateItem.replies.filter(
                              (item) =>
                                item.id !== result.data?.deleteUpdate?.id
                            ),
                          },
                        },
                      }),
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
            } else {
              store.writeQuery<CrimeGroupQuery, CrimeGroupQueryVariables>({
                data: {
                  crimeGroup: {
                    ...oldData.crimeGroup,
                    updates: oldData.crimeGroup.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
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
        }
      },
      variables: {
        where: {
          id: updateId,
        },
      },
    });
  };
  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
    });
  };

  const [updateUpdate] = useUpdateUpdateMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      void updateUpdate({
        optimisticResponse: {
          __typename: 'Mutation',
          updateUpdate: {
            __typename: 'Update',
            id: editUpdate.id || '',
            text: editUpdateInput,
          },
        },
        variables: {
          data: {
            text: editUpdateInput,
          },
          where: {
            id: editUpdate.id,
          },
        },
      });
    setEditUpdate(null);
    setEditUpdateInput('');
  };
  const [subscribeToCrimeGroup] = useSubscribeToCrimeGroupMutation();
  const [unsubscribeFromCrimeGroup] = useUnsubscribeToCrimeGroupMutation();

  const toggleSubscribe = () => {
    if (crimeGroupsData?.crimeGroup?.subscribed) {
      void unsubscribeFromCrimeGroup({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToCrimeGroup: {
            __typename: 'CrimeGroup',
            id: crimeGroupId,
            subscribed: false,
          },
        },
        variables: {
          where: { id: crimeGroupId },
        },
      });
    } else {
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
          where: { id: crimeGroupId },
        },
      });
    }
  };
  const scrolledToTop = () => {
    setLoadMore(true);
  };

  const toggleViewSuggested = () => {
    setViewSuggestedOpen(!viewSuggestedOpen);
  };

  const handleAddSuggestion = (id: string) => {
    setViewSuggestedOpen(false);
    void updateCrimeGroup({
      update: (store, result) => {
        const existingData = store.readQuery<
          SuggestedCrimeGroupMembersQuery,
          SuggestedCrimeGroupMembersQueryVariables
        >({
          query: SuggestedCrimeGroupMembersDocument,
          variables: {
            associatedCrimeGroup: {
              id: crimeGroupId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
            where: {
              id: crimeGroupId,
            },
          },
        });

        if (existingData?.crimeGroup && result.data?.updateCrimeGroup)
          store.writeQuery<
            SuggestedCrimeGroupMembersQuery,
            SuggestedCrimeGroupMembersQueryVariables
          >({
            data: {
              crimeGroup: {
                ...result.data.updateCrimeGroup,
                suggestedMembers:
                  existingData.crimeGroup?.suggestedMembers?.filter(
                    (offender) => offender.id !== id
                  ),
              },
            },
            query: SuggestedCrimeGroupMembersDocument,
            variables: {
              associatedCrimeGroup: {
                id: crimeGroupId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
              where: {
                id: crimeGroupId,
              },
            },
          });
      },
      variables: {
        data: {
          offenders: {
            connect: [
              {
                id,
              },
            ],
          },
        },
        where: {
          id: crimeGroupId,
        },
      },
    });
  };
  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocument === null || res?.createDocument === undefined)
      return;
    const existingData = store.readQuery<CrimeGroupQuery>({
      query: CrimeGroupDocument,
      variables,
    });

    if (!existingData?.crimeGroup) return;
    store.writeQuery<CrimeGroupQuery>({
      data: {
        __typename: 'Query',
        crimeGroup: {
          ...existingData.crimeGroup,
          evidence: [...existingData.crimeGroup.evidence, res.createDocument],
        },
      },
      query: CrimeGroupDocument,
      variables,
    });
  };
  const updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.deleteDocument === null || res?.deleteDocument === undefined)
      return;
    const existingData = store.readQuery<CrimeGroupQuery>({
      query: CrimeGroupDocument,
      variables,
    });

    if (!existingData?.crimeGroup) return;
    store.writeQuery<CrimeGroupQuery>({
      data: {
        __typename: 'Query',
        crimeGroup: {
          ...existingData.crimeGroup,
          evidence: existingData.crimeGroup.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
      },
      query: CrimeGroupDocument,
      variables,
    });
  };

  // investigation
  const updateInvestigationList: MutationUpdaterFn<
    CreateInvestigationMutation
  > = (store, { data: res }) => {
    if (
      res?.createInvestigation === null ||
      res?.createInvestigation === undefined
    )
      return;
    const existingData = store.readQuery<CrimeGroupQuery>({
      query: CrimeGroupDocument,
      variables,
    });

    if (!existingData?.crimeGroup) return;
    store.writeQuery<CrimeGroupQuery>({
      data: {
        __typename: 'Query',
        crimeGroup: {
          ...existingData.crimeGroup,
          investigations: [
            ...existingData.crimeGroup.investigations,
            res.createInvestigation,
          ],
        },
      },
      query: CrimeGroupDocument,
      variables,
    });
  };

  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  const toggleShowIntel = () => {
    setShowIntel(!showIntel);
  };
  const editRights = hasPermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.CrimeGroups,
    },
    permissions,
  });
  return {
    addAlias,
    addDocument,
    addExistingOffender,
    addExistingVehicle,
    addInvestigation,
    addNewVehicle,
    addOffender,
    confirmDeleteUpdate,
    data: crimeGroupsData,
    editRights,
    editUpdate,
    editUpdateInput,
    handleAddSuggestion,
    handleEditUpdate,
    loadMore,
    loading:
      (crimeGroupsData === null || crimeGroupsData === undefined) && loading,
    offenderIds,
    onCompletedAddOffender,
    onDeleteCrimeGroup,
    optionRowShow,
    replyTo,
    saving,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    showIntel,
    submitNewVehicle,
    submitOffender,
    submitVehicle,
    suggestedData,
    toggleAddAlias,
    toggleAddDocument,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddInvestigation,
    toggleAddNewVehicle,
    toggleAddOffender,
    toggleShowIntel,
    toggleSubscribe,
    toggleViewSuggested,
    updateAddOffenderList,
    updateDeleteDocument,
    updateDocumentList,
    updateInvestigationList,
    userId,
    vehicleIds,
    viewSuggestedOpen,
  };
};

export default useViewCrimeGroup;
