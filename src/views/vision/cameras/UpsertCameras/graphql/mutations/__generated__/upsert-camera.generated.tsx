import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertAiCameraMutationVariables = Types.Exact<{
  data: Types.AiVisionCameraInput;
}>;


export type UpsertAiCameraMutation = { __typename?: 'Mutation', upsertCamera: { __typename?: 'AIVisionCamera', id: string, make?: string | null, model?: string | null, serialNumber?: string | null, lastUploaded?: Date | null, duplicateMatchTimeout: string, business: { __typename?: 'Business', id: string, name: string }, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const UpsertAiCameraDocument = gql`
    mutation UpsertAiCamera($data: AIVisionCameraInput!) {
  upsertCamera(data: $data) {
    id
    business {
      id
      name
    }
    make
    model
    serialNumber
    lastUploaded
    duplicateMatchTimeout
    groups {
      id
      name
    }
  }
}
    `;
export type UpsertAiCameraMutationFn = Apollo.MutationFunction<UpsertAiCameraMutation, UpsertAiCameraMutationVariables>;
export function useUpsertAiCameraMutation(baseOptions?: Apollo.MutationHookOptions<UpsertAiCameraMutation, UpsertAiCameraMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertAiCameraMutation, UpsertAiCameraMutationVariables>(UpsertAiCameraDocument, options);
      }
export type UpsertAiCameraMutationHookResult = ReturnType<typeof useUpsertAiCameraMutation>;
export type UpsertAiCameraMutationResult = Apollo.MutationResult<UpsertAiCameraMutation>;
export type UpsertAiCameraMutationOptions = Apollo.BaseMutationOptions<UpsertAiCameraMutation, UpsertAiCameraMutationVariables>;