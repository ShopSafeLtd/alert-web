import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteIncidentStatusMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteIncidentStatusMutation = { __typename?: 'Mutation', deleteIncidentStatus: { __typename?: 'IncidentStatus', id: string, name: string } };


export const DeleteIncidentStatusDocument = gql`
    mutation DeleteIncidentStatus($where: UniqueId!) {
  deleteIncidentStatus(where: $where) {
    id
    name
  }
}
    `;
export type DeleteIncidentStatusMutationFn = Apollo.MutationFunction<DeleteIncidentStatusMutation, DeleteIncidentStatusMutationVariables>;
export function useDeleteIncidentStatusMutation(baseOptions?: Apollo.MutationHookOptions<DeleteIncidentStatusMutation, DeleteIncidentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteIncidentStatusMutation, DeleteIncidentStatusMutationVariables>(DeleteIncidentStatusDocument, options);
      }
export type DeleteIncidentStatusMutationHookResult = ReturnType<typeof useDeleteIncidentStatusMutation>;
export type DeleteIncidentStatusMutationResult = Apollo.MutationResult<DeleteIncidentStatusMutation>;
export type DeleteIncidentStatusMutationOptions = Apollo.BaseMutationOptions<DeleteIncidentStatusMutation, DeleteIncidentStatusMutationVariables>;