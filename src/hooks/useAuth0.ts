// import type {
//   AvailableDashboardElements,
//   DashboardLayout,
// } from '#/state/dashboard-model';
// import type { Translations } from '#/state/scheme-model';
// import type { SetUserPayload } from 'state';
//
// import { useCurrentUserLazyQuery } from '#/hooks/user/queries/__generated__/current-user.generated';
// import { defaultAdminLayout, defaultUserLayout } from '#/state/dashboard-model';
// import { useAuth0 } from '@auth0/auth0-react';
// import * as Sentry from '@sentry/react';
// import { GoodsMode } from 'graphql/types';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useStoreActions, useStoreState } from 'state';
// import Mixpanel from 'utils/mixpanel';
//
// // import OneSignal from 'react-onesignal';
//
// interface Return {
//   expired: () => void;
//   getCurrentUser: () => void;
//   loading: boolean;
//   onLoginSuccess: (data: OnLoginSuccessArgs) => void;
//   rehydrateAuth: () => void;
//   signOut: () => void;
// }
//
// interface OnLoginSuccessArgs extends SetUserPayload {
//   accessToken: string;
// }
//
// const useAuth = (): Return => {
//   const {
//     getAccessTokenSilently,
//     isAuthenticated,
//     isLoading,
//     loginWithRedirect,
//     user,
//   } = useAuth0();
//
//   const navigate = useNavigate();
//   // const client = useApolloClient();
//   const authenticated = useStoreActions(
//     (actions) => actions.auth.authenticated
//   );
//   const expired = useStoreActions((actions) => actions.auth.expired);
//   const handleSignOut = useStoreActions((actions) => actions.auth.signOut);
//   const setUser = useStoreActions((actions) => actions.user.setUser);
//   const clearUser = useStoreActions((actions) => actions.user.clearUser);
//   const { setDem, setFilterDefaultGroup, setNotifications, setRole, setTodos } =
//     useStoreActions((actions) => actions.user);
//   const setScheme = useStoreActions((actions) => actions.scheme.setScheme);
//   const setAuthMessage = useStoreActions(
//     (actions) => actions.auth.setAuthMessage
//   );
//   const currentScheme = useStoreState((state) => state.scheme.id);
//
//   const setDashboard = useStoreActions(
//     (actions) => actions.dashboard.setSchemeLayouts
//   );
//   interface HandleSuccessArgs extends SetUserPayload {
//     accessToken: string;
//     defaultScheme?: string;
//   }
//
//   const loginRoute = () => {
//     if (localStorage.getItem('logo')?.endsWith('.webp')) {
//       void loginWithRedirect({
//         'ext-logo': localStorage.getItem('logo'),
//       });
//     } else {
//       void loginWithRedirect();
//     }
//   };
//
//   const handleSuccess = async ({
//     accessToken,
//     businesses,
//     defaultGroups,
//     defaultScheme,
//     demId,
//     email,
//     fullName,
//     id,
//     onboarded,
//
//     origName,
//     reference,
//     reportToAllBusinesses,
//     schemes,
//     userMessages,
//     userNotifications,
//   }: // eslint-disable-next-line @typescript-eslint/require-await
//   HandleSuccessArgs) => {
//     // const color = `hsl(${Math.random() * 360}, 70%, 30%)`;
//
//     const handleNoValidScheme = () => {
//       const defScheme =
//         schemes.find(({ scheme: { id: sId } }) => sId === defaultScheme) ||
//         schemes[0];
//       const schemeDetails = defScheme?.scheme;
//       window.localStorage.setItem('currentScheme', schemeDetails?.id || '');
//       setRole({ role: defScheme?.role });
//       setScheme({
//         activityAssignToUser: schemeDetails?.activityAssignToUser,
//         autoApproveIncidents: schemeDetails?.autoApproveIncidents,
//         autoApproveOffenders: schemeDetails?.autoApproveOffenders,
//         autoPopulateDescription: schemeDetails?.autoPopulateDescription,
//         connectedToSchemes: schemeDetails?.connectedToSchemes || [],
//         darkLogo: schemeDetails?.darkLogo?.optimisedPersisted,
//         defaultPublicOffenderDOB: schemeDetails?.defaultPublicOffenderDOB,
//         facialDetection: schemeDetails?.facialDetection,
//         facialRecognition: schemeDetails?.facialRecognition,
//         facialRedaction: schemeDetails?.facialRedaction,
//         goodsMode: schemeDetails?.goodsMode || GoodsMode.Generic,
//         id: schemeDetails?.id,
//         imagesRequiredOnOffenders: schemeDetails?.imagesRequiredOnOffenders,
//         languageCount: schemeDetails?.languageCount || 0,
//         logo: schemeDetails?.logo?.optimisedPersisted,
//         name: schemeDetails?.name,
//         needJustification: schemeDetails?.needJustification,
//         oneSelectedIncidentTypeOnly: schemeDetails?.oneSelectedIncidentTypeOnly,
//         reportOnly: schemeDetails?.reportOnly,
//         requireSiteNumberForUsers: schemeDetails?.requireSiteNumberForUsers,
//         restrictIncidentAccess: schemeDetails?.restrictIncidentAccess,
//         taskTimeTracking: schemeDetails?.taskTimeTracking,
//         translations: schemeDetails?.customTranslations as Translations[],
//         useBusinessGroupsOnIncident: schemeDetails?.useBusinessGroupsOnIncident,
//         userNotifications: schemeDetails?.userNotifications || 0,
//         userTodos: schemeDetails?.userTodos || 0,
//       });
//       setFilterDefaultGroup({
//         filterDefaultGroups: defaultGroups.filter(
//           (el) => el.scheme.id === schemeDetails.id
//         ),
//       });
//       setTodos({ userTodos: defScheme?.scheme?.userTodos || 0 });
//       setNotifications({
//         userNotifications: defScheme?.scheme?.userNotifications || 0,
//       });
//     };
//
//     const scheme =
//       currentScheme || window.localStorage.getItem('currentScheme');
//     if (scheme) {
//       const schemeDetails = schemes?.find(
//         // eslint-disable-next-line @typescript-eslint/no-shadow
//         ({ scheme: { id } }) => id === scheme
//       );
//
//       if (schemeDetails) {
//         setRole({ role: schemeDetails.role });
//         setScheme({
//           activityAssignToUser: schemeDetails.scheme.activityAssignToUser,
//           autoApproveIncidents: schemeDetails.scheme.autoApproveIncidents,
//           autoApproveOffenders: schemeDetails.scheme.autoApproveOffenders,
//           autoPopulateDescription: schemeDetails.scheme.autoPopulateDescription,
//           connectedToSchemes: schemeDetails.scheme.connectedToSchemes || [],
//           darkLogo: schemeDetails.scheme.darkLogo?.optimisedPersisted,
//           defaultPublicOffenderDOB:
//             schemeDetails.scheme.defaultPublicOffenderDOB,
//           facialDetection: schemeDetails.scheme.facialDetection,
//           facialRecognition: schemeDetails.scheme.facialRecognition,
//           facialRedaction: schemeDetails.scheme.facialRedaction,
//           goodsMode: schemeDetails.scheme.goodsMode,
//           id: schemeDetails.scheme.id,
//           imagesRequiredOnOffenders:
//             schemeDetails.scheme.imagesRequiredOnOffenders,
//           languageCount: schemeDetails.scheme.languageCount || 0,
//           logo: schemeDetails.scheme.logo?.optimisedPersisted,
//           name: schemeDetails.scheme.name,
//           needJustification: schemeDetails.scheme.needJustification,
//           oneSelectedIncidentTypeOnly:
//             schemeDetails.scheme.oneSelectedIncidentTypeOnly,
//           reportOnly: schemeDetails.scheme.reportOnly,
//           requireSiteNumberForUsers:
//             schemeDetails.scheme.requireSiteNumberForUsers,
//           restrictIncidentAccess: schemeDetails.scheme.restrictIncidentAccess,
//           taskTimeTracking: schemeDetails.scheme.taskTimeTracking,
//           translations: schemeDetails?.scheme
//             .customTranslations as Translations[],
//           useBusinessGroupsOnIncident:
//             schemeDetails.scheme.useBusinessGroupsOnIncident,
//           userNotifications: schemeDetails?.scheme.userNotifications,
//           userTodos: schemeDetails.scheme.userTodos,
//         });
//         setFilterDefaultGroup({
//           filterDefaultGroups: defaultGroups.filter(
//             (el) => el.scheme.id === schemeDetails.scheme.id
//           ),
//         });
//         setTodos({ userTodos: schemeDetails?.scheme?.userTodos || 0 });
//       } else {
//         handleNoValidScheme();
//       }
//     } else {
//       handleNoValidScheme();
//     }
//
//     // if (window.location.href.includes('app.shopsafe.uk')) {
//     //   await OneSignal.init({
//     //     appId: '15f85158-c5be-4735-b503-23c4200c94d6',
//     //     promptOptions: {
//
//     //     }
//     //   }).then(async () => {
//     //     await OneSignal.showNativePrompt().then(() => {
//     //       // do other stuff
//     //     });
//     //   });
//     // }
//
//     Mixpanel.identify(id);
//     Mixpanel.people.set({
//       businessId: businesses[0]?.id || '',
//       businessName: businesses[0]?.name || '',
//       name: fullName || '',
//     });
//     const filterDefaultGroups = defaultGroups.filter(
//       (el) => el.scheme.id === scheme
//     );
//     Sentry.setUser({ email, id, username: fullName });
//     setUser({
//       businesses,
//       defaultGroups,
//       demId,
//       email,
//       filterDefaultGroups,
//       forcePasswordReset: false,
//       fullName,
//       hasPassword: true,
//       id,
//       isSet: true,
//       onboarded,
//       origName,
//       reference,
//       reportToAllBusinesses,
//       schemes,
//       termsExpired: false,
//       userMessages,
//       userNotifications,
//     });
//
//     const businessToDem = (businesses
//       // eslint-disable-next-line no-confusing-arrow
//       .map((business) =>
//         business.demId ? { id: business.demId, name: business.name } : null
//       )
//       .filter((el) => el !== null) || []) as { id: string; name: string }[];
//     setDem({ dem: businessToDem });
//     authenticated(accessToken);
//   };
//
//   const [getCurrentUserQuery, { data: CurrentUserData, loading }] =
//     useCurrentUserLazyQuery({
//       canonizeResults: true,
//       fetchPolicy: 'cache-first',
//       // eslint-disable-next-line @typescript-eslint/no-misused-promises
//       onCompleted: async ({ currentUser }) => {
//         if (!currentUser) {
//           if (!isLoading && isAuthenticated) {
//             expired();
//           } else if (!isLoading && !isAuthenticated) {
//             loginRoute();
//           }
//         }
//         const scheme =
//           currentScheme || window.localStorage.getItem('currentScheme');
//
//         if (scheme) {
//           const currentS =
//             currentUser &&
//             currentUser.schemes.find((s) => s.scheme.id === scheme);
//           if (currentS) {
//             window.localStorage.setItem(
//               'logo',
//               currentS?.scheme?.logo?.optimisedPersisted || ''
//             );
//             if (!currentS?.scheme?.logo?.optimisedPersisted) {
//               window.localStorage.setItem('logo', '');
//             }
//             window.localStorage.setItem(
//               'logo-dark',
//               currentS?.scheme?.darkLogo?.optimisedPersisted || ''
//             );
//           }
//         }
//
//         const result: { [key: string]: DashboardLayout } = {};
//
//         if (currentUser?.schemes)
//           // eslint-disable-next-line no-unsafe-optional-chaining,no-restricted-syntax
//           for (const item of currentUser?.schemes) {
//             result[item.scheme.id] = {
//               layout: item.dashboard?.layout
//                 ? item.dashboard?.layout.map((lay) => ({
//                     ...lay,
//                     i: lay.i as AvailableDashboardElements,
//                     isBounded: true,
//                     isDraggable: false,
//                     isResizable: false,
//                     maxH: lay.maxH ?? undefined,
//                     maxW: lay.maxW ?? undefined,
//                     minH: lay.minH ?? undefined,
//                     minW: lay.minW ?? undefined,
//                     static: !!lay.static,
//                   }))
//                 : item.isAdmin
//                   ? defaultAdminLayout.layout
//                   : defaultUserLayout.layout,
//               marquee:
//                 item.dashboard?.runningBanner ??
//                 (item.isAdmin
//                   ? defaultAdminLayout.marquee
//                   : defaultUserLayout.marquee),
//             };
//           }
//
//         setDashboard(result);
//
//         await handleSuccess({
//           accessToken: window.localStorage.getItem('access_token') || '',
//           businesses: currentUser?.businesses || [],
//           defaultGroups: currentUser?.defaultGroups || [],
//           defaultScheme: currentUser?.defaultScheme || undefined,
//           demId: currentUser?.demId || '',
//           email: currentUser?.email || '',
//           filterDefaultGroups:
//             currentUser?.defaultGroups.filter(
//               (el) => el.scheme.id === scheme
//             ) || [],
//           forcePasswordReset: false,
//           fullName: currentUser?.fullName || '',
//           hasPassword: true,
//           id: currentUser?.id || '',
//
//           isSet: true,
//           onboarded: !currentUser?.newUser,
//           origName: currentUser?.origName || '',
//
//           // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//           reference: `${currentUser?.reference}` || '',
//           reportToAllBusinesses: currentUser?.reportToAllBusinesses || false,
//           schemes: currentUser?.schemes || [],
//           termsExpired: false,
//           userMessages: currentUser?.messageCount || 0,
//           userNotifications: currentUser?.notificationCount || 0,
//         });
//         if (currentUser?.newUser) {
//           navigate('/app/onboarding');
//         }
//       },
//       onError: () => expired(),
//     });
//   const getCurrentUser = () => {
//     if (!CurrentUserData) void getCurrentUserQuery();
//   };
//   const rehydrateAuth = () => {
//     if (user !== undefined) {
//       if (Date.now() < user.exp * 1000) {
//         if (user.iss === 'https://alert.eu.auth0.com/') {
//           void getCurrentUser();
//         } else if (isAuthenticated) {
//           void getCurrentUser();
//         } else {
//           expired();
//         }
//       } else {
//         expired();
//       }
//     } else if (isAuthenticated) {
//       void getCurrentUser();
//     } else {
//       expired();
//     }
//     // const accessToken = localStorage.getItem('accessToken');
//     // if (accessToken) {
//     //   const token: DecodedToken = jwtDecode(accessToken);
//     //   if (new Date().getTime() < token.exp * 1000) {
//     //     if (token.iss === 'https://alert.eu.auth0.com/') {
//     //       getCurrentUser({
//     //         context: {
//     //           headers: {
//     //             authorization: `Bearer ${accessToken}`,
//     //           },
//     //         },
//     //       });
//     //     } else {
//     //       expired();
//     //     }
//     //   } else {
//     //     expired();
//     //   }
//     // } else {
//     //   expired();
//     // }
//   };
//
//   const onLoginSuccess = async (data: OnLoginSuccessArgs) => {
//     window.localStorage.setItem('access_token', data.accessToken);
//
//     const scheme = window.localStorage.getItem('currentScheme');
//     if (!scheme) {
//       window.localStorage.setItem('currentScheme', data.schemes[0].scheme.id);
//     }
//
//     await handleSuccess({
//       accessToken: data.accessToken,
//       businesses: data.businesses,
//       defaultGroups: data.defaultGroups,
//       demId: data.demId,
//       email: data.email,
//       filterDefaultGroups: data.defaultGroups.filter(
//         (el) => el.scheme.id === scheme
//       ),
//       forcePasswordReset: false,
//       fullName: data.fullName,
//       hasPassword: true,
//       id: data.id,
//       isSet: true,
//
//       onboarded: data.onboarded,
//       origName: data.origName,
//       reference: data.reference,
//       reportToAllBusinesses: data.reportToAllBusinesses,
//       schemes: data.schemes,
//       termsExpired: false,
//       userMessages: data.userMessages,
//       userNotifications: data.userNotifications,
//     });
//   };
//
//   // useEffect(() => {
//   //   // authenticated from auth0
//   //   if (isAuthenticated) {
//   //     (async () => {
//   //       try {
//   //         const token = await getAccessTokenSilently();
//   //         authenticated(token);
//   //         window.localStorage.setItem('accessToken', token);
//   //         try {
//   //           const { data } = await client.query<CurrentUserQuery>({
//   //             query: CurrentUserDocument,
//   //             fetchPolicy: 'network-only',
//   //             context: {
//   //               headers: {
//   //                 authorization: `Bearer ${token}`,
//   //               },
//   //             },
//   //           });
//   //           console.log(data);
//   //           // Adding this in breaks the side and top navs. Not sure why atm
//   //           // onLoginSuccess({
//   //           //   accessToken: token || '',
//   //           //   email: data.currentUser?.email || '',
//   //           //   fullName: data.currentUser?.fullName || '',
//   //           //   id: data.currentUser?.id || '',
//   //           //   onboarded: data.currentUser?.newUser || false,
//   //           //   organisation: data.currentUser?.organisation || '',
//   //           //   schemes: data.currentUser?.schemes || [],
//   //           //   groups: data.currentUser?.groups || [],
//   //           // });
//   //           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //         } catch (err: any) {
//   //           setAuthMessage(err.message);
//   //           console.log(err);
//   //         }
//   //       } catch (e) {
//   //         // eslint-disable-next-line no-console
//   //         console.error(e);
//   //       }
//   //
//   //       // try {
//   //
//   //       //   onLoginSuccess({
//   //       //     accessToken: token || '',
//   //       //     email: data.currentUser?.email || '',
//   //       //     fullName: data.currentUser?.fullName || '',
//   //       //     id: data.currentUser?.id || '',
//   //       //     onboarded: data.currentUser?.newUser || false,
//   //       //     organisation: data.currentUser?.organisation || '',
//   //       //     schemes: data.currentUser?.schemes || [],
//   //       //     groups: data.currentUser?.groups || [],
//   //       //   });
//   //       //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   //       // } catch (err: any) {
//   //       //   setAuthMessage(err.message);
//   //       //   console.log(err);
//   //       // }
//   //     })();
//   //   }
//   // }, [isAuthenticated]);
//   useEffect(() => {
//     if (isAuthenticated) {
//       void (async () => {
//         try {
//           const newToken = await getAccessTokenSilently();
//
//           authenticated(newToken);
//           window.localStorage.setItem('access_token', newToken);
//         } catch (error) {
//           if (error instanceof Error) setAuthMessage(error.message);
//           // console.error(e);
//         }
//       })();
//     }
//   }, [isAuthenticated]);
//   // const login = ({ email, password }: LoginArgs) => {
//   //   window.localStorage.removeItem('accessToken');
//   //   handleLogin({
//   //     variables: {
//   //       email,
//   //       password,
//   //     },
//   //   });
//   // };
//
//   const signOut = () => {
//     clearUser();
//     handleSignOut();
//     const logo = window.localStorage.getItem('logo');
//     const dLogo = window.localStorage.getItem('logo-dark');
//
//     window.localStorage.clear();
//     window.localStorage.setItem('logo', logo || '');
//     window.localStorage.setItem('logo-dark', dLogo || '');
//     window.sessionStorage.clear();
//   };
//
//   return {
//     expired,
//     // eslint-disable-next-line @typescript-eslint/no-misused-promises
//     getCurrentUser,
//     // login,
//     loading,
//     // eslint-disable-next-line @typescript-eslint/no-misused-promises
//     onLoginSuccess,
//     rehydrateAuth,
//     signOut,
//   };
// };
//
// export default useAuth;

const NoEmpty = () => {};

export default NoEmpty;
