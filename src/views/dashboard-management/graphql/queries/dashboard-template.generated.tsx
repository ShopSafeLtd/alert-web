import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DashboardTemplateQueryVariables = Types.Exact<{
  where: Types.DashboardWhereUniqueInput;
}>;


export type DashboardTemplateQuery = { __typename?: 'Query', dashboard: { __typename?: 'Dashboard', id: string, runningBanner?: string | null, name?: string | null, layout: Array<{ __typename?: 'DashboardLayout', h: number, i: string, id: string, maxH?: number | null, maxW?: number | null, minH?: number | null, minW?: number | null, moved: boolean, static: boolean, w: number, x: number, y: number }>, roles: Array<{ __typename?: 'CustomRole', id: string, name: string }> } };


export const DashboardTemplateDocument = gql`
    query DashboardTemplate($where: DashboardWhereUniqueInput!) {
  dashboard(where: $where) {
    id
    runningBanner
    layout {
      h
      i
      id
      maxH
      maxW
      minH
      minW
      moved
      static
      w
      x
      y
    }
    name
    roles {
      id
      name
    }
  }
}
    `;
export function useDashboardTemplateQuery(baseOptions: Apollo.QueryHookOptions<DashboardTemplateQuery, DashboardTemplateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTemplateQuery, DashboardTemplateQueryVariables>(DashboardTemplateDocument, options);
      }
export function useDashboardTemplateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTemplateQuery, DashboardTemplateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTemplateQuery, DashboardTemplateQueryVariables>(DashboardTemplateDocument, options);
        }
export type DashboardTemplateQueryHookResult = ReturnType<typeof useDashboardTemplateQuery>;
export type DashboardTemplateLazyQueryHookResult = ReturnType<typeof useDashboardTemplateLazyQuery>;
export type DashboardTemplateQueryResult = Apollo.QueryResult<DashboardTemplateQuery, DashboardTemplateQueryVariables>;