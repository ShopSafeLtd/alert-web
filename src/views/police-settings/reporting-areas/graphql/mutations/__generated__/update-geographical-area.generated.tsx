import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateGeographicalAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  data: Types.UpdateGeographicalAreaInput;
}>;


export type UpdateGeographicalAreaMutation = { __typename?: 'Mutation', updateGeographicalArea: { __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, color?: string | null, areaType: string, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, updatedAt: Date } };


export const UpdateGeographicalAreaDocument = gql`
    mutation UpdateGeographicalArea($id: String!, $data: UpdateGeographicalAreaInput!) {
  updateGeographicalArea(id: $id, data: $data) {
    id
    name
    description
    color
    areaType
    circle
    polygon
    updatedAt
  }
}
    `;
export type UpdateGeographicalAreaMutationFn = Apollo.MutationFunction<UpdateGeographicalAreaMutation, UpdateGeographicalAreaMutationVariables>;
export function useUpdateGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGeographicalAreaMutation, UpdateGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGeographicalAreaMutation, UpdateGeographicalAreaMutationVariables>(UpdateGeographicalAreaDocument, options);
      }
export type UpdateGeographicalAreaMutationHookResult = ReturnType<typeof useUpdateGeographicalAreaMutation>;
export type UpdateGeographicalAreaMutationResult = Apollo.MutationResult<UpdateGeographicalAreaMutation>;
export type UpdateGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<UpdateGeographicalAreaMutation, UpdateGeographicalAreaMutationVariables>;