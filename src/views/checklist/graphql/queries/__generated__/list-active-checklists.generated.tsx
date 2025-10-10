import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActiveChecklistsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.ActiveChecklistOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.ActiveChecklistWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ActiveChecklistsQuery = { __typename?: 'Query', activeChecklists: { __typename?: 'QueryActiveChecklistsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null }, edges: Array<{ __typename?: 'QueryActiveChecklistsConnectionEdge', node: { __typename?: 'ActiveChecklist', id: string, name?: string | null, percentageScore: string, percentComplete: number, status: Types.ChecklistStatus, updatedAt: Date, completedAt?: Date | null, document?: { __typename?: 'Document', id: string, url: string } | null, business?: { __typename?: 'Business', name: string, id: string } | null } }> } };


export const ActiveChecklistsDocument = gql`
    query ActiveChecklists($first: Int, $after: String, $order: ActiveChecklistOrderByWithRelationInput, $where: ActiveChecklistWhereInput, $take: Int, $skip: Int) {
  activeChecklists(
    first: $first
    after: $after
    order: $order
    where: $where
    take: $take
    skip: $skip
  ) {
    totalCount
    pageInfo {
      endCursor
    }
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
export function useActiveChecklistsQuery(baseOptions?: Apollo.QueryHookOptions<ActiveChecklistsQuery, ActiveChecklistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveChecklistsQuery, ActiveChecklistsQueryVariables>(ActiveChecklistsDocument, options);
      }
export function useActiveChecklistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveChecklistsQuery, ActiveChecklistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveChecklistsQuery, ActiveChecklistsQueryVariables>(ActiveChecklistsDocument, options);
        }
export type ActiveChecklistsQueryHookResult = ReturnType<typeof useActiveChecklistsQuery>;
export type ActiveChecklistsLazyQueryHookResult = ReturnType<typeof useActiveChecklistsLazyQuery>;
export type ActiveChecklistsQueryResult = Apollo.QueryResult<ActiveChecklistsQuery, ActiveChecklistsQueryVariables>;