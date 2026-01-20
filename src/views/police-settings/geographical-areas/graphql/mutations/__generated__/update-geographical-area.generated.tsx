import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePoliceGeographicalAreaMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  data: Types.UpdateGeographicalAreaInput;
}>;


export type UpdatePoliceGeographicalAreaMutation = { __typename?: 'Mutation', updateGeographicalArea: { __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, areaType: string, color?: string | null, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, createdAt: Date } };


export const UpdatePoliceGeographicalAreaDocument = gql`
    mutation UpdatePoliceGeographicalArea($id: String!, $data: UpdateGeographicalAreaInput!) {
  updateGeographicalArea(id: $id, data: $data) {
    id
    name
    description
    areaType
    color
    circle
    polygon
    createdAt
  }
}
    `;
export type UpdatePoliceGeographicalAreaMutationFn = Apollo.MutationFunction<UpdatePoliceGeographicalAreaMutation, UpdatePoliceGeographicalAreaMutationVariables>;
export function useUpdatePoliceGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePoliceGeographicalAreaMutation, UpdatePoliceGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePoliceGeographicalAreaMutation, UpdatePoliceGeographicalAreaMutationVariables>(UpdatePoliceGeographicalAreaDocument, options);
      }
export type UpdatePoliceGeographicalAreaMutationHookResult = ReturnType<typeof useUpdatePoliceGeographicalAreaMutation>;
export type UpdatePoliceGeographicalAreaMutationResult = Apollo.MutationResult<UpdatePoliceGeographicalAreaMutation>;
export type UpdatePoliceGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<UpdatePoliceGeographicalAreaMutation, UpdatePoliceGeographicalAreaMutationVariables>;