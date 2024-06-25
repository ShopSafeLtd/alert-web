import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../fragments/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCrimeGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UpdateCrimeGroupDataInput;
}>;


export type UpdateCrimeGroupMutation = { __typename?: 'Mutation', updateCrimeGroup: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null, totalIncidents: number, totalOffenders: number, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, hair?: string | null, peculiarities?: string | null, race?: Types.Race | null, dateOfBirth?: Date | null, dateSource?: string | null, build?: Types.Build | null, height?: Types.Height | null, age?: Types.Age | null, gender?: Types.Gender | null, totalTheftSuccess: number, totalRecoveredValue: number, totalIncidents: number, totalValue: number, alias: Array<string>, comment?: string | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, lastActive?: { __typename?: 'Incident', id: string, dayTime: string } | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number }> }>, vehicles: Array<{ __typename?: 'Vehicle', id: string }>, incidents: Array<{ __typename?: 'Incident', id: string, subject?: string | null, dayTime: string, value?: number | null, recoveredValue?: number | null, reference?: number | null, policeRef?: string | null, createdBy: { __typename?: 'User', id: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> } }> } };


export const UpdateCrimeGroupDocument = gql`
    mutation updateCrimeGroup($where: UniqueId!, $data: UpdateCrimeGroupDataInput!) {
  updateCrimeGroup(where: $where, data: $data) {
    id
    alias
    reference
    totalIncidents
    totalOffenders
    totalRecoveredValue
    totalTheftSuccess
    totalValue
    offenders {
      ...Offenders
      id
      name
      reference
      lastActive {
        id
        dayTime
      }
      hair
      peculiarities
      race
      dateOfBirth
      dateSource
      build
      height
      age
      gender
      images {
        id
        optimised
        position
        rotation
      }
      totalTheftSuccess
      totalRecoveredValue
      totalIncidents
      totalValue
    }
    vehicles {
      id
    }
    incidents {
      id
      subject
      dayTime
      createdBy {
        id
        businesses {
          fullName
          id
          name
        }
      }
      value
      recoveredValue
      reference
      policeRef
    }
  }
}
    ${OffendersFragmentDoc}`;
export type UpdateCrimeGroupMutationFn = Apollo.MutationFunction<UpdateCrimeGroupMutation, UpdateCrimeGroupMutationVariables>;
export function useUpdateCrimeGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCrimeGroupMutation, UpdateCrimeGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCrimeGroupMutation, UpdateCrimeGroupMutationVariables>(UpdateCrimeGroupDocument, options);
      }
export type UpdateCrimeGroupMutationHookResult = ReturnType<typeof useUpdateCrimeGroupMutation>;
export type UpdateCrimeGroupMutationResult = Apollo.MutationResult<UpdateCrimeGroupMutation>;
export type UpdateCrimeGroupMutationOptions = Apollo.BaseMutationOptions<UpdateCrimeGroupMutation, UpdateCrimeGroupMutationVariables>;