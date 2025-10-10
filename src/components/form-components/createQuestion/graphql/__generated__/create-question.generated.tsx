import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateQuestionMutationVariables = Types.Exact<{
  data: Types.CreateQuestionInput;
  where?: Types.InputMaybe<Types.UniqueId>;
}>;


export type CreateQuestionMutation = { __typename?: 'Mutation', addQuestion: { __typename?: 'Question', id: string, questionFormatted: string, type: Types.AnswerType } };


export const CreateQuestionDocument = gql`
    mutation CreateQuestion($data: CreateQuestionInput!, $where: UniqueId) {
  addQuestion(data: $data, where: $where) {
    id
    questionFormatted
    type
  }
}
    `;
export type CreateQuestionMutationFn = Apollo.MutationFunction<CreateQuestionMutation, CreateQuestionMutationVariables>;
export function useCreateQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuestionMutation, CreateQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuestionMutation, CreateQuestionMutationVariables>(CreateQuestionDocument, options);
      }
export type CreateQuestionMutationHookResult = ReturnType<typeof useCreateQuestionMutation>;
export type CreateQuestionMutationResult = Apollo.MutationResult<CreateQuestionMutation>;
export type CreateQuestionMutationOptions = Apollo.BaseMutationOptions<CreateQuestionMutation, CreateQuestionMutationVariables>;