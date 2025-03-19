import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type {
  ViewVehicleQuery,
  ViewVehicleQueryVariables,
} from '#/views/profiles/Vehicles/ViewVehicle/__generated__/ViewVehicle.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-simple-offender.generated';
import type { VehicleUpdateInput } from 'graphql/types';
import type {
  EditFeedImage,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import hasRolePermission from '#/utils/has-role-permission';
import {
  ViewVehicleDocument,
  useViewVehicleQuery,
} from '#/views/profiles/Vehicles/ViewVehicle/__generated__/ViewVehicle.generated';
import { Modal, notification } from 'antd';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/__generated__/update-update.generated';
import { PermissionMethod, PermissionModel } from 'graphql/types';
import { useDeleteVehicleMutation } from 'graphql/vehicles/mutations/__generated__/delete_vehicle.generated';
import { useSubscribeToVehicleMutation } from 'graphql/vehicles/mutations/__generated__/subscribe-to-vehicle.generated';
import { useUnsubscribeToVehicleMutation } from 'graphql/vehicles/mutations/__generated__/unsubscribe-from-vehicle.generated';
import { useUpdateVehicleDetailsMutation } from 'graphql/vehicles/mutations/update/__generated__/update_vehicle_details.generated';
import { useUpdateVehicleImagesMutation } from 'graphql/vehicles/mutations/update/__generated__/update-vehicle-images.generated';
import { useUpdateVehicleOffendersMutation } from 'graphql/vehicles/mutations/update/__generated__/update-vehicle-offenders.generated';
import update from 'immutability-helper';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useStoreState } from 'state';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import errorNotification from 'types/mutation_notifications/error_notification';
import successNotifications from 'types/mutation_notifications/show_success_notification';
import successNotification from 'types/mutation_notifications/success_notification';

const { confirm } = Modal;

interface Return {
  addDocument: boolean;
  addExistingOffender: boolean;
  addInvestigation: boolean;
  addOffender: boolean;
  confirmDeleteUpdate: (updateId: string) => void;
  data: ViewVehicleQuery | undefined;
  editImageData: EditFeedImage | null;
  editImages: boolean;
  editOffenderData: OffenderData | null;
  // optionMenuItems: ItemType[];
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  editVehicle: boolean;
  handleEditUpdate: () => void;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  loadMore: boolean;
  loading: boolean;
  onAddExistingOffender: (id: string) => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDeleteImage: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: () => void;
  onEditImage: (id: EditFeedImage) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  openLightbox: (index: number) => void;
  optionRowShow: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  setEditImageData: (value: EditFeedImage | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
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
  submitEditVehicle: (value: VehicleData) => void;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddInvestigation: () => void;
  toggleAddOffender: () => void;
  toggleEditImages: () => void;
  toggleEditVehicle: () => void;
  toggleSubscribe: () => void;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
}
const onCompletedEditOffender = () => {
  successNotification(
    ProfileUpdatedModel.Offender,
    ProfileUpdatedModel.Vehicle,
    ProfileUpdatedType.updated
  );
};
const onCompletedAddOffender = () => {
  successNotification(
    ProfileUpdatedModel.Offender,
    ProfileUpdatedModel.Vehicle,
    ProfileUpdatedType.added
  );
};
const useViewVehicle = (vehicleId: string): Return => {
  const intl = useIntl();
  const { id: userId } = useStoreState((state) => state.user);
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
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null>(null);
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);

  const variables: ViewVehicleQueryVariables = {
    groupsWhere: {
      scheme: {
        id: {
          equals: schemeId,
        },
      },
    },
    where: {
      id: vehicleId,
    },
  };

  const { data: vehicleData, loading } = useViewVehicleQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      setLightboxElements(
        res.vehicle?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
    variables,
  });
  const [updateVehicle] = useUpdateVehicleDetailsMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The vehicle has been updated!',
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
        delete: disconnect && disconnect.length > 0 ? disconnect : undefined,
        update:
          editedImages && editedImages.length > 0
            ? editedImages.map((item) => ({
                data: {
                  policeImage: { set: item.policeImage },
                  position: { set: item.position },
                  primary: { set: item.primary },
                  rotation: { set: item.rotation },
                },
                where: {
                  id: item.id,
                },
              }))
            : undefined,
        upload:
          newImages && newImages.length > 0
            ? newImages
                .map((item) => ({
                  policeImage: item.policeImage,
                  position: item.position,
                  primary: item.primary,
                  rotation: item.rotation || 0,
                  url: {
                    filename: item.fileName || '',
                    mimetype: item.type || '',
                    url: item.url || '',
                  },
                }))
                .filter((obj) => obj.url !== undefined)
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
        connect:
          connectedCustomGalleries && connectedCustomGalleries.length > 0
            ? connectedCustomGalleries.map((id) => ({ id }))
            : undefined,

        create:
          newCustomGalleries && newCustomGalleries.length > 0
            ? newCustomGalleries.map((value) => ({
                description: value.description || '',
                groups: {
                  connect:
                    data.groups && data.groups.length > 0
                      ? data.groups.map((id) => ({ id }))
                      : [],
                },
                name: value.name,
                schemes: { connect: { id: schemeId } },
              }))
            : undefined,
        disconnect:
          disconnectedCustomGalleries && disconnectedCustomGalleries.length > 0
            ? disconnectedCustomGalleries.map((id) => ({ id }))
            : undefined,
      };
    };

    void updateVehicle({
      variables: {
        data: {
          colour: {
            set: data.colour || '',
          },
          crimeGroup: {
            set:
              data?.crimeGroup && data.crimeGroup.length > 0
                ? data?.crimeGroup?.map((id) => ({ id }))
                : [],
          },
          customGalleries: getCustomGalleries(),
          groups: {
            set:
              data?.groups && data?.groups.length > 0
                ? data?.groups?.map((id) => ({ id }))
                : [],
          },
          images: getImages(),
          make: {
            set: data.make || '',
          },
          model: {
            set: data.model || '',
          },
          registration: {
            set: data.registration || '',
          },
        },
        groupsWhere: {
          scheme: {
            id: {
              equals: schemeId,
            },
          },
        },
        where: {
          id: vehicleId,
        },
      },
    });
  };
  const [deleteVehicle] = useDeleteVehicleMutation({
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
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The images have been updated',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully updated!',
          }),
          placement: 'bottomRight',
        });
      },
      variables: {
        data: {
          images: {
            disconnect:
              disconnect && disconnect.length > 0 ? disconnect : undefined,
            update:
              editedImages && editedImages.length > 0
                ? editedImages.map((item) => ({
                    data: {
                      policeImage: { set: item.policeImage },
                      position: { set: item.position },
                      primary: { set: item.primary },
                      rotation: { set: item.rotation },
                    },
                    where: {
                      id: item.id,
                    },
                  }))
                : undefined,
            upload:
              newImages && newImages.length > 0
                ? newImages
                    .map((item) => ({
                      policeImage: item.policeImage,
                      position: item.position,
                      primary: item.primary,
                      rotation: item.rotation || 0,
                      url: {
                        filename: item.fileName || '',
                        mimetype: item.type || '',
                        url: item.url || '',
                      },
                    }))
                    .filter((obj) => obj.url !== undefined)
                : undefined,
          },
        },
        where: {
          id: vehicleId,
        },
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
        onCompleted: () => {
          successNotifications(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.updated,
            ProfileUpdatedModel.Image
          );
        },
        variables: {
          data: {
            images: {
              update: [
                {
                  data: {
                    policeImage: { set: value.policeImage || false },
                    position: { set: value.position },
                    primary: { set: value.primary || false },
                    rotation: { set: value.rotation || 0 },
                  },
                  where: {
                    id: value.id,
                  },
                },
                {
                  data: {
                    primary: { set: !value.primary },
                  },
                  where: {
                    id: findPrimaryId,
                  },
                },
              ],
            },
          },
          where: {
            id: vehicleId,
          },
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
      onCompleted: () => {
        notification.success({
          description: intl.formatMessage({
            defaultMessage: 'The image/s have been deleted',
          }),
          message: intl.formatMessage({
            defaultMessage: 'Successfully deleted!',
          }),
          placement: 'bottomRight',
        });
      },
      update: (store, { data: res }) => {
        if (res?.updateVehicle === null || res?.updateVehicle === undefined)
          return;
        const existingData = store.readQuery<
          ViewVehicleQuery,
          ViewVehicleQueryVariables
        >({
          query: ViewVehicleDocument,
          variables,
        });

        if (!existingData?.vehicle) return;
        store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
          data: {
            __typename: 'Query',
            vehicle: {
              ...existingData.vehicle,
              images: existingData.vehicle.images.filter(
                ({ id }) => id !== value
              ),
            },
          },
          query: ViewVehicleDocument,
          variables,
        });
      },
      variables: {
        data: {
          images: {
            disconnect: [{ id: value }],
          },
        },
        where: {
          id: vehicleId,
        },
      },
    });
  };
  // offender
  const updateEditOffenderList: MutationUpdaterFn<
    UpdateSimpleOffenderMutation
  > = (store, { data: res }) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;
    const existingData = store.readQuery<
      ViewVehicleQuery,
      ViewVehicleQueryVariables
    >({
      query: ViewVehicleDocument,
      variables,
    });
    if (!existingData?.vehicle) return;
    const index = existingData?.vehicle?.offenders
      .map((item) => item.id)
      .indexOf(res.updateOffender.id);

    store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
      data: {
        __typename: 'Query',
        vehicle: {
          ...existingData.vehicle,
          offenders: update(existingData.vehicle.offenders, {
            [index]: {
              $set: { ...res.updateOffender },
            },
          }),
        },
      },
      query: ViewVehicleDocument,
      variables,
    });
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
    const existingData = store.readQuery<
      ViewVehicleQuery,
      ViewVehicleQueryVariables
    >({
      query: ViewVehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
      data: {
        __typename: 'Query',
        vehicle: {
          ...existingData.vehicle,
          offenders: [...existingData.vehicle.offenders, res.createOffender],
        },
      },
      query: ViewVehicleDocument,
      variables,
    });
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

          const existingData = store.readQuery<
            ViewVehicleQuery,
            ViewVehicleQueryVariables
          >({
            query: ViewVehicleDocument,
            variables,
          });

          if (!existingData?.vehicle) return;
          store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
            data: {
              __typename: 'Query',
              vehicle: {
                ...existingData.vehicle,
                offenders: res.updateVehicle.offenders,
              },
            },
            query: ViewVehicleDocument,
            variables,
          });
        },
        variables: {
          data: {
            offenders: {
              connect: [{ id: value }],
            },
          },
          where: {
            id: vehicleId,
          },
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
          const existingData = store.readQuery<
            ViewVehicleQuery,
            ViewVehicleQueryVariables
          >({
            query: ViewVehicleDocument,
            variables,
          });

          if (!existingData?.vehicle) return;
          store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
            data: {
              __typename: 'Query',
              vehicle: {
                ...existingData.vehicle,
                offenders: existingData.vehicle.offenders.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewVehicleDocument,
            variables,
          });
        },
        variables: {
          data: {
            offenders: { disconnect: [{ id: value }] },
          },
          where: {
            id: vehicleId,
          },
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  // update
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
            ViewVehicleQuery,
            ViewVehicleQueryVariables
          >({
            query: ViewVehicleDocument,
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
                store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
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
                  query: ViewVehicleDocument,
                  variables: {
                    where: {
                      id: vehicleId,
                    },
                  },
                });
              }
            } else {
              store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
                data: {
                  vehicle: {
                    ...oldData.vehicle,
                    updates: oldData.vehicle.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewVehicleDocument,
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

        description: 'Confirmation dialog content',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',

        description: 'Delete button text',
      }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',

        description: 'Confirmation dialog title',
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
  const [subscribeToVehicle] = useSubscribeToVehicleMutation();
  const [unsubscribeFromVehicle] = useUnsubscribeToVehicleMutation();

  const toggleSubscribe = () => {
    if (vehicleData?.vehicle?.subscribed) {
      void unsubscribeFromVehicle({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeToVehicle: {
            __typename: 'Vehicle',
            id: vehicleId,
            subscribed: false,
          },
        },
        variables: {
          where: { id: vehicleId },
        },
      });
    } else {
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
          where: { id: vehicleId },
        },
      });
    }
  };

  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocuments === null || res?.createDocuments === undefined)
      return;
    const existingData = store.readQuery<
      ViewVehicleQuery,
      ViewVehicleQueryVariables
    >({
      query: ViewVehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
      data: {
        __typename: 'Query',
        vehicle: {
          ...existingData.vehicle,
          evidence: [...existingData.vehicle.evidence, ...res.createDocuments],
        },
      },
      query: ViewVehicleDocument,
      variables,
    });
  };
  const updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.deleteDocument === null || res?.deleteDocument === undefined)
      return;
    const existingData = store.readQuery<
      ViewVehicleQuery,
      ViewVehicleQueryVariables
    >({
      query: ViewVehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
      data: {
        __typename: 'Query',
        vehicle: {
          ...existingData.vehicle,
          evidence: existingData.vehicle.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
      },
      query: ViewVehicleDocument,
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
    const existingData = store.readQuery<
      ViewVehicleQuery,
      ViewVehicleQueryVariables
    >({
      query: ViewVehicleDocument,
      variables,
    });

    if (!existingData?.vehicle) return;
    store.writeQuery<ViewVehicleQuery, ViewVehicleQueryVariables>({
      data: {
        __typename: 'Query',
        vehicle: {
          ...existingData.vehicle,
          investigations: [
            ...existingData.vehicle.investigations,
            res.createInvestigation,
          ],
        },
      },
      query: ViewVehicleDocument,
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
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
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
  const editRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Vehicles,
    },
  });
  return {
    addDocument,
    addExistingOffender,
    // optionMenuItems,
    addInvestigation,
    addOffender,
    confirmDeleteUpdate,
    data: vehicleData,
    editImageData,
    editImages,
    editOffenderData,
    editRights,
    editUpdate,
    editUpdateInput,
    editVehicle,
    handleEditUpdate,
    lightBoxOpen,
    lightboxElements,
    loadMore,
    loading: (vehicleData === null || vehicleData === undefined) && loading,
    onAddExistingOffender,
    onCompletedAddOffender,
    onCompletedEditOffender,
    onDeleteImage,
    onDeleteOffender,
    onDeleteVehicle,
    onEditImage,
    onUpdateImages,
    openLightbox,
    optionRowShow,
    replyTo,
    saving,
    scrolledToTop,
    setEditImageData,
    setEditOffenderData,
    setEditUpdate,
    setEditUpdateInput,
    setOptionRowShow,
    setReplyTo,
    submitEditVehicle,
    toggleAddDocument,
    toggleAddExistingOffender,
    toggleAddInvestigation,
    toggleAddOffender,
    toggleEditImages,
    toggleEditVehicle,
    toggleSubscribe,
    updateAddOffenderList,

    updateDeleteDocument,
    updateDocumentList,
    updateEditOffenderList,
    updateInvestigationList,
    userId,
  };
};

export default useViewVehicle;
