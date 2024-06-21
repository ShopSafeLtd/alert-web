import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { LocationsFragmentDoc } from '../../../fragments/location.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderAddressesMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  addresses?: Types.InputMaybe<Types.UpdateSimpleLocationOnOffender>;
}>;

export type UpdateOffenderAddressesMutation = {
  __typename?: 'Mutation';
  updateOffender: {
    __typename?: 'Offender';
    id: string;
    addresses: Array<{
      __typename?: 'Address';
      id: string;
      building?: string | null;
      street?: string | null;
      townCity?: string | null;
      county?: string | null;
      postcode?: string | null;
      geoLat?: number | null;
      geoLng?: number | null;
      full: string;
      alias?: string | null;
    }>;
  };
};

export const UpdateOffenderAddressesDocument = gql`
  mutation updateOffenderAddresses(
    $id: String!
    $addresses: UpdateSimpleLocationOnOffender
  ) {
    updateOffender(where: { id: $id }, data: { addresses: $addresses }) {
      id
      addresses {
        ...Locations
      }
    }
  }
  ${LocationsFragmentDoc}
`;
export type UpdateOffenderAddressesMutationFn = Apollo.MutationFunction<
  UpdateOffenderAddressesMutation,
  UpdateOffenderAddressesMutationVariables
>;
export function useUpdateOffenderAddressesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateOffenderAddressesMutation,
    UpdateOffenderAddressesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateOffenderAddressesMutation,
    UpdateOffenderAddressesMutationVariables
  >(UpdateOffenderAddressesDocument, options);
}
export type UpdateOffenderAddressesMutationHookResult = ReturnType<
  typeof useUpdateOffenderAddressesMutation
>;
export type UpdateOffenderAddressesMutationResult =
  Apollo.MutationResult<UpdateOffenderAddressesMutation>;
export type UpdateOffenderAddressesMutationOptions = Apollo.BaseMutationOptions<
  UpdateOffenderAddressesMutation,
  UpdateOffenderAddressesMutationVariables
>;
