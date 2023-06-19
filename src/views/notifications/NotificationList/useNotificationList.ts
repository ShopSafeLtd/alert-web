import { useStoreActions, useStoreState } from 'state';
import type {
  UserNotificationsQuery,
  UpdateUserNotificationsMutation,
} from 'graphql/generated';
import {
  useUpdateUserNotificationsMutation,
  Model,
  useUserNotificationsQuery,
  UserNotificationsDocument,
  // QueryMode,
  SortOrder,
} from 'graphql/generated';
import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useNavigate } from 'react-router';

export interface NotificationData {
  id: string;
  type?: Model | null | undefined;
  vehicleId?: string | null;
  offenderId?: string | null;
  crimeGroupId?: string | null;
  incidentId?: string | null;
  investigationId?: string | null;
  chatId?: string | null;
  articleId?: string | null;
  ban?: {
    id: string | null;
    offender: { id: string | null };
  } | null;
  userId?: string | null;
}
interface Return {
  data:
    | Exclude<UserNotificationsQuery['user'], undefined | null>
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: NotificationData) => void;
  handleMarkAllRead: () => void;
  takeAllSchemes: boolean;
  toggleTakeAllSchemes: () => void;
  setSearch: (value: string) => void;
  onPaginationChange: (page: number, pageSize: number) => void;
  currentPage: number;
  currentPageSize: number;
}

const useNotificationLists = (): Return => {
  const navigate = useNavigate();

  const userId = useStoreState((state) => state.user.id);
  const schemeId = useStoreState((state) => state.scheme.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const [saving, setSaving] = useState(false);
  const [takeAllSchemes, setTakeAllSchemes] = useState(false);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const setNotificationList = useStoreActions(
    (actions) => actions.user.setNotifications
  );
  // const userNotifications = useStoreState(
  //   (state) => state.user.userNotifications
  // );
  // const getNotificationUrl = (value: NotificationData) => {
  //   switch (value.type) {
  //     case Model.Article: {
  //       navigate(`/app/article/view/${value.articleId}`);
  //       break;
  //     }
  //     case Model.Incident: {
  //       navigate(`/app/incidents/view/${value.incidentId}`);
  //       break;
  //     }
  //     case Model.Offender: {
  //       navigate(`/app/offenders/view/${value.offenderId}`);
  //       break;
  //     }
  //     case Model.Ban: {
  //       navigate(`/app/offenders/view/${value.ban?.offender.id}`);
  //       break;
  //       return `/app/offenders/view/${value.offenderId}`;
  //     }
  //     case Model.Investigation: {
  //       navigate(`/app/investigations/view/${value.investigationId}`);
  //       break;
  //     }
  //     case Model.Vehicle: {
  //       navigate(`/app/vehicles/view/${value.vehicleId}`);
  //       break;
  //     }
  //     case Model.CrimeGroup: {
  //       navigate(`/app/crime-groups/view/${value.vehicleId}`);
  //       break;
  //     }
  //     case Model.Chat: {
  //       navigate(`/app/chat/${value.chatId}`);
  //       break;
  //     }
  //     case Model.User: {
  //       navigate(`/app/scheme-settings/users/view/${value.userId}`);
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // };
  console.log('search', search);

  const getUserNotificationType = (value: NotificationData) => {
    switch (value.type) {
      case Model.Article: {
        navigate(`/app/article/view/${value.articleId}`);
        return {
          articleId: {
            equals: value.articleId,
          },
        };
      }
      case Model.Incident: {
        navigate(`/app/incidents/view/${value.incidentId}`);
        return {
          incidentId: {
            equals: value.incidentId,
          },
        };
      }
      case Model.Offender: {
        navigate(`/app/offenders/view/${value.offenderId}`);
        return {
          offenderId: {
            equals: value.offenderId,
          },
        };
      }
      case Model.Ban: {
        navigate(`/app/offenders/view/${value.ban?.offender.id}`);
        return {
          offenderId: {
            equals: value.ban?.offender.id,
          },
        };
      }
      case Model.Investigation: {
        navigate(`/app/investigations/view/${value.investigationId}`);
        return {
          investigationId: {
            equals: value.investigationId,
          },
        };
      }
      case Model.Vehicle: {
        navigate(`/app/vehicles/view/${value.vehicleId}`);
        return {
          vehicleId: {
            equals: value.vehicleId,
          },
        };
      }
      case Model.CrimeGroup: {
        navigate(`/app/crime-groups/view/${value.vehicleId}`);
        return {
          crimeGroupId: {
            equals: value.crimeGroupId,
          },
        };
      }
      case Model.Chat: {
        navigate(`/app/chat/${value.chatId}`);
        return {
          chatId: {
            equals: value.chatId,
          },
        };
      }
      case Model.User: {
        navigate(`/app/scheme-settings/users/view/${value.userId}`);
        return {
          id: {
            equals: value.id,
          },
        };
      }
      default: {
        return undefined;
      }
    }
  };
  const variables = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      id: userId,
      // OR: [
      //   {
      //     notification: {
      //       OR: [
      //         {
      //           title: {
      //             contains: search,
      //             mode: QueryMode.Insensitive,
      //           },
      //         },

      //         {
      //           body: {
      //             contains: search,
      //             mode: QueryMode.Insensitive,
      //           },
      //         },
      //       ],
      //     },
      //   },
      // ],
    },
    notificationWhere: {
      notification: {
        schemes: {
          some: {
            id: {
              in: takeAllSchemes
                ? userSchemes.map((item) => item.scheme.id)
                : [schemeId],
            },
          },
        },
      },
    },
    orderBy: {
      notification: {
        createdAt: SortOrder.Desc,
      },
    },
  };
  const { data, loading } = useUserNotificationsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (res) => {
      if (res.user?.totalNotifications && res.user?.totalNotifications > 0) {
        setNotificationList({
          userNotifications: res.user.totalNotifications || 0,
        });
      }
    },
  });

  const update: MutationUpdaterFn<UpdateUserNotificationsMutation> = (
    store,
    { data: res }
  ) => {
    if (
      res?.updateUserNotifications === null ||
      res?.updateUserNotifications === undefined
    )
      return;

    // get existing group list data from Apollo store
    const existingData = store.readQuery<UserNotificationsQuery>({
      query: UserNotificationsDocument,
      variables,
    });

    if (!existingData?.user) return;

    // write the new data to the Apollo store
    store.writeQuery<UserNotificationsQuery>({
      query: UserNotificationsDocument,
      data: {
        ...existingData,
        user: {
          ...existingData.user,
          notifications: existingData.user?.notifications.map((el) => ({
            ...el,
            read: true,
          })),
        },
        __typename: 'Query',
      },
      variables,
    });
  };

  // function
  const [updateUserNotification] = useUpdateUserNotificationsMutation({
    onCompleted: () => {
      setSaving(false);
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
  });
  const [updateAllUserNotifications] = useUpdateUserNotificationsMutation({
    onCompleted: () => {
      setSaving(false);
      notification.success({
        message: 'Successfully Updated!',
        description: 'All notifications has been updated to read! ',
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });
  const handleMarkAsRead = (value: NotificationData) => {
    if (value) {
      setSaving(true);
      updateUserNotification({
        variables: {
          where: {
            notification: getUserNotificationType(value),
          },
        },
      });
    }
  };

  const handleMarkAllRead = () => {
    setSaving(true);
    updateAllUserNotifications({
      variables: {
        where: {
          notification: {
            schemes: {
              some: {
                id: {
                  in: takeAllSchemes
                    ? userSchemes.map((item) => item.scheme.id)
                    : [schemeId],
                },
              },
            },
          },
        },
      },
    });
  };
  const toggleTakeAllSchemes = () => {
    setTakeAllSchemes(!takeAllSchemes);
  };
  const onPaginationChange = (pageVale: number, pageSizeValue: number) => {
    setPage(pageVale);
    setPageSize(pageSizeValue);
  };
  return {
    data: data?.user,
    loading: (data === null || data === undefined) && loading,
    saving,
    takeAllSchemes,
    toggleTakeAllSchemes,
    handleMarkAsRead,
    handleMarkAllRead,
    setSearch,
    onPaginationChange,
    currentPage: page,
    currentPageSize: pageSize,
  };
};

export default useNotificationLists;
