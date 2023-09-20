/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useStoreActions, useStoreState } from 'state';
import type {
  GoodsMode,
  ListUserNotificationsQuery,
  ListUserNotificationsQueryVariables,
  UpdateUserNotificationsMutation,
  UserNotificationsQuery,
} from 'graphql/generated';
import {
  Model,
  QueryMode,
  SortOrder,
  useListUserNotificationsQuery,
  UserNotificationsDocument,
  useUpdateUserNotificationsMutation,
} from 'graphql/generated';
import { useState } from 'react';
import type { MutationUpdaterFn } from '@apollo/client';
import { notification } from 'antd';
import errorNotification from 'types/mutation_notifications/error_notification';
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
  languageCount: number;
  autoPopulateDescription: boolean;
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
  goodsMode: GoodsMode;
  facialRecognition: boolean;
  imagesRequiredOnOffenders: boolean;
  taskTimeTracking: boolean;
  restrictIncidentAccess: boolean;
  reportOnly: boolean;
}
interface Return {
  data:
    | Exclude<
        ListUserNotificationsQuery['listUserNotifications'],
        undefined | null
      >
    | null
    | undefined;
  loading: boolean;
  saving: boolean;
  handleMarkAsRead: (value: NotificationData) => void;
  handleMarkAllRead: () => void;
  takeAllSchemes: boolean;
  toggleTakeAllSchemes: () => void;
  setSearch: (value: string) => void;
  refreshing: boolean;
  onRefresh: () => void;
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
  const [refreshing, setRefreshing] = useState(false);
  const [takeAllSchemes, setTakeAllSchemes] = useState(true);
  const [search, setSearch] = useState('');

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

  const variables: ListUserNotificationsQueryVariables = {
    take: 20,
    skip: 0,
    where: {
      user: {
        id: {
          equals: userId,
        },
      },
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

  const { data, loading, refetch } = useListUserNotificationsQuery({
    fetchPolicy: 'cache-and-network',
    variables,
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
      autoPopulateDescription: scheme.autoPopulateDescription,
      reportOnly: scheme.reportOnly,
      languageCount: scheme.languageCount,
      autoApproveIncidents: scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.autoApproveOffenders,
      defaultPublicOffenderDOB: scheme.defaultPublicOffenderDOB,
      restrictIncidentAccess: scheme.restrictIncidentAccess,
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

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return {
    data: data?.listUserNotifications,
    loading: (data === null || data === undefined) && loading,
    saving,
    takeAllSchemes,
    toggleTakeAllSchemes,
    handleMarkAsRead,
    handleMarkAllRead,
    setSearch,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onRefresh,
    refreshing,
  };
};

export default useNotificationLists;
