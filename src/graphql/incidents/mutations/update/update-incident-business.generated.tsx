import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentBusinessMutationVariables = Types.Exact<{
  data: Types.UpdateIncidentBusinessInput;
  where: Types.UniqueId;
}>;

export type UpdateIncidentBusinessMutation = {
  __typename?: 'Mutation';
  updateIncidentBusiness: {
    __typename?: 'Incident';
    id: string;
    business?: { __typename?: 'Business'; id: string; name: string } | null;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
  };
};

export const UpdateIncidentBusinessDocument = gql`
  mutation UpdateIncidentBusiness(
    $data: UpdateIncidentBusinessInput!
    $where: UniqueId!
  ) {
    updateIncidentBusiness(data: $data, where: $where) {
      id
      business {
        id
        name
      }
      groups {
        id
        name
      }
    }
  }
`;
export type UpdateIncidentBusinessMutationFn = Apollo.MutationFunction<
  UpdateIncidentBusinessMutation,
  UpdateIncidentBusinessMutationVariables
>;
export function useUpdateIncidentBusinessMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateIncidentBusinessMutation,
    UpdateIncidentBusinessMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateIncidentBusinessMutation,
    UpdateIncidentBusinessMutationVariables
  >(UpdateIncidentBusinessDocument, options);
}
export type UpdateIncidentBusinessMutationHookResult = ReturnType<
  typeof useUpdateIncidentBusinessMutation
>;
export type UpdateIncidentBusinessMutationResult =
  Apollo.MutationResult<UpdateIncidentBusinessMutation>;
export type UpdateIncidentBusinessMutationOptions = Apollo.BaseMutationOptions<
  UpdateIncidentBusinessMutation,
  UpdateIncidentBusinessMutationVariables
>;
