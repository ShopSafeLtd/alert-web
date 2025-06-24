import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDocumentMutationVariables = Types.Exact<{
  data: Types.CreateDocument;
}>;


export type CreateDocumentMutation = { __typename?: 'Mutation', createDocument: { __typename?: 'Document', id: string, name: string, thumbnailUrl?: string | null, url: string, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, folder?: { __typename?: 'Folder', id: string, name: string } | null } };


export const CreateDocumentDocument = gql`
    mutation CreateDocument($data: CreateDocument!) {
  createDocument(data: $data) {
    id
    name
    tags {
      id
      name
    }
    thumbnailUrl
    url
    createdAt
    updatedAt
    folder {
      id
      name
    }
  }
}
    `;
export type CreateDocumentMutationFn = Apollo.MutationFunction<CreateDocumentMutation, CreateDocumentMutationVariables>;
export function useCreateDocumentMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentMutation, CreateDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentMutation, CreateDocumentMutationVariables>(CreateDocumentDocument, options);
      }
export type CreateDocumentMutationHookResult = ReturnType<typeof useCreateDocumentMutation>;
export type CreateDocumentMutationResult = Apollo.MutationResult<CreateDocumentMutation>;
export type CreateDocumentMutationOptions = Apollo.BaseMutationOptions<CreateDocumentMutation, CreateDocumentMutationVariables>;