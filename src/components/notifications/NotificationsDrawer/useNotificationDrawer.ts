/* eslint-disable @typescript-eslint/restrict-template-expressions */
import type { MutationUpdaterFn } from '@apollo/client';
import type { UpdateUserNotificationsMutation } from 'graphql/userNotification/mutations/__generated__/update_user_notification.generated';
import type {
  ListUserNotificationsQuery,
  ListUserNotificationsQueryVariables,
} from 'graphql/userNotification/queries/__generated__/list-user-notifications.generated';
import type { UserNotificationsQuery } from 'graphql/userNotification/queries/__generated__/user_notifications.generated';

import { useSchemeProvider } from '#/providers/SchemeProvider/SchemeProvider';
import { userIdAtom } from '#/providers/UserProvider/UserProvider';
import { notification } from 'antd';
import { Model, QueryMode, SortOrder } from 'graphql/types';
import { useUpdateUserNotificationsMutation } from 'graphql/userNotification/mutations/__generated__/update_user_notification.generated';
import { useListUserNotificationsQuery } from 'graphql/userNotification/queries/__generated__/list-user-notifications.generated';
import { UserNotificationsDocument } from 'graphql/userNotification/queries/__generated__/user_notifications.generated';
import { useAtomValue } from 'jotai/index';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router';
import { useStoreActions, useStoreState } from 'state';
import { LocalStorageKeys } from 'types';
import errorNotification from 'types/mutation_notifications/error_notification';

export interface NotificationData {
  articleId?: null | string;
  ban?: {
    id: null | string;
    offender: { id: null | string };
  } | null;
  chatId?: null | string;
  crimeGroupId?: null | string;
  id: string;
  incidentId?: null | string;
  investigationId?: null | string;
  offenderId?: null | string;
  schemes: { id: string }[];
  type?: Model | null | undefined;
  userId?: null | string;
  vehicleId?: null | string;
}

interface Return {
  data:
    | Exclude<
        ListUserNotificationsQuery['listUserNotifications'],
        null | undefined
      >
    | null
    | undefined;
  handleMarkAllRead: () => void;
  handleMarkAsRead: (value: NotificationData) => void;
  loading: boolean;
  onRefresh: () => void;
  refreshing: boolean;
  saving: boolean;
  setSearch: (value: string) => void;
  takeAllSchemes: boolean;
  toggleTakeAllSchemes: () => void;
}

const useNotificationLists = (): Return => {
  const navigate = useNavigate();
  const intl = useIntl();

  const { setScheme: setSchemeAtom } = useSchemeProvider();

  const userId = useAtomValue(userIdAtom);
  const userSchemes = useStoreState((state) => state.user.schemes);
  const schemeId = useStoreState((state) => state.scheme.id);
  const defaultGroups = useStoreState((state) => state.user.defaultGroups);
  const setFilterDefaultGroup = useStoreActions(
    (state) => state.user.setFilterDefaultGroup
  );
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
    orderBy: [
      {
        notification: {
          createdAt: SortOrder.Desc,
        },
      },
    ],
    skip: 0,
    take: 20,
    where: {
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
      user: {
        id: {
          equals: userId,
        },
      },
    },
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
      data: {
        ...existingData,
        __typename: 'Query',
        user: {
          ...existingData.user,
          notifications: existingData.user?.notifications.map((el) => ({
            ...el,
            read: true,
          })),
        },
      },
      query: UserNotificationsDocument,
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
        description: intl.formatMessage({
          defaultMessage: 'All notifications have been updated to read!',
        }),
        message: intl.formatMessage({
          defaultMessage: 'Successfully Updated!',
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
  const handleSchemeChange = (notificationSchemeId: string) => {
    window.localStorage.removeItem(LocalStorageKeys.INCIDENT_FILTER);
    window.localStorage.removeItem(LocalStorageKeys.OFFENDER_FILTER);
    const userScheme = userSchemes.find(
      (el) => el.scheme.id === notificationSchemeId
    );
    if (!userScheme) return;
    const { scheme } = userScheme;
    window.localStorage.setItem('currentScheme', scheme.id);
    window.localStorage.setItem('logo', scheme.logo?.optimisedPersisted || '');
    window.localStorage.setItem(
      'logo-dark',
      scheme.darkLogo?.optimisedPersisted || ''
    );

    setSchemeAtom(scheme.id);
    setScheme({
      activityAssignToUser: scheme.activityAssignToUser,
      autoApproveIncidents: scheme.autoApproveIncidents,
      autoApproveOffenders: scheme.autoApproveOffenders,
      autoPopulateDescription: scheme.autoPopulateDescription,
      connectedToSchemes: scheme.connectedToSchemes,
      darkLogo: scheme.darkLogo?.optimisedPersisted,
      defaultPublicOffenderDOB: scheme.defaultPublicOffenderDOB,
      facialDetection: scheme.facialDetection,
      facialRecognition: scheme.facialRecognition,
      facialRedaction: scheme.facialRedaction,
      goodsMode: scheme.goodsMode,
      id: scheme.id,
      imagesRequiredOnOffenders: scheme.imagesRequiredOnOffenders,
      incidentCustomQuestionRadio: scheme.incidentCustomQuestionRadio,
      incidentTypeTooltip: scheme.incidentTypeTooltip,
      languageCount: scheme.languageCount,
      logo: scheme.logo?.optimisedPersisted,
      name: scheme.name,
      needJustification: scheme.needJustification,
      oneSelectedIncidentTypeOnly: scheme.oneSelectedIncidentTypeOnly,
      reportOnly: scheme.reportOnly,
      requireSiteNumberForUsers: scheme.requireSiteNumberForUsers,
      restrictIncidentAccess: scheme.restrictIncidentAccess,
      taskTimeTracking: scheme.taskTimeTracking,
      useBusinessGroupsOnIncident: scheme.useBusinessGroupsOnIncident,
      userNotifications: scheme.userNotifications,
      userTodos: scheme.userTodos,
    });
    setFilterDefaultGroup({
      filterDefaultGroups: defaultGroups.filter(
        (el) => el.scheme.id === scheme.id
      ),
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
        handleSchemeChange(value.schemes[0].id);
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
    handleMarkAllRead,
    handleMarkAsRead,
    loading: (data === null || data === undefined) && loading,
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onRefresh,
    refreshing,
    saving,
    setSearch,
    takeAllSchemes,
    toggleTakeAllSchemes,
  };
};

export default useNotificationLists;
