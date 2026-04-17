import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertStockRemovalReasonOptionMutationVariables = Types.Exact<{
  data: Types.UpsertStockRemovalReasonOptionInput;
}>;


export type UpsertStockRemovalReasonOptionMutation = { __typename?: 'Mutation', upsertStockRemovalReasonOption: { __typename?: 'StockRemovalReasonOption', id: string, label: string, position: number, active: boolean } };


export const UpsertStockRemovalReasonOptionDocument = gql`
    mutation UpsertStockRemovalReasonOption($data: UpsertStockRemovalReasonOptionInput!) {
  upsertStockRemovalReasonOption(data: $data) {
    id
    label
    position
    active
  }
}
    `;
export type UpsertStockRemovalReasonOptionMutationFn = Apollo.MutationFunction<UpsertStockRemovalReasonOptionMutation, UpsertStockRemovalReasonOptionMutationVariables>;
export function useUpsertStockRemovalReasonOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpsertStockRemovalReasonOptionMutation, UpsertStockRemovalReasonOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertStockRemovalReasonOptionMutation, UpsertStockRemovalReasonOptionMutationVariables>(UpsertStockRemovalReasonOptionDocument, options);
      }
export type UpsertStockRemovalReasonOptionMutationHookResult = ReturnType<typeof useUpsertStockRemovalReasonOptionMutation>;
export type UpsertStockRemovalReasonOptionMutationResult = Apollo.MutationResult<UpsertStockRemovalReasonOptionMutation>;
export type UpsertStockRemovalReasonOptionMutationOptions = Apollo.BaseMutationOptions<UpsertStockRemovalReasonOptionMutation, UpsertStockRemovalReasonOptionMutationVariables>;
