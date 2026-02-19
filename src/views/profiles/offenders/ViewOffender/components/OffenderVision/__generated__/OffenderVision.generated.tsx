import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderVisionQueryVariables = Types.Exact<{
  where: Types.AiVisionMatchWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.AiVisionMatchOrderByInput> | Types.AiVisionMatchOrderByInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type OffenderVisionQuery = { __typename?: 'Query', aiVisionMatches: { __typename?: 'QueryAiVisionMatchesConnection', totalCount: number, edges: Array<{ __typename?: 'QueryAiVisionMatchesConnectionEdge', node: { __typename?: 'AIVisionMatch', id: string, priority: Types.AiVisionMatchPriority, confidenceRating: Types.AiVisionMatchConfidence, createdAt: Date, business: { __typename?: 'Business', id: string, name: string } } }> } };


export const OffenderVisionDocument = gql`
    query OffenderVision($where: AiVisionMatchWhereInput!, $orderBy: [AiVisionMatchOrderByInput!], $take: Int) {
  aiVisionMatches(where: $where, orderBy: $orderBy, take: $take) {
    edges {
      node {
        id
        priority
        business {
          id
          name
        }
        confidenceRating
        priority
        createdAt
      }
    }
    totalCount
  }
}
    `;
export function useOffenderVisionQuery(baseOptions: Apollo.QueryHookOptions<OffenderVisionQuery, OffenderVisionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffenderVisionQuery, OffenderVisionQueryVariables>(OffenderVisionDocument, options);
      }
export function useOffenderVisionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffenderVisionQuery, OffenderVisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffenderVisionQuery, OffenderVisionQueryVariables>(OffenderVisionDocument, options);
        }
export type OffenderVisionQueryHookResult = ReturnType<typeof useOffenderVisionQuery>;
export type OffenderVisionLazyQueryHookResult = ReturnType<typeof useOffenderVisionLazyQuery>;
export type OffenderVisionQueryResult = Apollo.QueryResult<OffenderVisionQuery, OffenderVisionQueryVariables>;