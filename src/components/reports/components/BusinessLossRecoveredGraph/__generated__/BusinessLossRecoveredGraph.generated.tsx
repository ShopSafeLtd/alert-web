import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessLossRecoveredGraphQueryVariables = Types.Exact<{
  where: Types.BusinessIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type BusinessLossRecoveredGraphQuery = { __typename?: 'Query', businessLossRecoveredGraph: Array<{ __typename?: 'RadialGraph', label: string, data: Array<{ __typename?: 'Graph', label: string, value: number }> }> };


export const BusinessLossRecoveredGraphDocument = gql`
    query BusinessLossRecoveredGraph($where: BusinessIncidentsCountGraphInput!, $take: Int) {
  businessLossRecoveredGraph(where: $where, take: $take) {
    label
    data {
      label
      value
    }
  }
}
    `;
export function useBusinessLossRecoveredGraphQuery(baseOptions: Apollo.QueryHookOptions<BusinessLossRecoveredGraphQuery, BusinessLossRecoveredGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessLossRecoveredGraphQuery, BusinessLossRecoveredGraphQueryVariables>(BusinessLossRecoveredGraphDocument, options);
      }
export function useBusinessLossRecoveredGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessLossRecoveredGraphQuery, BusinessLossRecoveredGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessLossRecoveredGraphQuery, BusinessLossRecoveredGraphQueryVariables>(BusinessLossRecoveredGraphDocument, options);
        }
export type BusinessLossRecoveredGraphQueryHookResult = ReturnType<typeof useBusinessLossRecoveredGraphQuery>;
export type BusinessLossRecoveredGraphLazyQueryHookResult = ReturnType<typeof useBusinessLossRecoveredGraphLazyQuery>;
export type BusinessLossRecoveredGraphQueryResult = Apollo.QueryResult<BusinessLossRecoveredGraphQuery, BusinessLossRecoveredGraphQueryVariables>;