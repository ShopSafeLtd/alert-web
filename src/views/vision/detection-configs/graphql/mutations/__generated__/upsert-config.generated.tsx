import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertConfigMutationVariables = Types.Exact<{
  data: Types.DetectActionConfigInput;
}>;


export type UpsertConfigMutation = { __typename?: 'Mutation', upsertDetectionConfig: { __typename?: 'DetectActionConfig', id: string, name: string, minimumPriorityTrigger: Types.AiVisionMatchPriority, minimumConfidenceTrigger: Types.AiVisionMatchConfidence, cameraCount: number } };


export const UpsertConfigDocument = gql`
    mutation UpsertConfig($data: DetectActionConfigInput!) {
  upsertDetectionConfig(data: $data) {
    id
    name
    minimumPriorityTrigger
    minimumConfidenceTrigger
    cameraCount
  }
}
    `;
export type UpsertConfigMutationFn = Apollo.MutationFunction<UpsertConfigMutation, UpsertConfigMutationVariables>;
export function useUpsertConfigMutation(baseOptions?: Apollo.MutationHookOptions<UpsertConfigMutation, UpsertConfigMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertConfigMutation, UpsertConfigMutationVariables>(UpsertConfigDocument, options);
      }
export type UpsertConfigMutationHookResult = ReturnType<typeof useUpsertConfigMutation>;
export type UpsertConfigMutationResult = Apollo.MutationResult<UpsertConfigMutation>;
export type UpsertConfigMutationOptions = Apollo.BaseMutationOptions<UpsertConfigMutation, UpsertConfigMutationVariables>;