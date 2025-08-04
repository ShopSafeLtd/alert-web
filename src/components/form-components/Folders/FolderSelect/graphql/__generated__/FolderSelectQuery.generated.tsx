import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FoldersSelectQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  orderBy?: Types.InputMaybe<Array<Types.FolderOrderByWithRelationInput> | Types.FolderOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.FolderWhereInput>;
}>;


export type FoldersSelectQuery = { __typename?: 'Query', folders: { __typename?: 'QueryFoldersConnection', totalCount: number, edges: Array<{ __typename?: 'QueryFoldersConnectionEdge', node: { __typename?: 'Folder', id?: string | null, name: string, childFolders: Array<{ __typename?: 'Folder', id?: string | null, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const FoldersSelectDocument = gql`
    query FoldersSelect($first: Int, $after: String, $orderBy: [FolderOrderByWithRelationInput!], $where: FolderWhereInput) {
  folders(first: $first, after: $after, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        id
        name
        childFolders {
          id
          name
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    `;
export function useFoldersSelectQuery(baseOptions?: Apollo.QueryHookOptions<FoldersSelectQuery, FoldersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoldersSelectQuery, FoldersSelectQueryVariables>(FoldersSelectDocument, options);
      }
export function useFoldersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoldersSelectQuery, FoldersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoldersSelectQuery, FoldersSelectQueryVariables>(FoldersSelectDocument, options);
        }
export type FoldersSelectQueryHookResult = ReturnType<typeof useFoldersSelectQuery>;
export type FoldersSelectLazyQueryHookResult = ReturnType<typeof useFoldersSelectLazyQuery>;
export type FoldersSelectQueryResult = Apollo.QueryResult<FoldersSelectQuery, FoldersSelectQueryVariables>;