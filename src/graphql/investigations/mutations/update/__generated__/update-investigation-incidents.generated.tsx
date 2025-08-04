import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { IncidentsFragmentDoc } from '../../../../fragments/__generated__/incidents.generated';
import { VehiclesFragmentDoc } from '../../../../fragments/__generated__/vehicles.generated';
import { OffendersFragmentDoc } from '../../../../fragments/__generated__/offenders.generated';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationIncidentsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  incidentIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  disconnectIncidentIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type UpdateInvestigationIncidentsMutation = { __typename?: 'Mutation', updateInvestigation?: { __typename?: 'Investigation', id?: string | null, incidents: Array<{ __typename?: 'Incident', id?: string | null, reference?: number | null, dayTime: string, policeRef?: string | null, subject?: string | null, totalValue?: number | null, totalRecoveredValue?: number | null, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, location?: { __typename?: 'Address', id: string, full?: string | null, geoLat?: number | null, geoLng?: number | null } | null }> } | null };


export const UpdateInvestigationIncidentsDocument = gql`
    mutation UpdateInvestigationIncidents($id: String!, $incidentIds: [String], $disconnectIncidentIds: [String]) {
  updateInvestigation(
    where: {id: $id}
    data: {incidentIds: $incidentIds, disconnectIncidentIds: $disconnectIncidentIds}
  ) {
    id
    incidents {
      ...Incidents
      vehicles {
        ...Vehicles
      }
      offenders {
        ...Offenders
        images {
          ...Images
        }
      }
    }
  }
}
    ${IncidentsFragmentDoc}
${VehiclesFragmentDoc}
${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export type UpdateInvestigationIncidentsMutationFn = Apollo.MutationFunction<UpdateInvestigationIncidentsMutation, UpdateInvestigationIncidentsMutationVariables>;
export function useUpdateInvestigationIncidentsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestigationIncidentsMutation, UpdateInvestigationIncidentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestigationIncidentsMutation, UpdateInvestigationIncidentsMutationVariables>(UpdateInvestigationIncidentsDocument, options);
      }
export type UpdateInvestigationIncidentsMutationHookResult = ReturnType<typeof useUpdateInvestigationIncidentsMutation>;
export type UpdateInvestigationIncidentsMutationResult = Apollo.MutationResult<UpdateInvestigationIncidentsMutation>;
export type UpdateInvestigationIncidentsMutationOptions = Apollo.BaseMutationOptions<UpdateInvestigationIncidentsMutation, UpdateInvestigationIncidentsMutationVariables>;