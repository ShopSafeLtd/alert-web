import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CloseInvestigationMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type CloseInvestigationMutation = { __typename?: 'Mutation', closeInvestigation: { __typename?: 'Investigation', id: string, status: Types.InvestigationStatus } };


export const CloseInvestigationDocument = gql`
    mutation CloseInvestigation($where: UniqueId!) {
  closeInvestigation(where: $where) {
    id
    status
  }
}
    `;
export type CloseInvestigationMutationFn = Apollo.MutationFunction<CloseInvestigationMutation, CloseInvestigationMutationVariables>;
export function useCloseInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<CloseInvestigationMutation, CloseInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseInvestigationMutation, CloseInvestigationMutationVariables>(CloseInvestigationDocument, options);
      }
export type CloseInvestigationMutationHookResult = ReturnType<typeof useCloseInvestigationMutation>;
export type CloseInvestigationMutationResult = Apollo.MutationResult<CloseInvestigationMutation>;
export type CloseInvestigationMutationOptions = Apollo.BaseMutationOptions<CloseInvestigationMutation, CloseInvestigationMutationVariables>;