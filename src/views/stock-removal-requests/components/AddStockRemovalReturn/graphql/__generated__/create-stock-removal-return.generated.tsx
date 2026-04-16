import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateStockRemovalReturnMutationVariables = Types.Exact<{
  data: Types.CreateStockRemovalReturnInput;
}>;


export type CreateStockRemovalReturnMutation = { __typename?: 'Mutation', createStockRemovalReturn: { __typename?: 'StockRemovalRequest', id: string, reference?: number | null, status: Types.StockRemovalRequestStatus, isReturn?: boolean | null, createdAt: Date, storeOrDC?: string | null, createdBy: { __typename?: 'User', id: string }, returnImages?: Array<{ __typename?: 'Image', id: string, url?: string | null }> | null } };


export const CreateStockRemovalReturnDocument = gql`
    mutation CreateStockRemovalReturn($data: CreateStockRemovalReturnInput!) {
  createStockRemovalReturn(data: $data) {
    id
    reference
    status
    isReturn
    createdAt
    storeOrDC
    createdBy {
      id
    }
    returnImages {
      id
      url
    }
  }
}
    `;
export type CreateStockRemovalReturnMutationFn = Apollo.MutationFunction<CreateStockRemovalReturnMutation, CreateStockRemovalReturnMutationVariables>;
export function useCreateStockRemovalReturnMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockRemovalReturnMutation, CreateStockRemovalReturnMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockRemovalReturnMutation, CreateStockRemovalReturnMutationVariables>(CreateStockRemovalReturnDocument, options);
      }
export type CreateStockRemovalReturnMutationHookResult = ReturnType<typeof useCreateStockRemovalReturnMutation>;
export type CreateStockRemovalReturnMutationResult = Apollo.MutationResult<CreateStockRemovalReturnMutation>;
export type CreateStockRemovalReturnMutationOptions = Apollo.BaseMutationOptions<CreateStockRemovalReturnMutation, CreateStockRemovalReturnMutationVariables>;
