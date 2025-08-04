import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTagQsMutationVariables = Types.Exact<{
  data: Types.ChangePositionAndReqInput;
}>;


export type UpdateTagQsMutation = { __typename?: 'Mutation', updateTagQs?: Array<{ __typename?: 'TagQuestion', id?: string | null, priority?: number | null }> | null };


export const UpdateTagQsDocument = gql`
    mutation UpdateTagQs($data: ChangePositionAndReqInput!) {
  updateTagQs(data: $data) {
    id
    priority
  }
}
    `;
export type UpdateTagQsMutationFn = Apollo.MutationFunction<UpdateTagQsMutation, UpdateTagQsMutationVariables>;
export function useUpdateTagQsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagQsMutation, UpdateTagQsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagQsMutation, UpdateTagQsMutationVariables>(UpdateTagQsDocument, options);
      }
export type UpdateTagQsMutationHookResult = ReturnType<typeof useUpdateTagQsMutation>;
export type UpdateTagQsMutationResult = Apollo.MutationResult<UpdateTagQsMutation>;
export type UpdateTagQsMutationOptions = Apollo.BaseMutationOptions<UpdateTagQsMutation, UpdateTagQsMutationVariables>;