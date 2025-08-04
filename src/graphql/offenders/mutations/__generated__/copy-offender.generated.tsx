import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CopyOffenderMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.CreateOffenderData;
}>;


export type CopyOffenderMutation = { __typename?: 'Mutation', copyOffender?: { __typename?: 'Offender', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, name?: string | null, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, active?: boolean | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, bans: Array<{ __typename?: 'Ban', id: string, location: string, description?: string | null, startDate?: Date | null, endDate?: Date | null, type?: Types.BanType | null }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> } } | null };


export const CopyOffenderDocument = gql`
    mutation copyOffender($where: UniqueId!, $data: CreateOffenderData!) {
  copyOffender(where: $where, data: $data) {
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
      card
      position
      rotation
      primary
      policeImage
      isFace
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
  }
}
    `;
export type CopyOffenderMutationFn = Apollo.MutationFunction<CopyOffenderMutation, CopyOffenderMutationVariables>;
export function useCopyOffenderMutation(baseOptions?: Apollo.MutationHookOptions<CopyOffenderMutation, CopyOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CopyOffenderMutation, CopyOffenderMutationVariables>(CopyOffenderDocument, options);
      }
export type CopyOffenderMutationHookResult = ReturnType<typeof useCopyOffenderMutation>;
export type CopyOffenderMutationResult = Apollo.MutationResult<CopyOffenderMutation>;
export type CopyOffenderMutationOptions = Apollo.BaseMutationOptions<CopyOffenderMutation, CopyOffenderMutationVariables>;