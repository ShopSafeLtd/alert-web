import type { CreateBlurFacesMutation } from '#/components/ViewPage/ImagesList/graphql/create_blur_faces.generated';
import type { UpdateTaskMutation } from '#/components/form-components/Todos/ViewTodo/graphql/update-todo.generated';
import type { QuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { CreateDocumentMutation } from 'graphql/documents/mutations/create-document.generated';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/delete-document.generated';
import type { UpdateIncidentGoodsMutation } from 'graphql/incidents/mutations/update/update-incident-goods.generated';
import type { ListIncidentsAllSchemesQuery } from 'graphql/incidents/queries/list-incidents-all-schemes.generated';
import type {
  ViewIncidentQuery,
  ViewIncidentQueryVariables,
} from 'graphql/incidents/queries/view-incident.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/create-investigations.generated';
import type { CreateSimpleOffenderMutation } from 'graphql/offenders/mutations/create-simple-offender.generated';
import type { UpdateSimpleOffenderMutation } from 'graphql/offenders/mutations/update-simple-offender.generated';
import type { CreateTodoMutation } from 'graphql/todos/mutations/create-todo.generated';
import type {
  GoodsMode,
  ImageUpdateWhereDataWithoutIncidentInput,
  LanguageCode,
} from 'graphql/types';
import type {
  EditFeedImage,
  GoodsData,
  ImageCardData,
  LocationData,
  OffenderData,
  VehicleData,
} from 'types/DataType';

import hasPermission from '#/utils/has-permission';
import { useQuestionGroupOnSchemeQuery } from '#/views/adminTodo/graphql/queries/listTemplates.generated';
import { Modal, notification } from 'antd';
import { useAddImagesToIncidentMutation } from 'graphql/incidents/mutations/add-images-to-incident.generated';
import { useRecycleIncidentMutation } from 'graphql/incidents/mutations/recycle-incident.generated';
import { useSubscribeToIncidentMutation } from 'graphql/incidents/mutations/subscribe-to-incident.generated';
import { useUnsubscribeFromIncidentMutation } from 'graphql/incidents/mutations/unsubscribe-from-incident.generated';
import { useUpdateIncidentGoodsMutation } from 'graphql/incidents/mutations/update/update-incident-goods.generated';
import { useUpdateIncidentImagesMutation } from 'graphql/incidents/mutations/update/update-incident-images.generated';
import { useUpdateIncidentLocationMutation } from 'graphql/incidents/mutations/update/update-incident-location.generated';
import { useUpdateIncidentOffendersMutation } from 'graphql/incidents/mutations/update/update-incident-offenders.generated';
import { useUpdateIncidentVehiclesMutation } from 'graphql/incidents/mutations/update/update-incident-vehicles.generated';
import { useUpdateIncidentMutation } from 'graphql/incidents/mutations/update-incident.generated';
import { ListIncidentsAllSchemesDocument } from 'graphql/incidents/queries/list-incidents-all-schemes.generated';
import {
  ViewIncidentDocument,
  useViewIncidentQuery,
} from 'graphql/incidents/queries/view-incident.generated';
import { useDeleteUpdateMutation } from 'graphql/mutations/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/update-update.generated';
import { useAddImagesToOffenderMutation } from 'graphql/offenders/mutations/add-images-to-offender.generated';
import { useTranslateLazyQuery } from 'graphql/translate/queries/translate.generated';
import {
  PermissionMethod,
  PermissionModel,
  QueryMode,
  Role,
  SortOrder,
} from 'graphql/types';
import { useCreateSimpleVehicleMutation } from 'graphql/vehicles/mutations/create-simple-vehicle.generated';
import { useUpdateSimpleVehicleMutation } from 'graphql/vehicles/mutations/update-simple-vehicle.generated';
import update from 'immutability-helper';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { IncidentSort, useStoreState } from 'state';
import {
  ProfileUpdatedModel,
  ProfileUpdatedType,
} from 'types/enums/profile-update-type';
import errorNotification from 'types/mutation_notifications/error_notification';
import successNotification from 'types/mutation_notifications/success_notification';

const { confirm } = Modal;

interface Return {
  addDocument: boolean;
  addExistingOffender: boolean;
  addExistingVehicle: boolean;
  addGoods: boolean;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  addInvestigation: boolean;
  addOffender: boolean;
  addOffenderRights: boolean;
  addTodo: boolean;
  addVehicle: boolean;
  closeAddImages: () => void;
  completeTodoVisible: null | string;
  confirmDeleteUpdate: (updateId: string) => void;
  data: ViewIncidentQuery | undefined;
  deleteRights: boolean;
  editAddress: boolean;
  editGoodsData: GoodsData | null;
  editImageData: EditFeedImage | null;
  editImages: boolean;
  editIncident: boolean;
  editOffenderData: OffenderData | null;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  editVehicleData: VehicleData | null;
  facialDetection: boolean;
  goodsMode: GoodsMode;
  handleEditUpdate: () => void;
  hasConnectedSchemes: boolean;
  hideIncident: boolean;
  isTranslated: null | string;
  languageCount: number;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  linkOffender: boolean;
  loadMore: boolean;
  loading: boolean;
  onAddExistingOffender: (id: string) => void;
  onAddExistingVehicle: (id: string) => void;
  onAddGoods: (value: GoodsData[]) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToOffender?: boolean
  ) => void;
  onAddUpdateImagesToOffender: (id: string) => void;
  onAddVehicle: (value: VehicleData) => void;
  onCompletedAddOffender: () => void;
  onCompletedEditOffender: () => void;
  onDelete: (id: string) => void;
  onDeleteGoods: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeleteOffender: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onEditGoods: (value: GoodsData) => void;
  onEditImage: (id: EditFeedImage) => void;
  onEditVehicle: (value: VehicleData) => void;
  onSelectUpdateImages: () => void;
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
  selectedImages: string[];
  selectedOffenderId: string;
  setCompleteTodoVisible: (value: null | string) => void;
  setEditGoodsData: (value: GoodsData | null) => void;
  setEditImageData: (value: EditFeedImage | null) => void;
  setEditOffenderData: (value: OffenderData | null) => void;
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  setEditUpdateInput: (value: string) => void;
  setEditVehicleData: (value: VehicleData | null) => void;
  setOptionRowShow: (value: boolean) => void;
  setReplyTo: (
    value: {
      createdAt: string;
      createdBy: string;
      id: string;
      text: string;
    } | null
  ) => void;
  setSelectedOffenderId: (id: string) => void;
  setViewTodoVisible: (value: null | string) => void;
  shareOpen: boolean;
  showOffenderOptions: boolean;
  templatesData: QuestionGroupOnSchemeQuery | undefined;
  templatesLoading: boolean;
  toggleAddDocument: () => void;
  toggleAddExistingOffender: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddGoods: () => void;
  toggleAddInvestigation: () => void;
  toggleAddOffender: () => void;
  toggleAddTodo: () => void;
  toggleAddVehicle: () => void;
  toggleEditAddress: () => void;
  toggleEditImages: () => void;
  toggleEditIncident: () => void;
  toggleLinkOffender: () => void;
  toggleSelectImages: (id: string) => void;
  toggleShareOpen: () => void;
  toggleShowOffenderOptions: () => void;
  toggleSubscribe: () => void;
  translateText: () => Promise<void>;
  updateAddOffenderList: MutationUpdaterFn<CreateSimpleOffenderMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateEditOffenderList: MutationUpdaterFn<UpdateSimpleOffenderMutation>;
  updateImagesList: MutationUpdaterFn<CreateBlurFacesMutation>;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  updateOffendersList: (value: OffenderData) => void;
  updateTodo: MutationUpdaterFn<UpdateTaskMutation>;
  updateTodoList: MutationUpdaterFn<CreateTodoMutation>;
  userId: string;
  userRole: Role;
  viewTodoVisible: null | string;
}

const useViewIncident = (incidentId: string): Return => {
  const intl = useIntl();
  const role = useStoreState((state) => state.user.role);
  const {
    facialDetection,
    goodsMode,
    id: schemeId,
    languageCount,
    restrictIncidentAccess,
  } = useStoreState((state) => state.scheme);
  const { id: userId, schemes } = useStoreState((state) => state.user);

  const filterVariables = useStoreState(
    (state) => state.data.incidents.variables
  );
  const order = useStoreState((state) => state.data.incidents.order);

  const hasConnectedSchemes = useStoreState(
    (state) => state.scheme.hasConnectedSchemes
  );
  const currentScheme = useMemo(
    () => schemes.find((scheme) => scheme.scheme.id === schemeId),
    [schemes, schemeId]
  );
  const permissions = currentScheme?.permissions;

  const [shareOpen, setShareOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [linkOffender, setLinkOffender] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [addTodo, setAddTodo] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
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
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
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
    index: 0,
    open: false,
  });
  const [editImages, setEditImages] = useState(false);
  const [editImageData, setEditImageData] = useState<EditFeedImage | null>(
    null
  );
  const [viewTodoVisible, setViewTodoVisible] = useState<null | string>(null);
  const [completeTodoVisible, setCompleteTodoVisible] = useState<null | string>(
    null
  );
  const [showOffenderOptions, setShowOffenderOptions] = useState(false);
  const [addImageToOffenders, setAddImageToOffenders] = useState(false);
  const [selectedOffenderId, setSelectedOffenderId] = useState<string>('');

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
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
    onCompleted: (res) => {
      setLightboxElements(
        res.incident?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },

    variables: {
      where: {
        id: incidentId,
      },
    },
  });

  const { data: templatesData, loading: templatesLoading } =
    useQuestionGroupOnSchemeQuery({
      variables: {
        questionGroupsWhere: {
          defaultForIncidents: {
            equals: true,
          },
        },
        where: {
          id: schemeId,
        },
      },
    });

  const [updateIncident] = useUpdateIncidentMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The offenders have been Linked to this incidents!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Linked!',
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
          data: {
            offenders: {
              connect: [{ id: selectedOffender.id }],
            },
          },
          where: {
            id: incidentId,
          },
        },
      });
    }
    setSaving(false);
  };

  const {
    businesses,
    createdAt,
    crimeTypes,
    gallery,
    goods,
    groups,
    incidentDate,
    peculiarities,
    search,
  } = filterVariables;
  const sideListVars = {
    order: {
      date:
        order === IncidentSort.createdAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    skip: 0,
    take: 12,
    where: {
      AND: [
        {
          OR: [
            {
              subject: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              referenceStr: {
                contains: search,
              },
            },
            {
              createdBy: {
                OR: [
                  {
                    fullName: {
                      contains: search,
                      mode: QueryMode.Insensitive,
                    },
                  },

                  {
                    businesses: {
                      some: {
                        name: {
                          contains: search,
                          mode: QueryMode.Insensitive,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
        {
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
        },
      ],
      approved:
        role === Role.User
          ? {
              equals: true,
            }
          : gallery.includes('NOT APPROVED')
            ? {
                equals: false,
              }
            : undefined,
      business:
        businesses.length > 0
          ? {
              id: {
                in: businesses,
              },
            }
          : undefined,
      createdAt: createdAt
        ? {
            gte: createdAt.startDate,
            lte: createdAt.endDate,
          }
        : undefined,
      crimeTypes:
        crimeTypes.length > 0
          ? {
              some: {
                id: {
                  in: crimeTypes,
                },
              },
            }
          : undefined,
      date: incidentDate
        ? {
            gte: incidentDate.startDate,
            lte: incidentDate.endDate,
          }
        : undefined,
      description: peculiarities
        ? {
            contains: peculiarities,
            mode: QueryMode.Insensitive,
          }
        : undefined,
      groups:
        groups.length > 0
          ? {
              some: {
                id: {
                  in: groups,
                },
              },
            }
          : undefined,
      incidentItems:
        goods.length > 0
          ? {
              some: {
                goodsType: {
                  id: {
                    in: goods,
                  },
                },
              },
            }
          : undefined,

      policeInvolved: gallery.includes('POLICEINVOLVED')
        ? {
            equals: true,
          }
        : undefined,
      policeReported: gallery.includes('POLICEREPORTED')
        ? {
            equals: true,
          }
        : undefined,
      schemeId: {
        equals: schemeId,
      },

      subscribedUsers: gallery.includes('FOLLOWING')
        ? {
            some: {
              id: {
                equals: userId,
              },
            },
          }
        : undefined,
    },
  };

  const [recycleIncident] = useRecycleIncidentMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The incident has been updated from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res?.recycleIncident === null || res?.recycleIncident === undefined)
        return;
      const existingData = store.readQuery<ListIncidentsAllSchemesQuery>({
        query: ListIncidentsAllSchemesDocument,
        variables: sideListVars,
      });

      if (!existingData?.listIncidentsAllSchemes?.incidents) return;

      store.writeQuery<ListIncidentsAllSchemesQuery>({
        data: {
          __typename: 'Query',
          listIncidentsAllSchemes: {
            ...existingData.listIncidentsAllSchemes,
            incidents: existingData.listIncidentsAllSchemes.incidents.filter(
              ({ id }) => id !== incidentId
            ),
          },
        },
        query: ListIncidentsAllSchemesDocument,
        variables: sideListVars,
      });
    },
  });
  const onDelete = (id: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click delete if you wish to delete this incident. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({ defaultMessage: 'Delete' }),
      onOk() {
        void recycleIncident({
          variables: {
            where: { id },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
      }),
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
      onCompleted: () => {
        successNotification(
          ProfileUpdatedModel.Images,
          ProfileUpdatedModel.Incident,
          ProfileUpdatedType.updated
        );
      },
      variables: {
        id: incidentId,
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
                    totalFaces: { set: item.totalFaces },
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
                    totalFaces: item.totalFaces || 0,
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

      const updateImages: ImageUpdateWhereDataWithoutIncidentInput[] = [
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
      ];

      if (findPrimaryId && value.primary && findPrimaryId !== value.id) {
        updateImages.push({
          data: {
            primary: { set: false },
          },
          where: {
            id: findPrimaryId,
          },
        });
      }

      void updateIncidentImages({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Image,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          images: {
            update: updateImages,
          },
        },
      }).finally(() => {
        setEditImageData(null);
        setSaving(false);
      });
    }
  };
  const onDeleteImage = (value: string) => {
    setSaving(false);
    void updateIncidentImages({
      onCompleted: () => {
        successNotification(
          ProfileUpdatedModel.Image,
          ProfileUpdatedModel.Incident,
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
          data: {
            __typename: 'Query',
            incident: {
              ...existingData.incident,
              images: existingData.incident.images.filter(
                ({ id }) => id !== value
              ),
            },
          },
          query: ViewIncidentDocument,
          variables,
        });
      },
      variables: {
        id: incidentId,
        images: {
          disconnect: [{ id: value }],
        },
      },
    });
  };
  const updateImagesList: MutationUpdaterFn<CreateBlurFacesMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createBlurFaces === null || res?.createBlurFaces === undefined)
      return;

    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    const findIndex = existingData.incident.images.findIndex(
      ({ id }) => id === res.createBlurFaces.id
    );
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',

        incident: update<ViewIncidentQuery['incident']>(existingData.incident, {
          images: {
            [findIndex]: {
              $set: {
                ...res.createBlurFaces,
              },
            },
          },
        }),
      },
      query: ViewIncidentDocument,
      variables,
    });
  };
  // vehicle
  const [updateIncidentVehicles] = useUpdateIncidentVehiclesMutation({
    onError: () => {
      errorNotification();
    },
  });

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
        data: {
          __typename: 'Query',
          incident: {
            ...existingData.incident,
            vehicles: update(existingData.incident.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
              },
            }),
          },
        },
        query: ViewIncidentDocument,
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
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          data: {
            colour: { set: value.colour || '' },
            images:
              value.images && value.images.length > 0
                ? {
                    connect: value.images
                      ?.filter((image) => !image.new)
                      .map((image) => ({
                        id: image.id,
                      })),
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                    upload: value.images
                      ?.filter((image) => image.new)
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {
                    delete:
                      deleteIds && deleteIds.length > 0
                        ? deleteIds.map((id) => ({ id }))
                        : undefined,
                  },
            make: { set: value.make || '' },
            model: { set: value.model || '' },
            registration: { set: value.registration || '' },
          },
          where: {
            id: value.id,
          },
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
        data: {
          __typename: 'Query',
          incident: {
            ...existingData.incident,
            vehicles: [...existingData.incident.vehicles, res.createVehicle],
          },
        },
        query: ViewIncidentDocument,
        variables,
      });
    },
  });
  const onAddVehicle = (value: VehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
        },
        variables: {
          data: {
            colour: value.colour || '',
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
                      .filter((obj) => obj.url !== undefined),
                  }
                : {},
            incidents: [{ id: incidentId }],
            make: value.make || '',
            model: value.model || '',
            registration: value.registration || '',
            schemes: schemeId,
          },
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
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
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
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                vehicles: res.updateIncident.vehicles,
              },
            },
            query: ViewIncidentDocument,
            variables,
          });
        },
        variables: {
          id: incidentId,
          vehicles: {
            connect: [{ id: value }],
          },
        },
      }).finally(() => {
        setAddExistingVehicle(false);
        setSaving(false);
      });
  };
  const onDeleteVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentVehicles({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Vehicle,
            ProfileUpdatedModel.Incident,
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
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                vehicles: existingData.incident.vehicles.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewIncidentDocument,
            variables,
          });
        },
        variables: {
          id: incidentId,
          vehicles: { disconnect: [{ id: value }] },
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  // offender
  const [updateIncidentOffenders] = useUpdateIncidentOffendersMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateEditOffenderList: MutationUpdaterFn<
    UpdateSimpleOffenderMutation
  > = (store, { data: res }) => {
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
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          offenders: update(existingData.incident.offenders, {
            [index]: {
              $set: { ...res.updateOffender },
            },
          }),
        },
      },
      query: ViewIncidentDocument,
      variables,
    });
  };

  const onCompletedEditOffender = () =>
    notification.success({
      description: intl.formatMessage({
        defaultMessage: 'The offender has been updated on the incident!',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Successfully updated!',
      }),
      placement: 'bottomRight',
    });
  // const [updateOffender] = useUpdateSimpleOffenderMutation({
  //   onError: () => {
  //     errorNotification();
  //   },
  //   update: (store, { data: res }) => {
  //     if (res?.updateOffender === null || res?.updateOffender === undefined)
  //       return;
  //     const existingData = store.readQuery<ViewIncidentQuery>({
  //       query: ViewIncidentDocument,
  //       variables,
  //     });
  //     if (!existingData?.incident) return;
  //     const index = existingData?.incident?.offenders
  //       .map((item) => item.id)
  //       .indexOf(res.updateOffender.id);

  //     store.writeQuery<ViewIncidentQuery>({
  //       query: ViewIncidentDocument,
  //       data: {
  //         incident: {
  //           ...existingData.incident,
  //           offenders: update(existingData.incident.offenders, {
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
  //           knownFor: { set: value.knownFor },
  //           targetedGoods: { set: value.targetedGoods },
  //           alias: { set: value.alias },
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
  //       // onCompleted: () => {
  //       //   successNotification(
  //       //     ProfileUpdatedModel.Offender,
  //       //     ProfileUpdatedModel.Incident,
  //       //     ProfileUpdatedType.updated
  //       //   );
  //       // },
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
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          offenders: [...existingData.incident.offenders, res.createOffender],
        },
      },
      query: ViewIncidentDocument,
      variables,
    });
  };
  const onCompletedAddOffender = () =>
    notification.success({
      description: intl.formatMessage({
        defaultMessage: 'The offender has been added to the incident!',
      }),
      message: intl.formatMessage({
        defaultMessage: 'Successfully added!',
      }),
      placement: 'bottomRight',
    });

  const onAddExistingOffender = (value: string) => {
    setSaving(true);
    if (value)
      void updateIncidentOffenders({
        onCompleted: () => {
          onCompletedAddOffender();
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
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                offenders: res.updateIncident.offenders,
              },
            },
            query: ViewIncidentDocument,
            variables,
          });
        },
        variables: {
          id: incidentId,
          offenders: {
            connect: [{ id: value }],
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
      void updateIncidentOffenders({
        onCompleted: () => {
          onCompletedAddOffender();
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
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                offenders: existingData.incident.offenders.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewIncidentDocument,
            variables,
          });
        },
        variables: {
          id: incidentId,
          offenders: { disconnect: [{ id: value }] },
        },
      }).finally(() => {
        setSaving(false);
      });
  };

  // goods
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
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          incidentItems: res.updateIncident.incidentItems,
        },
      },
      query: ViewIncidentDocument,
      variables,
    });
  };
  const onEditGoods = (item: GoodsData) => {
    setSaving(true);
    if (item)
      void updateIncidentGoods({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          incidentItems: {
            update: [
              {
                data: {
                  goodsType: item.goodsType
                    ? {
                        connect: {
                          id: item.goodsType,
                        },
                      }
                    : undefined,
                  name: { set: item.name },
                  quantity: { set: item.quantity || 0 },
                  recoveredQuantity: { set: item.recoveredQuantity || 0 },
                  recoveredValue: { set: item.recoveredValue || 0 },
                  sku: { set: item.sku },
                  stockItem: item.stockItem
                    ? {
                        connect: {
                          id: item.stockItem,
                        },
                      }
                    : undefined,
                  value: { set: item.value || 0 },
                },
                where: {
                  id: item.id,
                },
              },
            ],
          },
        },
        // update: updateGoodsList,
      }).finally(() => {
        setEditGoodsData(null);
        setSaving(false);
      });
  };
  const onAddGoods = (values: GoodsData[]) => {
    setSaving(true);
    if (values) {
      void updateIncidentGoods({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.added
          );
        },
        update: updateGoodsList,
        variables: {
          id: incidentId,
          incidentItems: {
            create: values.map((item) => ({
              goodsType: item.goodsType
                ? {
                    connect: {
                      id: item.goodsType,
                    },
                  }
                : undefined,
              name: item.name,
              quantity: item.quantity,
              recoveredQuantity: item.recoveredQuantity,
              recoveredValue: item.recoveredValue,
              sku: item.sku,
              stockItem: item.stockItem
                ? {
                    connect: {
                      id: item.stockItem,
                    },
                  }
                : undefined,
              value: item.value,
            })),
          },
        },
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
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Incident_Item,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.deleted
          );
          setSaving(false);
        },
        onError: () => {
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
            data: {
              __typename: 'Query',
              incident: {
                ...existingData.incident,
                incidentItems: existingData.incident.incidentItems.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewIncidentDocument,
            variables,
          });
        },
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
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          todos: [...existingData.incident.todos, res.createTodo],
        },
      },
      query: ViewIncidentDocument,
      variables,
    });
  };

  const updateTodo: MutationUpdaterFn<UpdateTaskMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;
    if (res.updateTodo === null || res.updateTodo === undefined) return;
    // get existing group list data from Apollo store
    const existingData = store.readQuery<
      ViewIncidentQuery,
      ViewIncidentQueryVariables
    >({
      query: ViewIncidentDocument,
      variables,
    });

    if (existingData === null) return;
    if (existingData?.incident?.todos === undefined) return;

    store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
      data: {
        __typename: 'Query',
        incident: update<ViewIncidentQuery['incident']>(existingData.incident, {
          todos: {
            [existingData.incident.todos.findIndex(
              ({ id }) => id === res.updateTodo?.id
            )]: {
              $set: res.updateTodo,
            },
          },
        }),
      },
      query: ViewIncidentDocument,
      // data: {
      //   incident: {
      //     ...existingData.incident,
      //     todos: update(existingData.incident.todos, {
      //       [todoIndex]: {
      //         $set: {
      //           ...existingData.incident.todos[todoIndex],
      //           ...res.updateTodo,
      //         },
      //       },
      //     }),
      //   },

      //   __typename: 'Query',
      // },
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
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          evidence: [...existingData.incident.evidence, res.createDocument],
        },
      },
      query: ViewIncidentDocument,
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
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          evidence: existingData.incident.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
      },
      query: ViewIncidentDocument,
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
    const existingData = store.readQuery<ViewIncidentQuery>({
      query: ViewIncidentDocument,
      variables,
    });

    if (!existingData?.incident) return;
    store.writeQuery<ViewIncidentQuery>({
      data: {
        __typename: 'Query',
        incident: {
          ...existingData.incident,
          investigations: [
            ...existingData.incident.investigations,
            res.createInvestigation,
          ],
        },
      },
      query: ViewIncidentDocument,
      variables,
    });
  };

  // location
  const [updateIncidentLocation] = useUpdateIncidentLocationMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onEditAddress = (value: LocationData) => {
    setSaving(true);
    if (value)
      void updateIncidentLocation({
        onCompleted: () => {
          successNotification(
            ProfileUpdatedModel.Address,
            ProfileUpdatedModel.Incident,
            ProfileUpdatedType.updated
          );
        },
        variables: {
          id: incidentId,
          location: {
            create: {
              building: value.building,
              county: value.county,
              geoLat: value.geoLat || undefined,
              geoLng: value.geoLng || undefined,
              postcode: value.postcode,
              premises: '',
              street: value.street,
              townCity: value.townCity,
            },
          },
        },
        // update: updateGoodsList,
      }).finally(() => {
        setEditAddress(false);
        setSaving(false);
      });
  };
  // const onPiNLocation =

  const [subscribeToIncident] = useSubscribeToIncidentMutation();
  const [unsubscribeFromIncident] = useUnsubscribeFromIncidentMutation();

  const toggleSubscribe = () => {
    if (data?.incident?.subscribed) {
      void unsubscribeFromIncident({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromIncident: {
            __typename: 'Incident',
            id: incidentId,
            subscribed: false,
          },
        },
        variables: {
          where: { id: incidentId },
        },
      });
    } else {
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
          where: { id: incidentId },
        },
      });
    }
  };

  const [addImagesToOffender] = useAddImagesToOffenderMutation();
  const [addImagesToIncident] = useAddImagesToIncidentMutation();

  const onAddUpdateImagesToIncident = (images: { id: string }[]) => {
    void addImagesToIncident({
      variables: {
        images,
        incident: {
          id: incidentId,
        },
      },
    });
    setSelectedImages([]);
  };
  const onAddUpdateImagesToOffender = (offenderId: string) => {
    void addImagesToOffender({
      variables: {
        images: selectedImages.map((id) => ({ id })),
        offender: {
          id: offenderId,
        },
      },
    });
    setShowOffenderOptions(false);
    setSelectedImages([]);
    setSelectedOffenderId('');
  };
  const onSelectUpdateImages = () => {
    if (selectedImages) {
      if (!addImageToOffenders) {
        onAddUpdateImagesToIncident(selectedImages.map((id) => ({ id })));
      }
      if (addImageToOffenders && data?.incident.offenders) {
        if (data?.incident.offenders.length > 1) {
          setShowOffenderOptions(true);
        } else {
          onAddUpdateImagesToOffender(data?.incident.offenders[0].id);
        }
      }
      setAddImages(null);
    }
  };
  const onAddUpdateImages = (
    images: { id: string; url: string }[],
    addToOffender?: boolean
  ) => {
    setAddImageToOffenders(!!addToOffender);

    if (images.length > 1) {
      setAddImages(images);
    }
    if (images.length === 1) {
      if (addToOffender && data?.incident.offenders) {
        if (data?.incident.offenders.length > 1) {
          setShowOffenderOptions(true);
        } else {
          confirm({
            content: intl.formatMessage({
              defaultMessage:
                'Adding this image will notify any other users following the incident.',
            }),
            okText: intl.formatMessage({
              defaultMessage: 'Add Images',
            }),
            onOk() {
              onAddUpdateImagesToOffender(data?.incident.offenders[0].id);
            },
            title: intl.formatMessage({
              defaultMessage: 'Are you sure?',
            }),
          });
        }
      } else {
        confirm({
          content: intl.formatMessage({
            defaultMessage:
              'Adding this image will notify any other users following the offender.',
          }),
          okText: intl.formatMessage({
            defaultMessage: 'Add Images',
          }),
          onOk() {
            onAddUpdateImagesToIncident(images.map(({ id }) => ({ id })));
          },
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
          }),
        });
      }
    }
  };

  const closeAddImages = () => {
    setAddImages(null);
    setSelectedImages([]);
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
                    query: ViewIncidentDocument,
                    variables: {
                      where: {
                        id: incidentId,
                      },
                    },
                  }
                );
              }
            } else {
              store.writeQuery<ViewIncidentQuery, ViewIncidentQueryVariables>({
                data: {
                  incident: {
                    ...oldData.incident,
                    updates: oldData.incident.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewIncidentDocument,
                variables: {
                  where: {
                    id: incidentId,
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
  const toggleEditAddress = () => {
    setEditAddress(!editAddress);
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
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  const toggleShowOffenderOptions = () => {
    setShowOffenderOptions(!showOffenderOptions);
  };

  const [isTranslated, setIsTranslated] = useState<null | string>(null);
  const currentLanguage = useStoreState((state) => state.theme.locale);

  const [translate] = useTranslateLazyQuery({
    canonizeResults: true,
    fetchPolicy: 'cache-first',
    variables: {
      data: {
        targetLang: currentLanguage as LanguageCode,
        text: [data?.incident?.description || ''],
      },
    },
  });

  const translateText = async () => {
    if (isTranslated) {
      setIsTranslated(null);
      return;
    }
    const { data: newTranslation } = await translate();
    setIsTranslated(
      newTranslation?.translateText[0].translatedText ||
        data?.incident?.description ||
        ''
    );
  };

  const toggleShareOpen = () => {
    setShareOpen(!shareOpen);
  };
  const editRights = hasPermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Incidents,
    },
    permissions,
  });

  return {
    addDocument,
    addExistingOffender,
    addExistingVehicle,
    addGoods,
    addImages,
    addInvestigation,
    addOffender,
    addOffenderRights: editRights,
    addTodo,
    addVehicle,
    closeAddImages,
    completeTodoVisible,
    confirmDeleteUpdate,
    data,
    deleteRights: editRights,
    editAddress,
    editGoodsData,
    editImageData,
    editImages,
    editIncident,
    editOffenderData,
    editRights,
    editUpdate,
    editUpdateInput,
    editVehicleData,
    facialDetection,
    goodsMode,
    handleEditUpdate,
    hasConnectedSchemes,
    hideIncident: role === Role.User && restrictIncidentAccess,
    isTranslated,
    languageCount,
    lightBoxOpen,
    lightboxElements,
    linkOffender,
    loadMore,
    loading: (data === null || data === undefined) && loading,
    onAddExistingOffender,
    onAddExistingVehicle,
    onAddGoods,
    onAddUpdateImages,
    onAddUpdateImagesToOffender,
    onAddVehicle,
    onCompletedAddOffender,
    onCompletedEditOffender,
    onDelete,
    onDeleteGoods,
    onDeleteImage,
    onDeleteOffender,
    onDeleteVehicle,
    onEditAddress,
    onEditGoods,
    onEditImage,
    onEditVehicle,
    onSelectUpdateImages,
    onUpdateImages,
    openLightbox,
    optionRowShow,
    replyTo,
    saving,
    scrolledToTop,
    selectedImages,
    selectedOffenderId,
    setCompleteTodoVisible,
    setEditGoodsData,
    setEditImageData,
    setEditOffenderData,
    setEditUpdate,
    setEditUpdateInput,
    setEditVehicleData,
    setOptionRowShow,
    setReplyTo,
    setSelectedOffenderId,
    setViewTodoVisible,
    shareOpen,
    showOffenderOptions,
    templatesData,
    templatesLoading,
    toggleAddDocument,
    toggleAddExistingOffender,
    toggleAddExistingVehicle,
    toggleAddGoods,
    toggleAddInvestigation,
    toggleAddOffender,
    toggleAddTodo,
    toggleAddVehicle,
    toggleEditAddress,
    toggleEditImages,
    toggleEditIncident,
    toggleLinkOffender,
    toggleSelectImages,
    toggleShareOpen,
    toggleShowOffenderOptions,
    toggleSubscribe,
    translateText,
    updateAddOffenderList,
    updateDeleteDocument,
    updateDocumentList,
    updateEditOffenderList,
    updateImagesList,
    updateInvestigationList,
    updateOffendersList,
    updateTodo,
    updateTodoList,
    userId,
    userRole: role,
    viewTodoVisible,
  };
};

export default useViewIncident;
