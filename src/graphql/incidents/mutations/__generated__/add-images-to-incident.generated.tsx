import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddImagesToIncidentMutationVariables = Types.Exact<{
  incident: Types.IncidentWhereUniqueInput;
  images: Array<Types.ImageWhereUniqueInput> | Types.ImageWhereUniqueInput;
}>;


export type AddImagesToIncidentMutation = { __typename?: 'Mutation', addImagesToIncident: { __typename?: 'Incident', id: string, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }> } };


export const AddImagesToIncidentDocument = gql`
    mutation AddImagesToIncident($incident: IncidentWhereUniqueInput!, $images: [ImageWhereUniqueInput!]!) {
  addImagesToIncident(incident: $incident, images: $images) {
    id
    images {
      id
      url
      optimised
      card
      position
      rotation
    }
  }
}
    `;
export type AddImagesToIncidentMutationFn = Apollo.MutationFunction<AddImagesToIncidentMutation, AddImagesToIncidentMutationVariables>;
export function useAddImagesToIncidentMutation(baseOptions?: Apollo.MutationHookOptions<AddImagesToIncidentMutation, AddImagesToIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddImagesToIncidentMutation, AddImagesToIncidentMutationVariables>(AddImagesToIncidentDocument, options);
      }
export type AddImagesToIncidentMutationHookResult = ReturnType<typeof useAddImagesToIncidentMutation>;
export type AddImagesToIncidentMutationResult = Apollo.MutationResult<AddImagesToIncidentMutation>;
export type AddImagesToIncidentMutationOptions = Apollo.BaseMutationOptions<AddImagesToIncidentMutation, AddImagesToIncidentMutationVariables>;