import type { MutationUpdaterFn } from '@apollo/client';
import type { DeleteFeedItemMutation } from 'graphql/feedItems/mutations/__generated__/delete_feed_item.generated';
import type {
  FeedItemsQuery,
  FeedItemsQueryVariables,
} from 'graphql/feedItems/queries/__generated__/feed-items.generated';

import errorNotification from '#/types/mutation_notifications/error_notification';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import { notification } from 'antd';
import { useDeleteFeedItemMutation } from 'graphql/feedItems/mutations/__generated__/delete_feed_item.generated';
import {
  FeedItemsDocument,
  useFeedItemsQuery,
} from 'graphql/feedItems/queries/__generated__/feed-items.generated';

interface Return {
  data: FeedItemsQuery | undefined;
  fetchMoreScroll: () => void;
  loading: boolean;
  onDeleteFeedItem: (value: string) => void;
}

const useFeedItems = (): Return => {
  const {
    intl,
    schemeId,
    setSaving,
    userId,
    variables: {
      createdAt: createdAtFilter,
      gallery,
      groups: groupsFilter,
      order,
      search,
      types: typesFilter,
    },
  } = useDashboardContext();

  function areAllValuesUndefined(obj: { [key: string]: unknown }): boolean {
    return Object.values(obj).every((value) => value === undefined);
  }

  const itemVariables = {
    createdAt: createdAtFilter
      ? {
          gte: createdAtFilter.startDate,
          lte: createdAtFilter.endDate,
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
    subscribedUsers: gallery.includes('FOLLOWING')
      ? {
          some: {
            id: {
              equals: userId,
            },
          },
        }
      : undefined,
  };

  const queryVariables: FeedItemsQueryVariables = {
    groupsWhere2: {
      users: {
        some: {
          id: {
            equals: userId,
          },
        },
      },
    },
    order: {
      updatedAt: order,
    },
    schemeId,
    search,
    take: 10,
    where: {
      AND:
        gallery.includes('NOT APPROVED') ||
        gallery.includes('MYDATA') ||
        !areAllValuesUndefined(itemVariables)
          ? [
              gallery.includes('NOT APPROVED')
                ? {
                    incident: {
                      approved: {
                        equals: false,
                      },
                    },
                    offender: {
                      approved: {
                        equals: false,
                      },
                    },
                  }
                : {},
              gallery.includes('MYDATA') ||
              !areAllValuesUndefined(itemVariables) ||
              search
                ? {
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
                        incident: {
                          ...itemVariables,
                          business: search
                            ? {
                                name: {
                                  contains: search,
                                },
                              }
                            : undefined,
                        },
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
                  }
                : {},
            ]
          : undefined,

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
    },
  };

  const { data, fetchMore, loading } = useFeedItemsQuery({
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  const fetchMoreScroll = () => {
    void fetchMore({
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          listFeedItems: {
            ...fetchMoreResult.listFeedItems,
            feedItems: [
              ...(prev.listFeedItems?.feedItems || []),
              ...(fetchMoreResult.listFeedItems?.feedItems || []),
            ],
            total:
              prev.listFeedItems?.total ||
              fetchMoreResult?.listFeedItems?.total ||
              0,
          },
        };
      },
      variables: {
        ...queryVariables,

        skip: data?.listFeedItems?.feedItems?.length || 0,
      },
    });
  };

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
      data: {
        __typename: 'Query',
        listFeedItems: {
          ...existingData.listFeedItems,
          feedItems: existingData.listFeedItems?.feedItems.filter(
            ({ id }) => id !== res?.deleteFeedItem?.id
          ),
        },
      },
      query: FeedItemsDocument,
      variables: queryVariables,
    });
  };

  const [deleteFeedItem] = useDeleteFeedItemMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        description: intl.formatMessage({
          defaultMessage: 'The message has been deleted!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Deleted!',
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

  return {
    data,
    fetchMoreScroll,
    loading,
    onDeleteFeedItem,
  };
};

export default useFeedItems;
