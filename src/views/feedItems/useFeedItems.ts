import {
  FeedItemsQuery,
  ListOffendersQuery,
  Role,
  SortOrder,
  useFeedItemsQuery,
  useListOffendersQuery,
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useEffect } from 'react';
import { FeedItemSort, useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';

interface Return {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  recentOffenderData: ListOffendersQuery | undefined;
  recentOffenderLoading: boolean;
  onPaginationChange: (page: number, pageSize: number) => void;
  pagination: { page: number; pageSize: number; sizeOptions: string[] };
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
}

const getSizeOptions = () => {
  if (window.innerWidth > 1239 && window.innerWidth < 1800) {
    return ['8', '16', '24'];
  }
  if (window.innerWidth > 1799) {
    return ['8', '16', '24'];
  }
  return ['8'];
};

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
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );

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
    onCompleted: (result) => {
      setFeedItemsState({
        pagination,
        variables: {
          ...variables,
          groups: result.groups.map((group) => group.id),
        },
        order,
      });
    },
  });
  // On mount
  useEffect(() => {
    const sizeOptions = getSizeOptions();
    setFeedItemsState({
      pagination: {
        ...pagination,
        sizeOptions,
        pageSize: Number(sizeOptions[0]),
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

  // Fetch incidents
  const { data, loading } = useFeedItemsQuery({
    variables: {
      schemeId,
      order: {
        updatedAt:
          order === FeedItemSort.updatedAtDesc ? SortOrder.Desc : SortOrder.Asc,
      },
      groups:
        variables.groups && variables.groups.length > 0
          ? variables.groups.map((id) => id)
          : undefined,
      search: variables.search,
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });
  const { data: recentOffenderData, loading: recentOffenderLoading } =
    useListOffendersQuery({
      variables: {
        scheme: {
          id: schemeId,
        },
        order: {
          updatedAt: SortOrder.Asc,
        },
        take: 10,
        // where: searchOffenders.length
        //   ? {
        //       name: {
        //         contains: searchOffenders,
        //         mode: QueryMode.Insensitive,
        //       },
        //     }
        //   : undefined,
      },
    });
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

  const setSearch = (value: string) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
      order,
    });
  };

  return {
    data,
    loading,
    recentOffenderData,
    recentOffenderLoading,
    onPaginationChange,
    pagination,
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
  };
};

export default useFeedItems;
