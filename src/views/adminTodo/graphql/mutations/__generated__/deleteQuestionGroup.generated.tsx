import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteQuestionGroupMutationVariables = Types.Exact<{
  where: Types.QuestionGroupWhereUniqueInput;
}>;


export type DeleteQuestionGroupMutation = { __typename?: 'Mutation', deleteOneQuestionGroup?: { __typename?: 'QuestionGroup', id: string } | null };


export const DeleteQuestionGroupDocument = gql`
    mutation DeleteQuestionGroup($where: QuestionGroupWhereUniqueInput!) {
  deleteOneQuestionGroup(where: $where) {
    id
  }
}
    `;
export type DeleteQuestionGroupMutationFn = Apollo.MutationFunction<DeleteQuestionGroupMutation, DeleteQuestionGroupMutationVariables>;
export function useDeleteQuestionGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteQuestionGroupMutation, DeleteQuestionGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteQuestionGroupMutation, DeleteQuestionGroupMutationVariables>(DeleteQuestionGroupDocument, options);
      }
export type DeleteQuestionGroupMutationHookResult = ReturnType<typeof useDeleteQuestionGroupMutation>;
export type DeleteQuestionGroupMutationResult = Apollo.MutationResult<DeleteQuestionGroupMutation>;
export type DeleteQuestionGroupMutationOptions = Apollo.BaseMutationOptions<DeleteQuestionGroupMutation, DeleteQuestionGroupMutationVariables>;