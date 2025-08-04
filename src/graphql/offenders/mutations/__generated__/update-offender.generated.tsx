import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.OffenderUpdateInput;
}>;


export type UpdateOffenderMutation = { __typename?: 'Mutation', updateOffender?: { __typename?: 'Offender', id?: string | null, createdAt?: Date | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, name?: string | null, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, active?: boolean | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, bans: Array<{ __typename?: 'Ban', id: string, location: string, description?: string | null, startDate?: Date | null, endDate?: Date | null, type?: Types.BanType | null }>, createdBy: { __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> } } | null };


export const UpdateOffenderDocument = gql`
    mutation updateOffender($where: UniqueId!, $data: OffenderUpdateInput!) {
  updateOffender(where: $where, data: $data) {
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
export type UpdateOffenderMutationFn = Apollo.MutationFunction<UpdateOffenderMutation, UpdateOffenderMutationVariables>;
export function useUpdateOffenderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderMutation, UpdateOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderMutation, UpdateOffenderMutationVariables>(UpdateOffenderDocument, options);
      }
export type UpdateOffenderMutationHookResult = ReturnType<typeof useUpdateOffenderMutation>;
export type UpdateOffenderMutationResult = Apollo.MutationResult<UpdateOffenderMutation>;
export type UpdateOffenderMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderMutation, UpdateOffenderMutationVariables>;