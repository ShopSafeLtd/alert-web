import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationDetailsMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateInvestigationInput;
}>;


export type UpdateInvestigationDetailsMutation = { __typename?: 'Mutation', updateInvestigation: { __typename?: 'Investigation', id: string, description?: string | null, name: string, type: Types.InvestigationType, priority: Types.InvestigationPriority } };


export const UpdateInvestigationDetailsDocument = gql`
    mutation UpdateInvestigationDetails($where: UniqueId!, $data: UpdateInvestigationInput!) {
  updateInvestigation(where: $where, data: $data) {
    id
    description
    name
    type
    priority
  }
}
    `;
export type UpdateInvestigationDetailsMutationFn = Apollo.MutationFunction<UpdateInvestigationDetailsMutation, UpdateInvestigationDetailsMutationVariables>;
export function useUpdateInvestigationDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestigationDetailsMutation, UpdateInvestigationDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestigationDetailsMutation, UpdateInvestigationDetailsMutationVariables>(UpdateInvestigationDetailsDocument, options);
      }
export type UpdateInvestigationDetailsMutationHookResult = ReturnType<typeof useUpdateInvestigationDetailsMutation>;
export type UpdateInvestigationDetailsMutationResult = Apollo.MutationResult<UpdateInvestigationDetailsMutation>;
export type UpdateInvestigationDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateInvestigationDetailsMutation, UpdateInvestigationDetailsMutationVariables>;