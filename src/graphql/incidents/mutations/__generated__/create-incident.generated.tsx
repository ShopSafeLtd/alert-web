import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../fragments/__generated__/vehicles.generated';
import { ImagesFragmentDoc } from '../../../fragments/__generated__/images.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateIncidentMutationVariables = Types.Exact<{
  data: Types.CreateIncidentData;
}>;


export type CreateIncidentMutation = { __typename?: 'Mutation', createIncident?: { __typename?: 'Incident', id?: string | null, reference?: number | null, subject?: string | null, description?: string | null, dayTime: string, date?: Date | null, time?: Date | null, value?: number | null, recoveredValue?: number | null, policeReported?: boolean | null, policeRef?: string | null, policeInvolved?: boolean | null, activityAuthorised?: boolean | null, approved?: boolean | null, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }> } | null };


export const CreateIncidentDocument = gql`
    mutation createIncident($data: CreateIncidentData!) {
  createIncident(data: $data) {
    id
    reference
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
    activityAuthorised
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
export type CreateIncidentMutationFn = Apollo.MutationFunction<CreateIncidentMutation, CreateIncidentMutationVariables>;
export function useCreateIncidentMutation(baseOptions?: Apollo.MutationHookOptions<CreateIncidentMutation, CreateIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIncidentMutation, CreateIncidentMutationVariables>(CreateIncidentDocument, options);
      }
export type CreateIncidentMutationHookResult = ReturnType<typeof useCreateIncidentMutation>;
export type CreateIncidentMutationResult = Apollo.MutationResult<CreateIncidentMutation>;
export type CreateIncidentMutationOptions = Apollo.BaseMutationOptions<CreateIncidentMutation, CreateIncidentMutationVariables>;