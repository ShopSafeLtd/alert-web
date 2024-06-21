import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddImagesToOffenderMutationVariables = Types.Exact<{
  offender: Types.OffenderWhereUniqueInput;
  images: Array<Types.ImageWhereUniqueInput> | Types.ImageWhereUniqueInput;
}>;

export type AddImagesToOffenderMutation = {
  __typename?: 'Mutation';
  addImagesToOffender: {
    __typename?: 'Offender';
    id: string;
    images: Array<{
      __typename?: 'Image';
      id: string;
      url?: string | null;
      optimised?: string | null;
      card?: string | null;
      position: Types.ImagePosition;
      rotation: number;
    }>;
  };
};

export const AddImagesToOffenderDocument = gql`
  mutation AddImagesToOffender(
    $offender: OffenderWhereUniqueInput!
    $images: [ImageWhereUniqueInput!]!
  ) {
    addImagesToOffender(offender: $offender, images: $images) {
      id
      images {
        id
        url
        optimised
        card
        position
        rotation
      }
    }
  }
`;
export type AddImagesToOffenderMutationFn = Apollo.MutationFunction<
  AddImagesToOffenderMutation,
  AddImagesToOffenderMutationVariables
>;
export function useAddImagesToOffenderMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddImagesToOffenderMutation,
    AddImagesToOffenderMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddImagesToOffenderMutation,
    AddImagesToOffenderMutationVariables
  >(AddImagesToOffenderDocument, options);
}
export type AddImagesToOffenderMutationHookResult = ReturnType<
  typeof useAddImagesToOffenderMutation
>;
export type AddImagesToOffenderMutationResult =
  Apollo.MutationResult<AddImagesToOffenderMutation>;
export type AddImagesToOffenderMutationOptions = Apollo.BaseMutationOptions<
  AddImagesToOffenderMutation,
  AddImagesToOffenderMutationVariables
>;
