import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AiOffendersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  scheme?: Types.InputMaybe<Types.SchemeWhereUniqueInput>;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
}>;


export type AiOffendersQuery = { __typename?: 'Query', listOffendersRelay?: { __typename?: 'QueryListOffendersRelayConnection', edges: Array<{ __typename?: 'QueryListOffendersRelayConnectionEdge', node: { __typename?: 'Offender', id?: string | null, name?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> } }> } | null };


export const AiOffendersDocument = gql`
    query AiOffenders($first: Int, $order: OffenderOrderByWithRelationInput, $scheme: SchemeWhereUniqueInput, $where: OffenderWhereInput) {
  listOffendersRelay(first: $first, order: $order, scheme: $scheme, where: $where) {
    edges {
      node {
        id
        name
        images {
          id
          url
        }
        tags {
          id
          name
        }
      }
    }
  }
}
    `;
export function useAiOffendersQuery(baseOptions?: Apollo.QueryHookOptions<AiOffendersQuery, AiOffendersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AiOffendersQuery, AiOffendersQueryVariables>(AiOffendersDocument, options);
      }
export function useAiOffendersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AiOffendersQuery, AiOffendersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AiOffendersQuery, AiOffendersQueryVariables>(AiOffendersDocument, options);
        }
export type AiOffendersQueryHookResult = ReturnType<typeof useAiOffendersQuery>;
export type AiOffendersLazyQueryHookResult = ReturnType<typeof useAiOffendersLazyQuery>;
export type AiOffendersQueryResult = Apollo.QueryResult<AiOffendersQuery, AiOffendersQueryVariables>;