import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeReportFiltersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.SchemeWhereInput>;
}>;


export type SchemeReportFiltersQuery = { __typename?: 'Query', schemes: Array<{ __typename?: 'Scheme', crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, alias?: string | null, ref?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null, reference?: number | null }> }> };


export const SchemeReportFiltersDocument = gql`
    query SchemeReportFilters($where: SchemeWhereInput) {
  schemes(where: $where) {
    crimeGroups {
      id
      alias
      ref
    }
    offenders {
      id
      name
      reference
    }
  }
}
    `;
export function useSchemeReportFiltersQuery(baseOptions?: Apollo.QueryHookOptions<SchemeReportFiltersQuery, SchemeReportFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeReportFiltersQuery, SchemeReportFiltersQueryVariables>(SchemeReportFiltersDocument, options);
      }
export function useSchemeReportFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeReportFiltersQuery, SchemeReportFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeReportFiltersQuery, SchemeReportFiltersQueryVariables>(SchemeReportFiltersDocument, options);
        }
export type SchemeReportFiltersQueryHookResult = ReturnType<typeof useSchemeReportFiltersQuery>;
export type SchemeReportFiltersLazyQueryHookResult = ReturnType<typeof useSchemeReportFiltersLazyQuery>;
export type SchemeReportFiltersQueryResult = Apollo.QueryResult<SchemeReportFiltersQuery, SchemeReportFiltersQueryVariables>;