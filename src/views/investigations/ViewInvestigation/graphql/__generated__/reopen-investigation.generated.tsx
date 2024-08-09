import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ReopenInvestigationMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type ReopenInvestigationMutation = { __typename?: 'Mutation', reopenInvestigation: { __typename?: 'Investigation', id: string, status: Types.InvestigationStatus } };


export const ReopenInvestigationDocument = gql`
    mutation ReopenInvestigation($where: UniqueId!) {
  reopenInvestigation(where: $where) {
    id
    status
  }
}
    `;
export type ReopenInvestigationMutationFn = Apollo.MutationFunction<ReopenInvestigationMutation, ReopenInvestigationMutationVariables>;
export function useReopenInvestigationMutation(baseOptions?: Apollo.MutationHookOptions<ReopenInvestigationMutation, ReopenInvestigationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReopenInvestigationMutation, ReopenInvestigationMutationVariables>(ReopenInvestigationDocument, options);
      }
export type ReopenInvestigationMutationHookResult = ReturnType<typeof useReopenInvestigationMutation>;
export type ReopenInvestigationMutationResult = Apollo.MutationResult<ReopenInvestigationMutation>;
export type ReopenInvestigationMutationOptions = Apollo.BaseMutationOptions<ReopenInvestigationMutation, ReopenInvestigationMutationVariables>;