import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteDemGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteDemGroupMutation = { __typename?: 'Mutation', deleteDemGroup: { __typename?: 'DemGroup', id: string, name: string } };


export const DeleteDemGroupDocument = gql`
    mutation deleteDemGroup($id: String!) {
  deleteDemGroup(where: {id: $id}) {
    id
    name
  }
}
    `;
export type DeleteDemGroupMutationFn = Apollo.MutationFunction<DeleteDemGroupMutation, DeleteDemGroupMutationVariables>;
export function useDeleteDemGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDemGroupMutation, DeleteDemGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDemGroupMutation, DeleteDemGroupMutationVariables>(DeleteDemGroupDocument, options);
      }
export type DeleteDemGroupMutationHookResult = ReturnType<typeof useDeleteDemGroupMutation>;
export type DeleteDemGroupMutationResult = Apollo.MutationResult<DeleteDemGroupMutation>;
export type DeleteDemGroupMutationOptions = Apollo.BaseMutationOptions<DeleteDemGroupMutation, DeleteDemGroupMutationVariables>;