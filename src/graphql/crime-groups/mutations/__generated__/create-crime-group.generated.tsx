import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCrimeGroupMutationVariables = Types.Exact<{
  data: Types.CreateCrimeGroupDataInput;
}>;


export type CreateCrimeGroupMutation = { __typename?: 'Mutation', createCrimeGroup?: { __typename?: 'CrimeGroup', id: string, reference?: number | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, alias?: string | null, updatedAt?: Date | null } | null };


export const CreateCrimeGroupDocument = gql`
    mutation CreateCrimeGroup($data: CreateCrimeGroupDataInput!) {
  createCrimeGroup(data: $data) {
    id
    reference
    totalIncidents
    totalOffenders
    totalRecoveredValue
    totalTheftSuccess
    totalValue
    alias
    updatedAt
  }
}
    `;
export type CreateCrimeGroupMutationFn = Apollo.MutationFunction<CreateCrimeGroupMutation, CreateCrimeGroupMutationVariables>;
export function useCreateCrimeGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateCrimeGroupMutation, CreateCrimeGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCrimeGroupMutation, CreateCrimeGroupMutationVariables>(CreateCrimeGroupDocument, options);
      }
export type CreateCrimeGroupMutationHookResult = ReturnType<typeof useCreateCrimeGroupMutation>;
export type CreateCrimeGroupMutationResult = Apollo.MutationResult<CreateCrimeGroupMutation>;
export type CreateCrimeGroupMutationOptions = Apollo.BaseMutationOptions<CreateCrimeGroupMutation, CreateCrimeGroupMutationVariables>;