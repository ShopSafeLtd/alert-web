import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderDetailsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  data: Types.OffenderUpdateInput;
}>;


export type UpdateOffenderDetailsMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, alias: Array<string>, infoSource?: string | null, knownFor: Array<string>, targetedGoods: Array<string>, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, gender?: Types.Gender | null, comment?: string | null, name?: string | null, reference?: number | null, race?: Types.Race | null, peculiarities?: string | null, approved?: boolean | null, idVerified: boolean, idSource?: Types.IdSource | null, justification?: string | null, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const UpdateOffenderDetailsDocument = gql`
    mutation updateOffenderDetails($id: String!, $data: OffenderUpdateInput!) {
  updateOffender(where: {id: $id}, data: $data) {
    id
    alias
    infoSource
    knownFor
    targetedGoods
    age
    build
    height
    dateOfBirth
    dateSource
    hair
    gender
    comment
    name
    reference
    race
    peculiarities
    approved
    idVerified
    idSource
    justification
    customGalleries {
      id
      name
    }
    groups {
      id
      name
    }
    tags {
      id
      name
    }
  }
}
    `;
export type UpdateOffenderDetailsMutationFn = Apollo.MutationFunction<UpdateOffenderDetailsMutation, UpdateOffenderDetailsMutationVariables>;
export function useUpdateOffenderDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderDetailsMutation, UpdateOffenderDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderDetailsMutation, UpdateOffenderDetailsMutationVariables>(UpdateOffenderDetailsDocument, options);
      }
export type UpdateOffenderDetailsMutationHookResult = ReturnType<typeof useUpdateOffenderDetailsMutation>;
export type UpdateOffenderDetailsMutationResult = Apollo.MutationResult<UpdateOffenderDetailsMutation>;
export type UpdateOffenderDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderDetailsMutation, UpdateOffenderDetailsMutationVariables>;