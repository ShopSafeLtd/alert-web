import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateBusinessMutationVariables = Types.Exact<{
  data: Types.BusinessUpdateInput;
  where: Types.BusinessWhereUniqueInput;
}>;


export type UpdateBusinessMutation = { __typename?: 'Mutation', updateBusiness?: { __typename?: 'Business', id: string, name?: string | null, siteNumber?: string | null, fullName?: string | null, publicName: boolean, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name?: string | null, fullName?: string | null, publicName: boolean } | null, locations: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null, geoLng?: number | null, geoLat?: number | null, full?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> } | null };


export const UpdateBusinessDocument = gql`
    mutation UpdateBusiness($data: BusinessUpdateInput!, $where: BusinessWhereUniqueInput!) {
  updateBusiness(data: $data, where: $where) {
    id
    name
    siteNumber
    fullName
    publicName
    demId
    parent {
      id
      name
      fullName
      publicName
    }
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
    groups {
      id
      name
    }
    tags {
      id
      name
    }
    totalUsers
  }
}
    `;
export type UpdateBusinessMutationFn = Apollo.MutationFunction<UpdateBusinessMutation, UpdateBusinessMutationVariables>;
export function useUpdateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBusinessMutation, UpdateBusinessMutationVariables>(UpdateBusinessDocument, options);
      }
export type UpdateBusinessMutationHookResult = ReturnType<typeof useUpdateBusinessMutation>;
export type UpdateBusinessMutationResult = Apollo.MutationResult<UpdateBusinessMutation>;
export type UpdateBusinessMutationOptions = Apollo.BaseMutationOptions<UpdateBusinessMutation, UpdateBusinessMutationVariables>;