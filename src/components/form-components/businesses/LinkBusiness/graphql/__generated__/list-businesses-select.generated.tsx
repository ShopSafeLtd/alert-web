import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessesSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type ListBusinessesSelectQuery = { __typename?: 'Query', businessRelay: { __typename?: 'QueryBusinessRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryBusinessRelayConnectionEdge', node: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', id: string, full: string }> } }> } };


export const ListBusinessesSelectDocument = gql`
    query ListBusinessesSelect($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  businessRelay(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    totalCount
    edges {
      node {
        id
        name
        locations {
          id
          full
        }
      }
    }
  }
}
    `;
export function useListBusinessesSelectQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessesSelectQuery, ListBusinessesSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessesSelectQuery, ListBusinessesSelectQueryVariables>(ListBusinessesSelectDocument, options);
      }
export function useListBusinessesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessesSelectQuery, ListBusinessesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessesSelectQuery, ListBusinessesSelectQueryVariables>(ListBusinessesSelectDocument, options);
        }
export type ListBusinessesSelectQueryHookResult = ReturnType<typeof useListBusinessesSelectQuery>;
export type ListBusinessesSelectLazyQueryHookResult = ReturnType<typeof useListBusinessesSelectLazyQuery>;
export type ListBusinessesSelectQueryResult = Apollo.QueryResult<ListBusinessesSelectQuery, ListBusinessesSelectQueryVariables>;