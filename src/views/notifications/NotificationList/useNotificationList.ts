/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useStoreActions, useStoreState } from 'state';
import type {
  GoodsMode,
  Role,
  UpdateUserNotificationsMutation,
  UserNotificationsQuery,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SortOrder,
  UserNotificationsDocument,
  useUpdateUserNotificationsMutation,
  useUserNotificationsQuery,
} from 'graphql/generated';
import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/error_notification';
import { useNavigate } from 'react-router';
import { LocalStorageKeys } from 'types';
import { useIntl } from 'react-intl';

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
  schemes: Scheme[];
}
interface Scheme {
  id: string;
  name: string;
  autoApproveIncidents: boolean;
  autoApproveOffenders: boolean;
  defaultPublicOffenderDOB: boolean;
  userTodos?: number | null | undefined;
  userNotifications?: number | null | undefined;
  logo?:
    | {
        optimisedPersisted?: string | null | undefined;
      }
    | null
    | undefined;
  darkLogo?:
    | {
        optimisedPersisted?: string | null | undefined;
      }
    | null
    | undefined;
  members: {
    id: string;
    role: Role;
  }[];
  goodsMode: GoodsMode;
  facialRecognition: boolean;
  imagesRequiredOnOffenders: boolean;
  taskTimeTracking: boolean;
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
  const intl = useIntl();
  const userId = useStoreState((state) => state.user.id);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const schemeId = useStoreState((state) => state.scheme.id);
  const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
  const setNotifications = useStoreActions(
    (actions) => actions.user.setNotifications
  );
  const setTodos = useStoreActions((actions) => actions.user.setTodos);
  const [saving, setSaving] = useState(false);
  const [takeAllSchemes, setTakeAllSchemes] = useState(true);
  const [search, setSearch] = useState('');
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);

  const variables = {
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      id: userId,
    },
    notificationWhere: {
      AND: [
        {
          OR: [
            {
              notification: {
                title: {
                  contains: search,
                  mode: QueryMode.Insensitive,
                },
              },
            },
            {
              notification: {
                body: {
                  contains: search,
                  mode: QueryMode.Insensitive,
                },
              },
            },
          ],
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
      ],
    },
    orderBy: [
      {
        notification: {
          createdAt: SortOrder.Desc,
        },
      },
    ],
  };

  const { data, loading } = useUserNotificationsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
    onCompleted: (res) => {
      if (
        res.user?.totalUnreadNotifications &&
        res.user?.totalUnreadNotifications > 0
      ) {
        setNotifications({
          userNotifications: res.user.totalUnreadNotifications || 0,
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
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
          id: 'w5Yfkf',
        }),
        description: intl.formatMessage({
          defaultMessage: 'All notifications have been updated to read!',
          id: 'dI0d71',
        }),
        placement: 'bottomRight',
      });
    },
    onError: () => {
      setSaving(false);
      errorNotification();
    },
    update,
  });
  const getUserNotificationType = (value: NotificationData) => {
    switch (value.type) {
      case Model.Article: {
        navigate(`/app/article/view/${value?.articleId}`);
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
        navigate(`/app/dashboard`);
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
  const handleSchemeChange = (scheme: Scheme) => {
    window.localStorage.removeItem(LocalStorageKeys.INCIDENT_FILTER);
    window.localStorage.removeItem(LocalStorageKeys.OFFENDER_FILTER);
    window.localStorage.setItem('currentScheme', scheme.id);
    window.localStorage.setItem('logo', scheme.logo?.optimisedPersisted || '');
    window.localStorage.setItem(
      'logo-dark',
      scheme.darkLogo?.optimisedPersisted || ''
    );

    setScheme({
      autoApproveIncidents: scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.autoApproveOffenders,
      defaultPublicOffenderDOB: scheme.defaultPublicOffenderDOB,
      id: scheme.id,
      name: scheme.name,
      logo: scheme.logo?.optimisedPersisted,
      darkLogo: scheme.darkLogo?.optimisedPersisted,
      userTodos: scheme.userTodos,
      userNotifications: scheme.userNotifications,
      goodsMode: scheme.goodsMode,
      facialRecognition: scheme.facialRecognition,
      imagesRequiredOnOffenders: scheme.imagesRequiredOnOffenders,
      taskTimeTracking: scheme.taskTimeTracking,
    });
    setTodos({ userTodos: scheme.userTodos || 0 });
    setNotifications({
      userNotifications: scheme.userNotifications || 0,
    });
  };
  const handleMarkAsRead = (value: NotificationData) => {
    if (value) {
      setSaving(true);

      if (schemeId !== value.schemes[0].id) {
        handleSchemeChange(value.schemes[0]);
      }
      void updateUserNotification({
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
    void updateAllUserNotifications({
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
