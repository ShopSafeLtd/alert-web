import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetPasswordMutationVariables = Types.Exact<{
  data: Types.SetPasswordData;
}>;

export type SetPasswordMutation = {
  __typename?: 'Mutation';
  setPassword: { __typename?: 'User'; id: string };
};

export const SetPasswordDocument = gql`
  mutation SetPassword($data: SetPasswordData!) {
    setPassword(data: $data) {
      id
    }
  }
`;
export type SetPasswordMutationFn = Apollo.MutationFunction<
  SetPasswordMutation,
  SetPasswordMutationVariables
>;
export function useSetPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetPasswordMutation,
    SetPasswordMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(
    SetPasswordDocument,
    options
  );
}
export type SetPasswordMutationHookResult = ReturnType<
  typeof useSetPasswordMutation
>;
export type SetPasswordMutationResult =
  Apollo.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = Apollo.BaseMutationOptions<
  SetPasswordMutation,
  SetPasswordMutationVariables
>;
