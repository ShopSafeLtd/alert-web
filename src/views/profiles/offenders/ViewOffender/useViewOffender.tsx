import type { CreateBlurFacesMutation } from '#/components/ViewPage/ImagesList/graphql/__generated__/create_blur_faces.generated';
import type { AddVehicleData } from '#/components/form-components/Vehicle/AddVehicleSimple/useAddVehicleSimple';
import type { CreateDocumentsMutation } from '#/graphql/documents/mutations/__generated__/create-documents.generated';
import type { OffenderIncidentsQuery } from '#/views/profiles/offenders/ViewOffender/__graphql__/queries/__generated__/list-incidents.generated';
import type { MutationUpdaterFn } from '@apollo/client';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { DeleteDocumentMutation } from 'graphql/documents/mutations/__generated__/delete-document.generated';
import type { CreateInvestigationMutation } from 'graphql/investigations/mutations/__generated__/create-investigations.generated';
import type { UpdateOffenderBansMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-ban.generated';
import type { UpdateOffenderCrimeGroupsMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-crime-group.generated';
import type { UpdateOffenderVehiclesMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-vehicles.generated';
import type { AssociatedOffendersQuery } from 'graphql/offenders/queries/__generated__/associated-offenders.generated';
import type {
  ViewOffenderQuery,
  ViewOffenderQueryVariables,
} from 'graphql/offenders/queries/__generated__/view-offender.generated';
import type { LanguageCode } from 'graphql/types';
import type { CreateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-simple-vehicle.generated';
import type { Dispatch } from 'react';
import type {
  BanData,
  EditFeedImage,
  ImageCardData,
  InvestigationData,
  LocationData,
  VehicleData,
} from 'types/DataType';

import { useGroupsContext } from '#/context/groups-context';
import {
  currentSchemeAtom,
  currentSchemeIdAtom,
} from '#/providers/SchemeProvider/SchemeProvider';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import hasRolePermission from '#/utils/has-role-permission';
import publicOffenderDob from '#/utils/public-offender-dob';
import { useOffenderIncidentsQuery } from '#/views/profiles/offenders/ViewOffender/__graphql__/queries/__generated__/list-incidents.generated';
import {
  faChartBar,
  faEdit,
  faPeople,
  faTrash,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, notification } from 'antd';
import { useAddImagesToIncidentMutation } from 'graphql/incidents/mutations/__generated__/add-images-to-incident.generated';
import { useDeleteUpdateMutation } from 'graphql/mutations/__generated__/delete-update.generated';
import { useUpdateUpdateMutation } from 'graphql/mutations/__generated__/update-update.generated';
import { useAddImagesToOffenderMutation } from 'graphql/offenders/mutations/__generated__/add-images-to-offender.generated';
import { useRecycleOffenderMutation } from 'graphql/offenders/mutations/__generated__/recycle-offender.generated';
import { useSubscribeToOffenderMutation } from 'graphql/offenders/mutations/__generated__/subscribe-to-offender.generated';
import { useUnsubscribeFromOffenderMutation } from 'graphql/offenders/mutations/__generated__/unsubscribe-to-offender.generated';
import { useUpdateOffenderMutation } from 'graphql/offenders/mutations/__generated__/update-offender.generated';
import { useUpdateOffenderAddressesMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-address.generated';
import { useUpdateOffenderBansMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-ban.generated';
import { useUpdateOffenderCrimeGroupsMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-crime-group.generated';
import { useUpdateOffenderImagesMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-images.generated';
import { useUpdateOffenderVehiclesMutation } from 'graphql/offenders/mutations/update/__generated__/update-offender-vehicles.generated';
import { useAssociatedOffendersQuery } from 'graphql/offenders/queries/__generated__/associated-offenders.generated';
import {
  ViewOffenderDocument,
  useViewOffenderQuery,
} from 'graphql/offenders/queries/__generated__/view-offender.generated';
import { useTranslateLazyQuery } from 'graphql/translate/queries/__generated__/translate.generated';
import {
  PermissionMethod,
  PermissionModel,
  SortOrder,
  TagType,
} from 'graphql/types';
import { useCreateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/create-simple-vehicle.generated';
import { useUpdateSimpleVehicleMutation } from 'graphql/vehicles/mutations/__generated__/update-simple-vehicle.generated';
import update from 'immutability-helper';
import { useAtomValue } from 'jotai/index';
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreState } from 'state';
import errorNotification from 'types/mutation_notifications/error_notification';

import { useMarkOffenderViewedMutation } from '../../../../graphql/engagement/mutations/__generated__/mark-offender-viewed.generated';
import { useInvestigationActions } from './useInvestigationActions';

const { confirm } = Modal;

const LINKED_INCIDENTS = 'LINKED_INCIDENTS';
const LINKED_OCG = 'LINKED_OCG';

export type ViewAssociate = Exclude<
  Exclude<
    AssociatedOffendersQuery['offender'],
    null | undefined
  >['knownAssociates'],
  null | undefined
>[0];

interface Return {
  addAddress: boolean;
  addBan: boolean;
  addCrimeGroup: boolean;
  addDocument: boolean;
  addExistingVehicle: boolean;
  addImages:
    | {
        id: string;
        url: string;
      }[]
    | null;
  addInvestigation: boolean;
  addVehicle: boolean;
  associateFilters: (string | undefined)[];
  associatesData: AssociatedOffendersQuery | undefined;
  associatesLoading: boolean;
  closeAddImages: () => void;
  confirmDeleteUpdate: (updateId: string) => void;
  copyOffender: boolean;
  data: ViewOffenderQuery | undefined;
  deleteRights: boolean;
  editAddressData: LocationData | null;
  editBanData: BanData | null;
  editImageData: EditFeedImage | null;
  editImages: boolean;
  editOffender: boolean;
  editRights: boolean;
  editUpdate: { id: string; text: string } | null;
  editUpdateInput: string;
  editVehicleData: VehicleData | null;
  handleCreateInvestigation: (investigationId: string) => Promise<void>;
  handleEditUpdate: () => void;
  handleIncidentSort: (
    field: 'date' | 'totalValue',
    order: 'ascend' | 'descend'
  ) => void;
  handleLinkInvestigation: (investigation: InvestigationData) => Promise<void>;
  handleUnlinkInvestigation: (investigationId: string) => Promise<void>;
  hasConnectedSchemes: boolean;
  incidentSortField: 'date' | 'totalValue';
  incidentSortOrder: SortOrder;
  incidents: OffenderIncidentsQuery['offender']['incidents'] | null;
  incidentsLoading: boolean;
  incidentsPagination: PaginationState;
  incidentsPaginationDispatch: Dispatch<PaginationAction>;
  isTranslated: null | string;
  knowOffender: boolean;
  languageCount: number;
  lightBoxOpen: {
    index: number;
    open: boolean;
  };
  lightboxElements: {
    src: string;
  }[];
  linkIncident: boolean;
  linkInvestigation: boolean;
  linkingInvestigation: boolean;
  loadMore: boolean;
  loading: boolean;
  onAddAddress: (value: LocationData) => void;
  onAddBan: (value: BanData) => void;
  onAddCrimeGroup: (value: string) => void;
  onAddExistingVehicle: (id: string) => void;
  onAddUpdateImages: (
    images: { id: string; url: string }[],
    addToIncident?: boolean
  ) => void;
  onAddUpdateImagesToIncident: (id: string) => void;
  onAddVehicle: (value: AddVehicleData) => void;
  onAssociateFilterChange: (value: string[]) => void;
  onDelete: (id: string) => void;
  onDeleteAddress: (id: string) => void;
  onDeleteBan: (id: string) => void;
  onDeleteCrimeGroup: (id: string) => void;
  onDeleteImage: (id: string) => void;
  onDeleteVehicle: (id: string) => void;
  onEditAddress: (value: LocationData) => void;
  onEditBan: (value: BanData) => void;
  onEditImage: (id: EditFeedImage) => void;
  onEditVehicle: (value: VehicleData) => void;
  onSelect: (item: { key: string }) => void;
  onSelectUpdateImages: () => void;
  onUpdateImages: (value: ImageCardData[]) => void;
  openLightbox: (index: number) => void;
  optionMenuItems: ItemType[];
  optionRowShow: boolean;
  publicOffenderDOB: boolean;
  replyTo: {
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
  } | null;
  saving: boolean;
  scrolledToTop: () => void;
  selectedImages: string[];
  selectedIncidentId: string;
  setEditAddressData: (value: LocationData | null) => void;
  setEditBanData: (value: BanData | null) => void;
  setEditImageData: (value: EditFeedImage | null) => void;
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
  shareOpen: boolean;
  showAiDrawer: boolean;
  showIncidentOptions: boolean;
  toggleAddAddress: () => void;
  toggleAddBan: () => void;
  toggleAddCrimeGroup: () => void;
  toggleAddDocument: () => void;
  toggleAddExistingVehicle: () => void;
  toggleAddInvestigation: () => void;
  toggleAddVehicle: () => void;
  toggleAiDrawer: () => void;
  toggleCopyOffender: () => void;
  toggleEditImages: () => void;
  toggleEditOffender: () => void;
  toggleKnowOffender: () => void;
  toggleLinkIncident: () => void;
  toggleLinkInvestigation: () => void;
  toggleSelectImages: (id: string) => void;
  toggleShareOpen: () => void;
  toggleShowIncidentOptions: () => void;
  toggleSubscribe: () => void;
  toggleViewAssociate: (value: ViewAssociate | null) => void;
  toggleViewMatches: (offenderId: null | string) => void;
  translateText: () => Promise<void>;
  updateDeleteDocument: MutationUpdaterFn<DeleteDocumentMutation>;
  updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation>;
  updateImagesList: MutationUpdaterFn<CreateBlurFacesMutation>;
  updateIncidentList: (value: string) => void;
  updateInvestigationList: MutationUpdaterFn<CreateInvestigationMutation>;
  userId: string;
  viewAssociate: ViewAssociate | null;
  viewMatches: null | string;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
}

export type PaginationAction =
  | { payload: number; type: 'changePage' }
  | { payload: number; type: 'changePageSize' };

const initialState: PaginationState = {
  currentPage: 1,
  pageSize: 5,
};

function paginationReducer(
  state: PaginationState,
  action: PaginationAction
): PaginationState {
  switch (action.type) {
    case 'changePage': {
      return { ...state, currentPage: action.payload };
    }
    case 'changePageSize': {
      return { ...state, currentPage: 1, pageSize: action.payload };
    }
    default: {
      return state;
    }
  }
}

type UsePagination = [PaginationState, Dispatch<PaginationAction>];

export function usePagination(): UsePagination {
  return useReducer(paginationReducer, initialState);
}

const useViewOffender = (offenderId: string): Return => {
  const intl = useIntl();
  const navigate = useNavigate();
  const schemeId = useAtomValue(currentSchemeIdAtom);
  const connectedToSchemes =
    useAtomValue(currentSchemeAtom)?.connectedToSchemes;
  const languageCount = useAtomValue(currentSchemeAtom)?.languageCount;
  const currentUser = useAtomValue(currentUserAtom);
  const [shareOpen, setShareOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [paginationState, dispatch] = usePagination();
  const hasTrackedView = useRef(false);
  const { currentPage: incidentPage, pageSize: incidentPageSize } =
    paginationState;
  const [incidentSortField, setIncidentSortField] = useState<
    'date' | 'totalValue'
  >('date');
  const [incidentSortOrder, setIncidentSortOrder] = useState<SortOrder>(
    SortOrder.Desc
  );
  const [viewMatches, toggleViewMatches] = useState<null | string>(null);
  const [optionRowShow, setOptionRowShow] = useState(false);
  const [linkIncident, setLinkIncident] = useState(false);
  const [addDocument, setAddDocument] = useState(false);
  const [showAiDrawer, setShowAiDrawer] = useState(false);
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    index: 0,
    open: false,
  });

  // eslint-disable-next-line func-call-spacing
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
  const [linkInvestigation, setLinkInvestigation] = useState(false);
  const [showIncidentOptions, setShowIncidentOptions] = useState(false);
  const [addImageToIncidents, setAddImageToIncidents] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string>('');

  const openLightbox = (index: number) => {
    setLightBoxOpen({ index, open: !lightBoxOpen.open });
  };
  const { groups } = useGroupsContext();
  const [loadMore, setLoadMore] = useState(false);
  const [replyTo, setReplyTo] = useState<{
    createdAt: string;
    createdBy: string;
    id: string;
    text: string;
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
  };
  const { data, loading } = useViewOffenderQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      setLightboxElements(
        res.offender?.images.map((image) => ({
          src: image.optimised || '',
        })) || []
      );
    },
    variables,
  });

  const {
    handleCreateInvestigation,
    handleLinkInvestigation,
    handleUnlinkInvestigation,
    linking: linkingInvestigation,
  } = useInvestigationActions({ offenderId });

  // Track offender view silently
  const [markOffenderViewed] = useMarkOffenderViewedMutation({
    onError: () => {
      // Silent failure - don't block UI if tracking fails
    },
  });

  useEffect(() => {
    if (offenderId && !hasTrackedView.current && !loading && data?.offender) {
      hasTrackedView.current = true;
      void markOffenderViewed({
        variables: {
          offenderId,
        },
      });
    }
  }, [offenderId, loading, data, markOffenderViewed]);

  const {
    data: incidentsData,
    loading: incidentsLoading,
    previousData,
  } = useOffenderIncidentsQuery({
    variables: {
      orderBy: {
        [incidentSortField]: incidentSortOrder,
      },
      skip: (incidentPage - 1) * incidentPageSize,
      take: incidentPageSize,
      where: {
        id: offenderId,
      },
    },
  });

  const { data: associatesData, loading: associatesLoading } =
    useAssociatedOffendersQuery({
      fetchPolicy: 'cache-first',
      skip: !data,
      variables: {
        associatedOffender: {
          id: offenderId,
        },
        crimeTypesWhere: {
          type: {
            equals: TagType.IncidentCrimeType,
          },
        },
        groups: groups.map((g) => ({
          id: g.value,
        })),
        linkedCrimeGroup: associateFilters.includes(LINKED_OCG),
        linkedIncidents: associateFilters.includes(LINKED_INCIDENTS),
        where: {
          id: offenderId,
        },
      },
    });

  const [updateOffender] = useUpdateOffenderMutation({
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
      setSaving(false);
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again. ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
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
          data: {
            incidents: {
              connect: [{ id: incidentId }],
            },
          },
          where: {
            id: offenderId,
          },
        },
      });
    }
  };
  const [recycleOffender] = useRecycleOffenderMutation({
    onCompleted: () => {
      window.history.back();
      notification.success({
        description: intl.formatMessage({
          defaultMessage:
            'The offender has been deleted from the feed and moved to the recycle bin.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      notification.error({
        description: intl.formatMessage({
          defaultMessage: 'Whoops, there are some errors. Please try again. ',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Error',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const onDelete = (id: string) => {
    confirm({
      content: intl.formatMessage({
        defaultMessage:
          'Click delete if you wish to delete this offender. It will be removed from the feed and added to the recycle bin for 30 days before being permanently deleted.',
      }),
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      onOk() {
        void recycleOffender({
          variables: {
            where: { id },
          },
        });
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure you want to delete this offender?',
      }),
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
        id: offenderId,
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
                    blurFaces:
                      item.blurFaces && item.blurFaces.length > 0
                        ? item.blurFaces
                        : undefined,
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
    }).finally(() => {
      setEditImages(false);
      setSaving(false);
    });
  };

  const onEditImage = (value: EditFeedImage) => {
    setSaving(true);

    // 🐛 DEBUG: Log incoming values
    console.log('onEditImage received:', {
      id: value.id,
      position: value.position,
      positionX: value.positionX,
      positionY: value.positionY,
    });

    if (value) {
      const findPrimaryId = data?.offender?.images.find(
        ({ primary }) => primary
      )?.id;

      const primaryImage = findPrimaryId
        ? [
            {
              data: {
                primary: { set: !value.primary },
              },
              where: {
                id: findPrimaryId,
              },
            },
          ]
        : [];

      const mutationVariables = {
        id: offenderId,
        images: {
          update: [
            {
              data: {
                policeImage: { set: value.policeImage || false },
                position: { set: value.position },
                positionX: {
                  set: value.positionX ?? 50,
                },
                positionY: {
                  set: value.positionY ?? 50,
                },
                primary: { set: value.primary || false },
                rotation: { set: value.rotation || 0 },
              },
              where: {
                id: value.id,
              },
            },
            ...primaryImage,
          ],
        },
      };

      // 🐛 DEBUG: Log mutation variables being sent
      console.log(
        'Mutation variables:',
        JSON.stringify(mutationVariables, null, 2)
      );

      void updateOffenderImages({
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
        variables: mutationVariables,
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
        if (res?.updateOffender === null || res?.updateOffender === undefined)
          return;
        const existingData = store.readQuery<ViewOffenderQuery>({
          query: ViewOffenderDocument,
          variables,
        });

        if (!existingData?.offender) return;
        store.writeQuery<ViewOffenderQuery>({
          data: {
            __typename: 'Query',
            offender: {
              ...existingData.offender,
              images: existingData.offender.images.filter(
                ({ id }) => id !== value
              ),
            },
          },
          query: ViewOffenderDocument,
          variables,
        });
      },
      variables: {
        id: offenderId,
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

    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    const findIndex = existingData.offender.images.findIndex(
      ({ id }) => id === res.createBlurFaces.id
    );
    store.writeQuery<ViewOffenderQuery>({
      data: {
        __typename: 'Query',

        offender: update<ViewOffenderQuery['offender']>(existingData.offender, {
          images: {
            [findIndex]: {
              $set: {
                ...existingData.offender.images[findIndex],
                optimised: res.createBlurFaces.optimised,
                url: res.createBlurFaces.url,
              },
            },
          },
        }),
      },
      query: ViewOffenderDocument,
      variables,
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          vehicles: res.updateOffender.vehicles,
        },
      },
      query: ViewOffenderDocument,
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          vehicles: [...existingData.offender.vehicles, res.createVehicle],
        },
      },
      query: ViewOffenderDocument,
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
        data: {
          __typename: 'Query',
          offender: {
            ...existingData.offender,
            vehicles: update(existingData.offender.vehicles, {
              [index]: {
                $set: { ...res.updateVehicle },
              },
            }),
          },
        },
        query: ViewOffenderDocument,
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
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been updated',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
            }),
            placement: 'bottomRight',
          });
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
      const existingData = store.readQuery<ViewOffenderQuery>({
        query: ViewOffenderDocument,
        variables,
      });

      if (!existingData?.offender) return;
      store.writeQuery<ViewOffenderQuery>({
        data: {
          __typename: 'Query',
          offender: {
            ...existingData.offender,
            vehicles: [...existingData.offender.vehicles, res.createVehicle],
          },
        },
        query: ViewOffenderDocument,
        variables,
      });
    },
  });
  const onAddVehicle = (value: AddVehicleData) => {
    setSaving(true);
    if (value) {
      void createVehicle({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been added',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
            }),
            placement: 'bottomRight',
          });
        },
        update: createSimpleVehicleList,
        variables: {
          data: {
            colour: value.colour || '',
            groups:
              value.groupIds.length > 0
                ? value.groupIds.map((id) => ({ id }))
                : undefined,
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
            make: value.make || '',
            model: value.model || '',
            offenders: [{ id: offenderId }],
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
      void updateOffenderVehicles({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been added',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
            }),
            placement: 'bottomRight',
          });
        },
        update: updateVehicleList,
        variables: {
          id: offenderId,
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
      void updateOffenderVehicles({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The vehicle/s have been deleted',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
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
            data: {
              __typename: 'Query',
              offender: {
                ...existingData.offender,
                vehicles: existingData.offender.vehicles.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewOffenderDocument,
            variables,
          });
        },
        variables: {
          id: offenderId,
          vehicles: { disconnect: [{ id: value }] },
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          crimeGroups: res.updateOffender.crimeGroups,
        },
      },
      query: ViewOffenderDocument,
      variables,
    });
  };

  const onAddCrimeGroup = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderCrimeGroups({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The crime groups has been added',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
            }),
            placement: 'bottomRight',
          });
        },
        update: updateCrimeGroupList,
        variables: {
          crimeGroups: {
            connect: [{ id: value }],
          },
          id: offenderId,
        },
      }).finally(() => {
        setAddCrimeGroup(false);
        setSaving(false);
      });
  };
  const onDeleteCrimeGroup = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderCrimeGroups({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The crime group has been removed',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully removed!',
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
            data: {
              __typename: 'Query',
              offender: {
                ...existingData.offender,
                vehicles: existingData.offender.vehicles.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewOffenderDocument,
            variables,
          });
        },
        variables: {
          crimeGroups: { disconnect: [{ id: value }] },
          id: offenderId,
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
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The address has been updated',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
            }),
            placement: 'bottomRight',
          });
        },
        variables: {
          addresses: {
            update: [
              {
                data: {
                  alias: { set: value.alias },
                  building: { set: value.building },
                  county: { set: value.county },
                  geoLat: value.geoLat ? { set: value.geoLat } : undefined,
                  geoLng: value.geoLng ? { set: value.geoLng } : undefined,
                  postcode: { set: value.postcode },
                  street: { set: value.street },
                  townCity: { set: value.townCity },
                },
                where: {
                  id: value.id,
                },
              },
            ],
          },
          id: offenderId,
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
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The address has been added',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
            }),
            placement: 'bottomRight',
          });
        },
        variables: {
          addresses: {
            create: [
              {
                alias: value.alias,
                building: value.building,
                county: value.county,
                geoLat: value.geoLat,
                geoLng: value.geoLng,
                postcode: value.postcode,
                street: value.street,
                townCity: value.townCity,
              },
            ],
          },
          id: offenderId,
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
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The address has been removed',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
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
            data: {
              __typename: 'Query',
              offender: {
                ...existingData.offender,
                addresses: existingData.offender.addresses.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewOffenderDocument,
            variables,
          });
        },
        variables: {
          addresses: { disconnect: [{ id: value }] },
          id: offenderId,
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          bans: res.updateOffender.bans,
        },
      },
      query: ViewOffenderDocument,
      variables,
    });
  };

  const onEditBan = (value: BanData) => {
    setSaving(true);
    if (value)
      void updateOffenderBans({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The ban has been updated',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully updated!',
            }),
            placement: 'bottomRight',
          });
        },
        variables: {
          bans: {
            update: [
              {
                data: {
                  description: value.description
                    ? { set: value.description }
                    : undefined,
                  endDate: value.endDate ? { set: value.endDate } : undefined,
                  fineValue: value.fineValue
                    ? { set: value.fineValue }
                    : undefined,
                  location: value.location
                    ? { set: value.location }
                    : undefined,
                  months: value.months ? { set: value.months } : undefined,
                  startDate: value.startDate
                    ? { set: value.startDate }
                    : undefined,
                  type: value.type ? { set: value.type } : undefined,
                },
                where: {
                  id: value.id,
                },
              },
            ],
          },
          id: offenderId,
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
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The ban has been added',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully added!',
            }),
            placement: 'bottomRight',
          });
        },
        update: updateBanList,
        variables: {
          bans: {
            create: [
              {
                createdBy: {
                  connect: {
                    id: currentUser?.id ?? '',
                  },
                },
                description: value.description,
                endDate: value.endDate || new Date(),
                fineValue: value.fineValue,
                location: value.location || '',
                months: value.months,
                scheme: {
                  connect: {
                    id: schemeId,
                  },
                },
                startDate: value.startDate || new Date(),
                type: value.type,
              },
            ],
          },
          id: offenderId,
        },
      }).finally(() => {
        setAddBan(false);
        setSaving(false);
      });
  };

  const onDeleteBan = (value: string) => {
    setSaving(true);
    if (value)
      void updateOffenderBans({
        onCompleted: () => {
          notification.success({
            description: intl.formatMessage({
              defaultMessage: 'The ban has been removed',
            }),
            message: intl.formatMessage({
              defaultMessage: 'Successfully deleted!',
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
            data: {
              __typename: 'Query',
              offender: {
                ...existingData.offender,
                bans: existingData.offender.bans.filter(
                  ({ id }) => id !== value
                ),
              },
            },
            query: ViewOffenderDocument,
            variables,
          });
        },
        variables: {
          bans: { delete: [{ id: value }] },
          id: offenderId,
        },
      }).finally(() => {
        setSaving(false);
      });
  };
  // evidence
  const updateDocumentList: MutationUpdaterFn<CreateDocumentsMutation> = (
    store,
    { data: res }
  ) => {
    if (res?.createDocuments === null || res?.createDocuments === undefined)
      return;
    const existingData = store.readQuery<ViewOffenderQuery>({
      query: ViewOffenderDocument,
      variables,
    });

    if (!existingData?.offender) return;
    store.writeQuery<ViewOffenderQuery>({
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          evidence: [...existingData.offender.evidence, ...res.createDocuments],
        },
      },
      query: ViewOffenderDocument,
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          evidence: existingData.offender.evidence.filter(
            ({ id }) => id !== res.deleteDocument?.id
          ),
        },
      },
      query: ViewOffenderDocument,
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
      data: {
        __typename: 'Query',
        offender: {
          ...existingData.offender,
          investigations: [
            ...existingData.offender.investigations,
            res.createInvestigation,
          ],
        },
      },
      query: ViewOffenderDocument,
      variables,
    });
  };
  const [subscribe] = useSubscribeToOffenderMutation();
  const [unsubscribeFromOffender] = useUnsubscribeFromOffenderMutation();

  const toggleSubscribe = () => {
    if (data?.offender?.subscribed) {
      void unsubscribeFromOffender({
        optimisticResponse: {
          __typename: 'Mutation',
          unsubscribeFromOffender: {
            __typename: 'Offender',
            id: offenderId,
            subscribed: true,
          },
        },
        variables: {
          where: {
            id: offenderId,
          },
        },
      });
    } else {
      void subscribe({
        optimisticResponse: {
          __typename: 'Mutation',
          subscribeToOffender: {
            __typename: 'Offender',
            id: offenderId,
            subscribed: false,
          },
        },
        variables: {
          where: {
            id: offenderId,
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
                    query: ViewOffenderDocument,
                    variables: {
                      where: {
                        id: offenderId,
                      },
                    },
                  }
                );
              }
            } else {
              store.writeQuery<ViewOffenderQuery, ViewOffenderQueryVariables>({
                data: {
                  offender: {
                    ...oldData.offender,
                    updates: oldData.offender.updates.filter(
                      (item) => item.id !== result.data?.deleteUpdate?.id
                    ),
                  },
                },
                query: ViewOffenderDocument,
                variables: {
                  where: {
                    id: offenderId,
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
      okText: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      onOk() {
        handleDeleteUpdate(updateId);
      },
      title: intl.formatMessage({
        defaultMessage: 'Are you sure?',
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
            content: intl.formatMessage({
              defaultMessage:
                'Adding this image will notify any other users following the incident.',
            }),
            okText: intl.formatMessage({
              defaultMessage: 'Add Images',
            }),
            onOk() {
              onAddUpdateImagesToIncident(data?.offender.incidents[0].id);
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
            onAddUpdateImagesToOffender(images.map(({ id }) => ({ id })));
          },
          title: intl.formatMessage({
            defaultMessage: 'Are you sure?',
          }),
        });
      }
    }
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

  const optionMenuItems = [
    {
      icon: <FontAwesomeIcon icon={faPeople} size="3x" />,
      key: '0',
      label: intl.formatMessage({
        defaultMessage: 'Compare',
      }),
      onClick: () => navigate(`/app/offenders/compare/${offenderId}`),
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Offenders,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faChartBar} size="3x" />,
      key: '1',
      label: intl.formatMessage({
        defaultMessage: 'View Analytics',
      }),
      onClick: () => navigate(`/app/reports/offender-engagement/${offenderId}`),
      permission: {
        method: PermissionMethod.Read,
        model: PermissionModel.Reports,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faEdit} size="3x" />,
      key: '2',
      label: intl.formatMessage({
        defaultMessage: 'Edit',
      }),
      onClick: () => navigate(`/app/offenders/edit/${offenderId}`),
      permission: {
        method: PermissionMethod.Edit,
        model: PermissionModel.Offenders,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} />,
      key: '3',
      label: intl.formatMessage({
        defaultMessage: 'Delete',
      }),
      onClick: () => onDelete(offenderId),
      permission: {
        method: PermissionMethod.Delete,
        model: PermissionModel.Offenders,
      },
    },
  ].filter(
    (item) =>
      item &&
      hasRolePermission({
        permission: item.permission,
      })
  );

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
  const toggleLinkInvestigation = () => {
    setLinkInvestigation(() => !linkInvestigation);
  };
  const toggleShowIncidentOptions = () => {
    setShowIncidentOptions(!showIncidentOptions);
  };
  const onSelect = (item: { key: string }) => {
    setSelectedIncidentId(item.key);
  };

  const [isTranslated, setIsTranslated] = useState<null | string>(null);
  const currentLanguage = useStoreState((state) => state.theme.locale);

  const [translate] = useTranslateLazyQuery({
    canonizeResults: true,
    fetchPolicy: 'cache-first',
    variables: {
      data: {
        targetLang: currentLanguage as LanguageCode,
        text: [data?.offender?.peculiarities || ''],
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

  const handleIncidentSort = useCallback(
    (field: 'date' | 'totalValue', order: 'ascend' | 'descend') => {
      setIncidentSortField(field);
      setIncidentSortOrder(order === 'ascend' ? SortOrder.Asc : SortOrder.Desc);
      dispatch({ payload: 1, type: 'changePage' }); // Reset to first page when sorting changes
    },
    []
  );

  const toggleShareOpen = () => {
    setShareOpen(!shareOpen);
  };
  const editRights = hasRolePermission({
    permission: {
      method: PermissionMethod.Edit,
      model: PermissionModel.Offenders,
    },
  });

  const toggleAiDrawer = () => setShowAiDrawer(!showAiDrawer);

  return {
    addAddress,
    addBan,
    addCrimeGroup,
    addDocument,
    addExistingVehicle,
    addImages,
    addInvestigation,
    addVehicle,
    associateFilters,
    associatesData,
    associatesLoading: data?.offender ? associatesLoading : true,
    closeAddImages,
    confirmDeleteUpdate,
    copyOffender,
    data,
    deleteRights:
      editRights ||
      (currentUser?.id === data?.offender?.createdBy.id &&
        !data?.offender?.approved),
    editAddressData,
    editBanData,
    editImageData,
    editImages,
    editOffender,
    editRights:
      editRights ||
      (currentUser?.id === data?.offender?.createdBy.id &&
        !data?.offender?.approved),
    editUpdate,
    editUpdateInput,
    editVehicleData,
    handleCreateInvestigation,
    handleEditUpdate,
    handleIncidentSort,
    handleLinkInvestigation,
    handleUnlinkInvestigation,
    hasConnectedSchemes: connectedToSchemes && connectedToSchemes.length > 0,
    incidentSortField,
    incidentSortOrder,
    incidents:
      incidentsData?.offender.incidents ||
      previousData?.offender.incidents ||
      null,
    incidentsLoading,
    incidentsPagination: paginationState,
    incidentsPaginationDispatch: dispatch,
    isTranslated,
    knowOffender,
    languageCount,
    lightBoxOpen,
    lightboxElements,
    linkIncident,
    linkInvestigation,
    linkingInvestigation,
    loadMore,
    loading: data?.offender ? false : loading,
    onAddAddress,
    onAddBan,
    onAddCrimeGroup,
    onAddExistingVehicle,
    onAddUpdateImages,
    onAddUpdateImagesToIncident,
    onAddVehicle,
    onAssociateFilterChange,
    onDelete,
    onDeleteAddress,
    onDeleteBan,
    onDeleteCrimeGroup,
    onDeleteImage,
    onDeleteVehicle,
    onEditAddress,
    onEditBan,
    onEditImage,
    onEditVehicle,
    onSelect,
    onSelectUpdateImages,
    onUpdateImages,
    openLightbox,
    optionMenuItems,
    optionRowShow,
    publicOffenderDOB: publicOffenderDob(),
    replyTo,
    saving,
    scrolledToTop,
    selectedImages,
    selectedIncidentId,
    setEditAddressData,
    setEditBanData,
    setEditImageData,
    setEditUpdate,
    setEditUpdateInput,
    setEditVehicleData,
    setOptionRowShow,
    setReplyTo,
    shareOpen,
    showAiDrawer,
    showIncidentOptions,
    toggleAddAddress,
    toggleAddBan,
    toggleAddCrimeGroup,
    toggleAddDocument,
    toggleAddExistingVehicle,
    toggleAddInvestigation,
    toggleAddVehicle,
    toggleAiDrawer,
    toggleCopyOffender,
    toggleEditImages,
    toggleEditOffender,
    toggleKnowOffender,
    toggleLinkIncident,
    toggleLinkInvestigation,
    toggleSelectImages,
    toggleShareOpen,
    toggleShowIncidentOptions,
    toggleSubscribe,
    toggleViewAssociate: setViewAssociate,
    toggleViewMatches,
    translateText,
    updateDeleteDocument,
    updateDocumentList,
    updateImagesList,
    updateIncidentList,
    updateInvestigationList,
    userId: currentUser?.id ?? '',
    viewAssociate,
    viewMatches,
  };
};

export default useViewOffender;
