import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDocumentsMutationVariables = Types.Exact<{
  data: Types.CreateDocuments;
}>;


export type CreateDocumentsMutation = { __typename?: 'Mutation', createDocuments: Array<{ __typename?: 'Document', id: string, name: string, thumbnailUrl?: string | null, url: string, createdAt: Date, updatedAt: Date, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };


export const CreateDocumentsDocument = gql`
    mutation CreateDocuments($data: CreateDocuments!) {
  createDocuments(data: $data) {
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
  }
}
    `;
export type CreateDocumentsMutationFn = Apollo.MutationFunction<CreateDocumentsMutation, CreateDocumentsMutationVariables>;
export function useCreateDocumentsMutation(baseOptions?: Apollo.MutationHookOptions<CreateDocumentsMutation, CreateDocumentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDocumentsMutation, CreateDocumentsMutationVariables>(CreateDocumentsDocument, options);
      }
export type CreateDocumentsMutationHookResult = ReturnType<typeof useCreateDocumentsMutation>;
export type CreateDocumentsMutationResult = Apollo.MutationResult<CreateDocumentsMutation>;
export type CreateDocumentsMutationOptions = Apollo.BaseMutationOptions<CreateDocumentsMutation, CreateDocumentsMutationVariables>;