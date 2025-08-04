import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { FolderDocumentsFragmentDoc } from './folder_documents.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FoldersQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  orderBy?: Types.InputMaybe<Array<Types.FolderOrderByWithRelationInput> | Types.FolderOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.FolderWhereInput>;
}>;


export type FoldersQuery = { __typename?: 'Query', folders: { __typename?: 'QueryFoldersConnection', totalCount: number, edges: Array<{ __typename?: 'QueryFoldersConnectionEdge', node: { __typename?: 'Folder', id: string, name: string, description?: string | null, totalDocuments: number, totalChildFolders: number, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }>, childFolders: Array<{ __typename?: 'Folder', id: string, name: string, description?: string | null, totalDocuments: number, totalChildFolders: number, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const FoldersDocument = gql`
    query Folders($first: Int, $after: String, $orderBy: [FolderOrderByWithRelationInput!], $where: FolderWhereInput) {
  folders(first: $first, after: $after, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        id
        name
        description
        totalDocuments
        totalChildFolders
        documents {
          ...FolderDocuments
        }
        childFolders {
          id
          name
          description
          documents {
            ...FolderDocuments
          }
          totalDocuments
          totalChildFolders
        }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${FolderDocumentsFragmentDoc}`;
export function useFoldersQuery(baseOptions?: Apollo.QueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
      }
export function useFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FoldersQuery, FoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FoldersQuery, FoldersQueryVariables>(FoldersDocument, options);
        }
export type FoldersQueryHookResult = ReturnType<typeof useFoldersQuery>;
export type FoldersLazyQueryHookResult = ReturnType<typeof useFoldersLazyQuery>;
export type FoldersQueryResult = Apollo.QueryResult<FoldersQuery, FoldersQueryVariables>;