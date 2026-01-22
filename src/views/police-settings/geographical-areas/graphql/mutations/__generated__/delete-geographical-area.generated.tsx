import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeletePoliceGeographicalAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DeletePoliceGeographicalAreaMutation = { __typename?: 'Mutation', deleteGeographicalArea: { __typename?: 'GeographicalArea', id: string } };


export const DeletePoliceGeographicalAreaDocument = gql`
    mutation DeletePoliceGeographicalArea($id: String!) {
  deleteGeographicalArea(id: $id) {
    id
  }
}
    `;
export type DeletePoliceGeographicalAreaMutationFn = Apollo.MutationFunction<DeletePoliceGeographicalAreaMutation, DeletePoliceGeographicalAreaMutationVariables>;
export function useDeletePoliceGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<DeletePoliceGeographicalAreaMutation, DeletePoliceGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePoliceGeographicalAreaMutation, DeletePoliceGeographicalAreaMutationVariables>(DeletePoliceGeographicalAreaDocument, options);
      }
export type DeletePoliceGeographicalAreaMutationHookResult = ReturnType<typeof useDeletePoliceGeographicalAreaMutation>;
export type DeletePoliceGeographicalAreaMutationResult = Apollo.MutationResult<DeletePoliceGeographicalAreaMutation>;
export type DeletePoliceGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<DeletePoliceGeographicalAreaMutation, DeletePoliceGeographicalAreaMutationVariables>;