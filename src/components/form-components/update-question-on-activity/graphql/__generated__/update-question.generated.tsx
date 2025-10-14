import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateQuestionOnActivityMutationVariables = Types.Exact<{
  data: Types.UpdateQuestionOnActivityInput;
}>;


export type UpdateQuestionOnActivityMutation = { __typename?: 'Mutation', updateQuestionOnActivity: { __typename?: 'Question', question: string, id: string, optionsFormatted?: Array<string> | null, type: Types.AnswerType, options: Array<{ [key: string]: any }> } };


export const UpdateQuestionOnActivityDocument = gql`
    mutation UpdateQuestionOnActivity($data: UpdateQuestionOnActivityInput!) {
  updateQuestionOnActivity(data: $data) {
    question
    id
    optionsFormatted
    type
    options
  }
}
    `;
export type UpdateQuestionOnActivityMutationFn = Apollo.MutationFunction<UpdateQuestionOnActivityMutation, UpdateQuestionOnActivityMutationVariables>;
export function useUpdateQuestionOnActivityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionOnActivityMutation, UpdateQuestionOnActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionOnActivityMutation, UpdateQuestionOnActivityMutationVariables>(UpdateQuestionOnActivityDocument, options);
      }
export type UpdateQuestionOnActivityMutationHookResult = ReturnType<typeof useUpdateQuestionOnActivityMutation>;
export type UpdateQuestionOnActivityMutationResult = Apollo.MutationResult<UpdateQuestionOnActivityMutation>;
export type UpdateQuestionOnActivityMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionOnActivityMutation, UpdateQuestionOnActivityMutationVariables>;