import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentStatusDataMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.IncidentStatusUpdateInput;
}>;


export type UpdateIncidentStatusDataMutation = { __typename?: 'Mutation', updateIncidentStatusData: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null, description?: string | null, createdAt: Date, updatedAt: Date } };


export const UpdateIncidentStatusDataDocument = gql`
    mutation UpdateIncidentStatusData($where: UniqueId!, $data: IncidentStatusUpdateInput!) {
  updateIncidentStatusData(where: $where, data: $data) {
    id
    name
    tooltip
    description
    createdAt
    updatedAt
  }
}
    `;
export type UpdateIncidentStatusDataMutationFn = Apollo.MutationFunction<UpdateIncidentStatusDataMutation, UpdateIncidentStatusDataMutationVariables>;
export function useUpdateIncidentStatusDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentStatusDataMutation, UpdateIncidentStatusDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentStatusDataMutation, UpdateIncidentStatusDataMutationVariables>(UpdateIncidentStatusDataDocument, options);
      }
export type UpdateIncidentStatusDataMutationHookResult = ReturnType<typeof useUpdateIncidentStatusDataMutation>;
export type UpdateIncidentStatusDataMutationResult = Apollo.MutationResult<UpdateIncidentStatusDataMutation>;
export type UpdateIncidentStatusDataMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentStatusDataMutation, UpdateIncidentStatusDataMutationVariables>;