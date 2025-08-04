import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { IncidentItemsFragmentDoc } from '../../../../fragments/__generated__/incident-item.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentGoodsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  incidentItems?: Types.InputMaybe<Types.IncidentItemUpdateManyWithoutIncidentInput>;
}>;


export type UpdateIncidentGoodsMutation = { __typename?: 'Mutation', updateIncident?: { __typename?: 'Incident', id?: string | null, incidentItems: Array<{ __typename?: 'IncidentItem', id?: string | null, name?: string | null, value?: number | null, recoveredValue?: number | null, sku?: string | null, quantity?: number | null, recoveredQuantity?: number | null, goodsType?: { __typename?: 'GoodsType', id?: string | null } | null, stockItem?: { __typename?: 'StockItem', id?: string | null } | null }> } | null };


export const UpdateIncidentGoodsDocument = gql`
    mutation UpdateIncidentGoods($id: String!, $incidentItems: IncidentItemUpdateManyWithoutIncidentInput) {
  updateIncident(where: {id: $id}, data: {incidentItems: $incidentItems}) {
    id
    incidentItems {
      ...IncidentItems
    }
  }
}
    ${IncidentItemsFragmentDoc}`;
export type UpdateIncidentGoodsMutationFn = Apollo.MutationFunction<UpdateIncidentGoodsMutation, UpdateIncidentGoodsMutationVariables>;
export function useUpdateIncidentGoodsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentGoodsMutation, UpdateIncidentGoodsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentGoodsMutation, UpdateIncidentGoodsMutationVariables>(UpdateIncidentGoodsDocument, options);
      }
export type UpdateIncidentGoodsMutationHookResult = ReturnType<typeof useUpdateIncidentGoodsMutation>;
export type UpdateIncidentGoodsMutationResult = Apollo.MutationResult<UpdateIncidentGoodsMutation>;
export type UpdateIncidentGoodsMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentGoodsMutation, UpdateIncidentGoodsMutationVariables>;