import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveQuestionFromTagMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UniqueId>;
}>;

export type RemoveQuestionFromTagMutation = {
  __typename?: 'Mutation';
  removeQuestionFromTag: { __typename?: 'TagQuestion'; id: string };
};

export const RemoveQuestionFromTagDocument = gql`
  mutation RemoveQuestionFromTag($where: UniqueId) {
    removeQuestionFromTag(where: $where) {
      id
    }
  }
`;
export type RemoveQuestionFromTagMutationFn = Apollo.MutationFunction<
  RemoveQuestionFromTagMutation,
  RemoveQuestionFromTagMutationVariables
>;
export function useRemoveQuestionFromTagMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveQuestionFromTagMutation,
    RemoveQuestionFromTagMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RemoveQuestionFromTagMutation,
    RemoveQuestionFromTagMutationVariables
  >(RemoveQuestionFromTagDocument, options);
}
export type RemoveQuestionFromTagMutationHookResult = ReturnType<
  typeof useRemoveQuestionFromTagMutation
>;
export type RemoveQuestionFromTagMutationResult =
  Apollo.MutationResult<RemoveQuestionFromTagMutation>;
export type RemoveQuestionFromTagMutationOptions = Apollo.BaseMutationOptions<
  RemoveQuestionFromTagMutation,
  RemoveQuestionFromTagMutationVariables
>;
