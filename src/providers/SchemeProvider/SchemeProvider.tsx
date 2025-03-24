import type { CurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';

import { useCurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { LocalStorageKeys } from '#/types';
import { GoodsMode, Role } from 'graphql/types';
import { atom, useAtomValue, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';

type UserSchemeState = CurrentSchemeProviderQuery['userScheme'];

export const CURRENT_SCHEME = 'CURRENT_USER_SCHEME_ID';

interface Props {
  children: JSX.Element;
}

export const settingSchemeAtom = atom(true);
export const stateIsSetAtom = atom(false);
export const currentUserSchemeIdAtom = atom<null | string>(null);
export const defaultCurrentUserSchemeAtom: UserSchemeState = {
  id: '',
  isAdmin: false,
  orignalPermissions: {
    admin: false,
    id: '',
  },
  permissions: [],
  role: Role.User,
  scheme: {
    activityAssignToUser: false,
    autoPopulateDescription: false,
    connectedToSchemes: [],
    customTranslations: [],
    darkLogo: null,
    defaultPublicOffenderDOB: false,
    disableGalleryOnNative: false,
    facialDetection: false,
    facialRecognition: false,
    facialRedaction: false,
    goodsMode: GoodsMode.Generic,
    id: '',
    imagesRequiredOnOffenders: false,
    incidentTypeTooltip: '',
    languageCount: 0,
    logo: null,
    name: '',
    needJustification: false,
    oneSelectedIncidentTypeOnly: false,
    reportOnly: false,
    requireSiteNumberForUsers: false,
    restrictIncidentAccess: false,
    skipLocationToAddress: false,
    taskTimeTracking: false,
    useBusinessGroupsOnIncident: false,
    userTodos: 0,
  },
};
export const currentUserSchemeAtom = atom<UserSchemeState>(
  defaultCurrentUserSchemeAtom
);

export const currentSchemeIdAtom = atom(
  (get) => get(currentUserSchemeAtom).scheme.id,
  () => {}
);
export const currentSchemeAtom = atom(
  (get) => get(currentUserSchemeAtom).scheme,
  () => {}
);
export const currentPermissionsAtom = atom(
  (get) =>
    get(currentUserSchemeAtom).permissions.filter(
      ({ allowedMethods }) => allowedMethods.length > 0
    ),
  () => {}
);
export const isAdminAtom = atom(
  (get) => get(currentUserSchemeAtom).orignalPermissions.admin,
  () => {}
);
export const currentSchemeBusinessesAtom = atom(
  (get) =>
    get(currentUserAtom)?.businesses.filter((business) =>
      business.schemes.map(({ id }) => id).includes(get(currentSchemeAtom).id)
    ) ?? [],
  () => {}
);

export const userTodosAtom = atom(
  (get) => get(currentSchemeAtom).userTodos,
  () => {}
);
export const userNotificationsAtom = atom(
  (get) => get(currentUserAtom)?.totalUnreadNotifications,
  () => {}
);

export const useSchemeProvider = () => {
  const setStateScheme = useSetAtom(currentUserSchemeIdAtom);

  const setScheme = (schemeId: string) => {
    setStateScheme(schemeId);
    window.localStorage.setItem(CURRENT_SCHEME, schemeId);
    window.localStorage.removeItem(LocalStorageKeys.INCIDENT_FILTER);
    window.localStorage.removeItem(LocalStorageKeys.OFFENDER_FILTER);
  };

  return { setScheme };
};

const SchemeProvider = ({ children }: Props) => {
  const currentUserSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUserScheme = useSetAtom(currentUserSchemeAtom);
  const setStateIsSet = useSetAtom(stateIsSetAtom);
  const setSettingScheme = useSetAtom(settingSchemeAtom);

  useEffect(() => {
    console.log('scheme changed:', currentUserSchemeId);
    setSettingScheme(true);
  }, [currentUserSchemeId]);

  void useCurrentSchemeProviderQuery({
    onCompleted: (data) => {
      setCurrentUserScheme(data.userScheme);
      setStateIsSet(true);
      setSettingScheme(false);
      window.localStorage.setItem(
        'logo',
        data.userScheme.scheme.logo?.optimisedPersisted || ''
      );
      window.localStorage.setItem(
        'logo-dark',
        data.userScheme.scheme.darkLogo?.optimisedPersisted || ''
      );
    },
    skip: currentUserSchemeId === null,
    variables: {
      where: {
        id: currentUserSchemeId,
      },
    },
  });

  return children;
};

export default SchemeProvider;
