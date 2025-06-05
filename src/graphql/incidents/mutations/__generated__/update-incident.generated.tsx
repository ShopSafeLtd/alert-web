import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { LocationsFragmentDoc } from '../../../fragments/__generated__/location.generated';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { SimpleImagesFragmentDoc } from '../../../fragments/__generated__/simple-images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateIncidentMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.IncidentUpdateInput;
}>;


export type UpdateIncidentMutation = { __typename?: 'Mutation', updateIncident: { __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, date: Date, time: Date, value?: number | null, recoveredValue?: number | null, policeReported: boolean, policeRef?: string | null, policeInvolved: boolean, subscribed: boolean, priority: Types.IncidentPriority, customerRef?: string | null, approved?: boolean | null, business?: { __typename?: 'Business', id: string, name: string } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full: string, alias?: string | null } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, position: Types.ImagePosition, rotation: number, url?: string | null, card?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };


export const UpdateIncidentDocument = gql`
    mutation updateIncident($where: UniqueId!, $data: IncidentUpdateInput!) {
  updateIncident(where: $where, data: $data) {
    id
    subject
    business {
      id
      name
    }
    description
    dayTime
    date
    time
    value
    recoveredValue
    policeReported
    policeRef
    policeInvolved
    subscribed
    priority
    customerRef
    crimeTypes {
      id
      name
    }
    approved
    location {
      ...Locations
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
      position
      rotation
      url
      card
    }
    groups {
      id
      name
    }
    offenders {
      ...Offenders
      images {
        ...SimpleImages
        isFace
      }
      tags {
        id
        name
      }
    }
  }
}
    ${LocationsFragmentDoc}
${OffendersFragmentDoc}
${SimpleImagesFragmentDoc}`;
export type UpdateIncidentMutationFn = Apollo.MutationFunction<UpdateIncidentMutation, UpdateIncidentMutationVariables>;
export function useUpdateIncidentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIncidentMutation, UpdateIncidentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIncidentMutation, UpdateIncidentMutationVariables>(UpdateIncidentDocument, options);
      }
export type UpdateIncidentMutationHookResult = ReturnType<typeof useUpdateIncidentMutation>;
export type UpdateIncidentMutationResult = Apollo.MutationResult<UpdateIncidentMutation>;
export type UpdateIncidentMutationOptions = Apollo.BaseMutationOptions<UpdateIncidentMutation, UpdateIncidentMutationVariables>;