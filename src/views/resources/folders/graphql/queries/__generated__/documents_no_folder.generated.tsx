import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { FolderDocumentsFragmentDoc } from './folder_documents.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DocumentsNoFolderQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.DocumentOrderByWithRelationInput> | Types.DocumentOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.DocumentWhereInput>;
}>;


export type DocumentsNoFolderQuery = { __typename?: 'Query', documentsNoFolder: { __typename?: 'QueryDocumentsNoFolderConnection', totalCount: number, edges: Array<{ __typename?: 'QueryDocumentsNoFolderConnectionEdge', node: { __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const DocumentsNoFolderDocument = gql`
    query documentsNoFolder($skip: Int, $take: Int, $orderBy: [DocumentOrderByWithRelationInput!], $where: DocumentWhereInput) {
  documentsNoFolder(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
    totalCount
    edges {
      node {
        ...FolderDocuments
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${FolderDocumentsFragmentDoc}`;
export function useDocumentsNoFolderQuery(baseOptions?: Apollo.QueryHookOptions<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>(DocumentsNoFolderDocument, options);
      }
export function useDocumentsNoFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>(DocumentsNoFolderDocument, options);
        }
export type DocumentsNoFolderQueryHookResult = ReturnType<typeof useDocumentsNoFolderQuery>;
export type DocumentsNoFolderLazyQueryHookResult = ReturnType<typeof useDocumentsNoFolderLazyQuery>;
export type DocumentsNoFolderQueryResult = Apollo.QueryResult<DocumentsNoFolderQuery, DocumentsNoFolderQueryVariables>;