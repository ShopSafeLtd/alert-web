import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycleIncidentMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type RecycleIncidentMutation = { __typename?: 'Mutation', recycleIncident: { __typename?: 'Incident', id: string } };


export const RecycleIncidentDocument = gql`
    mutation recycleIncident($where: UniqueId!) {
  recycleIncident(where: $where) {
    id
  }
}
    `;
export type RecycleIncidentMutationFn = Apollo.MutationFunction<RecycleIncidentMutation, RecycleIncidentMutationVariables>;
export function useRecycleIncidentMutation(baseOptions?: Apollo.MutationHookOptions<RecycleIncidentMutation, RecycleIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecycleIncidentMutation, RecycleIncidentMutationVariables>(RecycleIncidentDocument, options);
      }
export type RecycleIncidentMutationHookResult = ReturnType<typeof useRecycleIncidentMutation>;
export type RecycleIncidentMutationResult = Apollo.MutationResult<RecycleIncidentMutation>;
export type RecycleIncidentMutationOptions = Apollo.BaseMutationOptions<RecycleIncidentMutation, RecycleIncidentMutationVariables>;