import {
  FeedItemsQuery,
  ListOffendersQuery,
  Role,
  SortOrder,
  useFeedItemsQuery,
  useListOffendersQuery,
  useListUnapprovedIncidentsQuery,
  useSchemeGroupsQuery,
  ListUnapprovedIncidentsQuery,
  useListArticlesQuery,
  QueryMode,
  ListArticlesQuery,
  FeedItemsDocument,
  DeleteFeedItemMutation,
  useDeleteFeedItemMutation,
} from 'graphql/generated';
import { useState } from 'react';
import { FeedItemSort, useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import { PaginationModel } from 'types/DataType';

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
}

const useFeedItems = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);

  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const groups = useStoreState((state) => state.user.groups);
  const role = useStoreState((state) => state.user.role);
  const pagination = useStoreState((state) => state.data.feedItems.pagination);
  const variables = useStoreState((state) => state.data.feedItems.variables);
  const order = useStoreState((state) => state.data.feedItems.order);
  const [saving, setSaving] = useState(false);
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );
  const [search, setSearch] = useState('');
  const [articlePagination, setArticlePagination] = useState<PaginationModel>({
    page: 1,
    pageSize: 12,
    sizeOptions: ['12'],
  });

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
    // onCompleted: (result) => {
    //   setFeedItemsState({
    //     pagination,
    //     variables: {
    //       ...variables,
    //       groups: result.groups.map((group) => group.id),
    //     },
    //     order,
    //   });
    // },
  });

  // On mount
  // useEffect(() => {
  //   const sizeOptions = getSizeOptions();
  //   setFeedItemsState({
  //     pagination: {
  //       ...pagination,
  //       sizeOptions,
  //       pageSize: Number(sizeOptions[0]),
  //     },
  //     variables: {
  //       ...variables,
  //       groups:
  //         role === Role.SchemeAdmin
  //           ? groupsData?.groups.map((group) => group.id) || []
  //           : groups.map((group) => group.id),
  //     },
  //     order,
  //   });
  // }, []);

  const { data, loading } = useFeedItemsQuery({
    variables: {
      schemeId,
      order: {
        updatedAt: SortOrder.Desc,
      },
      search,
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { data: articleData, loading: articleLoading } = useListArticlesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      scheme: {
        id: schemeId,
      },
      where: {
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
        },
      },
    });
  console.log('search', search);

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
      variables: {
        schemeId,
        order: {
          updatedAt: SortOrder.Desc,
        },
        groups:
          variables.groups && variables.groups.length > 0
            ? variables.groups.map((id) => id)
            : undefined,
        search: variables.search,
        take: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
      },
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
      variables: {
        schemeId,
        order: {
          updatedAt: SortOrder.Desc,
        },
        groups:
          variables.groups && variables.groups.length > 0
            ? variables.groups.map((id) => id)
            : undefined,
        search: variables.search,
        take: pagination.pageSize,
        skip: (pagination.page - 1) * pagination.pageSize,
      },
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

  return {
    data,
    loading,
    articleData,
    articleLoading,
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
    // updateIncidentList,
    onNavigate,
    unapprovedIncidents,
    unapprovedIncidentsLoading,
    onDeleteFeedItem,
    saving,
    adminRights: role !== Role.User,
  };
};

export default useFeedItems;
