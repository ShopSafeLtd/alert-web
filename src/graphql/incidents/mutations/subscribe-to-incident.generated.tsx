import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubscribeToIncidentMutationVariables = Types.Exact<{
  where: Types.IncidentWhereUniqueInput;
}>;

export type SubscribeToIncidentMutation = {
  __typename?: 'Mutation';
  subscribeToIncident: {
    __typename?: 'Incident';
    id: string;
    subscribed: boolean;
  };
};

export const SubscribeToIncidentDocument = gql`
  mutation SubscribeToIncident($where: IncidentWhereUniqueInput!) {
    subscribeToIncident(where: $where) {
      id
      subscribed
    }
  }
`;
export type SubscribeToIncidentMutationFn = Apollo.MutationFunction<
  SubscribeToIncidentMutation,
  SubscribeToIncidentMutationVariables
>;
export function useSubscribeToIncidentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubscribeToIncidentMutation,
    SubscribeToIncidentMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SubscribeToIncidentMutation,
    SubscribeToIncidentMutationVariables
  >(SubscribeToIncidentDocument, options);
}
export type SubscribeToIncidentMutationHookResult = ReturnType<
  typeof useSubscribeToIncidentMutation
>;
export type SubscribeToIncidentMutationResult =
  Apollo.MutationResult<SubscribeToIncidentMutation>;
export type SubscribeToIncidentMutationOptions = Apollo.BaseMutationOptions<
  SubscribeToIncidentMutation,
  SubscribeToIncidentMutationVariables
>;
