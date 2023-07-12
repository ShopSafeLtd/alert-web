import type {
  DeleteFeedItemMutation,
  FeedItemsQuery,
  ListOffendersFeedQuery,
  Model,
} from 'graphql/generated';
import {
  FeedItemsDocument,
  QueryMode,
  Role,
  SortOrder,
  useDeleteFeedItemMutation,
  useFeedItemsQuery,
  useListOffendersFeedQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { FeedItemSort, useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type { DateType, PaginationModel } from 'types/DataType';
import errorNotification from 'types/error_notification';
import { useIntl } from 'react-intl';

interface Return {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: PaginationModel;
  order: FeedItemSort;
  setOrder: (value: FeedItemSort) => void;
  search: string;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  onGroupsChange: (groups: string[]) => void;
  variables: {
    groups: string[];
  };
  // updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  groupsFilter: string[];
  setGroupsFilter: (value: string[]) => void;
  typesFilter: Model[];
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  gallery: string[];
  setGallery: (values: string[]) => void;
  createdAtFilter: DateType | undefined;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  fetchMoreScroll: () => void;
}

const useFeedItems = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);
  const intl = useIntl();
  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, id: userId } = useStoreState((state) => state.user);
  const pagination = useStoreState((state) => state.data.feedItems.pagination);
  const variables = useStoreState((state) => state.data.feedItems.variables);
  const order = useStoreState((state) => state.data.feedItems.order);
  const [saving, setSaving] = useState(false);
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );
  const [search, setSearch] = useState('');
  const [sortFilter, setSortFilter] = useState(false);
  const [typesFilter, setTypesFilter] = useState<Model[]>([]);
  const [groupsFilter, setGroupsFilter] = useState<string[]>([]);
  const [createdAtFilter, setCreatedAtFilter] = useState<
    DateType | undefined
  >();
  const [gallery, setGallery] = useState<string[]>([]);
  const itemVariables = {
    createdAt: createdAtFilter
      ? {
          gte: createdAtFilter.startDate,
          lte: createdAtFilter.endDate,
        }
      : undefined,
    subscribedUsers: gallery.includes('FOLLOWING')
      ? {
          some: {
            id: {
              equals: userId,
            },
          },
        }
      : undefined,
    createdBy: gallery.includes('MYDATA')
      ? {
          id: {
            equals: userId,
          },
        }
      : undefined,
    reference: search
      ? {
          equals: Number(search),
        }
      : undefined,
  };
  const queryVariables = {
    search,
    schemeId,
    order: {
      updatedAt:
        order === FeedItemSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
    },
    take: pagination.pageSize,
    skip: (pagination.page - 1) * pagination.pageSize,
    where: {
      groups:
        groupsFilter.length > 0
          ? {
              some: {
                id: {
                  in: groupsFilter,
                },
              },
            }
          : undefined,

      model:
        typesFilter.length > 0
          ? {
              in: typesFilter,
            }
          : undefined,

      AND: [
        {
          offender: {
            approved: gallery.includes('NOT APPROVED')
              ? {
                  equals: false,
                }
              : undefined,
          },
        },
        {
          incident: {
            approved: gallery.includes('NOT APPROVED')
              ? {
                  equals: false,
                }
              : undefined,
          },
        },
        {
          OR: [
            {
              createdBy: gallery.includes('MYDATA')
                ? {
                    id: {
                      equals: userId,
                    },
                  }
                : undefined,
            },
            {
              offender: itemVariables,
            },
            {
              incident: itemVariables,
            },
            {
              vehicle: itemVariables,
            },
            {
              crimeGroup: itemVariables,
            },
            {
              investigation: itemVariables,
            },
          ],
        },
      ],
    },
  };

  const schemeGroups =
    useStoreState((state) => state.user.groups)
      .filter((group) => group.scheme.id === schemeId)
      .map((group) => ({
        value: group.id,
        label: group.name,
      })) || [];

  // Queries
  // // Fetch scheme groups if scheme admin
  // const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
  //   variables: {
  //     where: {
  //       scheme: {
  //         id: {
  //           equals: schemeId,
  //         },
  //       },
  //       users:
  //         role === Role.User
  //           ? {
  //               some: {
  //                 id: {
  //                   equals: userId,
  //                 },
  //               },
  //             }
  //           : undefined,
  //     },
  //   },
  //   fetchPolicy: 'cache-and-network',
  //   skip: role !== Role.SchemeAdmin,
  // });

  // On mount
  useEffect(() => {
    // const sizeOptions = getSizeOptions();
    setFeedItemsState({
      pagination: {
        ...pagination,
        // sizeOptions,
        // pageSize: Number(sizeOptions[0]),
      },
      variables: {
        ...variables,
        groups: schemeGroups?.map((group) => group.value) || [],
      },
      order,
    });
  }, []);

  const { data, loading, fetchMore } = useFeedItemsQuery({
    // @ts-expect-error TODO: Fix type
    variables: {
      ...queryVariables,
      groupsWhere2: {
        users: {
          some: {
            id: {
              equals: userId,
            },
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersFeedQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Desc,
        },
        take: 10,
        where: {
          // @ts-expect-error TODO: Fix type
          createdAt: createdAtFilter
            ? {
                gte: createdAtFilter.startDate,
                lte: createdAtFilter.endDate,
              }
            : undefined,
          approved: gallery.includes('NOT APPROVED')
            ? {
                equals: false,
              }
            : undefined,
          subscribedUsers: gallery.includes('FOLLOWING')
            ? {
                some: {
                  id: {
                    equals: userId,
                  },
                },
              }
            : undefined,
          createdBy: gallery.includes('MYDATA')
            ? {
                id: {
                  equals: userId,
                },
              }
            : undefined,
          OR: [
            {
              name: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
            {
              ref: {
                contains: search,
                mode: QueryMode.Insensitive,
              },
            },
          ],
        },
      },
    });
  // delete feedItem
  const updateFeedItemList: MutationUpdaterFn<DeleteFeedItemMutation> = (
    store,
    { data: res }
  ) => {
    if (res === null || res === undefined) return;

    const existingData = store.readQuery<FeedItemsQuery>({
      query: FeedItemsDocument,
      variables: queryVariables,
    });

    if (existingData === null) return;
    if (existingData?.listFeedItems?.feedItems === undefined) return;

    store.writeQuery<FeedItemsQuery>({
      query: FeedItemsDocument,
      data: {
        listFeedItems: {
          ...existingData.listFeedItems,
          feedItems: existingData.listFeedItems?.feedItems.filter(
            ({ id }) => id !== res?.deleteFeedItem?.id
          ),
        },
        __typename: 'Query',
      },
      variables: queryVariables,
    });
  };
  const [deleteFeedItem] = useDeleteFeedItemMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
          id: 'dvDKi/',
        }),
        description: intl.formatMessage({
          defaultMessage: 'The message has been deleted!',
          id: 'IGVq4m',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update: updateFeedItemList,
  });
  const onDeleteFeedItem = (currentId: string) => {
    setSaving(true);
    if (currentId) {
      void deleteFeedItem({
        variables: {
          id: currentId,
        },
      });
    }
  };

  const fetchMoreScroll = () => {
    void fetchMore({
      variables: {
        ...queryVariables,
        take: 10,
        skip: data?.listFeedItems?.feedItems?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listFeedItems: {
            ...fetchMoreResult.listFeedItems,
            total:
              prev.listFeedItems?.total ||
              fetchMoreResult?.listFeedItems?.total ||
              0,
            feedItems: [
              ...(prev.listFeedItems?.feedItems || []),
              ...(fetchMoreResult.listFeedItems?.feedItems || []),
            ],
          },
        };
      },
    });
  };
  // Functions
  const onPaginationChange = (page: number, pageSize: number) => {
    setFeedItemsState({
      pagination: {
        ...pagination,
        page,
        pageSize,
      },
      variables,
      order,
    });
  };

  const onGroupsChange = (values: string[]) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
      order,
    });
  };

  const setOrder = (value: FeedItemSort) => {
    setFeedItemsState({
      pagination,
      variables,
      order: value,
    });
  };

  // const setSearch = (value: string) => {
  //   setFeedItemsState({
  //     pagination,
  //     variables: {
  //       ...variables,
  //       search: value,
  //     },
  //     order,
  //   });
  // };
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setGroupsFilter([]);
    setTypesFilter([]);
    setOrder(FeedItemSort.updatedAtDesc);
    setCreatedAtFilter(undefined);
  };
  return {
    data,
    loading: !data && loading,
    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,
    order,
    setOrder,
    search,
    setSearch,
    groups: schemeGroups,
    groupsLoading: false,
    onGroupsChange,
    variables,
    onNavigate,
    onDeleteFeedItem,
    saving,
    adminRights: role !== Role.User,
    typesFilter,
    setTypesFilter,
    groupsFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    gallery,
    setGallery,
    setCreatedAtFilter,
    createdAtFilter,
    fetchMoreScroll,
  };
};

export default useFeedItems;
