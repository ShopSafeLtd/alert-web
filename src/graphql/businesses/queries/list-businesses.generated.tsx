import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type ListBusinessesQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name: string, siteNumber?: string | null, fullName: string, publicName: boolean, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name: string } | null, locations: Array<{ __typename?: 'Address', id: string, full: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };


export const ListBusinessesDocument = gql`
    query ListBusinesses($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
      siteNumber
      fullName
      publicName
      demId
      parent {
        id
        name
      }
      locations {
        id
        full
      }
      groups {
        id
        name
      }
      tags {
        id
        name
      }
      totalUsers
    }
  }
}
    `;
export function useListBusinessesQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessesQuery, ListBusinessesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessesQuery, ListBusinessesQueryVariables>(ListBusinessesDocument, options);
      }
export function useListBusinessesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessesQuery, ListBusinessesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessesQuery, ListBusinessesQueryVariables>(ListBusinessesDocument, options);
        }
export type ListBusinessesQueryHookResult = ReturnType<typeof useListBusinessesQuery>;
export type ListBusinessesLazyQueryHookResult = ReturnType<typeof useListBusinessesLazyQuery>;
export type ListBusinessesQueryResult = Apollo.QueryResult<ListBusinessesQuery, ListBusinessesQueryVariables>;