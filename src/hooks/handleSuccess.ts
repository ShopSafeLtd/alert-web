import type { SetSchemePayload, Translations } from '#/state/scheme-model';
import type {
  SetDemPayload,
  SetFilterDefaultGroup,
  SetUserNotifications,
  SetUserRole,
  SetUserTodos,
} from '#/state/user-model';
import type { ActionCreator } from 'easy-peasy';

import { type SetUserPayload } from '#/state';
import Mixpanel from '#/utils/mixpanel';
import * as Sentry from '@sentry/react';
import { GoodsMode } from 'graphql/types';

interface HandleSuccessArgs extends SetUserPayload {
  accessToken: string;
  authenticated: ActionCreator<string>;
  currentScheme?: string;
  defaultScheme?: string;
  setDem: ActionCreator<SetDemPayload>;

  setFilterDefaultGroup: ActionCreator<SetFilterDefaultGroup>;
  setNotifications: ActionCreator<SetUserNotifications>;
  setRole: ActionCreator<SetUserRole>;
  setScheme: ActionCreator<SetSchemePayload>;
  setTodos: ActionCreator<SetUserTodos>;
  setUser: ActionCreator<SetUserPayload>;
}

export const handleSuccess = async ({
  accessToken,
  authenticated,
  businesses,
  currentScheme,
  defaultGroups,
  defaultScheme,
  demId,
  email,
  forcePasswordReset,
  fullName,
  hasPassword,
  id,
  onboarded,
  origName,
  reference,
  reportToAllBusinesses,
  schemes,
  setDem,
  setFilterDefaultGroup,
  setNotifications,
  setRole,
  setScheme,
  setTodos,
  setUser,
  termsExpired,
  userMessages,
  userNotifications,
}: // eslint-disable-next-line @typescript-eslint/require-await
HandleSuccessArgs) => {
  // const color = `hsl(${Math.random() * 360}, 70%, 30%)`;
  const handleNoValidScheme = () => {
    const defScheme =
      schemes.find(({ scheme: { id: sId } }) => sId === defaultScheme) ||
      schemes[0];
    const schemeDetails = defScheme?.scheme;
    window.localStorage.setItem('currentScheme', schemeDetails?.id || '');
    setRole({ role: defScheme?.role });
    setScheme({
      activityAssignToUser: schemeDetails?.activityAssignToUser,
      autoApproveIncidents: schemeDetails?.autoApproveIncidents,
      autoApproveOffenders: schemeDetails?.autoApproveOffenders,
      autoPopulateDescription: schemeDetails?.autoPopulateDescription,
      connectedToSchemes: schemeDetails?.connectedToSchemes || [],
      darkLogo: schemeDetails?.darkLogo?.optimisedPersisted,
      defaultPublicOffenderDOB: schemeDetails?.defaultPublicOffenderDOB,
      facialDetection: schemeDetails?.facialDetection,
      facialRecognition: schemeDetails?.facialRecognition,
      facialRedaction: schemeDetails?.facialRedaction,
      goodsMode: schemeDetails?.goodsMode || GoodsMode.Generic,
      id: schemeDetails?.id,
      imagesRequiredOnOffenders: schemeDetails?.imagesRequiredOnOffenders,
      languageCount: schemeDetails?.languageCount || 0,
      logo: schemeDetails?.logo?.optimisedPersisted,
      name: schemeDetails?.name,
      needJustification: schemeDetails?.needJustification,
      oneSelectedIncidentTypeOnly: schemeDetails?.oneSelectedIncidentTypeOnly,
      reportOnly: schemeDetails?.reportOnly,
      requireSiteNumberForUsers: schemeDetails?.requireSiteNumberForUsers,
      restrictIncidentAccess: schemeDetails?.restrictIncidentAccess,
      taskTimeTracking: schemeDetails?.taskTimeTracking,
      translations: schemeDetails?.customTranslations as Translations[],
      useBusinessGroupsOnIncident: schemeDetails?.useBusinessGroupsOnIncident,
      userNotifications: schemeDetails?.userNotifications || 0,
      userTodos: schemeDetails?.userTodos || 0,
    });
    setFilterDefaultGroup({
      filterDefaultGroups: defaultGroups.filter(
        (el) => el.scheme.id === schemeDetails.id
      ),
    });
    setTodos({ userTodos: defScheme?.scheme?.userTodos || 0 });
    setNotifications({
      userNotifications: defScheme?.scheme?.userNotifications || 0,
    });
  };

  const scheme = currentScheme || window.localStorage.getItem('currentScheme');
  if (scheme) {
    const schemeDetails = schemes?.find(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      ({ scheme: { id } }) => id === scheme
    );

    if (schemeDetails) {
      setRole({ role: schemeDetails.role });
      setScheme({
        activityAssignToUser: schemeDetails.scheme.activityAssignToUser,
        autoApproveIncidents: schemeDetails.scheme.autoApproveIncidents,
        autoApproveOffenders: schemeDetails.scheme.autoApproveOffenders,
        autoPopulateDescription: schemeDetails.scheme.autoPopulateDescription,
        connectedToSchemes: schemeDetails.scheme.connectedToSchemes || [],
        darkLogo: schemeDetails.scheme.darkLogo?.optimisedPersisted,
        defaultPublicOffenderDOB: schemeDetails.scheme.defaultPublicOffenderDOB,
        facialDetection: schemeDetails.scheme.facialDetection,
        facialRecognition: schemeDetails.scheme.facialRecognition,
        facialRedaction: schemeDetails.scheme.facialRedaction,
        goodsMode: schemeDetails.scheme.goodsMode,
        id: schemeDetails.scheme.id,
        imagesRequiredOnOffenders:
          schemeDetails.scheme.imagesRequiredOnOffenders,
        languageCount: schemeDetails.scheme.languageCount || 0,
        logo: schemeDetails.scheme.logo?.optimisedPersisted,
        name: schemeDetails.scheme.name,
        needJustification: schemeDetails.scheme.needJustification,
        oneSelectedIncidentTypeOnly:
          schemeDetails.scheme.oneSelectedIncidentTypeOnly,
        reportOnly: schemeDetails.scheme.reportOnly,
        requireSiteNumberForUsers:
          schemeDetails.scheme.requireSiteNumberForUsers,
        restrictIncidentAccess: schemeDetails.scheme.restrictIncidentAccess,
        taskTimeTracking: schemeDetails.scheme.taskTimeTracking,
        translations: schemeDetails?.scheme
          .customTranslations as Translations[],
        useBusinessGroupsOnIncident:
          schemeDetails.scheme.useBusinessGroupsOnIncident,
        userNotifications: schemeDetails?.scheme.userNotifications,
        userTodos: schemeDetails.scheme.userTodos,
      });
      setFilterDefaultGroup({
        filterDefaultGroups: defaultGroups.filter(
          (el) => el.scheme.id === schemeDetails.scheme.id
        ),
      });
      setTodos({ userTodos: schemeDetails?.scheme?.userTodos || 0 });
    } else {
      handleNoValidScheme();
    }
  } else {
    handleNoValidScheme();
  }

  // if (window.location.href.includes('app.shopsafe.uk')) {
  //   await OneSignal.init({
  //     appId: '15f85158-c5be-4735-b503-23c4200c94d6',
  //     promptOptions: {

  //     }
  //   }).then(async () => {
  //     await OneSignal.showNativePrompt().then(() => {
  //       // do other stuff
  //     });
  //   });
  // }

  Mixpanel.identify(id);
  Mixpanel.people.set({
    businessId: businesses[0]?.id || '',
    businessName: businesses[0]?.name || '',
    name: fullName || '',
  });
  const filterDefaultGroups = defaultGroups.filter(
    (el) => el.scheme.id === scheme
  );
  Sentry.setUser({ email, id, username: fullName });
  setUser({
    businesses,
    defaultGroups,
    demId,
    email,
    filterDefaultGroups,
    forcePasswordReset,
    fullName,
    hasPassword,
    id,
    isSet: true,
    onboarded,
    origName,
    reference,
    reportToAllBusinesses,
    schemes,
    termsExpired,
    userMessages,
    userNotifications,
  });

  const businessToDem = (businesses
    // eslint-disable-next-line no-confusing-arrow
    .map((business) =>
      business.demId ? { id: business.demId, name: business.name } : null
    )
    .filter((el) => el !== null) || []) as { id: string; name: string }[];
  setDem({ dem: businessToDem });
  authenticated(accessToken);
};
