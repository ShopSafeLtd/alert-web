import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentSchemeProviderQueryVariables = Types.Exact<{
  where: Types.UserSchemeWhereUniqueInput;
}>;


export type CurrentSchemeProviderQuery = { __typename?: 'Query', userScheme: { __typename?: 'UserScheme', id: string, role: Types.Role, isAdmin: boolean, permissions: Array<{ __typename?: 'Permissions', model: Types.PermissionModel, allowedMethods: Array<Types.PermissionMethod> }>, orignalPermissions: { __typename?: 'CustomRole', id: string, admin: boolean }, scheme: { __typename?: 'Scheme', id: string, name: string, defaultPublicOffenderDOB: boolean, restrictIncidentAccess: boolean, reportOnly: boolean, customTranslations: Array<{ [key: string]: any }>, facialRecognition: boolean, facialRedaction: boolean, activityAssignToUser: boolean, useBusinessGroupsOnIncident: boolean, imagesRequiredOnOffenders: boolean, goodsMode: Types.GoodsMode, taskTimeTracking: boolean, languageCount: number, autoPopulateDescription: boolean, needJustification: boolean, requireSiteNumberForUsers: boolean, oneSelectedIncidentTypeOnly: boolean, facialDetection: boolean, disableGalleryOnNative: boolean, skipLocationToAddress: boolean } } };


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
    scheme {
      id
      name
      defaultPublicOffenderDOB
      restrictIncidentAccess
      reportOnly
      customTranslations
      facialRecognition
      facialRedaction
      activityAssignToUser
      useBusinessGroupsOnIncident
      imagesRequiredOnOffenders
      goodsMode
      taskTimeTracking
      languageCount
      autoPopulateDescription
      needJustification
      requireSiteNumberForUsers
      oneSelectedIncidentTypeOnly
      facialDetection
      disableGalleryOnNative
      skipLocationToAddress
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