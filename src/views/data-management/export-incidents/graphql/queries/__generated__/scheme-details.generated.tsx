import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExportFiltersQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type ExportFiltersQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', schemeTags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> } };


export const ExportFiltersDocument = gql`
    query ExportFilters($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    schemeTags {
      id
      name
    }
  }
}
    `;
export function useExportFiltersQuery(baseOptions: Apollo.QueryHookOptions<ExportFiltersQuery, ExportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExportFiltersQuery, ExportFiltersQueryVariables>(ExportFiltersDocument, options);
      }
export function useExportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportFiltersQuery, ExportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExportFiltersQuery, ExportFiltersQueryVariables>(ExportFiltersDocument, options);
        }
export type ExportFiltersQueryHookResult = ReturnType<typeof useExportFiltersQuery>;
export type ExportFiltersLazyQueryHookResult = ReturnType<typeof useExportFiltersLazyQuery>;
export type ExportFiltersQueryResult = Apollo.QueryResult<ExportFiltersQuery, ExportFiltersQueryVariables>;