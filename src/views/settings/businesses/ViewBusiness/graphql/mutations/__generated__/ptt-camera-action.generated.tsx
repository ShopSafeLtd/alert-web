import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PttCameraActionMutationVariables = Types.Exact<{
  deviceId: Types.Scalars['String'];
  action: Types.Scalars['String'];
}>;


export type PttCameraActionMutation = { __typename?: 'Mutation', pttCameraAction: boolean };


export const PttCameraActionDocument = gql`
    mutation PttCameraAction($deviceId: String!, $action: String!) {
  pttCameraAction(deviceId: $deviceId, action: $action)
}
    `;
export type PttCameraActionMutationFn = Apollo.MutationFunction<PttCameraActionMutation, PttCameraActionMutationVariables>;
export function usePttCameraActionMutation(baseOptions?: Apollo.MutationHookOptions<PttCameraActionMutation, PttCameraActionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PttCameraActionMutation, PttCameraActionMutationVariables>(PttCameraActionDocument, options);
      }
export type PttCameraActionMutationHookResult = ReturnType<typeof usePttCameraActionMutation>;
export type PttCameraActionMutationResult = Apollo.MutationResult<PttCameraActionMutation>;
export type PttCameraActionMutationOptions = Apollo.BaseMutationOptions<PttCameraActionMutation, PttCameraActionMutationVariables>;