import type * as Types from '../../../../types';

import { gql } from '@apollo/client';
import { CrimeGroupsFragmentDoc } from '../../../../fragments/__generated__/crime-groups.generated';
import { VehiclesFragmentDoc } from '../../../../fragments/__generated__/vehicles.generated';
import { OffendersFragmentDoc } from '../../../../fragments/__generated__/offenders.generated';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationCrimeGroupsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  crimeGroupIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  disconnectCrimeGroupIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type UpdateInvestigationCrimeGroupsMutation = { __typename?: 'Mutation', updateInvestigation: { __typename?: 'Investigation', id: string, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null, alias?: string | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> }> } };


export const UpdateInvestigationCrimeGroupsDocument = gql`
    mutation UpdateInvestigationCrimeGroups($id: String!, $crimeGroupIds: [String], $disconnectCrimeGroupIds: [String]) {
  updateInvestigation(
    where: {id: $id}
    data: {crimeGroupIds: $crimeGroupIds, disconnectCrimeGroupIds: $disconnectCrimeGroupIds}
  ) {
    id
    crimeGroups {
      ...CrimeGroups
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
    ${CrimeGroupsFragmentDoc}
${VehiclesFragmentDoc}
${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export type UpdateInvestigationCrimeGroupsMutationFn = Apollo.MutationFunction<UpdateInvestigationCrimeGroupsMutation, UpdateInvestigationCrimeGroupsMutationVariables>;
export function useUpdateInvestigationCrimeGroupsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestigationCrimeGroupsMutation, UpdateInvestigationCrimeGroupsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestigationCrimeGroupsMutation, UpdateInvestigationCrimeGroupsMutationVariables>(UpdateInvestigationCrimeGroupsDocument, options);
      }
export type UpdateInvestigationCrimeGroupsMutationHookResult = ReturnType<typeof useUpdateInvestigationCrimeGroupsMutation>;
export type UpdateInvestigationCrimeGroupsMutationResult = Apollo.MutationResult<UpdateInvestigationCrimeGroupsMutation>;
export type UpdateInvestigationCrimeGroupsMutationOptions = Apollo.BaseMutationOptions<UpdateInvestigationCrimeGroupsMutation, UpdateInvestigationCrimeGroupsMutationVariables>;