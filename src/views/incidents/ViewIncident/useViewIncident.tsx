import { useEffect, useState } from 'react';
import type {
  CreateDocumentMutation,
  CreateTodoMutation,
  DeleteDocumentMutation,
  GoodsMode,
  ImageUpdateWithWhereUniqueWithoutIncidentInput,
  UpdateIncidentGoodsMutation,
  UpdateIncidentOffendersMutation,
  UpdateIncidentVehiclesMutation,
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from 'graphql/generated';
import {
  Role,
  useAddImagesToIncidentMutation,
  useCreateSimpleOffenderMutation,
  useCreateSimpleVehicleMutation,
  useDeleteUpdateMutation,
  useRecycleIncidentMutation,
  useSubscribeToIncidentMutation,
  useUnsubscribeFromIncidentMutation,
  useUpdateIncidentGoodsMutation,
  useUpdateIncidentImagesMutation,
  useUpdateIncidentMutation,
  useUpdateIncidentOffendersMutation,
  useUpdateIncidentVehiclesMutation,
  useUpdateSimpleOffenderMutation,
  useUpdateSimpleVehicleMutation,
  useUpdateUpdateMutation,
  useViewIncidentQuery,
  ViewIncidentDocument,
} from 'graphql/generated';
import update from 'immutability-helper';

import { useStoreState } from 'state';
import { Modal, notification } from 'antd';
import { useIntl } from 'react-intl';
import errorNotification from 'types/error_notification';
import type {
  EditFeedImage,
  GoodsData,
  ImageCardData,
  OffenderData,
  VehicleData,
} from 'types/DataType';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import type { MutationUpdaterFn } from '@apollo/client';

const { confirm } = Modal;

interface Return {
  data: ViewIncidentQuery | undefined;
  loading: boolean;
  saving: boolean;
  addOffenderRights: boolean;
  editRights: boolean;
  deleteRights: boolean;
  onDelete: (id: string) => void;
  linkOffender: boolean;
  toggleLinkOffender: () => void;
  updateOffendersList: (value: OffenderData) => void;
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
  toggleSubscribe: () => void;
  confirmUpdateImages: (images: { id: string; url: string }[]) => void;
  addUpdateImages: (images: { id: string }[]) => void;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  closeAddImages: () => void;
  toggleSelectImages: (id: string) => void;
  selectedImages: string[];
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
  goodsMode: GoodsMode;
  editIncident: boolean;
  toggleEditIncident: () => void;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  addOffender: boolean;
  addExistingOffender: boolean;
  toggleAddOffender: () => void;
  toggleAddExistingOffender: () => void;
  editOffenderData: OffenderData | null;
  setEditOffenderData: (value: OffenderData | null) => void;
  onDeleteOffender: (id: string) => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  addGoods: boolean;
  toggleAddGoods: () => void;
  editGoodsData: GoodsData | null;
  setEditGoodsData: (value: GoodsData | null) => void;
  onDeleteGoods: (id: string) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onAddExistingVehicle: (id: string) => void;
  onEditOffender: (value: OffenderData) => void;
  onAddOffender: (value: OffenderData) => void;
  onAddExistingOffender: (id: string) => void;
  onEditGoods: (value: GoodsData) => void;
  onAddGoods: (value: GoodsData) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  addTodo: boolean;
  toggleAddTodo: () => void;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  hideIncident: boolean;
  userRole: Role;
}

const useViewIncident = (incidentId: string): Return => {
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const userId = useStoreState((state) => state.user.id);
  const {
    restrictIncidentAccess,
    id: schemeId,
    goodsMode,
  } = useStoreState((state) => state.scheme);
  const [saving, setSaving] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [addDocument, setAddDocument] = useState(false);

  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [editUpdateInput, setEditUpdateInput] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [addImages, setAddImages] = useState<
    | {
        id: string;
        url: string;
      }[]
    | null
  >(null);
  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
  const [addOffender, setAddOffender] = useState(false);
  const [addExistingOffender, setAddExistingOffender] = useState(false);
  const [editOffenderData, setEditOffenderData] = useState<OffenderData | null>(
    null
  );
  const [editIncident, setEditIncident] = useState(false);
  const [addVehicle, setAddVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState<VehicleData | null>(
    null
  );
  const [addGoods, setAddGoods] = useState(false);
  const [editGoodsData, setEditGoodsData] = useState<GoodsData | null>(null);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const [editImages, setEditImages] = useState(false);
  const [editImageData, setEditImageData] = useState<EditFeedImage | null>(
    null
  );

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };

  useEffect(() => {
    if (editUpdate) setEditUpdateInput(editUpdate.text);
  }, [editUpdate]);
  const variables = {
    where: {
      id: incidentId,
    },
  };
  const { data, loading } = useViewIncidentQuery({
    fetchPolicy: 'cache-and-network',
    variables,

    onCompleted: (res) => {
      setLightboxElements(
        res.incident?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });
  const getNotificationContent = (
    title: ProfileUpdatedModel,
    type: ProfileUpdatedType
  ) =>
    notification.success({
      message: intl.formatMessage(
        {
          defaultMessage: 'Successfully {type}!',
          id: 'cAM3G8',
        },
        { type }
      ),
      description: intl.formatMessage(
        {
          defaultMessage: 'The {title} of the incident have been {type}!',
          id: 'B5KlHg',
        },
        { title, type: type.toLocaleLowerCase() }
      ),
      placement: 'bottomRight',
    });

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Linked!',
          id: 'y2UHQ1',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The offenders have been Linked to this incidents!',
          id: 'fFQgTY',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });

  const updateOffendersList = (selectedOffender: OffenderData) => {
    setSaving(true);
    if (incidentId && selectedOffender) {
      void updateIncident({
        variables: {
          where: {
            id: incidentId,
          },
          data: {
            offenders: {
              connect: [{ id: selectedOffender.id }],
            },
          },
        },
      });
    }
    setSaving(false);
  };

  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been updated from the feed and moved to the recycle bin.',
          id: 'eWV47l',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
  });
  const onDelete = (id: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
        id: '2oCaym',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
        id: 'TNOl3z',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete', id: 'K3r6DQ' }),
      onOk() {
        void recycleIncident({
          variables: {
            where: { id },
          },
        });
      },
    });
  };
  // image
  const [updateIncidentImages] = useUpdateIncidentImagesMutation({
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

    void updateIncidentImages({
      variables: {
        id: incidentId,
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
      onCompleted: () => {
        getNotificationContent(
          ProfileUpdatedModel.Images,
          ProfileUpdatedType.updated
        );
      },
    }).finally(() => {
      setEditImages(false);
      setSaving(false);
    });
  };

  const onEditImage = (value: EditFeedImage) => {
    setSaving(true);
    if (value) {
      const findPrimaryId = data?.incident?.images.find(
        ({ primary }) => primary
      )?.id;

      const updateImages: ImageUpdateWithWhereUniqueWithoutIncidentInput[] = [
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
      ];

      if (findPrimaryId && value.primary && findPrimaryId !== value.id) {
        updateImages.push({
          where: {
            id: findPrimaryId,
          },
          data: {
            primary: { set: false },
          },
        });
      }

      void updateIncidentImages({
        variables: {
          id: incidentId,
          images: {
            update: updateImages,
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Image,
            ProfileUpdatedType.updated
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
    void updateIncidentImages({
      variables: {
        id: incidentId,
        images: {
          disconnect: [{ id: value }],
        },
      },
      onCompleted: () => {
        getNotificationContent(
          ProfileUpdatedModel.Image,
          ProfileUpdatedType.deleted
        );
      },
      update: (store, { data: res }) => {
        if (res?.updateIncident === null || res?.updateIncident === undefined)
          return;
        const existingData = store.readQuery<ViewIncidentQuery>({
          query: ViewIncidentDocument,
          variables,
        });

        if (!existingData?.incident) return;
        store.writeQuery<ViewIncidentQuery>({
          query: ViewIncidentDocument,
          data: {
            incident: {
              ...existingData.incident,
              images: existingData.incident.images.filter(
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
  // vehicle
  const [updateIncidentVehicles] = useUpdateIncidentVehiclesMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateVehicleList: MutationUpdaterFn<UpdateIncidentVehiclesMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.updateIncident === null || res?.updateIncident === undefined)
      return;

    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          vehicles: [
            ...existingData.incident.vehicles,
            ...res.updateIncident.vehicles,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const [updateVehicle] = useUpdateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateVehicle === null || res?.updateVehicle === undefined)
        return;
      const existingData = store.readQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        variables,
      });

      if (!existingData?.incident) return;
      const index = existingData?.incident?.vehicles
        .map((item) => item.id)
        .indexOf(res.updateVehicle.id);
      store.writeQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        data: {
          incident: {
            ...existingData.incident,
            vehicles: update(existingData.incident.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
              },
            }),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const onEditVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      const existingImageIds = editVehicleData?.images?.map(({ id }) => id);
      const deleteIds = existingImageIds?.filter(
        (id) => !value.images?.map((el) => el.id).includes(id)
      );
      void updateVehicle({
        variables: {
          where: {
            id: value.id,
          },
          data: {
            make: { set: value.make || '' },
            model: { set: value.model || '' },
            colour: { set: value.colour || '' },
            registration: { set: value.registration || '' },
            images:
              value.images && value.images.length > 0
                ? {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.updated
          );
        },
      }).finally(() => {
        setEditVehicleData(null);
        setSaving(false);
      });
    }
  };
  const [createVehicle] = useCreateSimpleVehicleMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createVehicle === null || res?.createVehicle === undefined)
        return;
      const existingData = store.readQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        variables,
      });

      if (!existingData?.incident) return;
      store.writeQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        data: {
          incident: {
            ...existingData.incident,
            vehicles: [...existingData.incident.vehicles, res.createVehicle],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const onAddVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        variables: {
          data: {
            make: value.make || '',
            model: value.model || '',
            colour: value.colour || '',
            registration: value.registration || '',
            incidents: [{ id: incidentId }],
            schemes: schemeId,
            image:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.added
          );
        },
      }).finally(() => {
        setAddVehicle(false);
        setSaving(false);
      });
    }
  };
  const onAddExistingVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentVehicles({
        variables: {
          id: incidentId,
          vehicles: {
            connect: [{ id: value }],
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.added
          );
        },
        update: updateVehicleList,
      }).finally(() => {
        setAddExistingVehicle(false);
        setSaving(false);
      });
  };
  const onDeleteVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentVehicles({
        variables: {
          id: incidentId,
          vehicles: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedType.deleted
          );
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;
          const existingData = store.readQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            variables,
          });

          if (!existingData?.incident) return;
          store.writeQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            data: {
              incident: {
                ...existingData.incident,
                vehicles: existingData.incident.vehicles.filter(
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

  const [updateIncidentOffenders] = useUpdateIncidentOffendersMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateOffenderList: MutationUpdaterFn<
    UpdateIncidentOffendersMutation
  > = (store, { data: res }) => {
    if (res?.updateIncident === null || res?.updateIncident === undefined)
      return;

    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          offenders: [
            ...existingData.incident.offenders,
            ...res.updateIncident.offenders,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const [updateOffender] = useUpdateSimpleOffenderMutation({
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.updateOffender === null || res?.updateOffender === undefined)
        return;
      const existingData = store.readQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        variables,
      });
      if (!existingData?.incident) return;
      const index = existingData?.incident?.offenders
        .map((item) => item.id)
        .indexOf(res.updateOffender.id);

      store.writeQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        data: {
          incident: {
            ...existingData.incident,
            offenders: update(existingData.incident.offenders, {
              [index]: {
                $set: { ...res.updateOffender },
              },
            }),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });
  const onEditOffender = (value: OffenderData) => {
    setSaving(true);
    if (value) {
      const existingImageIds = editOffenderData?.images?.map(({ id }) => id);
      const deleteIds = existingImageIds?.filter(
        (id) => !value.images?.map((el) => el.id).includes(id)
      );

      void updateOffender({
        variables: {
          where: {
            id: value.id,
          },
          data: {
            name: { set: value.name },
            gender: { set: value.gender || null },
            race: { set: value.race || null },
            build: { set: value.build || null },
            hair: { set: value.hair || 'Unknown' },
            peculiarities: { set: value.peculiarities || '' },
            age: { set: value.age || null },
            dateSource: { set: value.dateSource || null },
            dateOfBirth: { set: value.dateOfBirth || null },
            groups: {
              set:
                value.groups && value.groups.length > 0
                  ? value.groups.map(({ id }) => ({ id }))
                  : undefined,
            },
            images:
              value.images && value.images.length > 0
                ? {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedType.updated
          );
        },
        // update: updateOffenderList,
      }).finally(() => {
        setEditOffenderData(null);
        setSaving(false);
      });
    }
  };
  const [createOffender] = useCreateSimpleOffenderMutation({
    onCompleted: () => {
      getNotificationContent(
        ProfileUpdatedModel.Offender,
        ProfileUpdatedType.added
      );
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.createOffender === null || res?.createOffender === undefined)
        return;
      const existingData = store.readQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        variables,
      });

      if (!existingData?.incident) return;
      store.writeQuery<ViewIncidentQuery>({
        query: ViewIncidentDocument,
        data: {
          incident: {
            ...existingData.incident,
            offenders: [...existingData.incident.offenders, res.createOffender],
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const onAddOffender = (value: OffenderData) => {
    setSaving(true);
    if (value) {
      void createOffender({
        variables: {
          data: {
            name: value.name,
            gender: value.gender || null,
            race: value.race || null,
            build: value.build || null,
            height: value.height || null,
            hair: value.hair || null,
            peculiarities: value.peculiarities || null,
            comment: value.comment || null,
            age: value.age || null,
            dateSource: value.dateSource || null,
            dateOfBirth: value.dateOfBirth || null,
            groups: {
              connect:
                value.groups && value.groups.length > 0
                  ? value.groups.map(({ id }) => ({ id }))
                  : data?.incident?.groups.map(({ id }) => ({ id })),
            },
            scheme: schemeId,
            incidentId,
            // createdBy: { connect: { id: userId } },
            // localId: value.id,
            image:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    upload: value.images
                      ?.filter((image) => image.new)
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
          },
        },
      }).finally(() => {
        setAddOffender(false);
        setSaving(false);
      });
    }
  };
  const onAddExistingOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentOffenders({
        variables: {
          id: incidentId,
          offenders: {
            connect: [{ id: value }],
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedType.added
          );
        },
        update: updateOffenderList,
      }).finally(() => {
        setAddExistingOffender(false);
        setSaving(false);
      });
  };
  const onDeleteOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentOffenders({
        variables: {
          id: incidentId,
          offenders: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Offender,
            ProfileUpdatedType.added
          );
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;
          const existingData = store.readQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            variables,
          });

          if (!existingData?.incident) return;
          store.writeQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            data: {
              incident: {
                ...existingData.incident,
                offenders: existingData.incident.offenders.filter(
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
  const [updateIncidentGoods] = useUpdateIncidentGoodsMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateGoodsList: MutationUpdaterFn<UpdateIncidentGoodsMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.updateIncident === null || res?.updateIncident === undefined)
      return;

    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          incidentItems: [
            ...existingData.incident.incidentItems,
            ...res.updateIncident.incidentItems,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const onEditGoods = (value: GoodsData) => {
    setSaving(true);
    if (value)
      void updateIncidentGoods({
        variables: {
          id: incidentId,
          incidentItems: {
            update: [
              {
                where: {
                  id: value.id,
                },
                data: {
                  goodsType: {
                    connect: {
                      id: value.goodsTypeId,
                    },
                  },
                  name: { set: value.name },
                  value: { set: value.value || 0 },
                  recoveredValue: { set: value.recoveredValue || 0 },
                },
              },
            ],
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedType.updated
          );
        },
        // update: updateGoodsList,
      }).finally(() => {
        setEditGoodsData(null);
        setSaving(false);
      });
  };
  const onAddGoods = (value: GoodsData) => {
    setSaving(true);
    if (value) {
      void updateIncidentGoods({
        variables: {
          id: incidentId,
          incidentItems: {
            create: [
              {
                goodsType: {
                  connect: {
                    id: value.goodsTypeId,
                  },
                },
                name: value.name,
                value: value.value || 0,
                recoveredValue: value.recoveredValue || 0,
              },
            ],
          },
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedType.added
          );
        },
        update: updateGoodsList,
      }).finally(() => {
        setAddGoods(false);
        setSaving(false);
      });
    }
  };
  const onDeleteGoods = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentGoods({
        variables: {
          id: incidentId,
          incidentItems: {
            deleteMany: [
              {
                id: {
                  equals: value,
                },
              },
            ],
          },
        },
        onError: () => {
          setSaving(false);
        },
        onCompleted: () => {
          getNotificationContent(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedType.deleted
          );
          setSaving(false);
        },
        update: (store, { data: res }) => {
          if (res?.updateIncident === null || res?.updateIncident === undefined)
            return;
          const existingData = store.readQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            variables,
          });

          if (!existingData?.incident) return;
          store.writeQuery<ViewIncidentQuery>({
            query: ViewIncidentDocument,
            data: {
              incident: {
                ...existingData.incident,
                incidentItems: existingData.incident.incidentItems.filter(
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

  // todo
  const updateTodoList: MutationUpdaterFn<CreateTodoMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createTodo === null || res?.createTodo === undefined) return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          todos: [...existingData.incident.todos, res.createTodo],
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocument === null || res?.createDocument === undefined)
      return;
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          evidence: [...existingData.incident.evidence, res.createDocument],
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
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      data: {
        incident: {
          ...existingData.incident,
          evidence: existingData.incident.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [unsubscribeFromIncident] = useUnsubscribeFromIncidentMutation();

  const toggleSubscribe = () => {
    if (data?.incident?.subscribed) {
      void unsubscribeFromIncident({
        variables: {
          where: { id: incidentId },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromIncident: {
            id: incidentId,
            __typename: 'Incident',
            subscribed: false,
          },
        },
      });
    } else {
      void subscribeToIncident({
        variables: {
          where: { id: incidentId },
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
  };

  const [addImagesToIncident] = useAddImagesToIncidentMutation();

  const addUpdateImages = (images: { id: string }[]) => {
    void addImagesToIncident({
      variables: {
        images,
        incident: {
          id: incidentId,
        },
      },
    });
    setAddImages(null);
    setSelectedImages([]);
  };

  const confirmUpdateImages = (images: { id: string; url: string }[]) => {
    if (images.length > 1) {
      setAddImages(images);
    } else {
      confirm({
        title: intl.formatMessage({
          defaultMessage: 'Are you sure?',
          id: '2oCaym',
        }),
        content: intl.formatMessage({
          defaultMessage:
            'Adding this image will notify any other users following the incident.',
          id: 'qfS4of',
        }),
        onOk() {
          addUpdateImages(images.map(({ id }) => ({ id })));
        },
        okText: intl.formatMessage({
          defaultMessage: 'Add Images',
          id: 'b4GGYZ',
        }),
      });
    }
  };

  const closeAddImages = () => {
    setAddImages(null);
  };

  const toggleSelectImages = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
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
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.incident.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
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
                        updates: update(oldData.incident.updates, {
                          [oldData.incident.updates
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
                  }
                );
              }
            } else {
              store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
                  },
                },
                data: {
                  incident: {
                    ...oldData.incident,
                    updates: oldData.incident.updates.filter(
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

  // function
  const toggleLinkOffender = () => {
    setLinkOffender(!linkOffender);
  };

  const scrolledToTop = () => {
    setLoadMore(true);
  };
  const toggleEditIncident = () => {
    setEditIncident(!editIncident);
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
  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddGoods = () => {
    setAddGoods(!addGoods);
  };
  const toggleAddTodo = () => {
    setAddTodo(!addTodo);
  };
  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };

  return {
    addImages,
    addOffenderRights: role !== Role.User,
    addUpdateImages,
    closeAddImages,
    confirmDeleteUpdate,
    confirmUpdateImages,
    data,
    deleteRights: role !== Role.User,
    // ||(userId === data?.incident?.createdBy.id && !data?.incident?.approved),
    editRights: role !== Role.User,
    editUpdate,
    editUpdateInput,
    handleEditUpdate,
    lightboxElements,
    linkOffender,
    loadMore,
    loading: (data === null || data === undefined) && loading,
    onDelete,
    replyTo,
    saving,
    scrolledToTop,
    selectedImages,
    setEditUpdate,
    setEditUpdateInput,
    setReplyTo,
    toggleLinkOffender,
    toggleSelectImages,
    toggleSubscribe,
    updateOffendersList,
    userId,
    openLightbox,
    lightBoxOpen,
    optionRowShow,
    setOptionRowShow,
    goodsMode,
    editIncident,
    toggleEditIncident,
    addOffender,
    addExistingOffender,
    editOffenderData,
    setEditOffenderData,
    onDeleteOffender,
    toggleAddOffender,
    toggleAddExistingOffender,
    addVehicle,
    addExistingVehicle,
    editVehicleData,
    setEditVehicleData,
    onDeleteVehicle,
    toggleAddVehicle,
    toggleAddExistingVehicle,
    addGoods,
    editGoodsData,
    setEditGoodsData,
    onDeleteGoods,
    toggleAddGoods,
    editImages,
    toggleEditImages,
    editImageData,
    setEditImageData,
    onDeleteImage,
    onEditImage,
    onUpdateImages,
    onEditVehicle,
    onAddVehicle,
    onAddExistingVehicle,
    onEditGoods,
    onAddGoods,
    onEditOffender,
    onAddOffender,
    onAddExistingOffender,
    addTodo,
    toggleAddTodo,
    updateTodoList,
    addDocument,
    toggleAddDocument,
    updateDocumentList,
    updateDeleteDocument,
    hideIncident: role === Role.User && restrictIncidentAccess,
    userRole: role,
  };
};

export default useViewIncident;
