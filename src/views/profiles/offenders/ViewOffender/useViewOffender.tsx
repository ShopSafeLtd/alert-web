import React, { useEffect, useState } from 'react';
import type {
  AssociatedOffendersQuery,
  CreateDocumentMutation,
  CreateInvestigationMutation,
  CreateSimpleVehicleMutation,
  DeleteDocumentMutation,
  LanguageCode,
  UpdateOffenderBansMutation,
  UpdateOffenderCrimeGroupsMutation,
  UpdateOffenderVehiclesMutation,
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/generated';
import {
  useAddImagesToIncidentMutation,
  Role,
  TagType,
  useAddImagesToOffenderMutation,
  useAssociatedOffendersQuery,
  useCreateSimpleVehicleMutation,
  useDeleteUpdateMutation,
  useRecycleOffenderMutation,
  useSubscribeToOffenderMutation,
  useTranslateLazyQuery,
  useUnsubscribeFromOffenderMutation,
  useUpdateOffenderAddressesMutation,
  useUpdateOffenderBansMutation,
  useUpdateOffenderCrimeGroupsMutation,
  useUpdateOffenderImagesMutation,
  useUpdateOffenderMutation,
  useUpdateOffenderVehiclesMutation,
  useUpdateSimpleVehicleMutation,
  useUpdateUpdateMutation,
  useViewOffenderQuery,
  ViewOffenderDocument,
} from 'graphql/generated';

import { Modal, notification } from 'antd';
import { useStoreState } from 'state';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPeople, faTrash } from '@fortawesome/pro-light-svg-icons';
import { useNavigate } from 'react-router';
import update from 'immutability-helper';
import { useIntl } from 'react-intl';
import type {
  BanData,
  EditFeedImage,
  ImageCardData,
  LocationData,
  VehicleData,
} from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { MutationUpdaterFn } from '@apollo/client';

const { confirm } = Modal;

const LINKED_INCIDENTS = 'LINKED_INCIDENTS';
const LINKED_OCG = 'LINKED_OCG';

export type ViewAssociate = Exclude<
  Exclude<
    AssociatedOffendersQuery['offender'],
    null | undefined
  >['knownAssociates'],
  undefined | null
>[0];

interface Return {
  data: ViewOffenderQuery | undefined;
  loading: boolean;
  saving: boolean;
  editRights: boolean;
  deleteRights: boolean;
  linkIncident: boolean;
  toggleLinkIncident: () => void;
  updateIncidentList: (value: string) => void;
  optionMenuItems: ItemType[];
  toggleSubscribe: () => void;
  lightboxElements: {
    src: string;
  }[];
  scrolledToTop: () => void;
  loadMore: boolean;
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
  setEditUpdate: (value: { id: string; text: string } | null) => void;
  confirmDeleteUpdate: (updateId: string) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToIncident?: boolean
  ) => void;
  editUpdate: { id: string; text: string } | null;
  selectedImages: string[];
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  handleEditUpdate: () => void;
  editUpdateInput: string;
  setEditUpdateInput: (value: string) => void;
  toggleSelectImages: (id: string) => void;
  openLightbox: (index: number) => void;
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  closeAddImages: () => void;
  optionRowShow: boolean;
  setOptionRowShow: (value: boolean) => void;
  publicOffenderDOB: boolean;
  onDelete: (id: string) => void;
  associatesData: AssociatedOffendersQuery | undefined;
  associatesLoading: boolean;
  onAssociateFilterChange: (value: string[]) => void;
  associateFilters: (string | undefined)[];
  viewAssociate: ViewAssociate | null;
  toggleViewAssociate: (value: ViewAssociate | null) => void;
  viewMatches: string | null;
  toggleViewMatches: (offenderId: string | null) => void;
  copyOffender: boolean;
  toggleCopyOffender: () => void;
  editOffender: boolean;
  toggleEditOffender: () => void;
  addVehicle: boolean;
  addExistingVehicle: boolean;
  toggleAddVehicle: () => void;
  toggleAddExistingVehicle: () => void;
  editVehicleData: VehicleData | null;
  setEditVehicleData: (value: VehicleData | null) => void;
  onDeleteVehicle: (id: string) => void;
  onEditVehicle: (value: VehicleData) => void;
  onAddVehicle: (value: VehicleData) => void;
  onAddExistingVehicle: (id: string) => void;
  addCrimeGroup: boolean;
  toggleAddCrimeGroup: () => void;
  onDeleteCrimeGroup: (id: string) => void;
  onAddCrimeGroup: (value: string) => void;
  addAddress: boolean;
  toggleAddAddress: () => void;
  editAddressData: LocationData | null;
  setEditAddressData: (value: LocationData | null) => void;
  onDeleteAddress: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onAddAddress: (value: LocationData) => void;
  addBan: boolean;
  toggleAddBan: () => void;
  editBanData: BanData | null;
  setEditBanData: (value: BanData | null) => void;
  onDeleteBan: (id: string) => void;
  onEditBan: (value: BanData) => void;
  onAddBan: (value: BanData) => void;
  editImages: boolean;
  toggleEditImages: () => void;
  editImageData: EditFeedImage | null;
  setEditImageData: (value: EditFeedImage | null) => void;
  onDeleteImage: (id: string) => void;
  onEditImage: (id: EditFeedImage) => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  toggleAddDocument: () => void;
  addDocument: boolean;
  updateDocumentList: MutationUpdaterFn<CreateDocumentMutation>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  translateText: () => Promise<void>;
  isTranslated: string | null;
  languageCount: number;
  toggleAddInvestigation: () => void;
  addInvestigation: boolean;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  knowOffender: boolean;
  toggleKnowOffender: () => void;
  onSelectUpdateImages: () => void;
  showIncidentOptions: boolean;
  toggleShowIncidentOptions: () => void;
  onAddUpdateImagesToIncident: (id: string) => void;
  selectedIncidentId: string;
  onSelect: (item: { key: string }) => void;
  hasConnectedSchemes: boolean;
  shareOpen: boolean;
  toggleShareOpen: () => void;
}

const useViewOffender = (offenderId: string): Return => {
  const { languageCount } = useStoreState((state) => state.scheme);

  const navigate = useNavigate();
  const { id: schemeId, defaultPublicOffenderDOB } = useStoreState(
    (state) => state.scheme
  );
  const hasConnectedSchemes = useStoreState(
    (state) => state.scheme.hasConnectedSchemes
  );

  const { role, id: userId, groups } = useStoreState((state) => state.user);
  const intl = useIntl();

  const [shareOpen, setShareOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [viewMatches, toggleViewMatches] = useState<string | null>(null);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [optionMenuItems, setOptionsMenuItems] = useState<ItemType[]>([]);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const [associateFilters, setAssociatedFilters] = useState<
    (string | undefined)[]
  >([]);
  const [viewAssociate, setViewAssociate] = useState<ViewAssociate | null>(
    null
  );
  const [copyOffender, setCopyOffender] = useState(false);
  const [editOffender, setEditOffender] = useState(false);
  const [knowOffender, setKnowOffender] = useState(false);
  const [editImages, setEditImages] = useState(false);
  const [editImageData, setEditImageData] = useState<EditFeedImage | null>(
    null
  );
  const [addVehicle, setAddVehicle] = useState(false);
  const [addExistingVehicle, setAddExistingVehicle] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState<VehicleData | null>(
    null
  );
  const [addCrimeGroup, setAddCrimeGroup] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState<LocationData | null>(
    null
  );
  const [addBan, setAddBan] = useState(false);
  const [editBanData, setEditBanData] = useState<BanData | null>(null);
  const [addInvestigation, setAddInvestigation] = useState(false);
  const [showIncidentOptions, setShowIncidentOptions] = useState(false);
  const [addImageToIncidents, setAddImageToIncidents] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');

  const openLightbox = (index: number) => {
    setLightBoxOpen({ open: !lightBoxOpen.open, index });
  };
  const groupsId = groups.map((group) => group.id);
  const [loadMore, setLoadMore] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    id: string;
    text: string;
    createdAt: string;
    createdBy: string;
  } | null>(null);
  const [editUpdate, setEditUpdate] = useState<{
    id: string;
    text: string;
  } | null>(null);
  const [addImages, setAddImages] = useState<
    | {
        id: string;
        url: string;
      }[]
    | null
  >(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [editUpdateInput, setEditUpdateInput] = useState('');

  useEffect(() => {
    const incidents =
      window.localStorage.getItem(LINKED_INCIDENTS) === 'false'
        ? undefined
        : LINKED_INCIDENTS;
    const crimeGroups =
      window.localStorage.getItem(LINKED_OCG) === 'true'
        ? undefined
        : LINKED_OCG;

    setAssociatedFilters([incidents, crimeGroups]);
  }, []);

  useEffect(() => {
    const incidents = associateFilters.includes(LINKED_INCIDENTS);
    const crimeGroups = associateFilters.includes(LINKED_OCG);

    window.localStorage.setItem(LINKED_INCIDENTS, incidents ? 'true' : 'false');
    window.localStorage.setItem(LINKED_OCG, crimeGroups ? 'true' : 'false');
  }, [associateFilters]);
  const variables = {
    where: {
      id: offenderId,
    },
    banWhere: {
      groups:
        role === Role.User ||
        role === Role.ContentAdmin ||
        role === Role.GroupAdmin
          ? { some: { id: { in: groupsId } } }
          : undefined,
    },
  };
  const { data, loading } = useViewOffenderQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (res) => {
      setLightboxElements(
        res.offender?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
  });

  const { data: associatesData, loading: associatesLoading } =
    useAssociatedOffendersQuery({
      variables: {
        linkedCrimeGroup: associateFilters.includes(LINKED_OCG),
        linkedIncidents: associateFilters.includes(LINKED_INCIDENTS),
        associatedOffender: {
          id: offenderId,
        },
        where: {
          id: offenderId,
        },
        crimeTypesWhere: {
          type: {
            equals: TagType.IncidentCrimeType,
          },
        },
        groups:
          role === Role.SchemeAdmin
            ? undefined
            : groups.map((g) => ({
                id: g.id,
              })),
      },
    });

  const [updateOffender] = useUpdateOffenderMutation({
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
      setSaving(false);
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error',
          id: 'KN7zKn',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again. ',
          id: 'YNC1/h',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const updateIncidentList = (incidentId: string) => {
    setSaving(true);
    if (offenderId && incidentId) {
      void updateOffender({
        variables: {
          where: {
            id: offenderId,
          },
          data: {
            incidents: {
              connect: [{ id: incidentId }],
            },
          },
        },
      });
    }
  };
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
          id: 'nQ1eW+',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        message: intl.formatMessage({
          defaultMessage: 'Error',
          id: 'KN7zKn',
        }),
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again. ',
          id: 'YNC1/h',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const onDelete = (id: string) => {
    confirm({
      title: intl.formatMessage({
        defaultMessage: 'Are you sure you want to delete this offender?',
        id: 'lOgZfN',
      }),
      content: intl.formatMessage({
        defaultMessage:
          'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
        id: 'J35F/I',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
        id: 'K3r6DQ',
      }),
      onOk() {
        void recycleOffender({
          variables: {
            where: { id },
          },
        });
      },
    });
  };
  // image
  const [updateOffenderImages] = useUpdateOffenderImagesMutation({
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

    void updateOffenderImages({
      variables: {
        id: offenderId,
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
      const findPrimaryId = data?.offender?.images.find(
        ({ primary }) => primary
      )?.id;

      const primaryImage = findPrimaryId
        ? [
            {
              where: {
                id: findPrimaryId,
              },
              data: {
                primary: { set: !value.primary },
              },
            },
          ]
        : [];

      void updateOffenderImages({
        variables: {
          id: offenderId,
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
              ...primaryImage,
            ],
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
        // update: updateImageList,
      }).finally(() => {
        setEditImageData(null);
        setSaving(false);
      });
    }
  };
  const onDeleteImage = (value: string) => {
    setSaving(false);
    void updateOffenderImages({
      variables: {
        id: offenderId,
        images: {
          disconnect: [{ id: value }],
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
        if (res?.updateOffender === null || res?.updateOffender === undefined)
          return;
        const existingData = store.readQuery<ViewOffenderQuery>({
          query: ViewOffenderDocument,
          variables,
        });

        if (!existingData?.offender) return;
        store.writeQuery<ViewOffenderQuery>({
          query: ViewOffenderDocument,
          data: {
            offender: {
              ...existingData.offender,
              images: existingData.offender.images.filter(
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
  const [updateOffenderVehicles] = useUpdateOffenderVehiclesMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateVehicleList: MutationUpdaterFn<UpdateOffenderVehiclesMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;

    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          vehicles: res.updateOffender.vehicles,
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const createSimpleVehicleList: MutationUpdaterFn<
    CreateSimpleVehicleMutation
  > = (store, { data: res }) => {
    if (res?.createVehicle === null || res?.createVehicle === undefined) return;

    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          vehicles: [...existingData.offender.vehicles, res.createVehicle],
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
      const existingData = store.readQuery<ViewOffenderQuery>({
        query: ViewOffenderDocument,
        variables,
      });

      if (!existingData?.offender) return;
      const index = existingData?.offender?.vehicles
        .map((item) => item.id)
        .indexOf(res.updateVehicle.id);
      store.writeQuery<ViewOffenderQuery>({
        query: ViewOffenderDocument,
        data: {
          offender: {
            ...existingData.offender,
            vehicles: update(existingData.offender.vehicles, {
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
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
              id: 'zJzbfm',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been updated',
              id: 'UD3TUz',
            }),
            placement: 'bottomRight',
          });
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
      const existingData = store.readQuery<ViewOffenderQuery>({
        query: ViewOffenderDocument,
        variables,
      });

      if (!existingData?.offender) return;
      store.writeQuery<ViewOffenderQuery>({
        query: ViewOffenderDocument,
        data: {
          offender: {
            ...existingData.offender,
            vehicles: [...existingData.offender.vehicles, res.createVehicle],
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
            offenders: [{ id: offenderId }],
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
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
              id: 'bYuIEA',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been added',
              id: 'jLIci0',
            }),
            placement: 'bottomRight',
          });
        },
        update: createSimpleVehicleList,
      }).finally(() => {
        setAddVehicle(false);
        setSaving(false);
      });
    }
  };

  const onAddExistingVehicle = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderVehicles({
        variables: {
          id: offenderId,
          vehicles: {
            connect: [{ id: value }],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
              id: 'bYuIEA',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been added',
              id: 'jLIci0',
            }),
            placement: 'bottomRight',
          });
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
      void updateOffenderVehicles({
        variables: {
          id: offenderId,
          vehicles: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
              id: 'RFD+id',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been deleted',
              id: '2bEaE/',
            }),
            placement: 'bottomRight',
          });
        },
        update: (store, { data: res }) => {
          if (res?.updateOffender === null || res?.updateOffender === undefined)
            return;
          const existingData = store.readQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            variables,
          });

          if (!existingData?.offender) return;
          store.writeQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            data: {
              offender: {
                ...existingData.offender,
                vehicles: existingData.offender.vehicles.filter(
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
  // crime group
  const [updateOffenderCrimeGroups] = useUpdateOffenderCrimeGroupsMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateCrimeGroupList: MutationUpdaterFn<
    UpdateOffenderCrimeGroupsMutation
  > = (store, { data: res }) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;

    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          crimeGroups: res.updateOffender.crimeGroups,
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const onAddCrimeGroup = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderCrimeGroups({
        variables: {
          id: offenderId,
          crimeGroups: {
            connect: [{ id: value }],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
              id: 'bYuIEA',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The crime groups has been added',
              id: 'gtAFT7',
            }),
            placement: 'bottomRight',
          });
        },
        update: updateCrimeGroupList,
      }).finally(() => {
        setAddCrimeGroup(false);
        setSaving(false);
      });
  };
  const onDeleteCrimeGroup = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderCrimeGroups({
        variables: {
          id: offenderId,
          crimeGroups: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully removed!',
              id: 'nvymrt',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The crime group has been removed',
              id: 'nOqQ3P',
            }),
            placement: 'bottomRight',
          });
        },
        update: (store, { data: res }) => {
          if (res?.updateOffender === null || res?.updateOffender === undefined)
            return;
          const existingData = store.readQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            variables,
          });

          if (!existingData?.offender) return;
          store.writeQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            data: {
              offender: {
                ...existingData.offender,
                vehicles: existingData.offender.vehicles.filter(
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

  // addresses
  const [updateOffenderAddresses] = useUpdateOffenderAddressesMutation({
    onError: () => {
      errorNotification();
    },
  });

  const onEditAddress = (value: LocationData) => {
    setSaving(true);
    if (value)
      void updateOffenderAddresses({
        variables: {
          id: offenderId,
          addresses: {
            update: [
              {
                where: {
                  id: value.id,
                },
                data: {
                  postcode: { set: value.postcode },
                  street: { set: value.street },
                  townCity: { set: value.townCity },
                  alias: { set: value.alias },
                  building: { set: value.building },
                  county: { set: value.county },
                  geoLat: value.geoLat ? { set: value.geoLat } : undefined,
                  geoLng: value.geoLng ? { set: value.geoLng } : undefined,
                },
              },
            ],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
              id: 'zJzbfm',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The address has been updated',
              id: '5+GceR',
            }),
            placement: 'bottomRight',
          });
        },
      }).finally(() => {
        setEditAddressData(null);
        setSaving(false);
      });
  };
  const onAddAddress = (value: LocationData) => {
    setSaving(true);
    if (value)
      void updateOffenderAddresses({
        variables: {
          id: offenderId,
          addresses: {
            create: [
              {
                postcode: value.postcode,
                street: value.street,
                townCity: value.townCity,
                alias: value.alias,
                building: value.building,
                county: value.county,
                geoLat: value.geoLat,
                geoLng: value.geoLng,
              },
            ],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
              id: 'bYuIEA',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The address has been added',
              id: 'ASXk8Y',
            }),
            placement: 'bottomRight',
          });
        },
        // update: updateAddressList,
      }).finally(() => {
        setAddAddress(false);
        setSaving(false);
      });
  };

  const onDeleteAddress = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderAddresses({
        variables: {
          id: offenderId,
          addresses: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
              id: 'RFD+id',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The address has been removed',
              id: '8BX6EA',
            }),
            placement: 'bottomRight',
          });
        },
        update: (store, { data: res }) => {
          if (res?.updateOffender === null || res?.updateOffender === undefined)
            return;
          const existingData = store.readQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            variables,
          });

          if (!existingData?.offender) return;
          store.writeQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            data: {
              offender: {
                ...existingData.offender,
                addresses: existingData.offender.addresses.filter(
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

  // ban
  const [updateOffenderBans] = useUpdateOffenderBansMutation({
    onError: () => {
      errorNotification();
    },
  });
  const updateBanList: MutationUpdaterFn<UpdateOffenderBansMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.updateOffender === null || res?.updateOffender === undefined)
      return;

    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          bans: res.updateOffender.bans,
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  const onEditBan = (value: BanData) => {
    setSaving(true);
    if (value)
      void updateOffenderBans({
        variables: {
          id: offenderId,
          bans: {
            update: [
              {
                where: {
                  id: value.id,
                },
                data: {
                  endDate: value.endDate ? { set: value.endDate } : undefined,
                  location: value.location
                    ? { set: value.location }
                    : undefined,
                  startDate: value.startDate
                    ? { set: value.startDate }
                    : undefined,
                  description: value.description
                    ? { set: value.description }
                    : undefined,
                  type: value.type ? { set: value.type } : undefined,
                  fineValue: value.fineValue
                    ? { set: value.fineValue }
                    : undefined,
                  months: value.months ? { set: value.months } : undefined,
                },
              },
            ],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
              id: 'zJzbfm',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The ban has been updated',
              id: 'cUo6em',
            }),
            placement: 'bottomRight',
          });
        },
      }).finally(() => {
        setEditBanData(null);
        setSaving(false);
      });
  };
  const onAddBan = (value: BanData) => {
    setSaving(true);
    if (value)
      void updateOffenderBans({
        variables: {
          id: offenderId,
          bans: {
            create: [
              {
                createdBy: {
                  connect: {
                    id: userId,
                  },
                },
                endDate: value.endDate || new Date(),
                location: value.location || '',
                scheme: {
                  connect: {
                    id: schemeId,
                  },
                },
                startDate: value.startDate || new Date(),
                description: value.description,
                type: value.type,
                months: value.months,
                fineValue: value.fineValue,
              },
            ],
          },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
              id: 'bYuIEA',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The ban has been added',
              id: '5mHoFH',
            }),
            placement: 'bottomRight',
          });
        },
        update: updateBanList,
      }).finally(() => {
        setAddBan(false);
        setSaving(false);
      });
  };

  const onDeleteBan = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderBans({
        variables: {
          id: offenderId,
          bans: { disconnect: [{ id: value }] },
        },
        onCompleted: () => {
          notification.success({
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
              id: 'RFD+id',
            }),
            description: intl.formatMessage({
              defaultMessage: 'The ban has been removed',
              id: '+Llm6i',
            }),
            placement: 'bottomRight',
          });
        },
        update: (store, { data: res }) => {
          if (res?.updateOffender === null || res?.updateOffender === undefined)
            return;
          const existingData = store.readQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            variables,
          });

          if (!existingData?.offender) return;
          store.writeQuery<ViewOffenderQuery>({
            query: ViewOffenderDocument,
            data: {
              offender: {
                ...existingData.offender,
                bans: existingData.offender.bans.filter(
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
  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocument === null || res?.createDocument === undefined)
      return;
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          evidence: [...existingData.offender.evidence, res.createDocument],
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
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          evidence: existingData.offender.evidence.filter(
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
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      data: {
        offender: {
          ...existingData.offender,
          investigations: [
            ...existingData.offender.investigations,
            res.createInvestigation,
          ],
        },
        __typename: 'Query',
      },
      variables,
    });
  };
  const [subscribe] = useSubscribeToOffenderMutation();
  const [unsubscribeFromOffender] = useUnsubscribeFromOffenderMutation();

  const toggleSubscribe = () => {
    if (data?.offender?.subscribed) {
      void unsubscribeFromOffender({
        variables: {
          where: {
            id: offenderId,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromOffender: {
            id: offenderId,
            __typename: 'Offender',
            subscribed: true,
          },
        },
      });
    } else {
      void subscribe({
        variables: {
          where: {
            id: offenderId,
          },
        },
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToOffender: {
            id: offenderId,
            __typename: 'Offender',
            subscribed: false,
          },
        },
      });
    }
  };

  const scrolledToTop = () => {
    setLoadMore(true);
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
            ViewOffenderQuery,
            ViewOffenderQueryVariables
          >({
            query: ViewOffenderDocument,
            variables: {
              where: {
                id: offenderId,
              },
            },
          });

          if (oldData?.offender)
            if (result.data.deleteUpdate.replyToId) {
              const updateItem = oldData.offender.updates.find(
                (item) => item.id === result.data?.deleteUpdate?.replyToId
              );
              if (updateItem) {
                store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>(
                  {
                    query: ViewOffenderDocument,
                    variables: {
                      where: {
                        id: offenderId,
                      },
                    },
                    data: {
                      offender: {
                        ...oldData.offender,
                        updates: update(oldData.offender.updates, {
                          [oldData.offender.updates
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
              store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>({
                query: ViewOffenderDocument,
                variables: {
                  where: {
                    id: offenderId,
                  },
                },
                data: {
                  offender: {
                    ...oldData.offender,
                    updates: oldData.offender.updates.filter(
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
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
        id: 'K3r6DQ',
      }),
    });
  };

  const [addImagesToOffender] = useAddImagesToOffenderMutation();
  const [addImagesToIncident] = useAddImagesToIncidentMutation();

  const onAddUpdateImagesToIncident = (incidentId: string) => {
    void addImagesToIncident({
      variables: {
        images: selectedImages.map((id) => ({ id })),
        incident: {
          id: incidentId,
        },
      },
    });
    setShowIncidentOptions(false);
    setSelectedImages([]);
    setSelectedIncidentId('');
  };
  const onAddUpdateImagesToOffender = (images: { id: string }[]) => {
    void addImagesToOffender({
      variables: {
        images,
        offender: {
          id: offenderId,
        },
      },
    });
    setSelectedImages([]);
  };
  const onSelectUpdateImages = () => {
    if (selectedImages) {
      if (addImageToIncidents && data?.offender.incidents) {
        if (data?.offender.incidents.length > 1) {
          setShowIncidentOptions(true);
        } else if (data?.offender.incidents.length === 1) {
          onAddUpdateImagesToIncident(data?.offender.incidents[0].id);
        }
      } else {
        onAddUpdateImagesToOffender(selectedImages.map((id) => ({ id })));
      }
      setAddImages(null);
    }
  };

  const onAddUpdateImages = (
    images: { id: string; url: string }[],
    addToIncident?: boolean
  ) => {
    setAddImageToIncidents(!!addToIncident);
    if (images.length > 1) {
      setAddImages(images);
    }
    if (images.length === 1) {
      if (addToIncident && data?.offender.incidents) {
        if (data?.offender.incidents.length > 1) {
          setShowIncidentOptions(true);
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
              onAddUpdateImagesToIncident(data?.offender.incidents[0].id);
            },
            okText: intl.formatMessage({
              defaultMessage: 'Add Images',
              id: 'b4GGYZ',
            }),
          });
        }
      } else {
        confirm({
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
            id: '2oCaym',
          }),
          content: intl.formatMessage({
            defaultMessage:
              'Adding this image will notify any other users following the offender.',
            id: '8Vqbat',
          }),
          onOk() {
            onAddUpdateImagesToOffender(images.map(({ id }) => ({ id })));
          },
          okText: intl.formatMessage({
            defaultMessage: 'Add Images',
            id: 'b4GGYZ',
          }),
        });
      }
    }
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

  const toggleSelectImages = (id: string) => {
    if (selectedImages.includes(id)) {
      setSelectedImages(selectedImages.filter((item) => item !== id));
    } else {
      setSelectedImages([...selectedImages, id]);
    }
  };

  const closeAddImages = () => {
    setAddImages(null);
    setSelectedImages([]);
  };

  useEffect(() => {
    if (
      [
        Role.ContentAdmin,
        Role.SchemeAdmin,
        Role.ShopsafeAdmin,
        Role.GroupAdmin,
      ].includes(role)
    ) {
      setOptionsMenuItems([
        {
          label: intl.formatMessage({
            defaultMessage: 'Compare',
            id: '493J7R',
          }),
          key: '0',
          icon: <FontAwesomeIcon size="3x" icon={faPeople} />,
          onClick: () => navigate(`/app/offenders/compare/${offenderId}`),
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Edit',
            id: 'wEQDC6',
          }),
          key: '1',
          icon: <FontAwesomeIcon size="3x" icon={faEdit} />,
          onClick: () => navigate(`/app/offenders/edit/${offenderId}`),
        },
        {
          label: intl.formatMessage({
            defaultMessage: 'Delete',
            id: 'K3r6DQ',
          }),
          key: '2',
          icon: <FontAwesomeIcon icon={faTrash} />,
          onClick: () => onDelete(offenderId),
        },
      ]);
    }
  }, [role]);

  // function
  const toggleLinkIncident = () => {
    setLinkIncident(!linkIncident);
  };
  const toggleCopyOffender = () => {
    setCopyOffender(!copyOffender);
  };
  const toggleEditOffender = () => {
    setEditOffender(!editOffender);
  };
  const toggleKnowOffender = () => {
    setKnowOffender(!knowOffender);
  };
  const toggleEditImages = () => {
    setEditImages(!editImages);
  };
  const toggleAddVehicle = () => {
    setAddVehicle(!addVehicle);
  };
  const toggleAddExistingVehicle = () => {
    setAddExistingVehicle(!addExistingVehicle);
  };
  const toggleAddCrimeGroup = () => {
    setAddCrimeGroup(!addCrimeGroup);
  };
  const toggleAddAddress = () => {
    setAddAddress(!addAddress);
  };
  const toggleAddBan = () => {
    setAddBan(!addBan);
  };
  const toggleAddDocument = () => {
    setAddDocument(() => !addDocument);
  };
  const onAssociateFilterChange = (value: string[]) => {
    setAssociatedFilters(value);
  };
  const toggleAddInvestigation = () => {
    setAddInvestigation(() => !addInvestigation);
  };
  const toggleShowIncidentOptions = () => {
    setShowIncidentOptions(!showIncidentOptions);
  };
  const onSelect = (item: { key: string }) => {
    setSelectedIncidentId(item.key);
  };

  const [isTranslated, setIsTranslated] = useState<string | null>(null);
  const currentLanguage = useStoreState((state) => state.theme.locale);

  const [translate] = useTranslateLazyQuery({
    canonizeResults: true,
    fetchPolicy: 'cache-first',
    variables: {
      data: {
        text: [data?.offender?.peculiarities || ''],
        targetLang: currentLanguage as LanguageCode,
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
        data?.offender?.peculiarities ||
        ''
    );
  };

  const toggleShareOpen = () => {
    setShareOpen(!shareOpen);
  };

  return {
    data,
    loading: data?.offender ? false : loading,
    saving,
    deleteRights:
      role !== Role.User ||
      (userId === data?.offender?.createdBy.id && !data?.offender?.approved),
    editRights:
      role !== Role.User ||
      (userId === data?.offender?.createdBy.id && !data?.offender?.approved),
    linkIncident,
    toggleLinkIncident,
    updateIncidentList,
    optionMenuItems,
    toggleSubscribe,
    lightboxElements,
    scrolledToTop,
    loadMore,
    userId,
    replyTo,
    setReplyTo,
    confirmDeleteUpdate,
    setEditUpdate,
    onAddUpdateImages,
    addImages,
    editUpdate,
    selectedImages,
    handleEditUpdate,
    closeAddImages,
    editUpdateInput,
    setEditUpdateInput,
    toggleSelectImages,
    openLightbox,
    lightBoxOpen,
    optionRowShow,
    setOptionRowShow,
    publicOffenderDOB: defaultPublicOffenderDOB && role !== Role.User,
    onDelete,
    associatesData,
    associatesLoading,
    onAssociateFilterChange,
    associateFilters,
    viewAssociate,
    toggleViewAssociate: setViewAssociate,
    toggleViewMatches,
    viewMatches,
    copyOffender,
    toggleCopyOffender,
    editOffender,
    toggleEditOffender,
    knowOffender,
    toggleKnowOffender,
    editImages,
    toggleEditImages,
    editImageData,
    setEditImageData,
    onDeleteImage,
    onEditImage,
    onUpdateImages,
    addVehicle,
    addExistingVehicle,
    editVehicleData,
    setEditVehicleData,
    onDeleteVehicle,
    toggleAddVehicle,
    toggleAddExistingVehicle,
    onEditVehicle,
    onAddVehicle,
    onAddExistingVehicle,
    addCrimeGroup,
    onDeleteCrimeGroup,
    toggleAddCrimeGroup,
    onAddCrimeGroup,
    addAddress,
    editAddressData,
    setEditAddressData,
    onDeleteAddress,
    toggleAddAddress,
    onEditAddress,
    onAddAddress,
    addBan,
    editBanData,
    setEditBanData,
    onDeleteBan,
    toggleAddBan,
    onEditBan,
    onAddBan,
    addDocument,
    toggleAddDocument,
    updateDocumentList,
    updateDeleteDocument,
    translateText,
    isTranslated,
    languageCount,
    addInvestigation,
    toggleAddInvestigation,
    updateInvestigationList,
    onSelectUpdateImages,
    showIncidentOptions,
    toggleShowIncidentOptions,
    onAddUpdateImagesToIncident,
    selectedIncidentId,
    onSelect,
    hasConnectedSchemes,
    toggleShareOpen,
    shareOpen,
  };
};

export default useViewOffender;
