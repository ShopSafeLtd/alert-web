import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { FolderDocumentsFragmentDoc } from './folder_documents.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FolderQueryVariables = Types.Exact<{
  where: Types.FolderWhereUniqueInput;
}>;


export type FolderQuery = { __typename?: 'Query', folder: { __typename?: 'Folder', id: string, name: string, description?: string | null, totalDocuments: number, totalChildFolders: number, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }>, childFolders: Array<{ __typename?: 'Folder', id: string, name: string, description?: string | null, totalDocuments: number, totalChildFolders: number, documents: Array<{ __typename?: 'Document', id: string, name: string, url: string, thumbnailUrl?: string | null, createdAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> }> } };


export const FolderDocument = gql`
    query Folder($where: FolderWhereUniqueInput!) {
  folder(where: $where) {
    id
    name
    description
    documents {
      ...FolderDocuments
    }
    totalDocuments
    totalChildFolders
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
    ${FolderDocumentsFragmentDoc}`;
export function useFolderQuery(baseOptions: Apollo.QueryHookOptions<FolderQuery, FolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
      }
export function useFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FolderQuery, FolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FolderQuery, FolderQueryVariables>(FolderDocument, options);
        }
export type FolderQueryHookResult = ReturnType<typeof useFolderQuery>;
export type FolderLazyQueryHookResult = ReturnType<typeof useFolderLazyQuery>;
export type FolderQueryResult = Apollo.QueryResult<FolderQuery, FolderQueryVariables>;