import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReportGroupsSelectQueryVariables = Types.Exact<{
  where: Types.ReportGroupWhere;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type ReportGroupsSelectQuery = { __typename?: 'Query', reportGroups?: { __typename?: 'QueryReportGroupsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryReportGroupsConnectionEdge', node: { __typename?: 'ReportGroup', id?: string | null, name?: string | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };


export const ReportGroupsSelectDocument = gql`
    query ReportGroupsSelect($where: ReportGroupWhere!, $first: Int, $after: String) {
  reportGroups(where: $where, first: $first, after: $after) {
    totalCount
    edges {
      node {
        id
        name
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useReportGroupsSelectQuery(baseOptions: Apollo.QueryHookOptions<ReportGroupsSelectQuery, ReportGroupsSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportGroupsSelectQuery, ReportGroupsSelectQueryVariables>(ReportGroupsSelectDocument, options);
      }
export function useReportGroupsSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportGroupsSelectQuery, ReportGroupsSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportGroupsSelectQuery, ReportGroupsSelectQueryVariables>(ReportGroupsSelectDocument, options);
        }
export type ReportGroupsSelectQueryHookResult = ReturnType<typeof useReportGroupsSelectQuery>;
export type ReportGroupsSelectLazyQueryHookResult = ReturnType<typeof useReportGroupsSelectLazyQuery>;
export type ReportGroupsSelectQueryResult = Apollo.QueryResult<ReportGroupsSelectQuery, ReportGroupsSelectQueryVariables>;