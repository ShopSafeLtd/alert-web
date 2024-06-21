import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderCustomGalleriesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  customGalleries?: Types.InputMaybe<Types.NestedCustomGalleryOnOffender>;
}>;

export type UpdateOffenderCustomGalleriesMutation = {
  __typename?: 'Mutation';
  updateOffender: {
    __typename?: 'Offender';
    id: string;
    customGalleries: Array<{
      __typename?: 'CustomGallery';
      id: string;
      name: string;
    }>;
  };
};

export const UpdateOffenderCustomGalleriesDocument = gql`
  mutation updateOffenderCustomGalleries(
    $id: String!
    $customGalleries: NestedCustomGalleryOnOffender
  ) {
    updateOffender(
      where: { id: $id }
      data: { customGalleries: $customGalleries }
    ) {
      id
      customGalleries {
        id
        name
      }
    }
  }
`;
export type UpdateOffenderCustomGalleriesMutationFn = Apollo.MutationFunction<
  UpdateOffenderCustomGalleriesMutation,
  UpdateOffenderCustomGalleriesMutationVariables
>;
export function useUpdateOffenderCustomGalleriesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOffenderCustomGalleriesMutation,
    UpdateOffenderCustomGalleriesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateOffenderCustomGalleriesMutation,
    UpdateOffenderCustomGalleriesMutationVariables
  >(UpdateOffenderCustomGalleriesDocument, options);
}
export type UpdateOffenderCustomGalleriesMutationHookResult = ReturnType<
  typeof useUpdateOffenderCustomGalleriesMutation
>;
export type UpdateOffenderCustomGalleriesMutationResult =
  Apollo.MutationResult<UpdateOffenderCustomGalleriesMutation>;
export type UpdateOffenderCustomGalleriesMutationOptions =
  Apollo.BaseMutationOptions<
    UpdateOffenderCustomGalleriesMutation,
    UpdateOffenderCustomGalleriesMutationVariables
  >;
