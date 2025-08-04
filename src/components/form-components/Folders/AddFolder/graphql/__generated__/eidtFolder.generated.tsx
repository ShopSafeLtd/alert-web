import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { FolderDocumentsFragmentDoc } from '../../../../../../views/resources/folders/graphql/queries/__generated__/folder_documents.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditFolderQueryVariables = Types.Exact<{
  where: Types.FolderWhereUniqueInput;
}>;


export type EditFolderQuery = { __typename?: 'Query', folder: { __typename?: 'Folder', id?: string | null, name: string, parentFolderId?: string | null, description?: string | null, totalDocuments?: number | null, totalChildFolders?: number | null, roles?: Array<{ __typename?: 'CustomRole', id: string }> | null, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }>, childFolders: Array<{ __typename?: 'Folder', id?: string | null, name: string, description?: string | null, totalDocuments?: number | null, totalChildFolders?: number | null, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }> }> } };


export const EditFolderDocument = gql`
    query EditFolder($where: FolderWhereUniqueInput!) {
  folder(where: $where) {
    id
    name
    parentFolderId
    description
    roles {
      id
    }
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
export function useEditFolderQuery(baseOptions: Apollo.QueryHookOptions<EditFolderQuery, EditFolderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditFolderQuery, EditFolderQueryVariables>(EditFolderDocument, options);
      }
export function useEditFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditFolderQuery, EditFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditFolderQuery, EditFolderQueryVariables>(EditFolderDocument, options);
        }
export type EditFolderQueryHookResult = ReturnType<typeof useEditFolderQuery>;
export type EditFolderLazyQueryHookResult = ReturnType<typeof useEditFolderLazyQuery>;
export type EditFolderQueryResult = Apollo.QueryResult<EditFolderQuery, EditFolderQueryVariables>;