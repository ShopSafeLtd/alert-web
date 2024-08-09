import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DismissMatchMutationVariables = Types.Exact<{
  where: Types.RekMatchWhereUniqueInput;
}>;


export type DismissMatchMutation = { __typename?: 'Mutation', dismissMatch: { __typename?: 'RekMatch', id: string } };


export const DismissMatchDocument = gql`
    mutation DismissMatch($where: RekMatchWhereUniqueInput!) {
  dismissMatch(where: $where) {
    id
  }
}
    `;
export type DismissMatchMutationFn = Apollo.MutationFunction<DismissMatchMutation, DismissMatchMutationVariables>;
export function useDismissMatchMutation(baseOptions?: Apollo.MutationHookOptions<DismissMatchMutation, DismissMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DismissMatchMutation, DismissMatchMutationVariables>(DismissMatchDocument, options);
      }
export type DismissMatchMutationHookResult = ReturnType<typeof useDismissMatchMutation>;
export type DismissMatchMutationResult = Apollo.MutationResult<DismissMatchMutation>;
export type DismissMatchMutationOptions = Apollo.BaseMutationOptions<DismissMatchMutation, DismissMatchMutationVariables>;