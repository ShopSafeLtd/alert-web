import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderCrimeGroupsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  crimeGroups?: Types.InputMaybe<Types.NullableConnectArrayHelper>;
}>;


export type UpdateOffenderCrimeGroupsMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number }> } };


export const UpdateOffenderCrimeGroupsDocument = gql`
    mutation UpdateOffenderCrimeGroups($id: String!, $crimeGroups: NullableConnectArrayHelper) {
  updateOffender(where: {id: $id}, data: {crimeGroups: $crimeGroups}) {
    id
    crimeGroups {
      id
      reference
      alias
      totalIncidents
      totalOffenders
      totalRecoveredValue
      totalTheftSuccess
      totalValue
    }
  }
}
    `;
export type UpdateOffenderCrimeGroupsMutationFn = Apollo.MutationFunction<UpdateOffenderCrimeGroupsMutation, UpdateOffenderCrimeGroupsMutationVariables>;
export function useUpdateOffenderCrimeGroupsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderCrimeGroupsMutation, UpdateOffenderCrimeGroupsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderCrimeGroupsMutation, UpdateOffenderCrimeGroupsMutationVariables>(UpdateOffenderCrimeGroupsDocument, options);
      }
export type UpdateOffenderCrimeGroupsMutationHookResult = ReturnType<typeof useUpdateOffenderCrimeGroupsMutation>;
export type UpdateOffenderCrimeGroupsMutationResult = Apollo.MutationResult<UpdateOffenderCrimeGroupsMutation>;
export type UpdateOffenderCrimeGroupsMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderCrimeGroupsMutation, UpdateOffenderCrimeGroupsMutationVariables>;