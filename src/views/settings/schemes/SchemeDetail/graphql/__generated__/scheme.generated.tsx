import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeDetailsQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type SchemeDetailsQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', id?: string | null, name?: string | null, restrictIncidentAccess?: boolean | null, reportOnly?: boolean | null, autoApproveIncidents?: boolean | null, autoApproveOffenders?: boolean | null, defaultPublicOffenderDOB?: boolean | null, defaultIncidentEmail?: boolean | null, defaultIncidentPush?: boolean | null, defaultBulletinEmails?: boolean | null, defaultBulletinPush?: boolean | null, defaultSubscribedIncidentOnly?: boolean | null, defaultSubscribedOffenderOnly?: boolean | null, defaultMessagePush?: boolean | null, defaultOffenderEmail?: boolean | null, defaultOffenderPush?: boolean | null, incidentRetention?: number | null, offenderRetention?: number | null, autoPopulateDescription?: boolean | null, needJustification?: boolean | null, facialRecognition?: boolean | null, facialDetection?: boolean | null, facialRedaction?: boolean | null, incidentCustomQuestionRadio?: boolean | null, incidentTypeTooltip?: string | null, activityAssignToUser?: boolean | null, requireActivityAuthorised?: boolean | null, useBusinessGroupsOnIncident?: boolean | null, imagesRequiredOnOffenders?: boolean | null, requireSiteNumberForUsers?: boolean | null, oneSelectedIncidentTypeOnly?: boolean | null, goodsMode?: Types.GoodsMode | null, darkLogo?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null } | null, logo?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null } | null } };


export const SchemeDetailsDocument = gql`
    query schemeDetails($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    id
    name
    restrictIncidentAccess
    reportOnly
    autoApproveIncidents
    autoApproveOffenders
    defaultPublicOffenderDOB
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