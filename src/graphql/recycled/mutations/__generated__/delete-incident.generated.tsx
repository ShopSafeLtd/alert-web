import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteIncidentMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteIncidentMutation = { __typename?: 'Mutation', deleteIncident: { __typename?: 'Incident', id: string } };


export const DeleteIncidentDocument = gql`
    mutation deleteIncident($where: UniqueId!) {
  deleteIncident(where: $where) {
    id
  }
}
    `;
export type DeleteIncidentMutationFn = Apollo.MutationFunction<DeleteIncidentMutation, DeleteIncidentMutationVariables>;
export function useDeleteIncidentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIncidentMutation, DeleteIncidentMutationVariables>(DeleteIncidentDocument, options);
      }
export type DeleteIncidentMutationHookResult = ReturnType<typeof useDeleteIncidentMutation>;
export type DeleteIncidentMutationResult = Apollo.MutationResult<DeleteIncidentMutation>;
export type DeleteIncidentMutationOptions = Apollo.BaseMutationOptions<DeleteIncidentMutation, DeleteIncidentMutationVariables>;