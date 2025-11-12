import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateDefaultTimeoutMutationVariables = Types.Exact<{
  scheme: Types.Scalars['String'];
  timeout: Types.Scalars['String'];
  updateAllCamerasOnDefault: Types.Scalars['Boolean'];
}>;


export type UpdateDefaultTimeoutMutation = { __typename?: 'Mutation', updateTimeoutDetectionConfig: string };


export const UpdateDefaultTimeoutDocument = gql`
    mutation UpdateDefaultTimeout($scheme: String!, $timeout: String!, $updateAllCamerasOnDefault: Boolean!) {
  updateTimeoutDetectionConfig(
    data: {scheme: $scheme, timeout: $timeout, updateAllCamerasOnDefault: $updateAllCamerasOnDefault}
  )
}
    `;
export type UpdateDefaultTimeoutMutationFn = Apollo.MutationFunction<UpdateDefaultTimeoutMutation, UpdateDefaultTimeoutMutationVariables>;
export function useUpdateDefaultTimeoutMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDefaultTimeoutMutation, UpdateDefaultTimeoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDefaultTimeoutMutation, UpdateDefaultTimeoutMutationVariables>(UpdateDefaultTimeoutDocument, options);
      }
export type UpdateDefaultTimeoutMutationHookResult = ReturnType<typeof useUpdateDefaultTimeoutMutation>;
export type UpdateDefaultTimeoutMutationResult = Apollo.MutationResult<UpdateDefaultTimeoutMutation>;
export type UpdateDefaultTimeoutMutationOptions = Apollo.BaseMutationOptions<UpdateDefaultTimeoutMutation, UpdateDefaultTimeoutMutationVariables>;