import type { CurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';

import { useCurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';
import { GoodsMode, Role } from 'graphql/types';
import { atom, useAtomValue, useSetAtom } from 'jotai/index';
import React, { useState } from 'react';

type UserSchemeState = CurrentSchemeProviderQuery['userScheme'];

export const CURRENT_SCHEME = 'CURRENT_USER_SCHEME';

interface Props {
  children: JSX.Element;
}

export const currentUserSchemeIdAtom = atom<null | string>(null);
export const defaultCurrentUserSchemeAtom = {
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
    customTranslations: [],
    defaultPublicOffenderDOB: false,
    disableGalleryOnNative: false,
    facialDetection: false,
    facialRecognition: false,
    facialRedaction: false,
    goodsMode: GoodsMode.Generic,
    id: '',
    imagesRequiredOnOffenders: false,
    languageCount: 0,
    name: '',
    needJustification: false,
    oneSelectedIncidentTypeOnly: false,
    reportOnly: false,
    requireSiteNumberForUsers: false,
    restrictIncidentAccess: false,
    skipLocationToAddress: false,
    taskTimeTracking: false,
    useBusinessGroupsOnIncident: false,
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
  (get) => get(currentUserSchemeAtom).permissions,
  () => {}
);
export const isAdminAtom = atom(
  (get) => get(currentUserSchemeAtom).orignalPermissions.admin,
  () => {}
);

export const useSchemeProvider = () => {
  const setStateScheme = useSetAtom(currentUserSchemeIdAtom);

  const setScheme = (schemeId: string) => {
    setStateScheme(schemeId);
    window.localStorage.setItem(CURRENT_SCHEME, schemeId);
  };

  return { setScheme };
};

const SchemeProvider = ({ children }: Props) => {
  const currentUserSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUserScheme = useSetAtom(currentUserSchemeAtom);

  const [isSet, setIsSet] = useState(false);

  void useCurrentSchemeProviderQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      setCurrentUserScheme(data.userScheme);
      setIsSet(true);
    },
    skip: currentUserSchemeId === null,
    variables: {
      where: {
        id: currentUserSchemeId,
      },
    },
  });

  return isSet ? children : <div />;
};

export default SchemeProvider;
