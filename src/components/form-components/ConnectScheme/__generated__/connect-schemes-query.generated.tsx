import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConnectSchemesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SchemeWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.SchemeOrderByWithRelationInput> | Types.SchemeOrderByWithRelationInput>;
}>;


export type ConnectSchemesQuery = { __typename?: 'Query', schemes: Array<{ __typename?: 'Scheme', id: string, name: string }> };


export const ConnectSchemesDocument = gql`
    query ConnectSchemes($where: SchemeWhereInput, $orderBy: [SchemeOrderByWithRelationInput!]) {
  schemes(where: $where, orderBy: $orderBy) {
    id
    name
  }
}
    `;
export function useConnectSchemesQuery(baseOptions?: Apollo.QueryHookOptions<ConnectSchemesQuery, ConnectSchemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConnectSchemesQuery, ConnectSchemesQueryVariables>(ConnectSchemesDocument, options);
      }
export function useConnectSchemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConnectSchemesQuery, ConnectSchemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConnectSchemesQuery, ConnectSchemesQueryVariables>(ConnectSchemesDocument, options);
        }
export type ConnectSchemesQueryHookResult = ReturnType<typeof useConnectSchemesQuery>;
export type ConnectSchemesLazyQueryHookResult = ReturnType<typeof useConnectSchemesLazyQuery>;
export type ConnectSchemesQueryResult = Apollo.QueryResult<ConnectSchemesQuery, ConnectSchemesQueryVariables>;