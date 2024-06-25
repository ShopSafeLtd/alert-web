import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateQuestionGroupMutationVariables = Types.Exact<{
  where: Types.QuestionGroupWhereUniqueInput;
  data: Types.QuestionGroupUpdateInput;
}>;


export type UpdateQuestionGroupMutation = { __typename?: 'Mutation', updateOneQuestionGroup: { __typename?: 'QuestionGroup', id: string } };


export const UpdateQuestionGroupDocument = gql`
    mutation UpdateQuestionGroup($where: QuestionGroupWhereUniqueInput!, $data: QuestionGroupUpdateInput!) {
  updateOneQuestionGroup(where: $where, data: $data) {
    id
  }
}
    `;
export type UpdateQuestionGroupMutationFn = Apollo.MutationFunction<UpdateQuestionGroupMutation, UpdateQuestionGroupMutationVariables>;
export function useUpdateQuestionGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionGroupMutation, UpdateQuestionGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionGroupMutation, UpdateQuestionGroupMutationVariables>(UpdateQuestionGroupDocument, options);
      }
export type UpdateQuestionGroupMutationHookResult = ReturnType<typeof useUpdateQuestionGroupMutation>;
export type UpdateQuestionGroupMutationResult = Apollo.MutationResult<UpdateQuestionGroupMutation>;
export type UpdateQuestionGroupMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionGroupMutation, UpdateQuestionGroupMutationVariables>;