import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeDetailsQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type SchemeDetailsQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', id: string, name: string, restrictIncidentAccess: boolean, reportOnly: boolean, autoApproveIncidents: boolean, autoApproveOffenders: boolean, defaultIncidentEmail: boolean, defaultIncidentPush: boolean, defaultBulletinEmails: boolean, defaultBulletinPush: boolean, defaultSubscribedIncidentOnly: boolean, defaultSubscribedOffenderOnly: boolean, defaultMessagePush: boolean, defaultOffenderEmail: boolean, defaultOffenderPush: boolean, defaultPublicOffenderDOB: boolean, incidentRetention?: number | null, offenderRetention?: number | null, autoPopulateDescription: boolean, needJustification: boolean, facialRecognition: boolean, facialDetection: boolean, activityAssignToUser: boolean, useBusinessGroupsOnIncident: boolean, imagesRequiredOnOffenders: boolean, requireSiteNumberForUsers: boolean, oneSelectedIncidentTypeOnly: boolean, goodsMode: Types.GoodsMode, darkLogo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null } | null, logo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null } | null } };


export const SchemeDetailsDocument = gql`
    query schemeDetails($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    id
    name
    restrictIncidentAccess
    reportOnly
    autoApproveIncidents
    autoApproveOffenders
    defaultIncidentEmail
    defaultIncidentPush
    defaultBulletinEmails
    defaultBulletinPush
    defaultSubscribedIncidentOnly
    defaultSubscribedOffenderOnly
    defaultMessagePush
    defaultOffenderEmail
    defaultOffenderPush
    defaultPublicOffenderDOB
    incidentRetention
    offenderRetention
    autoPopulateDescription
    needJustification
    facialRecognition
    facialDetection
    activityAssignToUser
    useBusinessGroupsOnIncident
    imagesRequiredOnOffenders
    requireSiteNumberForUsers
    oneSelectedIncidentTypeOnly
    goodsMode
    darkLogo {
      id
      url
      optimised
    }
    logo {
      id
      url
      optimised
    }
  }
}
    `;
export function useSchemeDetailsQuery(baseOptions: Apollo.QueryHookOptions<SchemeDetailsQuery, SchemeDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeDetailsQuery, SchemeDetailsQueryVariables>(SchemeDetailsDocument, options);
      }
export function useSchemeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeDetailsQuery, SchemeDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeDetailsQuery, SchemeDetailsQueryVariables>(SchemeDetailsDocument, options);
        }
export type SchemeDetailsQueryHookResult = ReturnType<typeof useSchemeDetailsQuery>;
export type SchemeDetailsLazyQueryHookResult = ReturnType<typeof useSchemeDetailsLazyQuery>;
export type SchemeDetailsQueryResult = Apollo.QueryResult<SchemeDetailsQuery, SchemeDetailsQueryVariables>;