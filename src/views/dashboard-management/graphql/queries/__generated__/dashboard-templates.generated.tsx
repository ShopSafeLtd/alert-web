import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DashboardTemplatesQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  roles?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type DashboardTemplatesQuery = { __typename?: 'Query', dashboards?: { __typename?: 'QueryDashboardsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null }, edges: Array<{ __typename?: 'QueryDashboardsConnectionEdge', node: { __typename?: 'Dashboard', defaultAdmin?: boolean | null, defaultUser?: boolean | null, id?: string | null, name?: string | null, scheme?: { __typename?: 'Scheme', id?: string | null, name?: string | null } | null, roles?: Array<{ __typename?: 'CustomRole', id: string, name: string }> | null } }> } | null };


export const DashboardTemplatesDocument = gql`
    query DashboardTemplates($scheme: SchemeWhereUniqueInput!, $after: String, $first: Int, $last: Int, $roles: [String!], $skip: Int, $take: Int) {
  dashboards(
    scheme: $scheme
    after: $after
    first: $first
    last: $last
    roles: $roles
    skip: $skip
    take: $take
  ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        defaultAdmin
        defaultUser
        id
        name
        scheme {
          id
          name
        }
        roles {
          id
          name
        }
      }
    }
    totalCount
  }
}
    `;
export function useDashboardTemplatesQuery(baseOptions: Apollo.QueryHookOptions<DashboardTemplatesQuery, DashboardTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DashboardTemplatesQuery, DashboardTemplatesQueryVariables>(DashboardTemplatesDocument, options);
      }
export function useDashboardTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardTemplatesQuery, DashboardTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DashboardTemplatesQuery, DashboardTemplatesQueryVariables>(DashboardTemplatesDocument, options);
        }
export type DashboardTemplatesQueryHookResult = ReturnType<typeof useDashboardTemplatesQuery>;
export type DashboardTemplatesLazyQueryHookResult = ReturnType<typeof useDashboardTemplatesLazyQuery>;
export type DashboardTemplatesQueryResult = Apollo.QueryResult<DashboardTemplatesQuery, DashboardTemplatesQueryVariables>;