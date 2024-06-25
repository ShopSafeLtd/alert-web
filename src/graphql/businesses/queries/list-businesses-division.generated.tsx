import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessesDivisionQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type ListBusinessesDivisionQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, division?: string | null }> } };


export const ListBusinessesDivisionDocument = gql`
    query ListBusinessesDivision($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      division
    }
  }
}
    `;
export function useListBusinessesDivisionQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessesDivisionQuery, ListBusinessesDivisionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessesDivisionQuery, ListBusinessesDivisionQueryVariables>(ListBusinessesDivisionDocument, options);
      }
export function useListBusinessesDivisionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessesDivisionQuery, ListBusinessesDivisionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessesDivisionQuery, ListBusinessesDivisionQueryVariables>(ListBusinessesDivisionDocument, options);
        }
export type ListBusinessesDivisionQueryHookResult = ReturnType<typeof useListBusinessesDivisionQuery>;
export type ListBusinessesDivisionLazyQueryHookResult = ReturnType<typeof useListBusinessesDivisionLazyQuery>;
export type ListBusinessesDivisionQueryResult = Apollo.QueryResult<ListBusinessesDivisionQuery, ListBusinessesDivisionQueryVariables>;