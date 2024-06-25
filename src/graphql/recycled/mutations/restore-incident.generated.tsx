import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RestoreIncidentMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  recycledId: Types.Scalars['String'];
}>;


export type RestoreIncidentMutation = { __typename?: 'Mutation', restoreIncident: { __typename?: 'Incident', id: string, recycled: boolean } };


export const RestoreIncidentDocument = gql`
    mutation restoreIncident($id: String!, $recycledId: String!) {
  restoreIncident(where: {id: $id}, data: {id: $recycledId}) {
    id
    recycled
  }
}
    `;
export type RestoreIncidentMutationFn = Apollo.MutationFunction<RestoreIncidentMutation, RestoreIncidentMutationVariables>;
export function useRestoreIncidentMutation(baseOptions?: Apollo.MutationHookOptions<RestoreIncidentMutation, RestoreIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreIncidentMutation, RestoreIncidentMutationVariables>(RestoreIncidentDocument, options);
      }
export type RestoreIncidentMutationHookResult = ReturnType<typeof useRestoreIncidentMutation>;
export type RestoreIncidentMutationResult = Apollo.MutationResult<RestoreIncidentMutation>;
export type RestoreIncidentMutationOptions = Apollo.BaseMutationOptions<RestoreIncidentMutation, RestoreIncidentMutationVariables>;