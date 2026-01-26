import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteGeographicalAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeleteGeographicalAreaMutation = { __typename?: 'Mutation', deleteGeographicalArea: { __typename?: 'GeographicalArea', id: string, name: string } };


export const DeleteGeographicalAreaDocument = gql`
    mutation DeleteGeographicalArea($id: String!) {
  deleteGeographicalArea(id: $id) {
    id
    name
  }
}
    `;
export type DeleteGeographicalAreaMutationFn = Apollo.MutationFunction<DeleteGeographicalAreaMutation, DeleteGeographicalAreaMutationVariables>;
export function useDeleteGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGeographicalAreaMutation, DeleteGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGeographicalAreaMutation, DeleteGeographicalAreaMutationVariables>(DeleteGeographicalAreaDocument, options);
      }
export type DeleteGeographicalAreaMutationHookResult = ReturnType<typeof useDeleteGeographicalAreaMutation>;
export type DeleteGeographicalAreaMutationResult = Apollo.MutationResult<DeleteGeographicalAreaMutation>;
export type DeleteGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<DeleteGeographicalAreaMutation, DeleteGeographicalAreaMutationVariables>;