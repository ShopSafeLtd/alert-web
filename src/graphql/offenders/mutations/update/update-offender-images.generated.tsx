import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../fragments/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderImagesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  images?: Types.InputMaybe<Types.ImageUpdateManyWithoutOffenderNestedInput>;
}>;

export type UpdateOffenderImagesMutation = {
  __typename?: 'Mutation';
  updateOffender: {
    __typename?: 'Offender';
    id: string;
    images: Array<{
      __typename?: 'Image';
      optimisticUri?: string | null;
      id: string;
      url?: string | null;
      optimised?: string | null;
      position: Types.ImagePosition;
      rotation: number;
      primary?: boolean | null;
      policeImage?: boolean | null;
      card?: string | null;
    }>;
  };
};

export const UpdateOffenderImagesDocument = gql`
  mutation updateOffenderImages(
    $id: String!
    $images: ImageUpdateManyWithoutOffenderNestedInput
  ) {
    updateOffender(where: { id: $id }, data: { images: $images }) {
      id
      images {
        ...Images
        optimisticUri
      }
    }
  }
  ${ImagesFragmentDoc}
`;
export type UpdateOffenderImagesMutationFn = Apollo.MutationFunction<
  UpdateOffenderImagesMutation,
  UpdateOffenderImagesMutationVariables
>;
export function useUpdateOffenderImagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOffenderImagesMutation,
    UpdateOffenderImagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateOffenderImagesMutation,
    UpdateOffenderImagesMutationVariables
  >(UpdateOffenderImagesDocument, options);
}
export type UpdateOffenderImagesMutationHookResult = ReturnType<
  typeof useUpdateOffenderImagesMutation
>;
export type UpdateOffenderImagesMutationResult =
  Apollo.MutationResult<UpdateOffenderImagesMutation>;
export type UpdateOffenderImagesMutationOptions = Apollo.BaseMutationOptions<
  UpdateOffenderImagesMutation,
  UpdateOffenderImagesMutationVariables
>;
