import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CrimeGroupAnalyticsQueryVariables = Types.Exact<{
  crimeGroupId: Types.Scalars['String'];
  mode: Types.CrimeGroupAnalyticsMode;
}>;


export type CrimeGroupAnalyticsQuery = { __typename?: 'Query', crimeGroupAnalytics: Array<{ __typename?: 'CrimeGroupOffenderAnalyticsSimple', offenderId: string, tier: Types.CrimeGroupOffenderTier, score: number, linkClusterScore: number, linkTotalSharedIncidents: number, linkUniqueConnections: number, linkConnectionsMap?: { [key: string]: any } | null, impactTotalScore: number, impactIncidentScore: number, impactValueScore: number, crimeGroupIncidentCount: number, crimeGroupTotalValue: number }> };


export const CrimeGroupAnalyticsDocument = gql`
    query CrimeGroupAnalytics($crimeGroupId: String!, $mode: CrimeGroupAnalyticsMode!) {
  crimeGroupAnalytics(crimeGroupId: $crimeGroupId, mode: $mode) {
    offenderId
    tier
    score
    linkClusterScore
    linkTotalSharedIncidents
    linkUniqueConnections
    linkConnectionsMap
    impactTotalScore
    impactIncidentScore
    impactValueScore
    crimeGroupIncidentCount
    crimeGroupTotalValue
  }
}
    `;
export function useCrimeGroupAnalyticsQuery(baseOptions: Apollo.QueryHookOptions<CrimeGroupAnalyticsQuery, CrimeGroupAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CrimeGroupAnalyticsQuery, CrimeGroupAnalyticsQueryVariables>(CrimeGroupAnalyticsDocument, options);
      }
export function useCrimeGroupAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CrimeGroupAnalyticsQuery, CrimeGroupAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CrimeGroupAnalyticsQuery, CrimeGroupAnalyticsQueryVariables>(CrimeGroupAnalyticsDocument, options);
        }
export type CrimeGroupAnalyticsQueryHookResult = ReturnType<typeof useCrimeGroupAnalyticsQuery>;
export type CrimeGroupAnalyticsLazyQueryHookResult = ReturnType<typeof useCrimeGroupAnalyticsLazyQuery>;
export type CrimeGroupAnalyticsQueryResult = Apollo.QueryResult<CrimeGroupAnalyticsQuery, CrimeGroupAnalyticsQueryVariables>;