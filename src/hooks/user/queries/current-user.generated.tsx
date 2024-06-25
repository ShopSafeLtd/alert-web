import type * as Types from '../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserQueryVariables = Types.Exact<{
  scheme?: Types.InputMaybe<Types.UniqueId>;
  orderBy?: Types.InputMaybe<Array<Types.UserSchemeOrderByWithRelationInput> | Types.UserSchemeOrderByWithRelationInput>;
}>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id: string, fullName: string, origName: string, email: string, reference?: number | null, demId?: string | null, publicName: boolean, reportToAllBusinesses: boolean, notificationCount: number, messageCount: number, defaultScheme?: string | null, newUser: boolean, incidentEmail: boolean, incidentPush: boolean, offenderEmail: boolean, offenderPush: boolean, bulletinEmails: boolean, bulletinPush: boolean, messagePush: boolean, forcePasswordReset: boolean, hasPassword: boolean, termsExpired: boolean, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string, demId?: string | null, brands: Array<string> }>, defaultGroups: Array<{ __typename?: 'Group', id: string, name: string, scheme: { __typename?: 'Scheme', id: string } }>, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Types.Role, isAdmin: boolean, scheme: { __typename?: 'Scheme', customTranslations: Array<{ [key: string]: any }>, userTodos: number, id: string, name: string, goodsMode: Types.GoodsMode, autoApproveIncidents: boolean, autoApproveOffenders: boolean, defaultPublicOffenderDOB: boolean, restrictIncidentAccess: boolean, reportOnly: boolean, facialRecognition: boolean, facialDetection: boolean, activityAssignToUser: boolean, useBusinessGroupsOnIncident: boolean, imagesRequiredOnOffenders: boolean, taskTimeTracking: boolean, languageCount: number, autoPopulateDescription: boolean, needJustification: boolean, requireSiteNumberForUsers: boolean, oneSelectedIncidentTypeOnly: boolean, logo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, connectedToSchemes: Array<{ __typename?: 'Scheme', id: string, name: string }> }, permissions: Array<{ __typename?: 'Permissions', model: Types.PermissionModel, allowedMethods: Array<Types.PermissionMethod> }>, dashboard?: { __typename?: 'Dashboard', runningBanner?: string | null, layout: Array<{ __typename?: 'DashboardLayout', h: number, i: string, maxH?: number | null, maxW?: number | null, minH?: number | null, minW?: number | null, moved: boolean, static: boolean, w: number, x: number, y: number }> } | null }> } | null };


export const CurrentUserDocument = gql`
    query currentUser($scheme: UniqueId, $orderBy: [UserSchemeOrderByWithRelationInput!]) {
  currentUser {
    id
    fullName
    origName
    email
    reference
    demId
    publicName
    reportToAllBusinesses
    notificationCount(scheme: $scheme)
    messageCount
    defaultScheme
    businesses {
      id
      name
      fullName
      demId
      brands
    }
    newUser
    defaultGroups {
      id
      name
      scheme {
        id
      }
    }
    schemes(orderBy: $orderBy) {
      id
      role
      scheme {
        customTranslations
        logo {
          optimisedPersisted
        }
        darkLogo {
          optimisedPersisted
        }
        userTodos
        id
        name
        goodsMode
        autoApproveIncidents
        autoApproveOffenders
        defaultPublicOffenderDOB
        restrictIncidentAccess
        reportOnly
        facialRecognition
        facialDetection
        activityAssignToUser
        useBusinessGroupsOnIncident
        imagesRequiredOnOffenders
        taskTimeTracking
        languageCount
        autoPopulateDescription
        needJustification
        requireSiteNumberForUsers
        oneSelectedIncidentTypeOnly
        connectedToSchemes {
          id
          name
        }
      }
      isAdmin
      permissions {
        model
        allowedMethods
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
    }
    incidentEmail
    incidentPush
    offenderEmail
    offenderPush
    bulletinEmails
    bulletinPush
    messagePush
    forcePasswordReset
    hasPassword
    termsExpired
  }
}
    `;
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;