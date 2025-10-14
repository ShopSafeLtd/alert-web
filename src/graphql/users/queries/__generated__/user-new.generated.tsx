import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserNewQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type UserNewQuery = { __typename?: 'Query', userNew: { __typename?: 'UserNew', id: string, email?: string | null, newUser: boolean, hasAuth0Id: boolean } };


export const UserNewDocument = gql`
    query userNew($id: String!) {
  userNew(id: $id) {
    id
    email
    newUser
    hasAuth0Id
  }
}
    `;
export function useUserNewQuery(baseOptions: Apollo.QueryHookOptions<UserNewQuery, UserNewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNewQuery, UserNewQueryVariables>(UserNewDocument, options);
      }
export function useUserNewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNewQuery, UserNewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNewQuery, UserNewQueryVariables>(UserNewDocument, options);
        }
export type UserNewQueryHookResult = ReturnType<typeof useUserNewQuery>;
export type UserNewLazyQueryHookResult = ReturnType<typeof useUserNewLazyQuery>;
export type UserNewQueryResult = Apollo.QueryResult<UserNewQuery, UserNewQueryVariables>;