import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteBusinessMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteBusinessMutation = { __typename?: 'Mutation', deleteBusiness: { __typename?: 'Business', id: string } };


export const DeleteBusinessDocument = gql`
    mutation deleteBusiness($id: String!) {
  deleteBusiness(where: {id: $id}) {
    id
  }
}
    `;
export type DeleteBusinessMutationFn = Apollo.MutationFunction<DeleteBusinessMutation, DeleteBusinessMutationVariables>;
export function useDeleteBusinessMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBusinessMutation, DeleteBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBusinessMutation, DeleteBusinessMutationVariables>(DeleteBusinessDocument, options);
      }
export type DeleteBusinessMutationHookResult = ReturnType<typeof useDeleteBusinessMutation>;
export type DeleteBusinessMutationResult = Apollo.MutationResult<DeleteBusinessMutation>;
export type DeleteBusinessMutationOptions = Apollo.BaseMutationOptions<DeleteBusinessMutation, DeleteBusinessMutationVariables>;