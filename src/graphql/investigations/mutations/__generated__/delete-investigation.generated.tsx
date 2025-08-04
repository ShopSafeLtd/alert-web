import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteInvestigationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteInvestigationMutation = { __typename?: 'Mutation', deleteInvestigation?: { __typename?: 'Investigation', id?: string | null } | null };


export const DeleteInvestigationDocument = gql`
    mutation deleteInvestigation($id: String!) {
  deleteInvestigation(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteInvestigationMutationFn = Apollo.MutationFunction<DeleteInvestigationMutation, DeleteInvestigationMutationVariables>;
export function useDeleteInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInvestigationMutation, DeleteInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInvestigationMutation, DeleteInvestigationMutationVariables>(DeleteInvestigationDocument, options);
      }
export type DeleteInvestigationMutationHookResult = ReturnType<typeof useDeleteInvestigationMutation>;
export type DeleteInvestigationMutationResult = Apollo.MutationResult<DeleteInvestigationMutation>;
export type DeleteInvestigationMutationOptions = Apollo.BaseMutationOptions<DeleteInvestigationMutation, DeleteInvestigationMutationVariables>;