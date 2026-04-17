import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SoftDeleteStockRemovalReasonOptionMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type SoftDeleteStockRemovalReasonOptionMutation = { __typename?: 'Mutation', softDeleteStockRemovalReasonOption: { __typename?: 'StockRemovalReasonOption', id: string } };


export const SoftDeleteStockRemovalReasonOptionDocument = gql`
    mutation SoftDeleteStockRemovalReasonOption($where: UniqueId!) {
  softDeleteStockRemovalReasonOption(where: $where) {
    id
  }
}
    `;
export type SoftDeleteStockRemovalReasonOptionMutationFn = Apollo.MutationFunction<SoftDeleteStockRemovalReasonOptionMutation, SoftDeleteStockRemovalReasonOptionMutationVariables>;
export function useSoftDeleteStockRemovalReasonOptionMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteStockRemovalReasonOptionMutation, SoftDeleteStockRemovalReasonOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteStockRemovalReasonOptionMutation, SoftDeleteStockRemovalReasonOptionMutationVariables>(SoftDeleteStockRemovalReasonOptionDocument, options);
      }
export type SoftDeleteStockRemovalReasonOptionMutationHookResult = ReturnType<typeof useSoftDeleteStockRemovalReasonOptionMutation>;
export type SoftDeleteStockRemovalReasonOptionMutationResult = Apollo.MutationResult<SoftDeleteStockRemovalReasonOptionMutation>;
export type SoftDeleteStockRemovalReasonOptionMutationOptions = Apollo.BaseMutationOptions<SoftDeleteStockRemovalReasonOptionMutation, SoftDeleteStockRemovalReasonOptionMutationVariables>;
