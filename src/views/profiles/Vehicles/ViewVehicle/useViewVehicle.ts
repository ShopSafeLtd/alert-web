import { Modal, notification } from 'antd';

import type {
  VehicleUpdateInput,
  VehicleQuery,
  VehicleQueryVariables,
} from 'graphql/generated';
import {
  Role,
  useDeleteUpdateMutation,
  useDeleteVehicleMutation,
  useSubscribeToVehicleMutation,
  useUnsubscribeToVehicleMutation,
  useUpdateUpdateMutation,
  useUpdateVehicleMutation,
  useVehicleQuery,
  VehicleDocument,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { useStoreState } from 'state';
import errorNotification from 'types/error_notification';
import type { VehicleData } from 'types/DataType';
import { useIntl } from 'react-intl';

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
  const intl = useIntl();
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been updated!',
          id: 'xEl97U',
        }),
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
    const getImages = (): VehicleUpdateInput['images'] => {
      const editedImages = data.images?.filter(
        (item) => item.edited && !item.new
      );
      const disconnect = data.images
        ?.filter(({ deleted }) => deleted)
        .map(({ id }) => ({ id }));
      const newImages = data.images?.filter((el) => el.new);

      return {
        upload:
          newImages && newImages.length > 0
            ? newImages
                .map((item) => ({
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
                .filter((obj) => obj.url !== undefined)
            : undefined,
        delete: disconnect && disconnect.length > 0 ? disconnect : undefined,
        update:
          editedImages && editedImages.length > 0
            ? editedImages.map((item) => ({
                where: {
                  id: item.id,
                },
                data: {
                  position: { set: item.position },
                  primary: { set: item.primary },
                  policeImage: { set: item.policeImage },
                  rotation: { set: item.rotation },
                },
              }))
            : undefined,
      };
    };
    const getCustomGalleries = (): VehicleUpdateInput['customGalleries'] => {
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
        const disconnectedCustomGalleries = existingCustomGalleryIds?.filter(
          (id) => !customGalleryIds?.includes(id)
        );

        return {
          disconnect:
            disconnectedCustomGalleries &&
            disconnectedCustomGalleries.length > 0
              ? disconnectedCustomGalleries.map((id) => ({ id }))
              : undefined,

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
        disconnect:
          existingCustomGalleryIds && existingCustomGalleryIds.length > 0
            ? existingCustomGalleryIds.map((id) => ({ id }))
            : undefined,
      };
    };

    void updateVehicle({
      variables: {
        where: {
          id: vehicleId,
        },
        data: {
          make: {
            set: data.make || '',
          },
          model: {
            set: data.model || '',
          },
          colour: {
            set: data.colour || '',
          },
          registration: {
            set: data.registration || '',
          },
          groups: {
            set:
              data?.groups && data?.groups.length > 0
                ? data?.groups?.map((id) => ({ id }))
                : [],
          },
          crimeGroup: {
            set:
              data?.crimeGroup && data.crimeGroup.length > 0
                ? data?.crimeGroup?.map((id) => ({ id }))
                : [],
          },
          incidents: {
            set:
              data.incidents && data.incidents.length > 0
                ? data.incidents.map((id) => ({ id }))
                : [],
          },
          offenders: {
            set:
              data.offenders && data.offenders.length > 0
                ? data.offenders.map((id) => ({ id }))
                : [],
          },

          customGalleries: getCustomGalleries(),
          images: getImages(),
        },
      },
    });
  };
  const [deleteVehicle] = useDeleteVehicleMutation({
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

  const onDeleteVehicle = () => {
    setSaving(true);
    void deleteVehicle({
      variables: {
        id: vehicleId || '',
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
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
        id: 'ZYrND5',
        description: 'Confirmation dialog title',
      }),
      content: intl.formatMessage({
        defaultMessage: 'The update will be permanently deleted.',
        id: 'ZWk4fq',
        description: 'Confirmation dialog content',
      }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
        id: '5qRFq/',
        description: 'Delete button text',
      }),
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
  const [subscribeToVehicle] = useSubscribeToVehicleMutation();
  const [unsubscribeFromVehicle] = useUnsubscribeToVehicleMutation();

  const toggleSubscribe = () => {
    if (vehicleData?.vehicle?.subscribed) {
      void unsubscribeFromVehicle({
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
      void subscribeToVehicle({
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
