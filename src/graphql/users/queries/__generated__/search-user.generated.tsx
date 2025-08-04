import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchUserQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
}>;


export type SearchUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, fullName: string, email?: string | null, publicName?: boolean | null, reportToAllBusinesses?: boolean | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', id: string, full?: string | null }> }>, addresses: Array<{ __typename?: 'Address', id: string, postcode?: string | null, street?: string | null, townCity?: string | null, building?: string | null, county?: string | null }> } };


export const SearchUserDocument = gql`
    query SearchUser($where: UserWhereUniqueInput!) {
  user(where: $where) {
    id
    fullName
    businesses {
      id
      name
      locations {
        id
        full
      }
    }
    email
    publicName
    reportToAllBusinesses
    addresses(where: {primary: {equals: true}}) {
      id
      postcode
      street
      townCity
      building
      county
    }
  }
}
    `;
export function useSearchUserQuery(baseOptions: Apollo.QueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
      }
export function useSearchUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUserQuery, SearchUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUserQuery, SearchUserQueryVariables>(SearchUserDocument, options);
        }
export type SearchUserQueryHookResult = ReturnType<typeof useSearchUserQuery>;
export type SearchUserLazyQueryHookResult = ReturnType<typeof useSearchUserLazyQuery>;
export type SearchUserQueryResult = Apollo.QueryResult<SearchUserQuery, SearchUserQueryVariables>;