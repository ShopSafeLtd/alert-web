import type {
  BusinessesListQuery,
  BusinessesListQueryVariables,
} from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import {
  BusinessesListDocument,
  useBusinessesListQuery,
} from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-businesses.generated';
import type { PoliceForce } from 'graphql/types';
import { Model, QueryMode, SortOrder } from 'graphql/types';
import type { BusinessData } from 'types/DataType';

import { useLinkBusinessToSchemeMutation } from '#/graphql/businesses/mutations/__generated__/link-business-to-scheme.generated';
import { currentSchemeIdAtom } from '#/providers/SchemeProvider/SchemeProvider';
import { useBusinessTagsQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-business-tags.generated';
import { useListGroupsQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-groups.generated';
import { useParentBusinessesListQuery } from '#/views/settings/businesses/ListBusinesses/graphql/queries/__generated__/list-parent-business-ids.generated';
import { Modal, notification } from 'antd';
import { useCreateBusinessMutation } from 'graphql/businesses/mutations/__generated__/create-business.generated';
import { useDeleteBusinessMutation } from 'graphql/businesses/mutations/__generated__/delete-business.generated';
import { useAtomValue } from 'jotai/index';
import { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface FilterLabels {
  label: string;
  value: string;
}

interface Return {
  addVisible: boolean;
  data: BusinessesListQuery | undefined;
  deleteConfirm: (value: string) => void;
  filtersOpen: boolean;
  groupData: FilterLabels[];
  groupFilter: string[];
  linkVisible: boolean;
  loading: boolean;
  onSearchChange: (value: string) => void;
  onSubmit: (value: BusinessData) => void;
  onUpdateLinkBusiness: (value: string) => void;
  pagination: { page: number; pageSize: number };
  parentData: FilterLabels[];
  parentFilter: string[];
  policeAreaFilter: PoliceForce[];
  saving: boolean;
  searchValue: string;
  setGroupFilter: (value: string[]) => void;
  setPagination: (value: { page: number; pageSize: number }) => void;
  setParentFilter: (value: string[]) => void;
  setPoliceAreaFilter: (value: PoliceForce[]) => void;
  setTagFilter: (value: string[]) => void;
  tagFilter: string[];
  tags: FilterLabels[];
  toggleAddVisible: () => void;
  toggleFiltersOpen: () => void;
  toggleLinkVisible: () => void;
}

const useListBusinesses = (): Return => {
  const intl = useIntl();
  const currentScheme = useAtomValue(currentSchemeIdAtom);
  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);
  const [linkVisible, setLinkVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24 });
  const [parentFilter, setParentFilter] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);
  const [policeAreaFilter, setPoliceAreaFilter] = useState<PoliceForce[]>([]);
  const variables: BusinessesListQueryVariables = {
    orderBy: {
      name: SortOrder.Asc,
    },
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
    where: {
      groups:
        groupFilter.length > 0
          ? { some: { id: { in: groupFilter } } }
          : undefined,
      name: {
        contains: searchValue,
        mode: QueryMode.Insensitive,
      },
      policeArea:
        policeAreaFilter.length > 0 ? { hasSome: policeAreaFilter } : undefined,
      schemes: {
        some: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
  };
  const { data } = useBusinessesListQuery({
    nextFetchPolicy: 'cache-first',
    variables,
  });

  const { data: QueryGroups } = useListGroupsQuery({
    nextFetchPolicy: 'cache-first',
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

  const { data: QueryParentData } = useParentBusinessesListQuery({
    nextFetchPolicy: 'cache-first',
    variables: {
      hasChildrenOnly: true,
      orderBy: {
        name: SortOrder.Asc,
      },
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

  const { data: QueryTags } = useBusinessTagsQuery({
    nextFetchPolicy: 'cache-first',
    variables: {
      orderBy: {
        name: SortOrder.Asc,
      },
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

  const [createBusiness] = useCreateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      setAddVisible(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'You new business has been add to alert.',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Business has been created',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        BusinessesListQuery,
        BusinessesListQueryVariables
      >({
        query: BusinessesListDocument,
        variables,
      });

      if (existingData && result.data)
        store.writeQuery<BusinessesListQuery, BusinessesListQueryVariables>({
          data: {
            businessRelay: {
              edges: [
                ...existingData.businessRelay.edges,
                { node: result.data?.createBusiness },
              ],
              totalCount: (existingData?.businessRelay.totalCount || 0) + 1,
            },
          },
          query: BusinessesListDocument,
          variables,
        });
    },
  });
  const [linkBusinessToScheme] = useLinkBusinessToSchemeMutation({
    onCompleted: () => {
      setSaving(false);
      toggleLinkVisible();
    },
    update: (store, result) => {
      const existingData = store.readQuery<
        BusinessesListQuery,
        BusinessesListQueryVariables
      >({
        query: BusinessesListDocument,
        variables,
      });

      if (existingData && result.data)
        store.writeQuery<BusinessesListQuery, BusinessesListQueryVariables>({
          data: {
            businessRelay: {
              ...existingData.businessRelay,
              edges: [
                ...existingData.businessRelay.edges,
                { node: result.data?.linkBusinessToScheme },
              ],
              totalCount: (existingData?.businessRelay.totalCount || 0) + 1,
            },
          },
          query: BusinessesListDocument,
          variables,
        });
    },
  });

  const onUpdateLinkBusiness = (value: string) => {
    setSaving(true);
    void linkBusinessToScheme({
      variables: {
        business: {
          id: value,
        },
        scheme: {
          id: currentScheme,
        },
      },
    }).finally(() => {
      setSaving(false);
      setLinkVisible(false);
    });
  };
  const [deleteBusiness] = useDeleteBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The business has been removed!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: (store, { data: res }) => {
      if (res === null || res === undefined) return;

      const existingData = store.readQuery<
        BusinessesListQuery,
        BusinessesListQueryVariables
      >({
        query: BusinessesListDocument,
        variables,
      });

      if (existingData === null) return;
      if (existingData.businessRelay.edges === undefined) return;

      store.writeQuery<BusinessesListQuery, BusinessesListQueryVariables>({
        data: {
          __typename: 'Query',
          businessRelay: {
            ...existingData.businessRelay,
            edges: existingData?.businessRelay?.edges?.filter(
              ({ node: business }) => business?.id !== res?.deleteBusiness?.id
            ),
          },
        },
        query: BusinessesListDocument,
        variables,
      });
    },
  });

  const deleteConfirm = (currentId: string) => {
    Modal.confirm({
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
      }),
      onOk() {
        setSaving(true);
        void deleteBusiness({
          variables: {
            id: currentId,
          },
        }).finally(() => setSaving(false));
      },
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this business?',
      }),
    });
  };
  const onSubmit = (values: BusinessData) => {
    setSaving(true);
    void createBusiness({
      variables: {
        data: {
          groups: values?.groups?.map((id) => ({ id })) || [],
          location: {
            building: values.locations[0].building,
            county: values.locations[0].county,
            geoLat: values.locations[0].geoLat,
            geoLng: values.locations[0].geoLng,
            postcode: values.locations[0].postcode || '',
            street: values.locations[0].street || '',
            townCity: values.locations[0].townCity || '',
          },
          name: values.name,
          parent: values.parent
            ? {
                connect: {
                  id: values.parent.id,
                },
              }
            : undefined,
          publicName: values.publicName || false,
          schemes: {
            connect: [
              {
                id: currentScheme,
              },
            ],
          },
          siteNumber: values.siteNumber,
          tags: {
            connect:
              values.tags && values.tags.length > 0
                ? values.tags.map((id) => ({ id }))
                : undefined,
            create:
              values.newTags && values.newTags.length > 0
                ? values.newTags.map((value) => ({
                    createdBy: { connect: { id: value.createdById } },
                    dataType: Model.Business,
                    description: value.description || '',
                    name: value.name,
                    schemes: {
                      connect: value.schemes.map((id) => ({ id })),
                    },
                  }))
                : undefined,
          },
        },
      },
    });
  };
  const toggleAddVisible = () => {
    setAddVisible(!addVisible);
  };

  const toggleLinkVisible = () => {
    setLinkVisible(!linkVisible);
  };

  const groupData = useMemo(
    () =>
      QueryGroups?.groups?.map((group) => ({
        label: group.name,
        value: group.id,
      })) || [],
    [QueryGroups]
  );

  const parentData = useMemo(
    () =>
      QueryParentData?.businessRelay?.edges?.map(({ node: parent }) => ({
        label: parent.name,
        value: parent.id,
      })) || [],
    [QueryParentData]
  );

  const tags = useMemo(
    () =>
      QueryTags?.tags?.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })) || [],
    [QueryTags]
  );

  const toggleFiltersOpen = () => setFiltersOpen(!filtersOpen);

  return {
    addVisible,
    data,
    deleteConfirm,
    filtersOpen,
    groupData,
    groupFilter,
    linkVisible,
    loading: !data,
    onSearchChange,
    onSubmit,
    onUpdateLinkBusiness,
    pagination,
    parentData,
    parentFilter,
    policeAreaFilter,
    saving,
    searchValue,
    setGroupFilter,
    setPagination,
    setParentFilter,
    setPoliceAreaFilter,
    setTagFilter,
    tagFilter,
    tags,
    toggleAddVisible,
    toggleFiltersOpen,
    toggleLinkVisible,
  };
};

export default useListBusinesses;
