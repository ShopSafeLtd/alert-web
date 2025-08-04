import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { LocationsFragmentDoc } from '../../../../fragments/__generated__/location.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentLocationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  location?: Types.InputMaybe<Types.UpdateSimpleLocation>;
}>;


export type UpdateIncidentLocationMutation = { __typename?: 'Mutation', updateIncident?: { __typename?: 'Incident', id?: string | null, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full?: string | null, alias?: string | null } | null } | null };


export const UpdateIncidentLocationDocument = gql`
    mutation UpdateIncidentLocation($id: String!, $location: UpdateSimpleLocation) {
  updateIncident(where: {id: $id}, data: {location: $location}) {
    id
    location {
      ...Locations
    }
  }
}
    ${LocationsFragmentDoc}`;
export type UpdateIncidentLocationMutationFn = Apollo.MutationFunction<UpdateIncidentLocationMutation, UpdateIncidentLocationMutationVariables>;
export function useUpdateIncidentLocationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentLocationMutation, UpdateIncidentLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentLocationMutation, UpdateIncidentLocationMutationVariables>(UpdateIncidentLocationDocument, options);
      }
export type UpdateIncidentLocationMutationHookResult = ReturnType<typeof useUpdateIncidentLocationMutation>;
export type UpdateIncidentLocationMutationResult = Apollo.MutationResult<UpdateIncidentLocationMutation>;
export type UpdateIncidentLocationMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentLocationMutation, UpdateIncidentLocationMutationVariables>;