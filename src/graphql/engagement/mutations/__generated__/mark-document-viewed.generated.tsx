import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkDocumentViewedMutationVariables = Types.Exact<{
  documentId: Types.Scalars['String'];
}>;


export type MarkDocumentViewedMutation = { __typename?: 'Mutation', markDocumentViewed: { __typename?: 'Impression', id: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date, createdAt: Date } };


export const MarkDocumentViewedDocument = gql`
    mutation MarkDocumentViewed($documentId: String!) {
  markDocumentViewed(documentId: $documentId) {
    id
    viewCount
    firstViewedAt
    lastViewedAt
    createdAt
  }
}
    `;
export type MarkDocumentViewedMutationFn = Apollo.MutationFunction<MarkDocumentViewedMutation, MarkDocumentViewedMutationVariables>;
export function useMarkDocumentViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkDocumentViewedMutation, MarkDocumentViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkDocumentViewedMutation, MarkDocumentViewedMutationVariables>(MarkDocumentViewedDocument, options);
      }
export type MarkDocumentViewedMutationHookResult = ReturnType<typeof useMarkDocumentViewedMutation>;
export type MarkDocumentViewedMutationResult = Apollo.MutationResult<MarkDocumentViewedMutation>;
export type MarkDocumentViewedMutationOptions = Apollo.BaseMutationOptions<MarkDocumentViewedMutation, MarkDocumentViewedMutationVariables>;