import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateQuestionOnTagMutationVariables = Types.Exact<{
  data: Types.UpdateQuestionOnTagInput;
}>;


export type UpdateQuestionOnTagMutation = { __typename?: 'Mutation', updateQuestionOnTag?: { __typename?: 'TagQuestion', id?: string | null, tag?: { __typename?: 'Tag', id?: string | null } | null, question?: { __typename?: 'Question', question?: string | null, id?: string | null } | null } | null };


export const UpdateQuestionOnTagDocument = gql`
    mutation UpdateQuestionOnTag($data: UpdateQuestionOnTagInput!) {
  updateQuestionOnTag(data: $data) {
    tag {
      id
    }
    question {
      question
      id
    }
    id
  }
}
    `;
export type UpdateQuestionOnTagMutationFn = Apollo.MutationFunction<UpdateQuestionOnTagMutation, UpdateQuestionOnTagMutationVariables>;
export function useUpdateQuestionOnTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuestionOnTagMutation, UpdateQuestionOnTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuestionOnTagMutation, UpdateQuestionOnTagMutationVariables>(UpdateQuestionOnTagDocument, options);
      }
export type UpdateQuestionOnTagMutationHookResult = ReturnType<typeof useUpdateQuestionOnTagMutation>;
export type UpdateQuestionOnTagMutationResult = Apollo.MutationResult<UpdateQuestionOnTagMutation>;
export type UpdateQuestionOnTagMutationOptions = Apollo.BaseMutationOptions<UpdateQuestionOnTagMutation, UpdateQuestionOnTagMutationVariables>;