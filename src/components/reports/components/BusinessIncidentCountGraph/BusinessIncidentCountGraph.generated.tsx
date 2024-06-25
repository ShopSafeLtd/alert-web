import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessIncidentCountGraphQueryVariables = Types.Exact<{
  where: Types.BusinessIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type BusinessIncidentCountGraphQuery = { __typename?: 'Query', businessIncidentCountGraph: Array<{ __typename?: 'Graph', label: string, value: number }> };


export const BusinessIncidentCountGraphDocument = gql`
    query BusinessIncidentCountGraph($where: BusinessIncidentsCountGraphInput!, $take: Int) {
  businessIncidentCountGraph(where: $where, take: $take) {
    label
    value
  }
}
    `;
export function useBusinessIncidentCountGraphQuery(baseOptions: Apollo.QueryHookOptions<BusinessIncidentCountGraphQuery, BusinessIncidentCountGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessIncidentCountGraphQuery, BusinessIncidentCountGraphQueryVariables>(BusinessIncidentCountGraphDocument, options);
      }
export function useBusinessIncidentCountGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessIncidentCountGraphQuery, BusinessIncidentCountGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessIncidentCountGraphQuery, BusinessIncidentCountGraphQueryVariables>(BusinessIncidentCountGraphDocument, options);
        }
export type BusinessIncidentCountGraphQueryHookResult = ReturnType<typeof useBusinessIncidentCountGraphQuery>;
export type BusinessIncidentCountGraphLazyQueryHookResult = ReturnType<typeof useBusinessIncidentCountGraphLazyQuery>;
export type BusinessIncidentCountGraphQueryResult = Apollo.QueryResult<BusinessIncidentCountGraphQuery, BusinessIncidentCountGraphQueryVariables>;