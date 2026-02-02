import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderDetailsMutationVariables = Types.Exact<{
  data: Types.OffenderUpdateDetailsInput;
  where: Types.Scalars['String'];
}>;


export type UpdateOffenderDetailsMutation = { __typename?: 'Mutation', updateOffenderDetails: { __typename?: 'Offender', age?: Types.Age | null, alias: Array<string>, build?: Types.Build | null, comment?: string | null, dateOfBirth?: Date | null, dateSource?: string | null, gender?: Types.Gender | null, hair?: string | null, height?: Types.Height | null, idSource?: Types.IdSource | null, idVerified: boolean, wanted: boolean, infoSource?: string | null, justification?: string | null, knownFor: Array<string>, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, targetedGoods: Array<string>, customGalleries: Array<{ __typename?: 'CustomGallery', id: string, name: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const UpdateOffenderDetailsDocument = gql`
    mutation UpdateOffenderDetails($data: OffenderUpdateDetailsInput!, $where: String!) {
  updateOffenderDetails(data: $data, where: $where) {
    age
    alias
    build
    comment
    customGalleries {
      id
      name
    }
    dateOfBirth
    dateSource
    gender
    groups {
      id
      name
    }
    hair
    height
    idSource
    idVerified
    wanted
    infoSource
    justification
    knownFor
    name
    peculiarities
    race
    tags {
      id
      name
    }
    targetedGoods
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