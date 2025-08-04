import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DemGroupQueryVariables = Types.Exact<{
  where: Types.DemGroupWhereUniqueInput;
}>;


export type DemGroupQuery = { __typename?: 'Query', demGroup: { __typename?: 'DemGroup', id: string, name: string, demId: string, totalDevices: number, demDevices: Array<{ __typename?: 'DemDevice', id: string, name: string, business?: { __typename?: 'Business', id: string, name: string } | null }> } };


export const DemGroupDocument = gql`
    query DemGroup($where: DemGroupWhereUniqueInput!) {
  demGroup(where: $where) {
    id
    name
    demId
    totalDevices
    demDevices {
      id
      name
      business {
        id
        name
      }
    }
  }
}
    `;
export function useDemGroupQuery(baseOptions: Apollo.QueryHookOptions<DemGroupQuery, DemGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DemGroupQuery, DemGroupQueryVariables>(DemGroupDocument, options);
      }
export function useDemGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DemGroupQuery, DemGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DemGroupQuery, DemGroupQueryVariables>(DemGroupDocument, options);
        }
export type DemGroupQueryHookResult = ReturnType<typeof useDemGroupQuery>;
export type DemGroupLazyQueryHookResult = ReturnType<typeof useDemGroupLazyQuery>;
export type DemGroupQueryResult = Apollo.QueryResult<DemGroupQuery, DemGroupQueryVariables>;