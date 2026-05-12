import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttFilterOptionsQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
}>;


export type PttFilterOptionsQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', pttDevices: Array<{ __typename?: 'PttDevice', id: string, name: string, groupId?: string | null, groupName?: string | null }> } };


export const PttFilterOptionsDocument = gql`
    query PttFilterOptions($schemeId: String!) {
  scheme(where: {id: $schemeId}) {
    pttDevices {
      id
      name
      groupId
      groupName
    }
  }
}
    `;
export function usePttFilterOptionsQuery(baseOptions: Apollo.QueryHookOptions<PttFilterOptionsQuery, PttFilterOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PttFilterOptionsQuery, PttFilterOptionsQueryVariables>(PttFilterOptionsDocument, options);
      }
export function usePttFilterOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PttFilterOptionsQuery, PttFilterOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PttFilterOptionsQuery, PttFilterOptionsQueryVariables>(PttFilterOptionsDocument, options);
        }
export type PttFilterOptionsQueryHookResult = ReturnType<typeof usePttFilterOptionsQuery>;
export type PttFilterOptionsLazyQueryHookResult = ReturnType<typeof usePttFilterOptionsLazyQuery>;
export type PttFilterOptionsQueryResult = Apollo.QueryResult<PttFilterOptionsQuery, PttFilterOptionsQueryVariables>;