import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateVehicleMutationVariables = Types.Exact<{
  data: Types.CreateVehicleDataInput;
}>;

export type CreateVehicleMutation = {
  __typename?: 'Mutation';
  createVehicle: {
    __typename?: 'Vehicle';
    id: string;
    make?: string | null;
    model?: string | null;
    registration?: string | null;
    totalOffenders: number;
    totalIncidents: number;
    totalCrimeGroups: number;
    reference?: number | null;
    updatedAt: Date;
    colour?: string | null;
    images: Array<{
      __typename?: 'Image';
      id: string;
      optimised?: string | null;
      url?: string | null;
      position: Types.ImagePosition;
      rotation: number;
    }>;
    incidents: Array<{
      __typename?: 'Incident';
      id: string;
      subject?: string | null;
    }>;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      name?: string | null;
    }>;
    crimeGroup: Array<{
      __typename?: 'CrimeGroup';
      id: string;
      reference?: number | null;
    }>;
    customGalleries: Array<{
      __typename?: 'CustomGallery';
      id: string;
      name: string;
    }>;
  };
};

export const CreateVehicleDocument = gql`
  mutation CreateVehicle($data: CreateVehicleDataInput!) {
    createVehicle(data: $data) {
      id
      make
      model
      registration
      totalOffenders
      totalIncidents
      totalCrimeGroups
      reference
      images {
        id
        optimised
        url
        position
        rotation
      }
      incidents {
        id
        subject
      }
      offenders {
        id
        name
      }
      updatedAt
      colour
      crimeGroup {
        id
        reference
      }
      customGalleries {
        id
        name
      }
    }
  }
`;
export type CreateVehicleMutationFn = Apollo.MutationFunction<
  CreateVehicleMutation,
  CreateVehicleMutationVariables
>;
export function useCreateVehicleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVehicleMutation,
    CreateVehicleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateVehicleMutation,
    CreateVehicleMutationVariables
  >(CreateVehicleDocument, options);
}
export type CreateVehicleMutationHookResult = ReturnType<
  typeof useCreateVehicleMutation
>;
export type CreateVehicleMutationResult =
  Apollo.MutationResult<CreateVehicleMutation>;
export type CreateVehicleMutationOptions = Apollo.BaseMutationOptions<
  CreateVehicleMutation,
  CreateVehicleMutationVariables
>;
