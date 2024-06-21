import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBusinessLocationMutationVariables = Types.Exact<{
  data: Types.BusinessUpdateInput;
  where: Types.BusinessWhereUniqueInput;
}>;

export type UpdateBusinessLocationMutation = {
  __typename?: 'Mutation';
  updateBusiness: {
    __typename?: 'Business';
    id: string;
    locations: Array<{
      __typename?: 'Address';
      id: string;
      building?: string | null;
      street?: string | null;
      townCity?: string | null;
      county?: string | null;
      postcode?: string | null;
      geoLng?: number | null;
      geoLat?: number | null;
      full: string;
    }>;
  };
};

export const UpdateBusinessLocationDocument = gql`
  mutation UpdateBusinessLocation(
    $data: BusinessUpdateInput!
    $where: BusinessWhereUniqueInput!
  ) {
    updateBusiness(data: $data, where: $where) {
      id
      locations {
        id
        building
        street
        townCity
        county
        postcode
        geoLng
        geoLat
        full
      }
    }
  }
`;
export type UpdateBusinessLocationMutationFn = Apollo.MutationFunction<
  UpdateBusinessLocationMutation,
  UpdateBusinessLocationMutationVariables
>;
export function useUpdateBusinessLocationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBusinessLocationMutation,
    UpdateBusinessLocationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateBusinessLocationMutation,
    UpdateBusinessLocationMutationVariables
  >(UpdateBusinessLocationDocument, options);
}
export type UpdateBusinessLocationMutationHookResult = ReturnType<
  typeof useUpdateBusinessLocationMutation
>;
export type UpdateBusinessLocationMutationResult =
  Apollo.MutationResult<UpdateBusinessLocationMutation>;
export type UpdateBusinessLocationMutationOptions = Apollo.BaseMutationOptions<
  UpdateBusinessLocationMutation,
  UpdateBusinessLocationMutationVariables
>;
