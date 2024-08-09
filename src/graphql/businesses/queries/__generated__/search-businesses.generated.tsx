import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchBusinessesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type SearchBusinessesQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, siteNumber?: string | null, locations: Array<{ __typename?: 'Address', id: string, full: string }> }> } };


export const SearchBusinessesDocument = gql`
    query SearchBusinesses($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
      fullName
      publicName
      siteNumber
      locations {
        id
        full
      }
    }
  }
}
    `;
export function useSearchBusinessesQuery(baseOptions?: Apollo.QueryHookOptions<SearchBusinessesQuery, SearchBusinessesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchBusinessesQuery, SearchBusinessesQueryVariables>(SearchBusinessesDocument, options);
      }
export function useSearchBusinessesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchBusinessesQuery, SearchBusinessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchBusinessesQuery, SearchBusinessesQueryVariables>(SearchBusinessesDocument, options);
        }
export type SearchBusinessesQueryHookResult = ReturnType<typeof useSearchBusinessesQuery>;
export type SearchBusinessesLazyQueryHookResult = ReturnType<typeof useSearchBusinessesLazyQuery>;
export type SearchBusinessesQueryResult = Apollo.QueryResult<SearchBusinessesQuery, SearchBusinessesQueryVariables>;