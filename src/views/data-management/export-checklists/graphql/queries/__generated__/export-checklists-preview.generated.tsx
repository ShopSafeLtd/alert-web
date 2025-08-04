import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PreviewChecklistExportQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  range: Types.ChecklistDateRange;
  where: Types.ActiveChecklistWhereInput;
}>;


export type PreviewChecklistExportQuery = { __typename?: 'Query', activeChecklistExportPreview?: { __typename?: 'QueryActiveChecklistExportPreviewConnection', totalCount: number, edges: Array<{ __typename?: 'QueryActiveChecklistExportPreviewConnectionEdge', node: { __typename?: 'ActiveChecklist', id: string, name?: string | null, percentageScore?: string | null, percentComplete: number, status: Types.ChecklistStatus, updatedAt?: Date | null, completedAt?: Date | null, document?: { __typename?: 'Document', id?: string | null, url?: string | null } | null, business?: { __typename?: 'Business', name?: string | null, id: string } | null } }> } | null };


export const PreviewChecklistExportDocument = gql`
    query PreviewChecklistExport($first: Int, $range: ChecklistDateRange!, $where: ActiveChecklistWhereInput!) {
  activeChecklistExportPreview(first: $first, where: $where, range: $range) {
    totalCount
    edges {
      node {
        id
        name
        percentageScore
        percentComplete
        status
        document {
          id
          url
        }
        updatedAt
        business {
          name
          id
        }
        completedAt
      }
    }
  }
}
    `;
export function usePreviewChecklistExportQuery(baseOptions: Apollo.QueryHookOptions<PreviewChecklistExportQuery, PreviewChecklistExportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreviewChecklistExportQuery, PreviewChecklistExportQueryVariables>(PreviewChecklistExportDocument, options);
      }
export function usePreviewChecklistExportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewChecklistExportQuery, PreviewChecklistExportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreviewChecklistExportQuery, PreviewChecklistExportQueryVariables>(PreviewChecklistExportDocument, options);
        }
export type PreviewChecklistExportQueryHookResult = ReturnType<typeof usePreviewChecklistExportQuery>;
export type PreviewChecklistExportLazyQueryHookResult = ReturnType<typeof usePreviewChecklistExportLazyQuery>;
export type PreviewChecklistExportQueryResult = Apollo.QueryResult<PreviewChecklistExportQuery, PreviewChecklistExportQueryVariables>;