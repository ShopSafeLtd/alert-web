import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePoliceGeographicalAreaMutationVariables = Types.Exact<{
  data: Types.CreateGeographicalAreaInput;
}>;


export type CreatePoliceGeographicalAreaMutation = { __typename?: 'Mutation', createGeographicalArea: { __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, areaType: string, color?: string | null, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, createdAt: Date } };


export const CreatePoliceGeographicalAreaDocument = gql`
    mutation CreatePoliceGeographicalArea($data: CreateGeographicalAreaInput!) {
  createGeographicalArea(data: $data) {
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
export type CreatePoliceGeographicalAreaMutationFn = Apollo.MutationFunction<CreatePoliceGeographicalAreaMutation, CreatePoliceGeographicalAreaMutationVariables>;
export function useCreatePoliceGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<CreatePoliceGeographicalAreaMutation, CreatePoliceGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePoliceGeographicalAreaMutation, CreatePoliceGeographicalAreaMutationVariables>(CreatePoliceGeographicalAreaDocument, options);
      }
export type CreatePoliceGeographicalAreaMutationHookResult = ReturnType<typeof useCreatePoliceGeographicalAreaMutation>;
export type CreatePoliceGeographicalAreaMutationResult = Apollo.MutationResult<CreatePoliceGeographicalAreaMutation>;
export type CreatePoliceGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<CreatePoliceGeographicalAreaMutation, CreatePoliceGeographicalAreaMutationVariables>;