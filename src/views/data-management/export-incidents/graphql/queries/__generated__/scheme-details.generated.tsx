import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExportFiltersQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type ExportFiltersQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', groups: Array<{ __typename?: 'Group', id: string, name: string }>, businesses: Array<{ __typename?: 'Business', id: string, name: string }>, schemeTags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const ExportFiltersDocument = gql`
    query ExportFilters($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    groups {
      id
      name
    }
    businesses {
      id
      name
    }
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