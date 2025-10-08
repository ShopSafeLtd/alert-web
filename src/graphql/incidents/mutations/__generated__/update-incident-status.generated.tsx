import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentStatusMutationVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
  data: Types.UpdateIncidentStatusInput;
}>;


export type UpdateIncidentStatusMutation = { __typename?: 'Mutation', updateIncidentStatus: { __typename?: 'Incident', id: string, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, actions: Array<{ __typename?: 'Action', id: string, type: Types.ActionType, description?: string | null, createdAt: Date, byUser: { __typename?: 'User', fullName: string } }> } };


export const UpdateIncidentStatusDocument = gql`
    mutation UpdateIncidentStatus($where: IncidentWhereUniqueInput!, $data: UpdateIncidentStatusInput!) {
  updateIncidentStatus(where: $where, data: $data) {
    id
    status {
      id
      name
      tooltip
    }
    actions {
      id
      type
      description
      createdAt
      byUser {
        fullName
      }
    }
  }
}
    `;
export type UpdateIncidentStatusMutationFn = Apollo.MutationFunction<UpdateIncidentStatusMutation, UpdateIncidentStatusMutationVariables>;
export function useUpdateIncidentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentStatusMutation, UpdateIncidentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentStatusMutation, UpdateIncidentStatusMutationVariables>(UpdateIncidentStatusDocument, options);
      }
export type UpdateIncidentStatusMutationHookResult = ReturnType<typeof useUpdateIncidentStatusMutation>;
export type UpdateIncidentStatusMutationResult = Apollo.MutationResult<UpdateIncidentStatusMutation>;
export type UpdateIncidentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentStatusMutation, UpdateIncidentStatusMutationVariables>;