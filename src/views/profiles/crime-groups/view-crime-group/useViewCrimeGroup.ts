import { Modal, notification } from 'antd';
import type {
  CrimeGroupQuery,
  CrimeGroupQueryVariables,
} from 'graphql/generated';
import {
  useUpdateCrimeGroupMutation,
  CrimeGroupDocument,
  Role,
  useCrimeGroupQuery,
  useDeleteCrimeGroupMutation,
  useDeleteUpdateMutation,
  useSubscribeToCrimeGroupMutation,
  useUnsubscribeToCrimeGroupMutation,
  useUpdateUpdateMutation,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { useStoreState } from 'state';
import type { OffenderData, VehicleData } from 'types/DataType';
import errorNotification from 'types/error_notification';

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
  submitOffender: (value: string) => void;
  submitVehicle: (value: string) => void;
  submitNewOffender: (value: OffenderData) => void;
}

const useViewCrimeGroup = (crimeGroupId: string): Return => {
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
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
  const [editUpdateInput, setEditUpdateInput] = useState('');
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

  const { data: crimeGroupsData, loading } = useCrimeGroupQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: crimeGroupId,
      },
    },
    onCompleted: ({ crimeGroup }) => {
      if (crimeGroup?.offenders && crimeGroup.offenders.length > 0) {
        setOffenderIds(crimeGroup.offenders.map(({ id }) => id));
      }
      if (crimeGroup?.vehicles && crimeGroup.vehicles.length > 0) {
        setVehicleIds(crimeGroup.vehicles.map(({ id }) => id));
      }
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
      toggleAddNewVehicle();
      notification.success({
        message: 'Successfully Updated!',
        description: 'The crime group has been updated!',
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
    updateCrimeGroup({
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
                hair: data.hair || null,
                peculiarities: data.peculiarities || null,
                age: data.age || null,
                dateSource: data.dateSource || null,
                dateOfBirth: data.dateOfBirth || null,
                createdBy: { connect: { id: userId } },
                scheme: { connect: { id: schemeId } },
                images: {
                  upload:
                    data.images && data.images.length > 0
                      ? data.images.map((item) => ({
                          url: {
                            filename: item.fileName || '',
                            mimetype: item.type || '',
                            url: item.url || '',
                          },
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
  const submitOffender = (value: string) => {
    setSaving(true);
    if (value) {
      updateCrimeGroup({
        variables: {
          where: {
            id: crimeGroupId,
          },
          data: {
            offenders: {
              connect: [{ id: value }],
            },
          },
        },
      });
    }
  };
  const submitVehicle = (value: string) => {
    setSaving(true);
    if (value) {
      updateCrimeGroup({
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
    }
  };
  const submitNewVehicle = (data: VehicleData) => {
    setSaving(true);
    updateCrimeGroup({
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
        message: 'Successfully Deleted!',
        description: 'The vehicle has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
  });

  const onDeleteCrimeGroup = () => {
    setSaving(true);
    deleteCrimeGroup({
      variables: {
        id: crimeGroupId,
      },
    });
  };

  const [deleteUpdate] = useDeleteUpdateMutation();

  const handleDeleteUpdate = (updateId: string) => {
    deleteUpdate({
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
      title: 'Are you sure?',
      content: 'The update will be permanently deleted.',
      onOk() {
        handleDeleteUpdate(updateId);
      },
      okText: 'Delete',
    });
  };

  const [updateUpdate] = useUpdateUpdateMutation();

  const handleEditUpdate = () => {
    if (editUpdate !== null)
      updateUpdate({
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
      unsubscribeFromCrimeGroup({
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
      subscribeToCrimeGroup({
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
  };
};

export default useViewCrimeGroup;
