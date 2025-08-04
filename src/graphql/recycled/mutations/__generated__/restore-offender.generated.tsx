import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestoreOffenderMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  recycledId: Types.Scalars['String'];
}>;


export type RestoreOffenderMutation = { __typename?: 'Mutation', restoreOffender?: { __typename?: 'Offender', id?: string | null, recycled?: boolean | null } | null };


export const RestoreOffenderDocument = gql`
    mutation restoreOffender($id: String!, $recycledId: String!) {
  restoreOffender(where: {id: $id}, data: {id: $recycledId}) {
    id
    recycled
  }
}
    `;
export type RestoreOffenderMutationFn = Apollo.MutationFunction<RestoreOffenderMutation, RestoreOffenderMutationVariables>;
export function useRestoreOffenderMutation(baseOptions?: Apollo.MutationHookOptions<RestoreOffenderMutation, RestoreOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreOffenderMutation, RestoreOffenderMutationVariables>(RestoreOffenderDocument, options);
      }
export type RestoreOffenderMutationHookResult = ReturnType<typeof useRestoreOffenderMutation>;
export type RestoreOffenderMutationResult = Apollo.MutationResult<RestoreOffenderMutation>;
export type RestoreOffenderMutationOptions = Apollo.BaseMutationOptions<RestoreOffenderMutation, RestoreOffenderMutationVariables>;