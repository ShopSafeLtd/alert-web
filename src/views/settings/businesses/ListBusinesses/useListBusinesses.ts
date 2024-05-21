import { useMemo, useState } from 'react';
import type {
  BusinessesListQuery,
  BusinessesListQueryVariables,
} from 'graphql/generated';
import {
  BusinessesListDocument,
  Model,
  QueryMode,
  SortOrder,
  useBusinessesListQuery,
  useBusinessTagsQuery,
  useCreateBusinessMutation,
  useDeleteBusinessMutation,
  useListGroupsQuery,
  useParentBusinessesListQuery,
} from 'graphql/generated';
import { useStoreState } from 'state';
import { Modal, notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
import type { BusinessData } from 'types/DataType';
import { useIntl } from 'react-intl';

export interface FilterLabels {
  label: string;
  value: string;
}

interface Return {
  data: BusinessesListQuery | undefined;
  loading: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  addVisible: boolean;
  toggleAddVisible: () => void;
  linkVisible: boolean;
  toggleLinkVisible: () => void;
  onSubmit: (value: BusinessData) => void;
  saving: boolean;
  deleteConfirm: (value: string) => void;
  pagination: { page: number; pageSize: number };
  setPagination: (value: { page: number; pageSize: number }) => void;
  parentFilter: string[];
  parentData: FilterLabels[];
  setParentFilter: (value: string[]) => void;
  groupFilter: string[];
  groupData: FilterLabels[];
  setGroupFilter: (value: string[]) => void;
  tagFilter: string[];
  tags: FilterLabels[];
  setTagFilter: (value: string[]) => void;
}

const useListBusinesses = (): Return => {
  const intl = useIntl();
  const currentScheme = useStoreState((state) => state.scheme.id);
  const [searchValue, onSearchChange] = useState('');
  const [addVisible, setAddVisible] = useState(false);
  const [linkVisible, setLinkVisible] = useState(false);
  const [saving, setSaving] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 24 });
  const [parentFilter, setParentFilter] = useState<string[]>([]);
  const [groupFilter, setGroupFilter] = useState<string[]>([]);
  const [tagFilter, setTagFilter] = useState<string[]>([]);

  const variables: BusinessesListQueryVariables = {
    where: {
      name: {
        contains: searchValue,
        mode: QueryMode.Insensitive,
      },
      parent:
        parentFilter.length > 0 ? { id: { in: parentFilter } } : undefined,
      groups:
        groupFilter.length > 0
          ? { some: { id: { in: groupFilter } } }
          : undefined,
      tags:
        tagFilter.length > 0 ? { some: { id: { in: tagFilter } } } : undefined,
      schemes: {
        some: {
          id: {
            equals: currentScheme,
          },
        },
      },
    },
    skip: (pagination.page - 1) * pagination.pageSize,
    take: pagination.pageSize,
    orderBy: {
      name: SortOrder.Asc,
    },
  };
  const { data } = useBusinessesListQuery({
    variables,
    nextFetchPolicy: 'cache-first',
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
      where: {
        schemes: {
          some: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
      hasChildrenOnly: true,
      orderBy: {
        name: SortOrder.Asc,
      },
    },
  });

  const { data: QueryTags } = useBusinessTagsQuery({
    nextFetchPolicy: 'cache-first',

    variables: {
      where: {
        schemes: {
          some: {
            id: {
              equals: currentScheme,
            },
          },
        },
      },
      orderBy: {
        name: SortOrder.Asc,
      },
    },
  });

  const [createBusiness] = useCreateBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      setAddVisible(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Business has been created',
          id: 'uILUkO',
        }),
        description: intl.formatMessage({
          defaultMessage: 'You new business has been add to alert.',
          id: 'sJoRW/',
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
          query: BusinessesListDocument,
          variables,
          data: {
            businessRelay: {
              totalCount: (existingData?.businessRelay.totalCount || 0) + 1,
              edges: [
                ...existingData.businessRelay.edges,
                { node: result.data?.createBusiness },
              ],
            },
          },
        });
    },
  });

  const [deleteBusiness] = useDeleteBusinessMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Removed!',
          id: 'U0zgbv',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The business has been removed!',
          id: 'mSae6x',
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
        query: BusinessesListDocument,
        data: {
          businessRelay: {
            ...existingData.businessRelay,
            edges: existingData?.businessRelay?.edges?.filter(
              ({ node: business }) => business?.id !== res?.deleteBusiness?.id
            ),
          },
          __typename: 'Query',
        },
        variables,
      });
    },
  });

  const deleteConfirm = (currentId: string) => {
    Modal.confirm({
      title: intl.formatMessage({
        defaultMessage: 'Do you want to delete this business?',
        id: 'e1WPCT',
      }),
      content: intl.formatMessage({
        defaultMessage: 'This action cannot be undone.',
        id: 'JDJoIZ',
      }),
      onOk() {
        setSaving(true);
        void deleteBusiness({
          variables: {
            id: currentId,
          },
        }).finally(() => setSaving(false));
      },
    });
  };
  const onSubmit = (values: BusinessData) => {
    setSaving(true);
    void createBusiness({
      variables: {
        data: {
          name: values.name,
          siteNumber: values.siteNumber,
          publicName: values.publicName || false,
          schemes: {
            connect: [
              {
                id: currentScheme,
              },
            ],
          },
          tags: {
            connect:
              values.tags && values.tags.length > 0
                ? values.tags.map((id) => ({ id }))
                : undefined,
            create:
              values.newTags && values.newTags.length > 0
                ? values.newTags.map((value) => ({
                    name: value.name,
                    description: value.description || '',
                    schemes: {
                      connect: value.schemes.map((id) => ({ id })),
                    },
                    createdBy: { connect: { id: value.createdById } },
                    dataType: Model.Business,
                  }))
                : undefined,
          },
          groups: values?.groups?.map((id) => ({ id })) || [],
          parent: values.parent
            ? {
                connect: {
                  id: values.parent.id,
                },
              }
            : undefined,
          location: {
            building: values.locations[0].building,
            county: values.locations[0].county,
            postcode: values.locations[0].postcode || '',
            street: values.locations[0].street || '',
            townCity: values.locations[0].townCity || '',
            geoLat: values.locations[0].geoLat,
            geoLng: values.locations[0].geoLng,
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

  return {
    data,
    loading: !data,
    onSearchChange,
    searchValue,
    addVisible,
    toggleAddVisible,
    linkVisible,
    toggleLinkVisible,
    onSubmit,
    saving,
    deleteConfirm,
    pagination,
    setPagination,
    groupData,
    groupFilter,
    setGroupFilter,
    parentData,
    parentFilter,
    setParentFilter,
    tags,
    tagFilter,
    setTagFilter,
  };
};

export default useListBusinesses;
