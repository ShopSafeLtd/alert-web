import type * as Types from '../../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DismissAiMatchMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DismissAiMatchMutation = { __typename?: 'Mutation', dismissAiMatch: { __typename?: 'AIVisionMatch', id: string } };


export const DismissAiMatchDocument = gql`
    mutation DismissAiMatch($id: String!) {
  dismissAiMatch(where: {id: $id}) {
    id
  }
}
    `;
export type DismissAiMatchMutationFn = Apollo.MutationFunction<DismissAiMatchMutation, DismissAiMatchMutationVariables>;
export function useDismissAiMatchMutation(baseOptions?: Apollo.MutationHookOptions<DismissAiMatchMutation, DismissAiMatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DismissAiMatchMutation, DismissAiMatchMutationVariables>(DismissAiMatchDocument, options);
      }
export type DismissAiMatchMutationHookResult = ReturnType<typeof useDismissAiMatchMutation>;
export type DismissAiMatchMutationResult = Apollo.MutationResult<DismissAiMatchMutation>;
export type DismissAiMatchMutationOptions = Apollo.BaseMutationOptions<DismissAiMatchMutation, DismissAiMatchMutationVariables>;