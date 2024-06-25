import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListInvestigationsAllSchemesQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.InvestigationWhereInput>;
}>;


export type ListInvestigationsAllSchemesQuery = { __typename?: 'Query', listInvestigationsAllSchemes: { __typename?: 'ListInvestigations', total: number, investigations: Array<{ __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, closedAt?: Date | null, reference?: number | null, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const ListInvestigationsAllSchemesDocument = gql`
    query listInvestigationsAllSchemes($take: Int, $skip: Int, $where: InvestigationWhereInput) {
  listInvestigationsAllSchemes(where: $where, take: $take, skip: $skip) {
    total
    investigations {
      id
      name
      description
      status
      createdAt
      closedAt
      reference
      groups {
        id
        name
      }
    }
  }
}
    `;
export function useListInvestigationsAllSchemesQuery(baseOptions?: Apollo.QueryHookOptions<ListInvestigationsAllSchemesQuery, ListInvestigationsAllSchemesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListInvestigationsAllSchemesQuery, ListInvestigationsAllSchemesQueryVariables>(ListInvestigationsAllSchemesDocument, options);
      }
export function useListInvestigationsAllSchemesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListInvestigationsAllSchemesQuery, ListInvestigationsAllSchemesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListInvestigationsAllSchemesQuery, ListInvestigationsAllSchemesQueryVariables>(ListInvestigationsAllSchemesDocument, options);
        }
export type ListInvestigationsAllSchemesQueryHookResult = ReturnType<typeof useListInvestigationsAllSchemesQuery>;
export type ListInvestigationsAllSchemesLazyQueryHookResult = ReturnType<typeof useListInvestigationsAllSchemesLazyQuery>;
export type ListInvestigationsAllSchemesQueryResult = Apollo.QueryResult<ListInvestigationsAllSchemesQuery, ListInvestigationsAllSchemesQueryVariables>;