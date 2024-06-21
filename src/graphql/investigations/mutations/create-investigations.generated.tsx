import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { InvestigationsFragmentDoc } from '../../fragments/investigations.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInvestigationMutationVariables = Types.Exact<{
  data: Types.CreateInvestigationInput;
}>;

export type CreateInvestigationMutation = {
  __typename?: 'Mutation';
  createInvestigation: {
    __typename?: 'Investigation';
    id: string;
    name: string;
    description?: string | null;
    status: Types.InvestigationStatus;
    createdAt: Date;
    closedAt?: Date | null;
    reference?: number | null;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
  };
};

export const CreateInvestigationDocument = gql`
  mutation CreateInvestigation($data: CreateInvestigationInput!) {
    createInvestigation(data: $data) {
      id
      name
      description
      status
      ...Investigations
      groups {
        id
        name
      }
    }
  }
  ${InvestigationsFragmentDoc}
`;
export type CreateInvestigationMutationFn = Apollo.MutationFunction<
  CreateInvestigationMutation,
  CreateInvestigationMutationVariables
>;
export function useCreateInvestigationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateInvestigationMutation,
    CreateInvestigationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateInvestigationMutation,
    CreateInvestigationMutationVariables
  >(CreateInvestigationDocument, options);
}
export type CreateInvestigationMutationHookResult = ReturnType<
  typeof useCreateInvestigationMutation
>;
export type CreateInvestigationMutationResult =
  Apollo.MutationResult<CreateInvestigationMutation>;
export type CreateInvestigationMutationOptions = Apollo.BaseMutationOptions<
  CreateInvestigationMutation,
  CreateInvestigationMutationVariables
>;
