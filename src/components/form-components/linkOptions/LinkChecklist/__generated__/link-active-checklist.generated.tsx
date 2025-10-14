import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkActiveChecklistsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.ActiveChecklistOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.ActiveChecklistWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type LinkActiveChecklistsQuery = { __typename?: 'Query', activeChecklists: { __typename?: 'QueryActiveChecklistsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null }, edges: Array<{ __typename?: 'QueryActiveChecklistsConnectionEdge', node: { __typename?: 'ActiveChecklist', id: string, name?: string | null, percentageScore: string, percentComplete: number, status: Types.ChecklistStatus, business?: { __typename?: 'Business', name: string, id: string } | null } }> } };


export const LinkActiveChecklistsDocument = gql`
    query LinkActiveChecklists($first: Int, $after: String, $order: ActiveChecklistOrderByWithRelationInput, $where: ActiveChecklistWhereInput, $take: Int, $skip: Int) {
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
        business {
          name
          id
        }
      }
    }
  }
}
    `;
export function useLinkActiveChecklistsQuery(baseOptions?: Apollo.QueryHookOptions<LinkActiveChecklistsQuery, LinkActiveChecklistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LinkActiveChecklistsQuery, LinkActiveChecklistsQueryVariables>(LinkActiveChecklistsDocument, options);
      }
export function useLinkActiveChecklistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LinkActiveChecklistsQuery, LinkActiveChecklistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LinkActiveChecklistsQuery, LinkActiveChecklistsQueryVariables>(LinkActiveChecklistsDocument, options);
        }
export type LinkActiveChecklistsQueryHookResult = ReturnType<typeof useLinkActiveChecklistsQuery>;
export type LinkActiveChecklistsLazyQueryHookResult = ReturnType<typeof useLinkActiveChecklistsLazyQuery>;
export type LinkActiveChecklistsQueryResult = Apollo.QueryResult<LinkActiveChecklistsQuery, LinkActiveChecklistsQueryVariables>;