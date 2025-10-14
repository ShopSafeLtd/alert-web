import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateIncidentStatusMutationVariables = Types.Exact<{
  data: Types.IncidentStatusCreateInput;
}>;


export type CreateIncidentStatusMutation = { __typename?: 'Mutation', createIncidentStatus: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null, description?: string | null, createdAt: Date, updatedAt: Date } };


export const CreateIncidentStatusDocument = gql`
    mutation CreateIncidentStatus($data: IncidentStatusCreateInput!) {
  createIncidentStatus(data: $data) {
    id
    name
    tooltip
    description
    createdAt
    updatedAt
  }
}
    `;
export type CreateIncidentStatusMutationFn = Apollo.MutationFunction<CreateIncidentStatusMutation, CreateIncidentStatusMutationVariables>;
export function useCreateIncidentStatusMutation(baseOptions?: Apollo.MutationHookOptions<CreateIncidentStatusMutation, CreateIncidentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIncidentStatusMutation, CreateIncidentStatusMutationVariables>(CreateIncidentStatusDocument, options);
      }
export type CreateIncidentStatusMutationHookResult = ReturnType<typeof useCreateIncidentStatusMutation>;
export type CreateIncidentStatusMutationResult = Apollo.MutationResult<CreateIncidentStatusMutation>;
export type CreateIncidentStatusMutationOptions = Apollo.BaseMutationOptions<CreateIncidentStatusMutation, CreateIncidentStatusMutationVariables>;