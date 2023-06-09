import { Modal, notification } from 'antd';

import type {
  CreateVehicleDataInput,
  VehicleQuery,
  VehicleQueryVariables,
} from 'graphql/generated';
import {
  useUpdateVehicleMutation,
  useVehicleQuery,
  useDeleteVehicleMutation,
  useDeleteUpdateMutation,
  useUpdateUpdateMutation,
  Role,
  VehicleDocument,
  useSubscribeToVehicleMutation,
  useUnsubscribeToVehicleMutation,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { useStoreState } from 'state';
import errorNotification from 'types/error_notification';
import type { VehicleData } from 'types/DataType';

const { confirm } = Modal;

interface Return {
  data: VehicleQuery | undefined;
  loading: boolean;
  editVehicle: boolean;
  toggleEditVehicle: () => void;
  saving: boolean;
  onDeleteVehicle: () => void;
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
  lightboxElements: {
    src: string;
  }[];
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  // optionMenuItems: ItemType[];
  editRights: boolean;
  toggleSubscribe: () => void;
  submitEditVehicle: (value: VehicleData) => void;
}

const useViewVehicle = (vehicleId: string): Return => {
  const userId = useStoreState((state) => state.user.id);
  const role = useStoreState((state) => state.user.role);
  const schemeId = useStoreState((state) => state.scheme.id);

  const [saving, setSaving] = useState(false);
  const [editVehicle, setEditVehicle] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  // const [optionMenuItems, setOptionsMenuItems] = useState<ItemType[]>([]);

  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });

  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);

  const { data: vehicleData, loading } = useVehicleQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: vehicleId,
      },
    },
    onCompleted: (res) => {
      setLightboxElements(
        res.vehicle?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });
  const [updateVehicle] = useUpdateVehicleMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'The vehicle has been updated! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });

  const submitEditVehicle = (data: VehicleData) => {
    setSaving(true);
    const getCustomGalleries =
      (): CreateVehicleDataInput['customGalleries'] => {
        const existingCustomGalleryIds =
          vehicleData?.vehicle?.customGalleries.map(({ id }) => id);
        const customGalleryIds = data.customGalleries;

        if (customGalleryIds) {
          const newCustomGalleries = data.newCustomGalleriesData;
          const connectedCustomGalleries = customGalleryIds?.filter(
            (id) =>
              !(
                newCustomGalleries?.map((el) => el.id).includes(id) ||
                existingCustomGalleryIds?.includes(id)
              )
          );
          // const disconnectedCustomGalleries = existingCustomGalleryIds?.filter(
          //   (id) => !customGalleryIds?.includes(id)
          // );

          return {
            // ???
            // disconnect:
            //   disconnectedCustomGalleries &&
            //   disconnectedCustomGalleries.length > 0
            //     ? disconnectedCustomGalleries.map((id) => ({ id }))
            //     : undefined,

            connect:
              connectedCustomGalleries.length > 0
                ? connectedCustomGalleries.map((id) => ({ id }))
                : undefined,
            create:
              newCustomGalleries && newCustomGalleries.length > 0
                ? newCustomGalleries.map((value) => ({
                    name: value.name,
                    description: value.description || '',
                    schemes: { connect: [{ id: schemeId }] },
                    groups: {
                      connect:
                        // ???
                        data.groups && data.groups.length > 0
                          ? data.groups.map((id) => ({ id }))
                          : [],
                    },
                  }))
                : undefined,
          };
        }
        return {
          connect: undefined,
          create: undefined,
          // disconnect:
          //   existingCustomGalleryIds && existingCustomGalleryIds.length > 0
          //     ? existingCustomGalleryIds.map((id) => ({ id }))
          //     : undefined,
        };
      };

    updateVehicle({
      variables: {
        where: {
          id: vehicleId,
        },
        data: {
          make: data.make || '',
          model: data.model || '',
          colour: data.colour || '',
          registration: data.registration || '',
          crimeGroup:
            data?.crimeGroup && data.crimeGroup.length > 0
              ? data?.crimeGroup?.map((id) => ({ id }))
              : [],
          incidents:
            data.incidents && data.incidents.length > 0
              ? data.incidents.map((id) => ({ id }))
              : [],
          offenders:
            data.offenders && data.offenders.length > 0
              ? data.offenders.map((id) => ({ id }))
              : [],
          schemes: schemeId,
          // ???
          groups:
            data.groups && data.groups.length > 0
              ? data.groups.map((id) => ({ id }))
              : [],
          customGalleries: getCustomGalleries(),
          image: {
            upload:
              data.images && data.images.length > 0
                ? data.images
                    .filter((image) => image.new)
                    .map((item) => ({
                      url: {
                        filename: item.fileName || '',
                        mimetype: item.type || '',
                        url: item.url || '',
                      },
                      position: item.position,
                      primary: item.primary,
                      policeImage: item.policeImage,
                    }))
                : undefined,
            // ???  update
            disconnect:
              data.images && data.images.length > 0
                ? data.images
                    .filter((image) => image.deleted)
                    .map(({ id }) => ({
                      id,
                    }))
                : vehicleData?.vehicle?.images.map(({ id }) => ({
                    id,
                  })),
          },
        },
      },
    });
  };
  const [deleteVehicle] = useDeleteVehicleMutation({
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
      errorNotification();
    },
  });

  const onDeleteVehicle = () => {
    setSaving(true);
    deleteVehicle({
      variables: {
        id: vehicleId || '',
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
          const oldData = store.readQuery<VehicleQuery, VehicleQueryVariables>({
            query: VehicleDocument,
            variables: {
              where: {
                id: vehicleId,
              },
            },
          });

          if (oldData?.vehicle)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.vehicle.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
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
                      updates: update(oldData.vehicle.updates, {
                        [oldData.vehicle.updates
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
                    updates: oldData.vehicle.updates.filter(
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
  const [subscribeToVehicle] = useSubscribeToVehicleMutation();
  const [unsubscribeFromVehicle] = useUnsubscribeToVehicleMutation();

  const toggleSubscribe = () => {
    if (vehicleData?.vehicle?.subscribed) {
      unsubscribeFromVehicle({
        variables: {
          where: { id: vehicleId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToVehicle: {
            id: vehicleId,
            __typename: 'Vehicle',
            subscribed: false,
          },
        },
      });
    } else {
      subscribeToVehicle({
        variables: {
          where: { id: vehicleId },
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
  };
  const toggleEditVehicle = () => {
    setEditVehicle(!editVehicle);
  };
  const scrolledToTop = () => {
    setLoadMore(true);
  };

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };
  return {
    data: vehicleData,
    loading: (vehicleData === null || vehicleData === undefined) && loading,
    editVehicle,
    toggleEditVehicle,
    saving,
    onDeleteVehicle,
    editRights: role !== Role.User,
    optionRowShow,
    setOptionRowShow,
    userId,
    openLightbox,
    lightBoxOpen,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    lightboxElements,
    replyTo,
    scrolledToTop,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    loadMore,
    confirmDeleteUpdate,
    toggleSubscribe,
    submitEditVehicle,
    // optionMenuItems,
  };
};

export default useViewVehicle;
