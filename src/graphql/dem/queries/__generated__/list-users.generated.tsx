import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemUsersQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
}>;


export type ListDemUsersQuery = { __typename?: 'Query', listDemUsers: { __typename?: 'ListDemUsers', total: number, demUsers: Array<{ __typename?: 'DemUser', name?: string | null, id?: string | null, email?: string | null }> } };


export const ListDemUsersDocument = gql`
    query ListDemUsers($where: String!) {
  listDemUsers(where: $where) {
    demUsers {
      name
      id
      email
    }
    total
  }
}
    `;
export function useListDemUsersQuery(baseOptions: Apollo.QueryHookOptions<ListDemUsersQuery, ListDemUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDemUsersQuery, ListDemUsersQueryVariables>(ListDemUsersDocument, options);
      }
export function useListDemUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDemUsersQuery, ListDemUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDemUsersQuery, ListDemUsersQueryVariables>(ListDemUsersDocument, options);
        }
export type ListDemUsersQueryHookResult = ReturnType<typeof useListDemUsersQuery>;
export type ListDemUsersLazyQueryHookResult = ReturnType<typeof useListDemUsersLazyQuery>;
export type ListDemUsersQueryResult = Apollo.QueryResult<ListDemUsersQuery, ListDemUsersQueryVariables>;