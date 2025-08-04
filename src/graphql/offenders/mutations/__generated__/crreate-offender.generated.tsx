import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOffenderMutationVariables = Types.Exact<{
  data: Types.CreateOffenderData;
}>;


export type CreateOffenderMutation = { __typename?: 'Mutation', createOffender?: { __typename?: 'Offender', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, name?: string | null, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, active?: boolean | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, bans: Array<{ __typename?: 'Ban', id: string, title?: string | null, location: string, description?: string | null, startDate?: Date | null, endDate?: Date | null, type?: Types.BanType | null }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, incidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, date?: Date | null, dayTime: string, crimeTypes?: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> | null, location?: { __typename?: 'Address', id: string, full?: string | null } | null, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }> }> } | null };


export const CreateOffenderDocument = gql`
    mutation createOffender($data: CreateOffenderData!) {
  createOffender(data: $data) {
    id
    createdAt
    updatedAt
    age
    build
    height
    dateOfBirth
    dateSource
    hair
    gender
    name
    race
    peculiarities
    approved
    active
    idVerified
    idSource
    images {
      id
      url
      optimised
      position
      rotation
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    bans {
      id
      title
      location
      description
      startDate
      endDate
      type
    }
    createdBy {
      id
      fullName
      businesses {
        id
        name
      }
    }
    incidents {
      id
      subject
      description
      date
      dayTime
      crimeTypes {
        id
        name
      }
      location {
        id
        full
      }
      createdBy {
        id
        fullName
        businesses {
          id
          name
        }
      }
      images {
        id
        url
        optimised
        position
        rotation
      }
    }
  }
}
    `;
export type CreateOffenderMutationFn = Apollo.MutationFunction<CreateOffenderMutation, CreateOffenderMutationVariables>;
export function useCreateOffenderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOffenderMutation, CreateOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOffenderMutation, CreateOffenderMutationVariables>(CreateOffenderDocument, options);
      }
export type CreateOffenderMutationHookResult = ReturnType<typeof useCreateOffenderMutation>;
export type CreateOffenderMutationResult = Apollo.MutationResult<CreateOffenderMutation>;
export type CreateOffenderMutationOptions = Apollo.BaseMutationOptions<CreateOffenderMutation, CreateOffenderMutationVariables>;