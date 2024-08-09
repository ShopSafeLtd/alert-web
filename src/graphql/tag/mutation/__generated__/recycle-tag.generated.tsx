import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleTagMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type RecycleTagMutation = { __typename?: 'Mutation', recycleTag: { __typename?: 'Tag', id: string } };


export const RecycleTagDocument = gql`
    mutation recycleTag($where: UniqueId!) {
  recycleTag(where: $where) {
    id
  }
}
    `;
export type RecycleTagMutationFn = Apollo.MutationFunction<RecycleTagMutation, RecycleTagMutationVariables>;
export function useRecycleTagMutation(baseOptions?: Apollo.MutationHookOptions<RecycleTagMutation, RecycleTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecycleTagMutation, RecycleTagMutationVariables>(RecycleTagDocument, options);
      }
export type RecycleTagMutationHookResult = ReturnType<typeof useRecycleTagMutation>;
export type RecycleTagMutationResult = Apollo.MutationResult<RecycleTagMutation>;
export type RecycleTagMutationOptions = Apollo.BaseMutationOptions<RecycleTagMutation, RecycleTagMutationVariables>;