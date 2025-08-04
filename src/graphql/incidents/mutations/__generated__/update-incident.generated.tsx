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


export type UpdateIncidentMutation = { __typename?: 'Mutation', updateIncident?: { __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, date?: Date | null, time?: Date | null, value?: number | null, recoveredValue?: number | null, policeReported?: boolean | null, policeRef?: string | null, policeInvolved?: boolean | null, activityAuthorised?: boolean | null, subscribed?: boolean | null, priority: Types.IncidentPriority, customerRef?: string | null, approved?: boolean | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, answers: Array<{ __typename?: 'Answer', id: string, answer: string, type: Types.AnswerType, tagQuestion?: { __typename?: 'TagQuestion', id?: string | null, priority?: number | null, dependentQuestions?: Array<{ [key: string]: any }> | null, question?: { __typename?: 'Question', id?: string | null, question?: string | null } | null } | null }>, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, location?: { __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLat?: number | null, geoLng?: number | null, full?: string | null, alias?: string | null } | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, url?: string | null, card?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> }> } | null };


export const UpdateIncidentDocument = gql`
    mutation updateIncident($where: UniqueId!, $data: IncidentUpdateInput!) {
  updateIncident(where: $where, data: $data) {
    id
    subject
    business {
      id
      name
    }
    answers(orderBy: {tagQuestion: {priority: desc}}) {
      id
      answer
      tagQuestion {
        id
        priority
        dependentQuestions
        question {
          id
          question
        }
      }
      type
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
    activityAuthorised
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