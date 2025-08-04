import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentSchemeProviderQueryVariables = Types.Exact<{
  where: Types.UserSchemeWhereUniqueInput;
}>;


export type CurrentSchemeProviderQuery = { __typename?: 'Query', userScheme: { __typename?: 'UserScheme', id?: string | null, role?: Types.Role | null, isAdmin?: boolean | null, permissions?: Array<{ __typename?: 'Permissions', model: Types.PermissionModel, allowedMethods: Array<Types.PermissionMethod> }> | null, orignalPermissions?: { __typename?: 'CustomRole', id: string, admin?: boolean | null } | null, dashboard?: { __typename?: 'Dashboard', runningBanner?: string | null, layout?: Array<{ __typename?: 'DashboardLayout', h?: number | null, i?: string | null, maxH?: number | null, maxW?: number | null, minH?: number | null, minW?: number | null, moved?: boolean | null, static?: boolean | null, w?: number | null, x?: number | null, y?: number | null, metadata?: { [key: string]: any } | null }> | null } | null, scheme?: { __typename?: 'Scheme', disablePassword?: boolean | null, draftIncidents?: boolean | null, currency?: Types.Currency | null, dontAutoSetTimeDate?: boolean | null, activityAssignToUser?: boolean | null, autoPopulateDescription?: boolean | null, defaultPublicOffenderDOB?: boolean | null, disableGalleryOnNative?: boolean | null, facialDetection?: boolean | null, facialRecognition?: boolean | null, facialRedaction?: boolean | null, allowTodoTemplateOverride?: boolean | null, restrictIncidentAccess?: boolean | null, goodsMode?: Types.GoodsMode | null, id?: string | null, imagesRequiredOnOffenders?: boolean | null, languageCount: number, name?: string | null, needJustification?: boolean | null, oneSelectedIncidentTypeOnly?: boolean | null, reportOnly?: boolean | null, taskTimeTracking?: boolean | null, requireSiteNumberForUsers?: boolean | null, skipLocationToAddress?: boolean | null, useBusinessGroupsOnIncident?: boolean | null, userTodos: number, incidentTypeTooltip?: string | null, requireActivityAuthorised?: boolean | null, requireBusinessOnIncident?: boolean | null, optionalBusinessOnUsers?: boolean | null, connectedToSchemes?: Array<{ __typename?: 'Scheme', id?: string | null, name?: string | null }> | null, logo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null } | null } };


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
        metadata
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