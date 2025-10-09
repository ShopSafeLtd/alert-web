import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentAssignedUsersMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.IncidentUpdateInput;
}>;


export type UpdateIncidentAssignedUsersMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }> } };


export const UpdateIncidentAssignedUsersDocument = gql`
    mutation UpdateIncidentAssignedUsers($where: UniqueId!, $data: IncidentUpdateInput!) {
  updateIncident(where: $where, data: $data) {
    id
    assignedUsers {
      id
      fullName
    }
  }
}
    `;
export type UpdateIncidentAssignedUsersMutationFn = Apollo.MutationFunction<UpdateIncidentAssignedUsersMutation, UpdateIncidentAssignedUsersMutationVariables>;
export function useUpdateIncidentAssignedUsersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentAssignedUsersMutation, UpdateIncidentAssignedUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentAssignedUsersMutation, UpdateIncidentAssignedUsersMutationVariables>(UpdateIncidentAssignedUsersDocument, options);
      }
export type UpdateIncidentAssignedUsersMutationHookResult = ReturnType<typeof useUpdateIncidentAssignedUsersMutation>;
export type UpdateIncidentAssignedUsersMutationResult = Apollo.MutationResult<UpdateIncidentAssignedUsersMutation>;
export type UpdateIncidentAssignedUsersMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentAssignedUsersMutation, UpdateIncidentAssignedUsersMutationVariables>;