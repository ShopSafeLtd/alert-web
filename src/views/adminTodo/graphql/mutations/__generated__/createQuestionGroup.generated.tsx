import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOneQuestionGroupMutationVariables = Types.Exact<{
  data: Types.QuestionGroupCreateInput;
}>;


export type CreateOneQuestionGroupMutation = { __typename?: 'Mutation', createOneQuestionGroup: { __typename?: 'QuestionGroup', id: string, name: string, description?: string | null, defaultDueDate: number, questions: Array<{ __typename?: 'Question', questionFormatted: string, id: string }> } };


export const CreateOneQuestionGroupDocument = gql`
    mutation CreateOneQuestionGroup($data: QuestionGroupCreateInput!) {
  createOneQuestionGroup(data: $data) {
    id
    name
    description
    defaultDueDate
    questions {
      questionFormatted
      id
    }
  }
}
    `;
export type CreateOneQuestionGroupMutationFn = Apollo.MutationFunction<CreateOneQuestionGroupMutation, CreateOneQuestionGroupMutationVariables>;
export function useCreateOneQuestionGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateOneQuestionGroupMutation, CreateOneQuestionGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOneQuestionGroupMutation, CreateOneQuestionGroupMutationVariables>(CreateOneQuestionGroupDocument, options);
      }
export type CreateOneQuestionGroupMutationHookResult = ReturnType<typeof useCreateOneQuestionGroupMutation>;
export type CreateOneQuestionGroupMutationResult = Apollo.MutationResult<CreateOneQuestionGroupMutation>;
export type CreateOneQuestionGroupMutationOptions = Apollo.BaseMutationOptions<CreateOneQuestionGroupMutation, CreateOneQuestionGroupMutationVariables>;