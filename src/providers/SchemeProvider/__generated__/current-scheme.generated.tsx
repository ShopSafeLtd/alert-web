import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentSchemeProviderQueryVariables = Types.Exact<{
  where: Types.UserSchemeWhereUniqueInput;
}>;


export type CurrentSchemeProviderQuery = { __typename?: 'Query', userScheme: { __typename?: 'UserScheme', id: string, role: Types.Role, isAdmin: boolean, permissions: Array<{ __typename?: 'Permissions', model: Types.PermissionModel, allowedMethods: Array<Types.PermissionMethod> }>, orignalPermissions: { __typename?: 'CustomRole', id: string, admin: boolean }, dashboard?: { __typename?: 'Dashboard', runningBanner?: string | null, layout: Array<{ __typename?: 'DashboardLayout', h: number, i: string, maxH?: number | null, maxW?: number | null, minH?: number | null, minW?: number | null, moved: boolean, static: boolean, w: number, x: number, y: number }> } | null, scheme: { __typename?: 'Scheme', disablePassword: boolean, draftIncidents: boolean, currency: Types.Currency, dontAutoSetTimeDate: boolean, activityAssignToUser: boolean, autoPopulateDescription: boolean, defaultPublicOffenderDOB: boolean, disableGalleryOnNative: boolean, facialDetection: boolean, facialRecognition: boolean, facialRedaction: boolean, allowTodoTemplateOverride: boolean, restrictIncidentAccess: boolean, goodsMode: Types.GoodsMode, id: string, imagesRequiredOnOffenders: boolean, languageCount: number, name: string, needJustification: boolean, oneSelectedIncidentTypeOnly: boolean, reportOnly: boolean, taskTimeTracking: boolean, requireSiteNumberForUsers: boolean, skipLocationToAddress: boolean, useBusinessGroupsOnIncident: boolean, userTodos: number, incidentTypeTooltip?: string | null, requireActivityAuthorised: boolean, requireBusinessOnIncident: boolean, optionalBusinessOnUsers: boolean, connectedToSchemes: Array<{ __typename?: 'Scheme', id: string, name: string }>, logo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null } } };


export const CurrentSchemeProviderDocument = gql`
    query CurrentSchemeProvider($where: UserSchemeWhereUniqueInput!) {
  userScheme(where: $where) {
    id
    role
    isAdmin
    permissions {
      model
      allowedMethods
    }
    orignalPermissions {
      id
      admin
    }
    dashboard {
      runningBanner
      layout {
        h
        i
        maxH
        maxW
        minH
        minW
        moved
        static
        w
        x
        y
      }
    }
    scheme {
      disablePassword
      draftIncidents
      currency
      dontAutoSetTimeDate
      activityAssignToUser
      autoPopulateDescription
      defaultPublicOffenderDOB
      disableGalleryOnNative
      facialDetection
      facialRecognition
      facialRedaction
      allowTodoTemplateOverride
      restrictIncidentAccess
      goodsMode
      id
      imagesRequiredOnOffenders
      languageCount
      name
      needJustification
      oneSelectedIncidentTypeOnly
      reportOnly
      taskTimeTracking
      requireSiteNumberForUsers
      skipLocationToAddress
      useBusinessGroupsOnIncident
      userTodos
      needJustification
      incidentTypeTooltip
      requireActivityAuthorised
      requireBusinessOnIncident
      optionalBusinessOnUsers
      connectedToSchemes {
        id
        name
      }
      logo {
        optimisedPersisted
      }
      darkLogo {
        optimisedPersisted
      }
    }
  }
}
    `;
export function useCurrentSchemeProviderQuery(baseOptions: Apollo.QueryHookOptions<CurrentSchemeProviderQuery, CurrentSchemeProviderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentSchemeProviderQuery, CurrentSchemeProviderQueryVariables>(CurrentSchemeProviderDocument, options);
      }
export function useCurrentSchemeProviderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentSchemeProviderQuery, CurrentSchemeProviderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentSchemeProviderQuery, CurrentSchemeProviderQueryVariables>(CurrentSchemeProviderDocument, options);
        }
export type CurrentSchemeProviderQueryHookResult = ReturnType<typeof useCurrentSchemeProviderQuery>;
export type CurrentSchemeProviderLazyQueryHookResult = ReturnType<typeof useCurrentSchemeProviderLazyQuery>;
export type CurrentSchemeProviderQueryResult = Apollo.QueryResult<CurrentSchemeProviderQuery, CurrentSchemeProviderQueryVariables>;