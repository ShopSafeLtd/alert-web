import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InvestigationsSideListQueryVariables = Types.Exact<{
  where: Types.InvestigationRelayWhereInput;
  orderBy?: Types.InputMaybe<Types.InvestigationRelayOrderInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type InvestigationsSideListQuery = { __typename?: 'Query', investigationRelay: { __typename?: 'QueryInvestigationRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryInvestigationRelayConnectionEdge', node: { __typename?: 'Investigation', id: string, name: string, description?: string | null, status: Types.InvestigationStatus, createdAt: Date, reference?: number | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, incidents: Array<{ __typename?: 'Incident', id: string }>, offenders: Array<{ __typename?: 'Offender', id: string }>, vehicles: Array<{ __typename?: 'Vehicle', id: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const InvestigationsSideListDocument = gql`
    query InvestigationsSideList($where: investigationRelayWhereInput!, $orderBy: investigationRelayOrderInput, $first: Int, $after: String) {
  investigationRelay(
    where: $where
    orderBy: $orderBy
    first: $first
    after: $after
  ) {
    totalCount
    edges {
      node {
        id
        name
        description
        status
        createdAt
        reference
        groups {
          id
          name
        }
        incidents {
          id
        }
        offenders {
          id
        }
        vehicles {
          id
        }
        crimeGroups {
          id
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useInvestigationsSideListQuery(baseOptions: Apollo.QueryHookOptions<InvestigationsSideListQuery, InvestigationsSideListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvestigationsSideListQuery, InvestigationsSideListQueryVariables>(InvestigationsSideListDocument, options);
      }
export function useInvestigationsSideListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvestigationsSideListQuery, InvestigationsSideListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvestigationsSideListQuery, InvestigationsSideListQueryVariables>(InvestigationsSideListDocument, options);
        }
export type InvestigationsSideListQueryHookResult = ReturnType<typeof useInvestigationsSideListQuery>;
export type InvestigationsSideListLazyQueryHookResult = ReturnType<typeof useInvestigationsSideListLazyQuery>;
export type InvestigationsSideListQueryResult = Apollo.QueryResult<InvestigationsSideListQuery, InvestigationsSideListQueryVariables>;