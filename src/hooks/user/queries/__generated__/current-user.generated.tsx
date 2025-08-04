import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CurrentUserQueryVariables = Types.Exact<{
  scheme?: Types.InputMaybe<Types.UniqueId>;
  orderBy?: Types.InputMaybe<Array<Types.UserSchemeOrderByWithRelationInput> | Types.UserSchemeOrderByWithRelationInput>;
}>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'User', id?: string | null, fullName: string, origName?: string | null, email?: string | null, reference?: number | null, demId?: string | null, publicName?: boolean | null, reportToAllBusinesses?: boolean | null, notificationCount: number, messageCount?: number | null, defaultScheme?: string | null, newUser?: boolean | null, incidentEmail?: boolean | null, incidentPush?: boolean | null, offenderEmail?: boolean | null, offenderPush?: boolean | null, bulletinEmails?: boolean | null, bulletinPush?: boolean | null, messagePush?: boolean | null, forcePasswordReset?: boolean | null, hasPassword?: boolean | null, termsExpired?: boolean | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null, demId?: string | null, brands?: Array<string> | null }>, defaultGroups: Array<{ __typename?: 'Group', id: string, name: string, scheme: { __typename?: 'Scheme', id?: string | null } }>, schemes: Array<{ __typename?: 'UserScheme', id?: string | null, isAdmin?: boolean | null, scheme?: { __typename?: 'Scheme', userTodos: number, id?: string | null, name?: string | null, goodsMode?: Types.GoodsMode | null, autoApproveIncidents?: boolean | null, autoApproveOffenders?: boolean | null, defaultPublicOffenderDOB?: boolean | null, restrictIncidentAccess?: boolean | null, reportOnly?: boolean | null, facialRecognition?: boolean | null, facialDetection?: boolean | null, facialRedaction?: boolean | null, incidentCustomQuestionRadio?: boolean | null, incidentTypeTooltip?: string | null, activityAssignToUser?: boolean | null, requireActivityAuthorised?: boolean | null, useBusinessGroupsOnIncident?: boolean | null, imagesRequiredOnOffenders?: boolean | null, taskTimeTracking?: boolean | null, languageCount: number, autoPopulateDescription?: boolean | null, needJustification?: boolean | null, requireSiteNumberForUsers?: boolean | null, oneSelectedIncidentTypeOnly?: boolean | null, logo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, darkLogo?: { __typename?: 'Image', optimisedPersisted?: string | null } | null, connectedToSchemes?: Array<{ __typename?: 'Scheme', id?: string | null, name?: string | null }> | null } | null, permissions?: Array<{ __typename?: 'Permissions', model: Types.PermissionModel, allowedMethods: Array<Types.PermissionMethod> }> | null, dashboard?: { __typename?: 'Dashboard', runningBanner?: string | null, layout?: Array<{ __typename?: 'DashboardLayout', h?: number | null, i?: string | null, maxH?: number | null, maxW?: number | null, minH?: number | null, minW?: number | null, moved?: boolean | null, static?: boolean | null, w?: number | null, x?: number | null, y?: number | null }> | null } | null }> } | null };


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
      scheme {
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
        facialRedaction
        incidentCustomQuestionRadio
        incidentTypeTooltip
        activityAssignToUser
        requireActivityAuthorised
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