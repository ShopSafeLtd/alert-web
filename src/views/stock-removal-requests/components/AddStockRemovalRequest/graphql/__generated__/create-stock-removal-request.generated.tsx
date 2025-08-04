import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStockRemovalRequestMutationVariables = Types.Exact<{
  data: Types.CreateStockRemovalRequestInput;
}>;


export type CreateStockRemovalRequestMutation = { __typename?: 'Mutation', createStockRemovalRequest: { __typename?: 'StockRemovalRequest', id: string, createdAt: Date, title: string, status: Types.StockRemovalRequestStatus, reference?: number | null, approvers: Array<{ __typename?: 'StockRemovalRequestApproval', status: Types.StockRemovalRequestApprovalStatus, user: { __typename?: 'User', id: string, fullName: string } }> } };


export const CreateStockRemovalRequestDocument = gql`
    mutation CreateStockRemovalRequest($data: CreateStockRemovalRequestInput!) {
  createStockRemovalRequest(data: $data) {
    id
    createdAt
    title
    status
    reference
    approvers {
      status
      user {
        id
        fullName
      }
    }
  }
}
    `;
export type CreateStockRemovalRequestMutationFn = Apollo.MutationFunction<CreateStockRemovalRequestMutation, CreateStockRemovalRequestMutationVariables>;
export function useCreateStockRemovalRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockRemovalRequestMutation, CreateStockRemovalRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockRemovalRequestMutation, CreateStockRemovalRequestMutationVariables>(CreateStockRemovalRequestDocument, options);
      }
export type CreateStockRemovalRequestMutationHookResult = ReturnType<typeof useCreateStockRemovalRequestMutation>;
export type CreateStockRemovalRequestMutationResult = Apollo.MutationResult<CreateStockRemovalRequestMutation>;
export type CreateStockRemovalRequestMutationOptions = Apollo.BaseMutationOptions<CreateStockRemovalRequestMutation, CreateStockRemovalRequestMutationVariables>;