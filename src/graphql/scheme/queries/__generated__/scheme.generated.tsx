import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type SchemeQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', id: string, name: string, restrictIncidentAccess: boolean, reportOnly: boolean, autoApproveIncidents: boolean, autoApproveOffenders: boolean, defaultIncidentEmail: boolean, defaultIncidentPush: boolean, policeReporting: boolean, defaultBulletinEmails: boolean, defaultBulletinPush: boolean, defaultSubscribedIncidentOnly: boolean, defaultSubscribedOffenderOnly: boolean, defaultMessagePush: boolean, defaultOffenderEmail: boolean, defaultOffenderPush: boolean, defaultPublicOffenderDOB: boolean, incidentRetention?: number | null, offenderRetention?: number | null, autoPopulateDescription: boolean, needJustification: boolean, facialRecognition: boolean, facialDetection: boolean, facialRedaction: boolean, incidentCustomQuestionRadio: boolean, incidentTypeTooltip?: string | null, activityAssignToUser: boolean, requireActivityAuthorised: boolean, useBusinessGroupsOnIncident: boolean, imagesRequiredOnOffenders: boolean, requireSiteNumberForUsers: boolean, oneSelectedIncidentTypeOnly: boolean, goodsMode: Types.GoodsMode, darkLogo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null } | null, logo?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null } | null } };


export const SchemeDocument = gql`
    query scheme($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    id
    name
    restrictIncidentAccess
    reportOnly
    autoApproveIncidents
    autoApproveOffenders
    defaultIncidentEmail
    defaultIncidentPush
    policeReporting
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
    facialRedaction
    incidentCustomQuestionRadio
    incidentTypeTooltip
    activityAssignToUser
    requireActivityAuthorised
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
export function useSchemeQuery(baseOptions: Apollo.QueryHookOptions<SchemeQuery, SchemeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeQuery, SchemeQueryVariables>(SchemeDocument, options);
      }
export function useSchemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeQuery, SchemeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeQuery, SchemeQueryVariables>(SchemeDocument, options);
        }
export type SchemeQueryHookResult = ReturnType<typeof useSchemeQuery>;
export type SchemeLazyQueryHookResult = ReturnType<typeof useSchemeLazyQuery>;
export type SchemeQueryResult = Apollo.QueryResult<SchemeQuery, SchemeQueryVariables>;