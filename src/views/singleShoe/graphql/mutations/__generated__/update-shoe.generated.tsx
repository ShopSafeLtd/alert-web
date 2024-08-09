import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/shoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateShoeMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateShoe;
}>;


export type UpdateShoeMutation = { __typename?: 'Mutation', updateShoe: { __typename?: 'Shoe', matchedInfo?: string | null, type: Types.ShoeType, style: string, size: number, status: Types.ShoeStatus, side: Types.ShoeSide, retailPrice: number, recycled: boolean, id: string, description: string, colour: string, box: boolean, updatedAt: Date, stockItem: { __typename?: 'StockItem', id: string, sku?: string | null }, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> }, primaryShoe?: { __typename?: 'Shoe', id: string, business: { __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', full: string }> } } | null } };


export const UpdateShoeDocument = gql`
    mutation UpdateShoe($where: UniqueId!, $data: UpdateShoe!) {
  updateShoe(where: $where, data: $data) {
    ...SingleShoe
    matchedInfo
  }
}
    ${SingleShoeFragmentDoc}`;
export type UpdateShoeMutationFn = Apollo.MutationFunction<UpdateShoeMutation, UpdateShoeMutationVariables>;
export function useUpdateShoeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateShoeMutation, UpdateShoeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateShoeMutation, UpdateShoeMutationVariables>(UpdateShoeDocument, options);
      }
export type UpdateShoeMutationHookResult = ReturnType<typeof useUpdateShoeMutation>;
export type UpdateShoeMutationResult = Apollo.MutationResult<UpdateShoeMutation>;
export type UpdateShoeMutationOptions = Apollo.BaseMutationOptions<UpdateShoeMutation, UpdateShoeMutationVariables>;