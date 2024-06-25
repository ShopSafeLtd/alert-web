import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessesChecklistQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type ListBusinessesChecklistQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name: string }> } };


export const ListBusinessesChecklistDocument = gql`
    query ListBusinessesChecklist($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
    }
  }
}
    `;
export function useListBusinessesChecklistQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessesChecklistQuery, ListBusinessesChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessesChecklistQuery, ListBusinessesChecklistQueryVariables>(ListBusinessesChecklistDocument, options);
      }
export function useListBusinessesChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessesChecklistQuery, ListBusinessesChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessesChecklistQuery, ListBusinessesChecklistQueryVariables>(ListBusinessesChecklistDocument, options);
        }
export type ListBusinessesChecklistQueryHookResult = ReturnType<typeof useListBusinessesChecklistQuery>;
export type ListBusinessesChecklistLazyQueryHookResult = ReturnType<typeof useListBusinessesChecklistLazyQuery>;
export type ListBusinessesChecklistQueryResult = Apollo.QueryResult<ListBusinessesChecklistQuery, ListBusinessesChecklistQueryVariables>;