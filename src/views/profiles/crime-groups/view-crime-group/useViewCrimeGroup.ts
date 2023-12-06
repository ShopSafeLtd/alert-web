import { Modal, notification } from 'antd';
import type {
  CreateDocumentMutation,
  CreateInvestigationMutation,
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
  DeleteDocumentMutation,
  SuggestedCrimeGroupMembersQuery,
  SuggestedCrimeGroupMembersQueryVariables,
  VehicleCreateWithoutCrimeGroupInput,
} from 'graphql/generated';
import {
  CrimeGroupDocument,
  Role,
  SuggestedCrimeGroupMembersDocument,
  TagType,
  useCrimeGroupQuery,
  useDeleteCrimeGroupMutation,
  useDeleteUpdateMutation,
  useSubscribeToCrimeGroupMutation,
  useSuggestedCrimeGroupMembersQuery,
  useUnsubscribeToCrimeGroupMutation,
  useUpdateCrimeGroupMutation,
  useUpdateUpdateMutation,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { useStoreState } from 'state';
import type { OffenderData, VehicleData } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { MutationUpdaterFn } from '@apollo/client';

const { confirm } = Modal;
interface Return {
  data: CrimeGroupQuery | undefined;
  loading: boolean;
  saving: boolean;
  offenderIds: string[];
  vehicleIds: string[];
  addOffender: boolean;
  toggleAddOffender: () => void;
  addExistingOffender: boolean;
  toggleAddExistingOffender: () => void;
  addNewVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddNewVehicle: () => void;
  addAlias: boolean;
  toggleAddAlias: () => void;
  toggleAddExistingVehicle: () => void;
  onDeleteCrimeGroup: () => void;
  loadMore: boolean;
  scrolledToTop: () => void;
  userId: string;
  replyTo: {
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null;
  setReplyTo: (
    value: {
      id: string;
      text: string;
      createdAt: string;
      createdBy: string;
    } | null
  ) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  editUpdate: { id: string; text: string } | null;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  editRights: boolean;
  toggleSubscribe: () => void;
  submitNewVehicle: (value: VehicleData) => void;
  submitOffender: (value: string[]) => void;
  submitVehicle: (value: string) => void;
  submitNewOffender: (value: OffenderData) => void;
  suggestedData: SuggestedCrimeGroupMembersQuery | undefined;
  viewSuggestedOpen: boolean;
  toggleViewSuggested: () => void;
  handleAddSuggestion: (id: string) => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
}

const useViewCrimeGroup = (crimeGroupId: string): Return => {
  const intl = useIntl();
  const { id: userId, groups, role } = useStoreState((state) => state.user);
  const schemeId = useStoreState((state) => state.scheme.id);
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
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);

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
    variables,
    onCompleted: ({ crimeGroup }) => {
      if (crimeGroup?.offenders && crimeGroup.offenders.length > 0) {
        setOffenderIds(crimeGroup.offenders.map(({ id }) => id));
      }
      if (crimeGroup?.vehicles && crimeGroup.vehicles.length > 0) {
        setVehicleIds(crimeGroup.vehicles.map(({ id }) => id));
      }
    },
  });

  const { data: suggestedData } = useSuggestedCrimeGroupMembersQuery({
    variables: {
      where: {
        id: crimeGroupId,
      },
      associatedCrimeGroup: {
        id: crimeGroupId,
      },
      crimeTypesWhere: {
        type: {
          equals: TagType.IncidentCrimeType,
        },
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The crime group has been updated!',
          id: '3lIfgt',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const submitNewOffender = (data: OffenderData) => {
    setSaving(true);
    void updateCrimeGroup({
      variables: {
        where: {
          id: crimeGroupId,
        },
        data: {
          offenders: {
            create: [
              {
                name: data.name,
                gender: data.gender || null,
                race: data.race || null,
                build: data.build || null,
                height: data.height || null,
                hair: data.hair || null,
                peculiarities: data.peculiarities || null,
                comment: data.comment || null,
                age: data.age || null,
                dateSource: data.dateSource || null,
                dateOfBirth: data.dateOfBirth || null,
                createdBy: { connect: { id: userId } },
                scheme: { connect: { id: schemeId } },
                groups: {
                  connect:
                    crimeGroupsData?.crimeGroup?.groups.map(({ id }) => ({
                      id,
                    })) || [],
                },
                images: {
                  upload:
                    data.images && data.images.length > 0
                      ? data.images.map((item) => ({
                          url: {
                            filename: item.fileName || '',
                            mimetype: item.type || '',
                            url: item.url || '',
                          },
                          position: item.position,
                          primary: item.primary,
                          policeImage: item.policeImage,
                          rotation: item.rotation || 0,
                        }))
                      : undefined,
                },
              },
            ],
          },
        },
      },
    });
  };
  const submitOffender = (values: string[]) => {
    setSaving(true);
    if (values) {
      void updateCrimeGroup({
        variables: {
          where: {
            id: crimeGroupId,
          },
          data: {
            offenders: {
              connect: values.map((value) => ({ id: value })),
            },
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
          where: {
            id: crimeGroupId,
          },
          data: {
            vehicles: {
              connect: [{ id: value }],
            },
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
                    name: value.name,
                    description: value.description || '',
                    schemes: { connect: [{ id: schemeId }] },
                    groups: {
                      connect:
                        crimeGroupsData?.crimeGroup?.groups &&
                        crimeGroupsData?.crimeGroup?.groups.length > 0
                          ? crimeGroupsData?.crimeGroup?.groups.map(
                              ({ id }) => ({
                                id,
                              })
                            )
                          : groups.map(({ id }) => ({ id })),
                    },
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
        where: {
          id: crimeGroupId,
        },
        data: {
          vehicles: {
            create: [
              {
                make: data.make || '',
                model: data.model || '',
                colour: data.colour || '',
                registration: data.registration || '',
                incidents: {
                  connect:
                    data.incidents && data.incidents.length > 0
                      ? data.incidents.map((id) => ({ id }))
                      : undefined,
                },
                offenders: {
                  connect:
                    data.offenders && data.offenders.length > 0
                      ? data.offenders.map((id) => ({ id }))
                      : undefined,
                },
                groups: {
                  connect:
                    crimeGroupsData?.crimeGroup?.groups &&
                    crimeGroupsData?.crimeGroup?.groups.length > 0
                      ? crimeGroupsData?.crimeGroup?.groups.map(({ id }) => ({
                          id,
                        }))
                      : groups.map(({ id }) => ({ id })),
                },
                customGalleries: getCustomGalleries(),
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
      },
    });
  };

  const [deleteCrimeGroup] = useDeleteCrimeGroupMutation({
    onCompleted: () => {
      setSaving(false);
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been deleted!',
          id: 'QPIR1s',
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
      variables: {
        where: {
          id: updateId,
        },
      },
      optimisticResponse: {
        __typename: 'Mutation',
        deleteUpdate: {
          id: updateId,
          __typename: 'Update',
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
                  query: CrimeGroupDocument,
                  variables: {
                    where: {
                      id: crimeGroupId,
                    },
                  },
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
                });
              }
            } else {
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
                    updates: oldData.crimeGroup.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
              });
            }
        }
      },
    });
  };
  const confirmDeleteUpdate = (updateId: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
        id: '2oCaym',
      }),
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
        id: 'gwznO0',
      }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      okText: intl.formatMessage({ defaultMessage: 'Delete', id: 'K3r6DQ' }),
    });
  };

  const [updateUpdate] = useUpdateUpdateMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      void updateUpdate({
        variables: {
          data: {
            text: editUpdateInput,
          },
          where: {
            id: editUpdate.id,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          updateUpdate: {
            id: editUpdate.id || '',
            __typename: 'Update',
            text: editUpdateInput,
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
        variables: {
          where: { id: crimeGroupId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToCrimeGroup: {
            id: crimeGroupId,
            __typename: 'CrimeGroup',
            subscribed: false,
          },
        },
      });
    } else {
      void subscribeToCrimeGroup({
        variables: {
          where: { id: crimeGroupId },
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
      update: (store, result) => {
        const existingData = store.readQuery<
          SuggestedCrimeGroupMembersQuery,
          SuggestedCrimeGroupMembersQueryVariables
        >({
          query: SuggestedCrimeGroupMembersDocument,
          variables: {
            where: {
              id: crimeGroupId,
            },
            associatedCrimeGroup: {
              id: crimeGroupId,
            },
            crimeTypesWhere: {
              type: {
                equals: TagType.IncidentCrimeType,
              },
            },
          },
        });

        if (existingData?.crimeGroup && result.data?.updateCrimeGroup)
          store.writeQuery<
            SuggestedCrimeGroupMembersQuery,
            SuggestedCrimeGroupMembersQueryVariables
          >({
            query: SuggestedCrimeGroupMembersDocument,
            variables: {
              where: {
                id: crimeGroupId,
              },
              associatedCrimeGroup: {
                id: crimeGroupId,
              },
              crimeTypesWhere: {
                type: {
                  equals: TagType.IncidentCrimeType,
                },
              },
            },
            data: {
              crimeGroup: {
                ...result.data.updateCrimeGroup,
                suggestedMembers:
                  existingData.crimeGroup?.suggestedMembers?.filter(
                    (offender) => offender.id !== id
                  ),
              },
            },
          });
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
      query: CrimeGroupDocument,
      data: {
        crimeGroup: {
          ...existingData.crimeGroup,
          evidence: [...existingData.crimeGroup.evidence, res.createDocument],
        },
        __typename: 'Query',
      },
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
      query: CrimeGroupDocument,
      data: {
        crimeGroup: {
          ...existingData.crimeGroup,
          evidence: existingData.crimeGroup.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
        __typename: 'Query',
      },
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
      query: CrimeGroupDocument,
      data: {
        crimeGroup: {
          ...existingData.crimeGroup,
          investigations: [
            ...existingData.crimeGroup.investigations,
            res.createInvestigation,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  return {
    data: crimeGroupsData,
    loading:
      (crimeGroupsData === null || crimeGroupsData === undefined) && loading,
    saving,
    offenderIds,
    vehicleIds,
    addOffender,
    toggleAddOffender,
    addExistingOffender,
    toggleAddExistingOffender,
    addNewVehicle,
    addExistingVehicle,
    toggleAddNewVehicle,
    toggleAddExistingVehicle,
    addAlias,
    toggleAddAlias,
    onDeleteCrimeGroup,
    editRights: role !== Role.User,
    optionRowShow,
    setOptionRowShow,
    userId,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    replyTo,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    loadMore,
    confirmDeleteUpdate,
    toggleSubscribe,
    submitNewVehicle,
    submitOffender,
    submitVehicle,
    submitNewOffender,
    suggestedData,
    viewSuggestedOpen,
    toggleViewSuggested,
    handleAddSuggestion,
    toggleAddDocument,
    addDocument,
    updateDocumentList,
    updateDeleteDocument,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
  };
};

export default useViewCrimeGroup;
