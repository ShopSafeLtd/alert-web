import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateGeographicalAreaMutationVariables = Types.Exact<{
  data: Types.CreateGeographicalAreaInput;
}>;


export type CreateGeographicalAreaMutation = { __typename?: 'Mutation', createGeographicalArea: { __typename?: 'GeographicalArea', id: string, name: string, description?: string | null, color?: string | null, areaType: string, circle?: { [key: string]: any } | null, polygon?: { [key: string]: any } | null, createdAt: Date, createdBy?: { __typename?: 'User', id: string, fullName: string } | null } };


export const CreateGeographicalAreaDocument = gql`
    mutation CreateGeographicalArea($data: CreateGeographicalAreaInput!) {
  createGeographicalArea(data: $data) {
    id
    name
    description
    color
    areaType
    circle
    polygon
    createdAt
    createdBy {
      id
      fullName
    }
  }
}
    `;
export type CreateGeographicalAreaMutationFn = Apollo.MutationFunction<CreateGeographicalAreaMutation, CreateGeographicalAreaMutationVariables>;
export function useCreateGeographicalAreaMutation(baseOptions?: Apollo.MutationHookOptions<CreateGeographicalAreaMutation, CreateGeographicalAreaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGeographicalAreaMutation, CreateGeographicalAreaMutationVariables>(CreateGeographicalAreaDocument, options);
      }
export type CreateGeographicalAreaMutationHookResult = ReturnType<typeof useCreateGeographicalAreaMutation>;
export type CreateGeographicalAreaMutationResult = Apollo.MutationResult<CreateGeographicalAreaMutation>;
export type CreateGeographicalAreaMutationOptions = Apollo.BaseMutationOptions<CreateGeographicalAreaMutation, CreateGeographicalAreaMutationVariables>;