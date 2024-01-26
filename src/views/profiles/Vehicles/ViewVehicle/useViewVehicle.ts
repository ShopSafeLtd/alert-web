import { Modal, notification } from 'antd';

import type {
  CreateDocumentMutation,
  CreateInvestigationMutation,
  CreateSimpleOffenderMutation,
  DeleteDocumentMutation,
  UpdateSimpleOffenderMutation,
  VehicleQuery,
  VehicleQueryVariables,
  VehicleUpdateInput,
} from 'graphql/generated';
import {
  Role,
  useDeleteUpdateMutation,
  useDeleteVehicleMutation,
  useSubscribeToVehicleMutation,
  useUnsubscribeToVehicleMutation,
  useUpdateUpdateMutation,
  useUpdateVehicleDetailsMutation,
  useUpdateVehicleImagesMutation,
  useUpdateVehicleOffendersMutation,
  useVehicleQuery,
  VehicleDocument,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import update from 'immutability-helper';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';
import type {
  EditFeedImage,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import { useIntl } from 'react-intl';
import type { MutationUpdaterFn } from '@apollo/client';
import successNotifications from 'types/mutation_notifications/show_success_notification';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import successNotification from 'types/mutation_notifications/success_notification';

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
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  onAddExistingOffender: (id: string) => void;
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  onCompletedEditOffender: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  onCompletedAddOffender: () => void;
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
  const [addDocument, setAddDocument] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [editImageData, setEditImageData] = useState<EditFeedImage | null>(
    null
  );
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [editOffenderData, setEditOffenderData] = useState<OffenderData | null>(
    null
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

  const variables = {
    where: {
      id: vehicleId,
    },
  };

  const { data: vehicleData, loading } = useVehicleQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (res) => {
      setLightboxElements(
        res.vehicle?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });
  const [updateVehicle] = useUpdateVehicleDetailsMutation({
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
          disconnectedCustomGalleries && disconnectedCustomGalleries.length > 0
            ? disconnectedCustomGalleries.map((id) => ({ id }))
            : undefined,

        connect:
          connectedCustomGalleries && connectedCustomGalleries.length > 0
            ? connectedCustomGalleries.map((id) => ({ id }))
            : undefined,
        create:
          newCustomGalleries && newCustomGalleries.length > 0
            ? newCustomGalleries.map((value) => ({
                name: value.name,
                description: value.description || '',
                schemes: { connect: { id: schemeId } },
                groups: {
                  connect:
                    data.groups && data.groups.length > 0
                      ? data.groups.map((id) => ({ id }))
                      : [],
                },
              }))
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
  // image
  const [updateVehicleImages] = useUpdateVehicleImagesMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onUpdateImages = (value: ImageCardData[]) => {
    setSaving(true);
    const disconnect = value
      .filter(({ deleted }) => deleted)
      .map(({ id }) => ({ id }));
    const newImages = value.filter((el) => el.new);
    const editedImages = value.filter(({ edited }) => edited);

    void updateVehicleImages({
      variables: {
        where: {
          id: vehicleId,
        },
        data: {
          images: {
            disconnect:
              disconnect && disconnect.length > 0 ? disconnect : undefined,
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
          },
        },
      },
      onCompleted: () => {
        notification.success({
          message: intl.formatMessage({
            defaultMessage: 'Successfully updated!',
            id: 'zJzbfm',
          }),
          description: intl.formatMessage({
            defaultMessage: 'The images have been updated',
            id: 'yRfbZE',
          }),
          placement: 'bottomRight',
        });
      },
    }).finally(() => {
      setEditImages(false);
      setSaving(false);
    });
  };

  const onEditImage = (value: EditFeedImage) => {
    setSaving(true);
    if (value) {
      const findPrimaryId = vehicleData?.vehicle?.images.find(
        ({ primary }) => primary
      )?.id;
      void updateVehicleImages({
        variables: {
          where: {
            id: vehicleId,
          },
          data: {
            images: {
              update: [
                {
                  where: {
                    id: value.id,
                  },
                  data: {
                    position: { set: value.position },
                    primary: { set: value.primary || false },
                    policeImage: { set: value.policeImage || false },
                    rotation: { set: value.rotation || 0 },
                  },
                },
                {
                  where: {
                    id: findPrimaryId,
                  },
                  data: {
                    primary: { set: !value.primary },
                  },
                },
              ],
            },
          },
        },
        onCompleted: () => {
          successNotifications(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.updated,
            ProfileUpdatedModel.Image
          );
        },
        // update: updateImageList,
      }).finally(() => {
        setEditImageData(null);
        setSaving(false);
      });
    }
  };
  const onDeleteImage = (value: string) => {
    setSaving(false);
    void updateVehicleImages({
      variables: {
        where: {
          id: vehicleId,
        },
        data: {
          images: {
            disconnect: [{ id: value }],
          },
        },
      },
      onCompleted: () => {
        notification.success({
          message: intl.formatMessage({
            defaultMessage: 'Successfully deleted!',
            id: 'RFD+id',
          }),
          description: intl.formatMessage({
            defaultMessage: 'The image/s have been deleted',
            id: '65D7dw',
          }),
          placement: 'bottomRight',
        });
      },
      update: (store, { data: res }) => {
        if (res?.updateVehicle === null || res?.updateVehicle === undefined)
          return;
        const existingData = store.readQuery<VehicleQuery>({
          query: VehicleDocument,
          variables,
        });

        if (!existingData?.vehicle) return;
        store.writeQuery<VehicleQuery>({
          query: VehicleDocument,
          data: {
            vehicle: {
              ...existingData.vehicle,
              images: existingData.vehicle.images.filter(
                ({ id }) => id !== value
              ),
            },
            __typename: 'Query',
          },
          variables,
        });
      },
    });
  };
  // offender
  const updateEditOffenderList: MutationUpdaterFn<
    UpdateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;
    const existingData = store.readQuery<VehicleQuery>({
      query: VehicleDocument,
      variables,
    });
    if (!existingData?.vehicle) return;
    const index = existingData?.vehicle?.offenders
      .map((item) => item.id)
      .indexOf(res.updateOffender.id);

    store.writeQuery<VehicleQuery>({
      query: VehicleDocument,
      data: {
        vehicle: {
          ...existingData.vehicle,
          offenders: update(existingData.vehicle.offenders, {
            [index]: {
              $set: { ...res.updateOffender },
            },
          }),
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const onCompletedEditOffender = () => {
    successNotification(
      ProfileUpdatedModel.Offender,
      ProfileUpdatedModel.Vehicle,
      ProfileUpdatedType.updated
    );
  };
  // const [updateOffender] = useUpdateSimpleOffenderMutation({
  //   onError: () => {
  //     errorNotification();
  //   },
  //   update: (store, { data: res }) => {
  //     if (res?.updateOffender === null || res?.updateOffender === undefined)
  //       return;
  //     const existingData = store.readQuery<VehicleQuery>({
  //       query: VehicleDocument,
  //       variables,
  //     });
  //     if (!existingData?.vehicle) return;
  //     const index = existingData?.vehicle?.offenders
  //       .map((item) => item.id)
  //       .indexOf(res.updateOffender.id);

  //     store.writeQuery<VehicleQuery>({
  //       query: VehicleDocument,
  //       data: {
  //         vehicle: {
  //           ...existingData.vehicle,
  //           offenders: update(existingData.vehicle.offenders, {
  //             [index]: {
  //               $set: { ...res.updateOffender },
  //             },
  //           }),
  //         },
  //         __typename: 'Query',
  //       },
  //       variables,
  //     });
  //   },
  // });
  // const onEditOffender = (value: OffenderData) => {
  //   setSaving(true);
  //   if (value) {
  //     const existingImageIds = editOffenderData?.images?.map(({ id }) => id);
  //     const deleteIds = existingImageIds?.filter(
  //       (id) => !value.images?.map((el) => el.id).includes(id)
  //     );

  //     void updateOffender({
  //       variables: {
  //         where: {
  //           id: value.id,
  //         },
  //         data: {
  //           name: { set: value.name },
  //           gender: { set: value.gender || null },
  //           race: { set: value.race || null },
  //           build: { set: value.build || null },
  //           hair: { set: value.hair || 'Unknown' },
  //           peculiarities: { set: value.peculiarities || '' },
  //           age: { set: value.age || null },
  //           dateSource: { set: value.dateSource || null },
  //           dateOfBirth: { set: value.dateOfBirth || null },
  //           groups: {
  //             set:
  //               value.groups && value.groups.length > 0
  //                 ? value.groups.map(({ id }) => ({ id }))
  //                 : undefined,
  //           },
  //           images:
  //             value.images && value.images.length > 0
  //               ? {
  //                   delete:
  //                     deleteIds && deleteIds.length > 0
  //                       ? deleteIds.map((id) => ({ id }))
  //                       : undefined,
  //                   connect: value.images
  //                     ?.filter((image) => !image.new)
  //                     .map((image) => ({
  //                       id: image.id,
  //                     })),
  //                   upload: value.images
  //                     ?.filter((image) => image.new)
  //                     .map((item) => ({
  //                       url: {
  //                         filename: item.fileName || '',
  //                         mimetype: item.type || '',
  //                         url: item.url || '',
  //                       },
  //                       position: item.position,
  //                       primary: item.primary,
  //                       policeImage: item.policeImage,
  //                       rotation: item.rotation || 0,
  //                     }))
  //                     .filter((obj) => obj.url !== undefined),
  //                 }
  //               : {
  //                   delete:
  //                     deleteIds && deleteIds.length > 0
  //                       ? deleteIds.map((id) => ({ id }))
  //                       : undefined,
  //                 },
  //         },
  //       },
  //       onCompleted: () => {
  //         successNotification(
  //           ProfileUpdatedModel.Offender,
  //           ProfileUpdatedModel.Vehicle,
  //           ProfileUpdatedType.updated
  //         );
  //       },
  //     }).finally(() => {
  //       setEditOffenderData(null);
  //       setSaving(false);
  //     });
  //   }
  // };

  const updateAddOffenderList: MutationUpdaterFn<
    CreateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.createOffender === null || res?.createOffender === undefined)
      return;
    const existingData = store.readQuery<VehicleQuery>({
      query: VehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<VehicleQuery>({
      query: VehicleDocument,
      data: {
        vehicle: {
          ...existingData.vehicle,
          offenders: [...existingData.vehicle.offenders, res.createOffender],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const onCompletedAddOffender = () => {
    successNotification(
      ProfileUpdatedModel.Offender,
      ProfileUpdatedModel.Vehicle,
      ProfileUpdatedType.added
    );
  };
  // const [createOffender] = useCreateSimpleOffenderMutation({
  //   onCompleted: () => {
  //     successNotification(
  //       ProfileUpdatedModel.Offender,
  //       ProfileUpdatedModel.Vehicle,
  //       ProfileUpdatedType.added
  //     );
  //   },
  //   onError: () => {
  //     errorNotification();
  //   },
  //   update: (store, { data: res }) => {
  //     if (res?.createOffender === null || res?.createOffender === undefined)
  //       return;
  //     const existingData = store.readQuery<VehicleQuery>({
  //       query: VehicleDocument,
  //       variables,
  //     });

  //     if (!existingData?.vehicle) return;
  //     store.writeQuery<VehicleQuery>({
  //       query: VehicleDocument,
  //       data: {
  //         vehicle: {
  //           ...existingData.vehicle,
  //           offenders: [...existingData.vehicle.offenders, res.createOffender],
  //         },
  //         __typename: 'Query',
  //       },
  //       variables,
  //     });
  //   },
  // });

  // const onAddOffender = (value: OffenderData) => {
  //   setSaving(true);
  //   if (value) {
  //     void createOffender({
  //       variables: {
  //         data: {
  //           name: value.name,
  //           gender: value.gender || null,
  //           race: value.race || null,
  //           build: value.build || null,
  //           height: value.height || null,
  //           hair: value.hair || null,
  //           peculiarities: value.peculiarities || null,
  //           comment: value.comment || null,
  //           age: value.age || null,
  //           dateSource: value.dateSource || null,
  //           dateOfBirth: value.dateOfBirth || null,
  //           groups: {
  //             connect:
  //               value.groups && value.groups.length > 0
  //                 ? value.groups.map(({ id }) => ({ id }))
  //                 : vehicleData?.vehicle?.groups.map(({ id }) => ({ id })) ||
  //                   [],
  //           },
  //           scheme: schemeId,
  //           vehicles: { connect: [{ id: vehicleId }] },
  //           // createdBy: { connect: { id: userId } },
  //           // localId: value.id,
  //           image:
  //             value.images && value.images.length > 0
  //               ? {
  //                   connect: value.images
  //                     ?.filter((image) => !image.new)
  //                     .map((image) => ({
  //                       id: image.id,
  //                     })),
  //                   upload: value.images
  //                     ?.filter((image) => image.new)
  //                     .map((item) => ({
  //                       url: {
  //                         filename: item.fileName || '',
  //                         mimetype: item.type || '',
  //                         url: item.url || '',
  //                       },
  //                       position: item.position,
  //                       primary: item.primary,
  //                       policeImage: item.policeImage,
  //                       rotation: item.rotation || 0,
  //                     }))
  //                     .filter((obj) => obj.url !== undefined),
  //                 }
  //               : {},
  //         },
  //       },
  //     }).finally(() => {
  //       setAddOffender(false);
  //       setSaving(false);
  //     });
  //   }
  // };
  const [updateVehicleOffenders] = useUpdateVehicleOffendersMutation({
    onError: () => {
      errorNotification();
    },
  });
  const onAddExistingOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateVehicleOffenders({
        variables: {
          where: {
            id: vehicleId,
          },
          data: {
            offenders: {
              connect: [{ id: value }],
            },
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (res?.updateVehicle === null || res?.updateVehicle === undefined)
            return;

          const existingData = store.readQuery<VehicleQuery>({
            query: VehicleDocument,
            variables,
          });

          if (!existingData?.vehicle) return;
          store.writeQuery<VehicleQuery>({
            query: VehicleDocument,
            data: {
              vehicle: {
                ...existingData.vehicle,
                offenders: res.updateVehicle.offenders,
              },
              __typename: 'Query',
            },
            variables,
          });
        },
      }).finally(() => {
        setAddExistingOffender(false);
        setSaving(false);
      });
  };
  const onDeleteOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateVehicleOffenders({
        variables: {
          where: {
            id: vehicleId,
          },
          data: {
            offenders: { disconnect: [{ id: value }] },
          },
        },
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (res?.updateVehicle === null || res?.updateVehicle === undefined)
            return;
          const existingData = store.readQuery<VehicleQuery>({
            query: VehicleDocument,
            variables,
          });

          if (!existingData?.vehicle) return;
          store.writeQuery<VehicleQuery>({
            query: VehicleDocument,
            data: {
              vehicle: {
                ...existingData.vehicle,
                offenders: existingData.vehicle.offenders.filter(
                  ({ id }) => id !== value
                ),
              },
              __typename: 'Query',
            },
            variables,
          });
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  // update
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

  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocument === null || res?.createDocument === undefined)
      return;
    const existingData = store.readQuery<VehicleQuery>({
      query: VehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<VehicleQuery>({
      query: VehicleDocument,
      data: {
        vehicle: {
          ...existingData.vehicle,
          evidence: [...existingData.vehicle.evidence, res.createDocument],
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
    const existingData = store.readQuery<VehicleQuery>({
      query: VehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<VehicleQuery>({
      query: VehicleDocument,
      data: {
        vehicle: {
          ...existingData.vehicle,
          evidence: existingData.vehicle.evidence.filter(
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
    const existingData = store.readQuery<VehicleQuery>({
      query: VehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<VehicleQuery>({
      query: VehicleDocument,
      data: {
        vehicle: {
          ...existingData.vehicle,
          investigations: [
            ...existingData.vehicle.investigations,
            res.createInvestigation,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
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
  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  const toggleEditImages = () => {
    setEditImages(!editImages);
  };
  const toggleAddOffender = () => {
    setAddOffender(!addOffender);
  };
  const toggleAddExistingOffender = () => {
    setAddExistingOffender(!addExistingOffender);
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
    toggleAddDocument,
    addDocument,
    updateDocumentList,
    updateDeleteDocument,
    // optionMenuItems,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
    editImages,
    toggleEditImages,
    onUpdateImages,
    editImageData,
    setEditImageData,
    onDeleteImage,
    onEditImage,
    addOffender,
    addExistingOffender,
    editOffenderData,
    setEditOffenderData,
    onDeleteOffender,
    toggleAddOffender,
    toggleAddExistingOffender,

    onAddExistingOffender,
    updateEditOffenderList,
    onCompletedEditOffender,
    onCompletedAddOffender,
    updateAddOffenderList,
  };
};

export default useViewVehicle;
