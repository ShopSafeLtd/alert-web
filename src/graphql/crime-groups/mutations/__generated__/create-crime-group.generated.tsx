import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCrimeGroupMutationVariables = Types.Exact<{
  data: Types.CreateCrimeGroupDataInput;
}>;


export type CreateCrimeGroupMutation = { __typename?: 'Mutation', createCrimeGroup: { __typename?: 'CrimeGroup', id: string, reference?: number | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, alias?: string | null, updatedAt: Date } };


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