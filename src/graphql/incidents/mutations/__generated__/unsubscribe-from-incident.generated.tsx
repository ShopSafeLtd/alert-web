import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UnsubscribeFromIncidentMutationVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;


export type UnsubscribeFromIncidentMutation = { __typename?: 'Mutation', unsubscribeFromIncident: { __typename?: 'Incident', id: string, subscribed: boolean } };


export const UnsubscribeFromIncidentDocument = gql`
    mutation UnsubscribeFromIncident($where: IncidentWhereUniqueInput!) {
  unsubscribeFromIncident(where: $where) {
    id
    subscribed
  }
}
    `;
export type UnsubscribeFromIncidentMutationFn = Apollo.MutationFunction<UnsubscribeFromIncidentMutation, UnsubscribeFromIncidentMutationVariables>;
export function useUnsubscribeFromIncidentMutation(baseOptions?: Apollo.MutationHookOptions<UnsubscribeFromIncidentMutation, UnsubscribeFromIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnsubscribeFromIncidentMutation, UnsubscribeFromIncidentMutationVariables>(UnsubscribeFromIncidentDocument, options);
      }
export type UnsubscribeFromIncidentMutationHookResult = ReturnType<typeof useUnsubscribeFromIncidentMutation>;
export type UnsubscribeFromIncidentMutationResult = Apollo.MutationResult<UnsubscribeFromIncidentMutation>;
export type UnsubscribeFromIncidentMutationOptions = Apollo.BaseMutationOptions<UnsubscribeFromIncidentMutation, UnsubscribeFromIncidentMutationVariables>;