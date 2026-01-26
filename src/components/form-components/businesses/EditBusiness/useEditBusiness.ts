import type {
  BusinessesSideListQuery,
  BusinessesSideListQueryVariables,
} from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import type { FormInstance } from 'antd';
import type {
  SearchBusinessesQuery,
  SearchBusinessesQueryVariables,
} from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import type {
  BusinessUpdateInput,
  Currency,
  GroupSyncStrategy,
} from 'graphql/types';
import type { LocationData, TagData } from 'types/DataType';

import { BusinessesSideListDocument } from '#/components/businesses/BusinessSideList/graphql/queries/__generated__/sidelist.generated';
import { useSchemeGroupsSelectFilterQuery } from '#/components/form-components/businesses/EditBusiness/graphql/queries/__generated__/scheme-groups.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBrandsQuery } from '#/views/settings/brands/graphql/queries/__generated__/brands.generated';
import { useApolloClient } from '@apollo/client';
import { Form, notification } from 'antd';
import { useSyncBusinessGroupsMutation } from 'graphql/businesses/mutations/__generated__/sync-business-groups.generated';
import { useUpdateBusinessMutation } from 'graphql/businesses/mutations/__generated__/update-business.generated';
import { useEditBusinessQuery } from 'graphql/businesses/queries/__generated__/edit-business.generated';
import { SearchBusinessesDocument } from 'graphql/businesses/queries/__generated__/search-businesses.generated';
import { useTagsQuery } from 'graphql/tags/queries/__generated__/tags.generated';
import { Model, QueryMode, SortOrder } from 'graphql/types';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface OnSubmitValues {
  brands?: string[];
  building: string;
  county: string;
  currency?: Currency | null;
  groups: string[];
  name: string;
  parent: {
    label: string;
    value: string;
  };
  postcode: string;
  publicName: boolean;
  siteNumber: string;
  street: string;
  tags?: ({ label: string; value: string } | string)[];
  townCity: string;
}

interface Props {
  businessId: string | undefined;
  onClose: () => void;
}

interface Return {
  addTag: boolean;
  brands: { label: string; value: string }[];
  brandsLoading: boolean;
  businessName: string;
  currency: Currency | null | undefined;
  form: FormInstance<OnSubmitValues>;
  groups: { label: string; value: string }[];
  groupsLoading: boolean;
  loading: boolean;
  location: LocationData | undefined;
  onSearchBusiness: (
    value: string
  ) => Promise<{ label: string; value: string }[]>;
  onSubmit: (values: OnSubmitValues) => void;
  onSyncCancel: () => void;
  onSyncConfirm: (strategy: GroupSyncStrategy) => void;
  saving: boolean;
  setLocation: (value: LocationData) => void;
  showSyncModal: boolean;
  tags: { label: string; value: string }[];
  tagsLoading: boolean;
  toggleAddTag: () => void;
  updateNewTagData: (values: TagData) => void;
}

const hasGroupsAdded = (original: string[], current: string[]): boolean => {
  const originalSet = new Set(original);
  const currentSet = new Set(current);

  // Check if there are any new groups in current that weren't in original
  for (const id of currentSet) {
    if (!originalSet.has(id)) return true;
  }
  return false;
};

const useEditBusiness = ({ businessId, onClose }: Props): Return => {
  const client = useApolloClient();
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const intl = useIntl();

  const [form] = Form.useForm<OnSubmitValues>();

  const [saving, setSaving] = useState(false);

  const [location, setLocation] = useState<LocationData>();
  const [tagData, setTagData] = useState<TagData[]>([]);
  const [addTag, setAddTag] = useState(false);

  // Group sync state
  const [originalGroups, setOriginalGroups] = useState<string[]>([]);
  const [pendingFormValues, setPendingFormValues] =
    useState<OnSubmitValues | null>(null);
  const [pendingSyncConfig, setPendingSyncConfig] = useState<{
    shouldSync: boolean;
    strategy: GroupSyncStrategy;
  } | null>(null);
  const [showSyncModal, setShowSyncModal] = useState(false);

  const { data, loading } = useEditBusinessQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {
      const groupIds = res.business?.groups.map(({ id }) => id) || [];
      setOriginalGroups(groupIds);

      form.setFieldsValue({
        brands: res.business?.brands,
        building: res.business?.locations[0]?.building || '',
        county: res.business?.locations[0]?.county || '',
        currency: res.business?.currency || null,
        groups: groupIds,
        name: res.business?.name || '',
        parent: res.business
          ? {
              label: res.business?.parent?.name,
              value: res.business?.parent?.id,
            }
          : undefined,
        postcode: res.business?.locations[0]?.postcode || '',
        publicName: res.business?.publicName,
        siteNumber: res.business?.siteNumber || '',
        street: res.business?.locations[0]?.street || '',
        tags: res.business?.tags.map((el) => ({
          label: el.name,
          value: el.id,
        })),
        townCity: res.business?.locations[0]?.townCity || '',
      });
      if (
        res.business?.locations[0]?.geoLat &&
        res.business?.locations[0]?.geoLng
      ) {
        setLocation({
          geoLat: res.business?.locations[0]?.geoLat,
          geoLng: res.business?.locations[0]?.geoLng,
        });
      }
    },
    variables: {
      where: {
        id: businessId,
      },
    },
  });

  const { data: tagsData, loading: tagsLoading } = useTagsQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        dataType: {
          equals: Model.Business,
        },
        schemes: {
          some: {
            id: {
              in: [currentScheme],
            },
          },
        },
      },
    },
  });

  const { data: groupsData, loading: groupsLoading } =
    useSchemeGroupsSelectFilterQuery({
      fetchPolicy: 'cache-first',
      variables: {
        orderBy: {
          name: SortOrder.Asc,
        },
        where: {
          scheme: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
    });

  const groups =
    groupsData?.groups.map((group) => ({
      label: group.name,
      value: group.id,
    })) || [];

  const { data: brandsData, loading: brandsLoading } = useBrandsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  });

  const onSetLocation = (value: LocationData) => {
    setSaving(true);

    if (value) {
      setLocation(value);
      form.setFieldsValue({
        postcode: value.postcode || '',
        street: value.street || '',
        townCity: value.townCity || '',
      });
    }
    setSaving(false);
  };

  const [updateBusiness] = useUpdateBusinessMutation({
    onCompleted: () => {
      // Check if we should sync groups
      if (pendingSyncConfig?.shouldSync) {
        // Don't close yet - trigger sync
        syncGroups();
      } else {
        // Standard completion flow
        setSaving(false);
        onClose();
        notification.success({
          message: intl.formatMessage({
            defaultMessage: 'Shop has been updated',
          }),

          placement: 'bottomRight',
        });
      }
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      const existingData = store.readQuery<
        BusinessesSideListQuery,
        BusinessesSideListQueryVariables
      >({
        query: BusinessesSideListDocument,
        variables: {
          first: 24,
          orderBy: { name: SortOrder.Asc },
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
        },
      });

      if (existingData === null) return;
      if (existingData.businessRelay.edges === undefined) return;

      const index = existingData?.businessRelay?.edges?.findIndex(
        ({ node: business }) => business.id === res.updateBusiness.id
      );
      if (index === -1) return;

      store.writeQuery<
        BusinessesSideListQuery,
        BusinessesSideListQueryVariables
      >({
        data: {
          __typename: 'Query',
          businessRelay: {
            ...existingData.businessRelay,
            edges: existingData?.businessRelay?.edges?.map(
              ({ node: business }) => {
                if (business.id === res.updateBusiness.id) {
                  return {
                    node: {
                      ...business,
                      locations: res.updateBusiness.locations,
                      name: res.updateBusiness.name,
                      siteNumber: res.updateBusiness.siteNumber,
                    },
                  };
                }
                return { node: { ...business } };
              }
            ),
            //   update(existingData.businessRelay.edges, {
            //   [index]: {
            //     $set: {
            //       node: {
            //         id: res.updateBusiness.id,
            //         locations: res.updateBusiness.locations,
            //         name: res.updateBusiness.name,
            //         siteNumber: res.updateBusiness.siteNumber,
            //       },
            //     },
            //   },
            // }),
            // [...existingData.businessRelay.edges,],
            //   existingData?.businessRelay?.edges?.forEach(
            //   ({ node: business }) => {
            //     if (business.id === res.updateBusiness.id) {
            //       // node = {
            //       //   ...business,
            //       //   locations: res.updateBusiness.locations,
            //       //   name: res.updateBusiness.name,
            //       //   siteNumber: res.updateBusiness.siteNumber,
            //       // };
            //       business.name = res.updateBusiness.name;
            //     }
            //   }
            // ),
          },
        },
        query: BusinessesSideListDocument,
        variables: {
          first: 24,
          orderBy: { name: SortOrder.Asc },
          where: {
            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
        },
      });
    },
  });

  const [syncBusinessGroups] = useSyncBusinessGroupsMutation({
    onCompleted: (syncData) => {
      setSaving(false);
      onClose();
      setPendingSyncConfig(null);

      const {
        totalErrors,
        totalIncidentsUpdated,
        totalOffendersUpdated,
        totalVehiclesUpdated,
      } = syncData.syncBusinessGroups;

      if (totalErrors > 0) {
        notification.warning({
          description: intl.formatMessage(
            {
              defaultMessage:
                'Updated {incidents} incidents, {offenders} offenders, {vehicles} vehicles ({errors} errors)',
            },
            {
              errors: totalErrors,
              incidents: totalIncidentsUpdated,
              offenders: totalOffendersUpdated,
              vehicles: totalVehiclesUpdated,
            }
          ),
          duration: 6,
          message: intl.formatMessage({
            defaultMessage: 'Groups synced with warnings',
          }),
          placement: 'bottomRight',
        });
      } else {
        notification.success({
          description: intl.formatMessage(
            {
              defaultMessage:
                'Groups synced: {incidents} incidents, {offenders} offenders, {vehicles} vehicles',
            },
            {
              incidents: totalIncidentsUpdated,
              offenders: totalOffendersUpdated,
              vehicles: totalVehiclesUpdated,
            }
          ),
          duration: 5,
          message: intl.formatMessage({
            defaultMessage: 'Shop updated successfully',
          }),
          placement: 'bottomRight',
        });
      }
    },
    onError: (error) => {
      setSaving(false);
      onClose();
      setPendingSyncConfig(null);

      notification.warning({
        description: error.message,
        duration: 8,
        message: intl.formatMessage({
          defaultMessage: 'Shop updated (groups sync failed)',
        }),
        placement: 'bottomRight',
      });
    },
  });

  const syncGroups = () => {
    if (!pendingSyncConfig) return;

    void syncBusinessGroups({
      variables: {
        businessIds: [businessId!],
        schemeId: currentScheme,
        strategy: pendingSyncConfig.strategy,
      },
    });
  };

  const handleSyncConfirm = (strategy: GroupSyncStrategy) => {
    if (!pendingFormValues) return;

    setShowSyncModal(false);
    setPendingSyncConfig({
      shouldSync: true,
      strategy,
    });

    executeBusinessUpdate(pendingFormValues);
  };

  const handleSyncSkip = () => {
    if (!pendingFormValues) return;

    setShowSyncModal(false);
    setPendingSyncConfig(null);

    executeBusinessUpdate(pendingFormValues);
  };

  const onSubmit = (values: OnSubmitValues) => {
    // Only show modal if groups were added (not removed)
    const groupsAdded = hasGroupsAdded(originalGroups, values.groups);

    if (groupsAdded) {
      // Store pending values and show modal
      setPendingFormValues(values);
      setShowSyncModal(true);
      return; // Don't proceed with mutation yet
    }

    // No new groups added - proceed normally
    executeBusinessUpdate(values);
  };

  const executeBusinessUpdate = (values: OnSubmitValues) => {
    setSaving(true);
    const getParent = () => {
      if (values.parent.value)
        return {
          connect: {
            id: values.parent.value,
          },
        };
      if (data?.business?.parent?.id) return { disconnect: true };
      return undefined;
    };
    const getTags = (): BusinessUpdateInput['tags'] => {
      const existingTagIds = data?.business?.tags?.map(({ id }) => id);

      const tagIds = values?.tags?.map((el) => {
        if (typeof el === 'object') {
          return el.value;
        }
        return el;
      });

      const newTags = tagData?.filter(
        (item) => item.isNew && tagIds?.includes(item.id)
      );

      const connectedTags = tagIds?.filter(
        (id) =>
          !(
            newTags.map((el) => el.id).includes(id) ||
            existingTagIds?.includes(id)
          )
      );
      const disconnectedTags = existingTagIds?.filter(
        (id) => !tagIds?.includes(id)
      );
      return {
        connect:
          connectedTags && connectedTags.length > 0
            ? connectedTags.map((id) => ({ id }))
            : undefined,
        create:
          newTags.length > 0
            ? newTags.map((value) => ({
                createdBy: { connect: { id: value.createdById } },
                //     },
                dataType: Model.Business,
                description: value.description || '',
                name: value.name,
                // schemes: value.schemes.includes(currentScheme)
                //   ? {
                //       connect: value.schemes.map((id) => ({
                //         id,
                //       })),
                //     }
                //   : {
                //       connect: [
                //         ...value.schemes.map((id) => ({
                //           id,
                //         })),
                //         { id: currentScheme },
                //       ],
                schemes: {
                  connect: value.schemes.map((id) => ({ id })),
                },
              }))
            : undefined,
        disconnect:
          disconnectedTags && disconnectedTags.length > 0
            ? disconnectedTags.map((id) => ({ id }))
            : undefined,
      };
    };

    void updateBusiness({
      variables: {
        data: {
          brands: {
            set: values.brands?.map((id: string) => ({ id })) || [],
          },
          currency:
            values.currency === undefined
              ? undefined
              : { set: values.currency },
          groups: {
            set: values.groups?.map((id: string) => ({ id })) || [],
          },
          locations: {
            update: [
              {
                data: {
                  building: { set: values.building },
                  county: { set: values.county },
                  geoLat: location?.geoLat
                    ? { set: location?.geoLat }
                    : undefined,
                  geoLng: location?.geoLng
                    ? { set: location?.geoLng }
                    : undefined,
                  postcode: { set: values.postcode },
                  street: { set: values.street },
                  townCity: { set: values.townCity },
                },
                where: {
                  id: data?.business?.locations[0]?.id,
                },
              },
            ],
          },
          name: { set: values.name },
          parent: getParent(),
          publicName: values.publicName,
          siteNumber: values.siteNumber,
          tags: getTags(),
        },
        where: {
          id: businessId,
        },
      },
      // optimisticResponse: {
      //   updateBusiness: {
      //     id: `${Math.random()}`,
      //     name: values.name,
      //     fullName: values.name,
      //     publicName: values.publicName,
      //     totalUsers: 0,
      //     parent: values.parent
      //       ? {
      //           id: values.parent.value,
      //           name: values.parent.label,
      //           fullName: values.parent.label,
      //           publicName: values.publicName,
      //         }
      //       : undefined,
      //     locations: [
      //       {
      //         id: `${Math.random()}`,
      //         geoLat:,
      //         full: `${values.building}, ${values.street}, ${values.townCity}, ${values.county}, ${values.postcode}`,
      //       },
      //     ],
      //   },
      // },
    });
  };
  // TODO swap to business select
  const onSearchBusiness = async (value: string) => {
    if (value.length < 2) {
      return [];
    }
    return client
      .query<SearchBusinessesQuery, SearchBusinessesQueryVariables>({
        query: SearchBusinessesDocument,
        variables: {
          take: 10,
          where: {
            id: {
              not: {
                equals: businessId,
              },
            },
            name: {
              contains: value,
              mode: QueryMode.Insensitive,
            },

            schemes: {
              some: {
                id: {
                  equals: currentScheme,
                },
              },
            },
          },
        },
      })
      .then((response) =>
        response.data.listBusinesses.businesses.length > 0
          ? response.data.listBusinesses.businesses.map((item) => ({
              label: item?.name || '',
              location: item?.locations[0].full || '',
              value: item?.id || '',
            }))
          : [
              {
                disabled: true,
                label: intl.formatMessage({
                  defaultMessage: 'No results found',
                }),
                value: '',
              },
            ]
      );
  };
  const updateNewTagData = (values: TagData) => {
    setAddTag(false);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const selectedTag = form.getFieldValue('tags');
    if (selectedTag) {
      form.setFieldsValue({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tags: [...selectedTag, { label: values.name, value: values.id }],
      });
    } else {
      form.setFieldsValue({
        tags: [{ label: values.name, value: values.id }],
      });
    }
    setTagData([...tagData, { ...values, isNew: true }]);
  };
  const toggleAddTag = () => {
    setAddTag(!addTag);
  };
  return {
    addTag,
    brands:
      brandsData?.brands.edges.map(({ node: group }) => ({
        label: group.name,
        value: group.id,
      })) || [],
    brandsLoading,
    businessName: data?.business?.name || '',
    currency: data?.business?.currency,
    form,
    groups,
    groupsLoading,
    loading: !data && loading,
    location,
    onSearchBusiness,
    onSubmit,
    onSyncCancel: handleSyncSkip,
    onSyncConfirm: handleSyncConfirm,
    saving,
    setLocation: onSetLocation,
    showSyncModal,
    tags:
      tagsData?.tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })) || [],
    tagsLoading,
    toggleAddTag,
    updateNewTagData,
  };
};

export default useEditBusiness;
