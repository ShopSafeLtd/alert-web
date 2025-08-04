import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../../../../graphql/fragments/__generated__/vehicles.generated';
import { ImagesFragmentDoc } from '../../../../../../graphql/fragments/__generated__/images.generated';
import { OffendersFragmentDoc } from '../../../../../../graphql/fragments/__generated__/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertIncidentMutationVariables = Types.Exact<{
  data: Types.UpsertIncidentData;
}>;


export type UpsertIncidentMutation = { __typename?: 'Mutation', upsertIncident: { __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, date: Date, time: Date, value?: number | null, recoveredValue?: number | null, policeReported: boolean, policeRef?: string | null, policeInvolved: boolean, reference?: number | null, approved?: boolean | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, location?: { __typename?: 'Address', id: string, full: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null, position: Types.ImagePosition, rotation: number }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };


export const UpsertIncidentDocument = gql`
    mutation UpsertIncident($data: UpsertIncidentData!) {
  upsertIncident(data: $data) {
    id
    subject
    description
    dayTime
    date
    time
    value
    recoveredValue
    policeReported
    policeRef
    policeInvolved
    reference
    crimeTypes {
      id
      name
    }
    approved
    location {
      id
      full
    }
    createdBy {
      id
      fullName
      businesses {
        fullName
        id
        name
      }
    }
    images {
      id
      optimised
      url
      position
      rotation
    }
    groups {
      id
      name
    }
    vehicles {
      ...Vehicles
      images {
        ...Images
      }
    }
    offenders {
      ...Offenders
      images {
        ...Images
        isFace
      }
      tags {
        id
        name
      }
    }
  }
}
    ${VehiclesFragmentDoc}
${ImagesFragmentDoc}
${OffendersFragmentDoc}`;
export type UpsertIncidentMutationFn = Apollo.MutationFunction<UpsertIncidentMutation, UpsertIncidentMutationVariables>;
export function useUpsertIncidentMutation(baseOptions?: Apollo.MutationHookOptions<UpsertIncidentMutation, UpsertIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertIncidentMutation, UpsertIncidentMutationVariables>(UpsertIncidentDocument, options);
      }
export type UpsertIncidentMutationHookResult = ReturnType<typeof useUpsertIncidentMutation>;
export type UpsertIncidentMutationResult = Apollo.MutationResult<UpsertIncidentMutation>;
export type UpsertIncidentMutationOptions = Apollo.BaseMutationOptions<UpsertIncidentMutation, UpsertIncidentMutationVariables>;