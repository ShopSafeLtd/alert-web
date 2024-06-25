import { type SetUserPayload } from '#/state';
import type { SetSchemePayload, Translations } from '#/state/scheme-model';
import { GoodsMode } from 'graphql/types';
import LogRocket from 'logrocket';
import Mixpanel from '#/utils/mixpanel';
import * as Sentry from '@sentry/react';
import type { ActionCreator } from 'easy-peasy';
import type {
  SetDemPayload,
  SetFilterDefaultGroup,
  SetUserNotifications,
  SetUserRole,
  SetUserTodos,
} from '#/state/user-model';

interface HandleSuccessArgs extends SetUserPayload {
  accessToken: string;
  defaultScheme?: string;
  currentScheme?: string;
  setRole: ActionCreator<SetUserRole>;
  setTodos: ActionCreator<SetUserTodos>;

  setNotifications: ActionCreator<SetUserNotifications>;
  setFilterDefaultGroup: ActionCreator<SetFilterDefaultGroup>;
  setScheme: ActionCreator<SetSchemePayload>;
  setUser: ActionCreator<SetUserPayload>;
  setDem: ActionCreator<SetDemPayload>;
  authenticated: ActionCreator<string>;
}

export const handleSuccess = async ({
  id,
  accessToken,
  fullName,
  origName,
  email,
  businesses,
  onboarded,
  schemes,
  demId,
  reference,
  userNotifications,
  userMessages,
  defaultGroups,
  reportToAllBusinesses,
  defaultScheme,
  forcePasswordReset,
  hasPassword,
  termsExpired,
  currentScheme,
  setRole,
  setScheme,
  setFilterDefaultGroup,
  setTodos,
  setNotifications,
  setUser,
  setDem,
  authenticated,
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
      autoPopulateDescription: schemeDetails?.autoPopulateDescription,
      needJustification: schemeDetails?.needJustification,
      requireSiteNumberForUsers: schemeDetails?.requireSiteNumberForUsers,
      oneSelectedIncidentTypeOnly: schemeDetails?.oneSelectedIncidentTypeOnly,
      autoApproveIncidents: schemeDetails?.autoApproveIncidents,
      autoApproveOffenders: schemeDetails?.autoApproveOffenders,
      restrictIncidentAccess: schemeDetails?.restrictIncidentAccess,
      reportOnly: schemeDetails?.reportOnly,
      defaultPublicOffenderDOB: schemeDetails?.defaultPublicOffenderDOB,
      id: schemeDetails?.id,
      name: schemeDetails?.name,
      logo: schemeDetails?.logo?.optimisedPersisted,
      darkLogo: schemeDetails?.darkLogo?.optimisedPersisted,
      userTodos: schemeDetails?.userTodos || 0,
      userNotifications: schemeDetails?.userNotifications || 0,
      translations: schemeDetails?.customTranslations as Translations[],
      goodsMode: schemeDetails?.goodsMode || GoodsMode.Generic,
      facialRecognition: schemeDetails?.facialRecognition,
      facialDetection: schemeDetails?.facialDetection,
      imagesRequiredOnOffenders: schemeDetails?.imagesRequiredOnOffenders,
      taskTimeTracking: schemeDetails?.taskTimeTracking,
      languageCount: schemeDetails?.languageCount || 0,
      connectedToSchemes: schemeDetails?.connectedToSchemes || [],
      activityAssignToUser: schemeDetails?.activityAssignToUser,
      useBusinessGroupsOnIncident: schemeDetails?.useBusinessGroupsOnIncident,
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
        autoPopulateDescription: schemeDetails.scheme.autoPopulateDescription,
        needJustification: schemeDetails.scheme.needJustification,
        requireSiteNumberForUsers:
          schemeDetails.scheme.requireSiteNumberForUsers,
        oneSelectedIncidentTypeOnly:
          schemeDetails.scheme.oneSelectedIncidentTypeOnly,
        autoApproveIncidents: schemeDetails.scheme.autoApproveIncidents,
        autoApproveOffenders: schemeDetails.scheme.autoApproveOffenders,
        restrictIncidentAccess: schemeDetails.scheme.restrictIncidentAccess,
        reportOnly: schemeDetails.scheme.reportOnly,
        defaultPublicOffenderDOB: schemeDetails.scheme.defaultPublicOffenderDOB,
        id: schemeDetails.scheme.id,
        name: schemeDetails.scheme.name,
        logo: schemeDetails.scheme.logo?.optimisedPersisted,
        darkLogo: schemeDetails.scheme.darkLogo?.optimisedPersisted,
        userTodos: schemeDetails.scheme.userTodos,
        userNotifications: schemeDetails?.scheme.userNotifications,
        translations: schemeDetails?.scheme
          .customTranslations as Translations[],
        goodsMode: schemeDetails.scheme.goodsMode,
        facialRecognition: schemeDetails.scheme.facialRecognition,
        facialDetection: schemeDetails.scheme.facialDetection,
        imagesRequiredOnOffenders:
          schemeDetails.scheme.imagesRequiredOnOffenders,
        taskTimeTracking: schemeDetails.scheme.taskTimeTracking,
        languageCount: schemeDetails.scheme.languageCount || 0,
        connectedToSchemes: schemeDetails.scheme.connectedToSchemes || [],
        activityAssignToUser: schemeDetails.scheme.activityAssignToUser,
        useBusinessGroupsOnIncident:
          schemeDetails.scheme.useBusinessGroupsOnIncident,
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

  LogRocket.identify(id, {
    fullName,
    email,
  });

  Mixpanel.identify(id);
  Mixpanel.people.set({
    name: fullName || '',
    businessId: businesses[0]?.id || '',
    businessName: businesses[0]?.name || '',
  });
  const filterDefaultGroups = defaultGroups.filter(
    (el) => el.scheme.id === scheme
  );
  Sentry.setUser({ email, username: fullName, id });
  setUser({
    id,
    email,
    fullName,
    origName,
    businesses,
    onboarded,
    schemes,
    hasPassword,
    forcePasswordReset,
    isSet: true,
    demId,
    reference,
    userNotifications,
    userMessages,
    defaultGroups,
    filterDefaultGroups,
    reportToAllBusinesses,
    termsExpired,
  });

  const businessToDem = (businesses
    // eslint-disable-next-line no-confusing-arrow
    .map((business) =>
      business.demId ? { name: business.name, id: business.demId } : null
    )
    .filter((el) => el !== null) || []) as { id: string; name: string }[];
  setDem({ dem: businessToDem });
  authenticated(accessToken);
};
