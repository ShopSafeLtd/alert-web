import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditReportGroupQueryVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type EditReportGroupQuery = { __typename?: 'Query', reportGroup: { __typename?: 'ReportGroup', id: string, name: string, order: number, groups: Array<{ __typename?: 'Group', id: string }> } };


export const EditReportGroupDocument = gql`
    query EditReportGroup($where: UniqueId!) {
  reportGroup(where: $where) {
    id
    name
    order
    groups {
      id
    }
  }
}
    `;
export function useEditReportGroupQuery(baseOptions: Apollo.QueryHookOptions<EditReportGroupQuery, EditReportGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditReportGroupQuery, EditReportGroupQueryVariables>(EditReportGroupDocument, options);
      }
export function useEditReportGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditReportGroupQuery, EditReportGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditReportGroupQuery, EditReportGroupQueryVariables>(EditReportGroupDocument, options);
        }
export type EditReportGroupQueryHookResult = ReturnType<typeof useEditReportGroupQuery>;
export type EditReportGroupLazyQueryHookResult = ReturnType<typeof useEditReportGroupLazyQuery>;
export type EditReportGroupQueryResult = Apollo.QueryResult<EditReportGroupQuery, EditReportGroupQueryVariables>;