import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceCrimeGroupCardFragmentDoc } from '../../../../../components/police-crime-groups/PoliceCrimeGroupCard/__generated__/PoliceCrimeGroupCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedCrimeGroupsFeedQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.SharedCrimeGroupRelayOrderInput>;
  where?: Types.InputMaybe<Types.SharedCrimeGroupRelayWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SharedCrimeGroupsFeedQuery = { __typename?: 'Query', sharedCrimeGroupRelay: { __typename?: 'QuerySharedCrimeGroupRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'QuerySharedCrimeGroupRelayConnectionEdge', cursor: string, node: { __typename?: 'SharedCrimeGroup', id: string, crimeGroupId: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSophisticationLevel?: Types.AiSophisticationLevel | null, aiSummary?: string | null, aiActivityPatterns?: string | null, aiOrganizationStructure?: string | null, aiKeyObservations: Array<string>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, crimeGroup: { __typename?: 'CrimeGroup', id: string, ref: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalValue: number, totalRecoveredValue: number, totalTheftSuccess: number } } }> } };


export const SharedCrimeGroupsFeedDocument = gql`
    query SharedCrimeGroupsFeed($after: String, $first: Int, $orderBy: SharedCrimeGroupRelayOrderInput, $where: SharedCrimeGroupRelayWhereInput, $skip: Int) {
  sharedCrimeGroupRelay(
    after: $after
    first: $first
    orderBy: $orderBy
    where: $where
    skip: $skip
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        ...PoliceCrimeGroupCard
      }
    }
    totalCount
  }
}
    ${PoliceCrimeGroupCardFragmentDoc}`;
export function useSharedCrimeGroupsFeedQuery(baseOptions?: Apollo.QueryHookOptions<SharedCrimeGroupsFeedQuery, SharedCrimeGroupsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedCrimeGroupsFeedQuery, SharedCrimeGroupsFeedQueryVariables>(SharedCrimeGroupsFeedDocument, options);
      }
export function useSharedCrimeGroupsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedCrimeGroupsFeedQuery, SharedCrimeGroupsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedCrimeGroupsFeedQuery, SharedCrimeGroupsFeedQueryVariables>(SharedCrimeGroupsFeedDocument, options);
        }
export type SharedCrimeGroupsFeedQueryHookResult = ReturnType<typeof useSharedCrimeGroupsFeedQuery>;
export type SharedCrimeGroupsFeedLazyQueryHookResult = ReturnType<typeof useSharedCrimeGroupsFeedLazyQuery>;
export type SharedCrimeGroupsFeedQueryResult = Apollo.QueryResult<SharedCrimeGroupsFeedQuery, SharedCrimeGroupsFeedQueryVariables>;