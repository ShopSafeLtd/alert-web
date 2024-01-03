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
  useSchemeGroupsQuery,
} from 'graphql/generated';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from 'state';
import { useNavigate } from 'react-router-dom';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import type { DateType } from 'types/DataType';
import errorNotification from 'types/mutation_notifications/error_notification';
import { useIntl } from 'react-intl';
import type { FeedItemFilters } from 'state/data-model';

interface Return {
  data: FeedItemsQuery | undefined;
  loading: boolean;
  recentOffenderData: ListOffendersFeedQuery | undefined;
  recentOffenderLoading: boolean;
  setOrder: (value: SortOrder) => void;
  setSearch: (value: string) => void;
  groups: { value: string; label: string }[];
  groupsLoading: boolean;
  // updateIncidentList: MutationUpdaterFn<RecycleIncidentMutation>;
  onNavigate: () => void;
  onDeleteFeedItem: (value: string) => void;
  saving: boolean;
  adminRights: boolean;
  sortFilter: boolean;
  toggleSortFilter: () => void;
  setGroupsFilter: (value: string[]) => void;
  setTypesFilter: (value: Model[]) => void;
  clearFilters: () => void;
  setGallery: (values: string[]) => void;
  setCreatedAtFilter: (value: DateType | undefined) => void;
  fetchMoreScroll: () => void;
  variables: FeedItemFilters;
  lightboxElements: {
    src: string;
  }[];
  lightBoxOpen: {
    open: boolean;
    index: number;
  };
  openLightbox: (elements: { src: string }[], index: number) => void;
}

const useFeedItems = (): Return => {
  const navigate = useNavigate();
  const onNavigate = () => navigate(`/app/incidents/add`);
  const intl = useIntl();
  // Global State
  const schemeId = useStoreState((state) => state.scheme.id);
  const {
    role,
    id: userId,
    filterDefaultGroups: defaultGroups,
  } = useStoreState((state) => state.user);

  const pagination = useStoreState((state) => state.data.feedItems.pagination);
  const variables = useStoreState((state) => state.data.feedItems.variables);
  const [saving, setSaving] = useState(false);
  const setFeedItemsState = useStoreActions(
    (actions) => actions.data.setFeedItems
  );
  const [sortFilter, setSortFilter] = useState(false);
  // lightBox
  const [lightboxElements, setLightboxElements] = useState<{ src: string }[]>(
    []
  );
  const [lightBoxOpen, setLightBoxOpen] = useState({
    open: false,
    index: 0,
  });
  const {
    search,
    groups: groupsFilter,
    createdAt: createdAtFilter,
    gallery,
    order,
    types: typesFilter,
  } = variables;

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
      updatedAt: order,
    },
    take: 10,
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

  // Queries

  // On mount
  useEffect(() => {
    setFeedItemsState({
      pagination: {
        ...pagination,
      },
      variables: {
        ...variables,
        groups:
          defaultGroups
            ?.filter(({ scheme }) => scheme.id === schemeId)
            ?.map(({ id }) => id) || [],
      },
    });
  }, [schemeId]);

  const { data, loading, fetchMore } = useFeedItemsQuery({
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
  const { data: groupsData, loading: groupsLoading } = useSchemeGroupsQuery({
    variables: {
      where: {
        scheme: {
          id: {
            equals: schemeId,
          },
        },
        users:
          role === Role.SchemeAdmin
            ? undefined
            : {
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
  // filter Functions
  const setGallery = (values: string[]) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        gallery: values,
      },
    });
  };

  const setCreatedAtFilter = (values: DateType | undefined) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        createdAt: values,
      },
    });
  };

  const setOrder = (values: SortOrder) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        order: values,
      },
    });
  };

  const setSearch = (value: string) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        search: value,
      },
    });
  };
  const setGroupsFilter = (values: string[]) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        groups: values,
      },
    });
  };
  const setTypesFilter = (values: Model[]) => {
    setFeedItemsState({
      pagination,
      variables: {
        ...variables,
        types: values,
      },
    });
  };
  const toggleSortFilter = () => {
    setSortFilter(!sortFilter);
  };

  const clearFilters = () => {
    setFeedItemsState({
      pagination,
      variables: {
        order: SortOrder.Desc,
        search: '',
        createdAt: undefined,
        gallery: [],
        groups: [],
        types: [],
      },
    });
  };

  // lightBox
  const triggerLightbox = (elements: { src: string }[], index: number) => {
    setLightboxElements(elements);
    if (lightBoxOpen.open) {
      setLightBoxOpen({
        open: !lightBoxOpen.open,
        index,
      });
    } else {
      setTimeout(
        () =>
          setLightBoxOpen({
            open: !lightBoxOpen.open,
            index,
          }),
        0.3
      );
    }
  };
  return {
    data,
    loading: !data && loading,
    recentOffenderData,
    recentOffenderLoading,
    setOrder,
    setSearch,
    groups:
      groupsData?.groups.map((group) => ({
        value: group.id,
        label: group.name,
      })) || [],
    groupsLoading,
    variables,
    onNavigate,
    onDeleteFeedItem,
    saving,
    adminRights: role !== Role.User,
    setTypesFilter,
    setGroupsFilter,
    sortFilter,
    toggleSortFilter,
    clearFilters,
    setGallery,
    setCreatedAtFilter,
    fetchMoreScroll,
    lightboxElements,
    lightBoxOpen,
    openLightbox: triggerLightbox,
  };
};

export default useFeedItems;
