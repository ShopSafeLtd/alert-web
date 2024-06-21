import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../fragments/vehicles.generated';
import { OffendersFragmentDoc } from '../../fragments/offenders.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCrimeGroupSuggestedDataMutationVariables = Types.Exact<{
  data: Types.CreateCrimeGroupDataInput;
}>;

export type CreateCrimeGroupSuggestedDataMutation = {
  __typename?: 'Mutation';
  createCrimeGroup: {
    __typename?: 'CrimeGroup';
    id: string;
    alias?: string | null;
    reference?: number | null;
    vehicles: Array<{
      __typename?: 'Vehicle';
      id: string;
      reference?: number | null;
      colour?: string | null;
      model?: string | null;
      make?: string | null;
      registration?: string | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
      }>;
    }>;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      name?: string | null;
      alias: Array<string>;
      age?: Types.Age | null;
      gender?: Types.Gender | null;
      race?: Types.Race | null;
      build?: Types.Build | null;
      height?: Types.Height | null;
      hair?: string | null;
      peculiarities?: string | null;
      comment?: string | null;
      dateSource?: string | null;
      dateOfBirth?: Date | null;
      idVerified: boolean;
      idSource?: Types.IdSource | null;
      knownFor: Array<string>;
      targetedGoods: Array<string>;
      justification?: string | null;
      infoSource?: string | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        isFace?: boolean | null;
      }>;
    }>;
  };
};

export const CreateCrimeGroupSuggestedDataDocument = gql`
  mutation CreateCrimeGroupSuggestedData($data: CreateCrimeGroupDataInput!) {
    createCrimeGroup(data: $data) {
      id
      alias
      reference
      vehicles {
        ...Vehicles
        images {
          id
          optimised
          position
          rotation
        }
      }
      offenders {
        ...Offenders
        images {
          id
          optimised
          position
          rotation
          isFace
        }
      }
    }
  }
  ${VehiclesFragmentDoc}
  ${OffendersFragmentDoc}
`;
export type CreateCrimeGroupSuggestedDataMutationFn = Apollo.MutationFunction<
  CreateCrimeGroupSuggestedDataMutation,
  CreateCrimeGroupSuggestedDataMutationVariables
>;
export function useCreateCrimeGroupSuggestedDataMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCrimeGroupSuggestedDataMutation,
    CreateCrimeGroupSuggestedDataMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCrimeGroupSuggestedDataMutation,
    CreateCrimeGroupSuggestedDataMutationVariables
  >(CreateCrimeGroupSuggestedDataDocument, options);
}
export type CreateCrimeGroupSuggestedDataMutationHookResult = ReturnType<
  typeof useCreateCrimeGroupSuggestedDataMutation
>;
export type CreateCrimeGroupSuggestedDataMutationResult =
  Apollo.MutationResult<CreateCrimeGroupSuggestedDataMutation>;
export type CreateCrimeGroupSuggestedDataMutationOptions =
  Apollo.BaseMutationOptions<
    CreateCrimeGroupSuggestedDataMutation,
    CreateCrimeGroupSuggestedDataMutationVariables
  >;
