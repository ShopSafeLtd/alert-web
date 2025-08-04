import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { SingleShoeFragmentDoc } from '../../../../../graphql/fragments/__generated__/singleShoe.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateShoeMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateShoe;
}>;


export type UpdateShoeMutation = { __typename?: 'Mutation', updateShoe?: { __typename?: 'Shoe', matchedInfo?: string | null, type?: Types.ShoeType | null, style?: string | null, size?: number | null, status?: Types.ShoeStatus | null, side?: Types.ShoeSide | null, retailPrice?: number | null, recycled?: boolean | null, id?: string | null, description?: string | null, colour?: string | null, box?: boolean | null, updatedAt?: Date | null, stockItem?: { __typename?: 'StockItem', id?: string | null, sku?: string | null } | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null, primaryShoe?: { __typename?: 'Shoe', id?: string | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', full?: string | null }> } | null } | null } | null };


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