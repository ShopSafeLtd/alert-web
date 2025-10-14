import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertDemGroupMutationVariables = Types.Exact<{
  data: Types.UpsertDemGroup;
}>;


export type UpsertDemGroupMutation = { __typename?: 'Mutation', upsertDemGroup: { __typename?: 'DemGroup', id: string, name: string, demId: string, totalDevices: number, demDevices: Array<{ __typename?: 'DemDevice', id: string, name: string }> } };


export const UpsertDemGroupDocument = gql`
    mutation UpsertDemGroup($data: UpsertDemGroup!) {
  upsertDemGroup(data: $data) {
    id
    name
    demId
    totalDevices
    demDevices {
      id
      name
    }
  }
}
    `;
export type UpsertDemGroupMutationFn = Apollo.MutationFunction<UpsertDemGroupMutation, UpsertDemGroupMutationVariables>;
export function useUpsertDemGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpsertDemGroupMutation, UpsertDemGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertDemGroupMutation, UpsertDemGroupMutationVariables>(UpsertDemGroupDocument, options);
      }
export type UpsertDemGroupMutationHookResult = ReturnType<typeof useUpsertDemGroupMutation>;
export type UpsertDemGroupMutationResult = Apollo.MutationResult<UpsertDemGroupMutation>;
export type UpsertDemGroupMutationOptions = Apollo.BaseMutationOptions<UpsertDemGroupMutation, UpsertDemGroupMutationVariables>;