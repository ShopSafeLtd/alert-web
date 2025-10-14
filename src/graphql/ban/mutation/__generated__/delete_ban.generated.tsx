import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteBanMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteBanMutation = { __typename?: 'Mutation', deleteBan: { __typename?: 'Ban', id: string } };


export const DeleteBanDocument = gql`
    mutation deleteBan($id: String!) {
  deleteBan(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteBanMutationFn = Apollo.MutationFunction<DeleteBanMutation, DeleteBanMutationVariables>;
export function useDeleteBanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBanMutation, DeleteBanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBanMutation, DeleteBanMutationVariables>(DeleteBanDocument, options);
      }
export type DeleteBanMutationHookResult = ReturnType<typeof useDeleteBanMutation>;
export type DeleteBanMutationResult = Apollo.MutationResult<DeleteBanMutation>;
export type DeleteBanMutationOptions = Apollo.BaseMutationOptions<DeleteBanMutation, DeleteBanMutationVariables>;