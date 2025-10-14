import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleChecklistMutationVariables = Types.Exact<{
  recycleChecklistId: Types.Scalars['String'];
}>;


export type RecycleChecklistMutation = { __typename?: 'Mutation', recycleChecklist: { __typename?: 'Checklist', id: string } };


export const RecycleChecklistDocument = gql`
    mutation RecycleChecklist($recycleChecklistId: String!) {
  recycleChecklist(id: $recycleChecklistId) {
    id
  }
}
    `;
export type RecycleChecklistMutationFn = Apollo.MutationFunction<RecycleChecklistMutation, RecycleChecklistMutationVariables>;
export function useRecycleChecklistMutation(baseOptions?: Apollo.MutationHookOptions<RecycleChecklistMutation, RecycleChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecycleChecklistMutation, RecycleChecklistMutationVariables>(RecycleChecklistDocument, options);
      }
export type RecycleChecklistMutationHookResult = ReturnType<typeof useRecycleChecklistMutation>;
export type RecycleChecklistMutationResult = Apollo.MutationResult<RecycleChecklistMutation>;
export type RecycleChecklistMutationOptions = Apollo.BaseMutationOptions<RecycleChecklistMutation, RecycleChecklistMutationVariables>;