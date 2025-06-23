import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleActiveChecklistMutationVariables = Types.Exact<{
  recycleActiveChecklistId: Types.Scalars['String'];
}>;


export type RecycleActiveChecklistMutation = { __typename?: 'Mutation', recycleActiveChecklist: { __typename?: 'ActiveChecklist', id: string } };


export const RecycleActiveChecklistDocument = gql`
    mutation RecycleActiveChecklist($recycleActiveChecklistId: String!) {
  recycleActiveChecklist(id: $recycleActiveChecklistId) {
    id
  }
}
    `;
export type RecycleActiveChecklistMutationFn = Apollo.MutationFunction<RecycleActiveChecklistMutation, RecycleActiveChecklistMutationVariables>;
export function useRecycleActiveChecklistMutation(baseOptions?: Apollo.MutationHookOptions<RecycleActiveChecklistMutation, RecycleActiveChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecycleActiveChecklistMutation, RecycleActiveChecklistMutationVariables>(RecycleActiveChecklistDocument, options);
      }
export type RecycleActiveChecklistMutationHookResult = ReturnType<typeof useRecycleActiveChecklistMutation>;
export type RecycleActiveChecklistMutationResult = Apollo.MutationResult<RecycleActiveChecklistMutation>;
export type RecycleActiveChecklistMutationOptions = Apollo.BaseMutationOptions<RecycleActiveChecklistMutation, RecycleActiveChecklistMutationVariables>;