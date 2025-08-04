import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { FolderDocumentsFragmentDoc } from '../../queries/__generated__/folder_documents.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertFolderMutationVariables = Types.Exact<{
  data: Types.UpsertFolder;
}>;


export type UpsertFolderMutation = { __typename?: 'Mutation', upsertFolder?: { __typename?: 'Folder', id?: string | null, name: string, description?: string | null, totalDocuments?: number | null, totalChildFolders?: number | null, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }>, childFolders: Array<{ __typename?: 'Folder', id?: string | null, name: string, description?: string | null, totalDocuments?: number | null, totalChildFolders?: number | null, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }> }> } | null };


export const UpsertFolderDocument = gql`
    mutation UpsertFolder($data: UpsertFolder!) {
  upsertFolder(data: $data) {
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
export type UpsertFolderMutationFn = Apollo.MutationFunction<UpsertFolderMutation, UpsertFolderMutationVariables>;
export function useUpsertFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpsertFolderMutation, UpsertFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertFolderMutation, UpsertFolderMutationVariables>(UpsertFolderDocument, options);
      }
export type UpsertFolderMutationHookResult = ReturnType<typeof useUpsertFolderMutation>;
export type UpsertFolderMutationResult = Apollo.MutationResult<UpsertFolderMutation>;
export type UpsertFolderMutationOptions = Apollo.BaseMutationOptions<UpsertFolderMutation, UpsertFolderMutationVariables>;