import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RequestCancelStockRequestMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type RequestCancelStockRequestMutation = { __typename?: 'Mutation', requestCancelStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, status: Types.StockRemovalRequestStatus } };


export const RequestCancelStockRequestDocument = gql`
    mutation RequestCancelStockRequest($where: UniqueId!) {
  requestCancelStockRemovalRequest(where: $where) {
    id
    status
  }
}
    `;
export type RequestCancelStockRequestMutationFn = Apollo.MutationFunction<RequestCancelStockRequestMutation, RequestCancelStockRequestMutationVariables>;
export function useRequestCancelStockRequestMutation(baseOptions?: Apollo.MutationHookOptions<RequestCancelStockRequestMutation, RequestCancelStockRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestCancelStockRequestMutation, RequestCancelStockRequestMutationVariables>(RequestCancelStockRequestDocument, options);
      }
export type RequestCancelStockRequestMutationHookResult = ReturnType<typeof useRequestCancelStockRequestMutation>;
export type RequestCancelStockRequestMutationResult = Apollo.MutationResult<RequestCancelStockRequestMutation>;
export type RequestCancelStockRequestMutationOptions = Apollo.BaseMutationOptions<RequestCancelStockRequestMutation, RequestCancelStockRequestMutationVariables>;