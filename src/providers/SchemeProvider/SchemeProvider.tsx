import type { CurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';
import type { AvailableDashboardElements } from '#/state/dashboard-model';

import { useCurrentSchemeProviderQuery } from '#/providers/SchemeProvider/__generated__/current-scheme.generated';
import { currentUserAtom } from '#/providers/UserProvider/UserProvider';
import { useStoreActions } from '#/state';
import { defaultAdminLayout, defaultUserLayout } from '#/state/dashboard-model';
import { LocalStorageKeys } from '#/types';
import { notification } from 'antd';
import { Currency, GoodsMode, Role } from 'graphql/types';
import { atom, useAtomValue, useSetAtom } from 'jotai/index';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type UserSchemeState = CurrentSchemeProviderQuery['userScheme'];

export const CURRENT_SCHEME = 'CURRENT_USER_SCHEME_ID';

interface Props {
  children: JSX.Element;
}
export const CurrencyCodeMap: Record<Currency, string> = {
  [Currency.Aud]: 'AUD',
  [Currency.Brl]: 'BRL',
  [Currency.Cad]: 'CAD',
  [Currency.Chf]: 'CHF',
  [Currency.Cny]: 'CNY',
  [Currency.Dkk]: 'DKK',
  [Currency.Eur]: 'EUR',
  [Currency.Gbp]: 'GBP',
  [Currency.Hkd]: 'HKD',
  [Currency.Idr]: 'IDR',
  [Currency.Inr]: 'INR',
  [Currency.Jpy]: 'JPY',
  [Currency.Krw]: 'KRW',
  [Currency.Mxn]: 'MXN',
  [Currency.Myr]: 'MYR',
  [Currency.Nok]: 'NOK',
  [Currency.Nzd]: 'NZD',
  [Currency.Php]: 'PHP',
  [Currency.Rub]: 'RUB',
  [Currency.Sek]: 'SEK',
  [Currency.Sgd]: 'SGD',
  [Currency.Thb]: 'THB',
  [Currency.Try]: 'TRY',
  [Currency.Usd]: 'USD',
  [Currency.Vnd]: 'VND',
  [Currency.Zar]: 'ZAR',
};

export const CurrencySymbolMap: Record<
  Currency,
  { prefix: string; suffix: string }
> = {
  [Currency.Aud]: { prefix: 'A$', suffix: '' },
  [Currency.Brl]: { prefix: 'R$', suffix: '' },
  [Currency.Cad]: { prefix: 'C$', suffix: '' },
  [Currency.Chf]: { prefix: 'CHF', suffix: '' },
  [Currency.Cny]: { prefix: '¥', suffix: 'RMB' },
  [Currency.Dkk]: { prefix: 'kr', suffix: ' DKK' },
  [Currency.Eur]: { prefix: '€', suffix: '' },
  [Currency.Gbp]: { prefix: '£', suffix: '' },
  [Currency.Hkd]: { prefix: 'HK$', suffix: '' },
  [Currency.Idr]: { prefix: 'Rp', suffix: '' },
  [Currency.Inr]: { prefix: '₹', suffix: '' },
  [Currency.Jpy]: { prefix: '¥', suffix: '' },
  [Currency.Krw]: { prefix: '₩', suffix: '' },
  [Currency.Mxn]: { prefix: '$', suffix: ' MXN' },
  [Currency.Myr]: { prefix: 'RM', suffix: '' },
  [Currency.Nok]: { prefix: 'kr', suffix: ' NOK' },
  [Currency.Nzd]: { prefix: 'NZ$', suffix: '' },
  [Currency.Php]: { prefix: '₱', suffix: '' },
  [Currency.Rub]: { prefix: '₽', suffix: '' },
  [Currency.Sek]: { prefix: 'kr', suffix: ' SEK' },
  [Currency.Sgd]: { prefix: 'S$', suffix: '' },
  [Currency.Thb]: { prefix: '฿', suffix: '' },
  [Currency.Try]: { prefix: '₺', suffix: '' },
  [Currency.Usd]: { prefix: '$', suffix: '' },
  [Currency.Vnd]: { prefix: '₫', suffix: '' },
  [Currency.Zar]: { prefix: 'R', suffix: '' },
};

export const useAmericanDateFormatAtom = atom((get) => {
  const { scheme } = get(currentUserSchemeAtom);
  return scheme?.usDateFormat || false;
});

export const settingSchemeAtom = atom(true);
export const currencyAtom = atom((get) => {
  const { scheme } = get(currentUserSchemeAtom);
  const currencyEnum = scheme?.currency || Currency.Gbp;

  return CurrencyCodeMap[currencyEnum];
});

export const currencyEnumAtom = atom((get) => {
  const { scheme } = get(currentUserSchemeAtom);
  return scheme?.currency || Currency.Gbp;
});

export const currencySymbolAtom = atom((get) => {
  const { scheme } = get(currentUserSchemeAtom);
  const currencyEnum = scheme?.currency || Currency.Gbp;

  return CurrencySymbolMap[currencyEnum];
});

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
    allowTodoTemplateOverride: true,
    autoPopulateDescription: false,
    connectedToSchemes: [],
    currency: Currency.Gbp,
    darkLogo: null,
    defaultPublicOffenderDOB: false,
    disableGalleryOnNative: false,
    disablePassword: false,
    dontAutoSetTimeDate: false,
    dontPrefillOffenderName: false,
    draftIncidents: false,
    facialDetection: false,
    facialRecognition: false,
    facialRedaction: false,
    goodsMode: GoodsMode.Generic,
    id: '',
    imagesRequiredOnOffenders: false,
    incidentAssignmentEnabled: false,
    incidentStatusEnabled: false,
    incidentTypeTooltip: '',
    languageCount: 0,
    logo: null,
    name: '',
    needJustification: false,
    oneSelectedIncidentTypeOnly: false,
    optionalBusinessOnUsers: false,
    reportOnly: false,
    requireActivityAuthorised: false,
    requireBusinessOnIncident: false,
    requireSiteNumberForUsers: false,
    restrictIncidentAccess: false,
    showBlankActivity: false,
    skipLocationToAddress: false,
    taskTimeTracking: false,
    usDateFormat: false,
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
  (get) => !!get(currentUserSchemeAtom).orignalPermissions?.admin,
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
  const navigate = useNavigate();
  const currentUserSchemeId = useAtomValue(currentUserSchemeIdAtom);
  const setCurrentUserScheme = useSetAtom(currentUserSchemeAtom);
  const setStateIsSet = useSetAtom(stateIsSetAtom);
  const setSettingScheme = useSetAtom(settingSchemeAtom);
  const setCurrentSchemeId = useSetAtom(currentUserSchemeIdAtom);

  const setDashboard = useStoreActions(
    (actions) => actions.dashboard.setSchemeLayouts
  );

  useEffect(() => {
    setSettingScheme(true);
  }, [currentUserSchemeId]);

  void useCurrentSchemeProviderQuery({
    onCompleted: (data) => {
      setCurrentUserScheme(data.userScheme);
      setStateIsSet(true);
      setSettingScheme(false);

      // set logos into local state
      window.localStorage.setItem(
        'logo',
        data.userScheme.scheme.logo?.optimisedPersisted || ''
      );
      window.localStorage.setItem(
        'logo-dark',
        data.userScheme.scheme.darkLogo?.optimisedPersisted || ''
      );

      // set dashboard into global state
      if (data.userScheme.dashboard)
        setDashboard({
          [data.userScheme.scheme.id]: {
            layout: data.userScheme.dashboard.layout
              ? data.userScheme.dashboard.layout.map((lay) => ({
                  ...lay,
                  i: lay.i as AvailableDashboardElements,
                  isBounded: true,
                  isDraggable: false,
                  isResizable: false,
                  maxH: lay.maxH ?? undefined,
                  maxW: lay.maxW ?? undefined,
                  minH: lay.minH ?? undefined,
                  minW: lay.minW ?? undefined,
                  static: !!lay.static,
                }))
              : data.userScheme.isAdmin
                ? defaultAdminLayout.layout
                : defaultUserLayout.layout,
            marquee:
              data.userScheme.dashboard?.runningBanner ??
              (data.userScheme.isAdmin
                ? defaultAdminLayout.marquee
                : defaultUserLayout.marquee),
          },
        });
    },
    onError: (error) => {
      // Handle disabled scheme error
      const errorMessage = error.message?.toLowerCase() || '';
      if (
        errorMessage.includes('disabled') ||
        errorMessage.includes('permission')
      ) {
        notification.warning({
          description:
            'Your access to this scheme has been disabled. Please contact your administrator or switch to another scheme.',
          duration: 6,
          message: 'Scheme Access Disabled',
          placement: 'topRight',
        });

        // Clear the current scheme
        window.localStorage.removeItem(CURRENT_SCHEME);
        setCurrentSchemeId(null);
        setSettingScheme(false);

        // Navigate to dashboard or home
        navigate('/app/dashboard');
      }
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
