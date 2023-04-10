import type {
  DeleteFeedItemMutation,
  FeedItemsQuery,
  ListArticlesQuery,
  ListOffendersQuery,
  ListUnapprovedIncidentsQuery,
  Model,
} from 'graphql/generated';
import {
  FeedItemsDocument,
  QueryMode,
  Role,
  SortOrder,
  useDeleteFeedItemMutation,
  useFeedItemsQuery,
  useListArticlesQuery,
  useListOffendersQuery,
  useListUnapprovedIncidentsQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { FeedItemSort, useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type { PaginationModel } from 'types/DataType';

interface Return {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  articleData: ListArticlesQuery | undefined;
  articleLoading: boolean;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: PaginationModel;
  articlePagination: PaginationModel;
  onArticlePaginationChange: (page: number, pageSize: number) => void;
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
  unapprovedIncidents: ListUnapprovedIncidentsQuery | undefined;
  unapprovedIncidentsLoading: boolean;
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
}

const useFeedItems = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const { role, groups, id: userId } = useStoreState((state) => state.user);
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
  const [gallery, setGallery] = useState<string[]>([]);

  const [articlePagination, setArticlePagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 12,
    sizeOptions: ['12'],
  });

  const itemVariables = {
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
      // createdAt: filterCreatedAt
      //   ? {
      //       gte: filterCreatedAt.startDate,
      //       lte: filterCreatedAt.endDate,
      //     }
      //   : undefined,
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
        // {
        //   message: {
        //     contains: search,
        //     mode: QueryMode.Insensitive,
        //   },
        // },
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
  // Queries
  // Fetch scheme groups if scheme admin
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
      },
    },
    fetchPolicy: 'cache-and-network',
    skip: role !== Role.SchemeAdmin,
  });

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
        groups:
          role === Role.SchemeAdmin
            ? groupsData?.groups.map((group) => group.id) || []
            : groups.map((group) => group.id),
      },
      order,
    });
  }, []);

  const { data, loading } = useFeedItemsQuery({
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

  const { data: articleData, loading: articleLoading } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
      where: {
        createdBy: gallery.includes('MYDATA')
          ? {
              id: {
                equals: userId,
              },
            }
          : undefined,

        OR: [
          {
            title: {
              contains: search,
              mode: QueryMode.Insensitive,
            },
          },
        ],
      },

      order: { updatedAt: SortOrder.Desc },
      take: articlePagination.pageSize,
      skip: articlePagination.pageSize * (articlePagination.page - 1),
    },
  });

  const { data: unapprovedIncidents, loading: unapprovedIncidentsLoading } =
    useListUnapprovedIncidentsQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          createdAt: SortOrder.Desc,
        },
        skip: 0,
        take: 10,
        where: {
          approved: {
            equals: false,
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
                  ref: {
                    contains: search,
                    mode: QueryMode.Insensitive,
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
        },
      },
    });

  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersQuery({
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
        message: 'Successfully Deleted!',
        description: 'The message has been deleted!',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      notification.error({
        message: 'Error!',
        description: 'Whoops, there are some errors. Please try again. ',
        placement: 'bottomRight',
      });
    },
    update: updateFeedItemList,
  });
  const onDeleteFeedItem = (currentId: string) => {
    setSaving(true);
    if (currentId) {
      deleteFeedItem({
        variables: {
          id: currentId,
        },
      });
    }
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
  const onArticlePaginationChange = (page: number, pageSize: number) =>
    setArticlePagination({
      ...articlePagination,
      page,
      pageSize,
    });
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
  };
  return {
    data,
    loading: !data && loading,
    articleData,
    articleLoading: !articleData && articleLoading,
    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,
    articlePagination,
    onArticlePaginationChange,
    order,
    setOrder,
    search: variables.search,
    setSearch,
    groups:
      role === Role.SchemeAdmin
        ? groupsData?.groups.map((group) => ({
            value: group.id,
            label: group.name,
          })) || []
        : groups.map((group) => ({ value: group.id, label: group.name })),
    groupsLoading,
    onGroupsChange,
    variables,
    onNavigate,
    unapprovedIncidents,
    unapprovedIncidentsLoading,
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
  };
};

export default useFeedItems;
