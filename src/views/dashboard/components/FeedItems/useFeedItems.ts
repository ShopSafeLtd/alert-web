import {
  type DeleteFeedItemMutation,
  FeedItemsDocument,
  type FeedItemsQuery,
  useDeleteFeedItemMutation,
  useFeedItemsQuery,
} from 'graphql/generated';
import { useDashboardContext } from '#/views/dashboard/Dashboard.context';
import errorNotification from '#/types/mutation_notifications/error_notification';
import { notification } from 'antd';
import type { MutationUpdaterFn } from '@apollo/client';

interface Return {
  loading: boolean;
  data: FeedItemsQuery | undefined;
  fetchMoreScroll: () => void;
  onDeleteFeedItem: (value: string) => void;
}

const useFeedItems = (): Return => {
  const {
    variables: {
      search,
      groups: groupsFilter,
      gallery,
      order,
      createdAt: createdAtFilter,
      types: typesFilter,
    },
    schemeId,
    userId,
    setSaving,
    intl,
  } = useDashboardContext();

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
    groupsWhere2: {
      users: {
        some: {
          id: {
            equals: userId,
          },
        },
      },
    },
  };

  const { data, loading, fetchMore } = useFeedItemsQuery({
    variables: queryVariables,
    fetchPolicy: 'cache-and-network',
  });

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

  return {
    loading,
    data,
    fetchMoreScroll,
    onDeleteFeedItem,
  };
};

export default useFeedItems;
