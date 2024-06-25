import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOrAddQuestionMutationVariables = Types.Exact<{
  data: Types.CreateQuestionInput;
  where?: Types.InputMaybe<Types.UniqueId>;
}>;


export type CreateOrAddQuestionMutation = { __typename?: 'Mutation', addQuestion: { __typename?: 'Question', id: string, questionFormatted: string } };


export const CreateOrAddQuestionDocument = gql`
    mutation CreateOrAddQuestion($data: CreateQuestionInput!, $where: UniqueId) {
  addQuestion(data: $data, where: $where) {
    id
    questionFormatted
  }
}
    `;
export type CreateOrAddQuestionMutationFn = Apollo.MutationFunction<CreateOrAddQuestionMutation, CreateOrAddQuestionMutationVariables>;
export function useCreateOrAddQuestionMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrAddQuestionMutation, CreateOrAddQuestionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrAddQuestionMutation, CreateOrAddQuestionMutationVariables>(CreateOrAddQuestionDocument, options);
      }
export type CreateOrAddQuestionMutationHookResult = ReturnType<typeof useCreateOrAddQuestionMutation>;
export type CreateOrAddQuestionMutationResult = Apollo.MutationResult<CreateOrAddQuestionMutation>;
export type CreateOrAddQuestionMutationOptions = Apollo.BaseMutationOptions<CreateOrAddQuestionMutation, CreateOrAddQuestionMutationVariables>;