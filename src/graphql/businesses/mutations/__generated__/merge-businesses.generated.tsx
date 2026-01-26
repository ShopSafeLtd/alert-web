import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MergeBusinessesMutationVariables = Types.Exact<{
  data: Types.MergeBusinessesInput;
}>;


export type MergeBusinessesMutation = { __typename?: 'Mutation', mergeBusinesses: { __typename?: 'Business', id: string, name: string, siteNumber?: string | null, fullName: string, publicName: boolean, policeArea: Array<Types.PoliceForce>, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name: string } | null, locations: Array<{ __typename?: 'Address', id: string, full: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const MergeBusinessesDocument = gql`
    mutation MergeBusinesses($data: MergeBusinessesInput!) {
  mergeBusinesses(data: $data) {
    id
    name
    siteNumber
    fullName
    publicName
    policeArea
    demId
    parent {
      id
      name
    }
    locations {
      id
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
export type MergeBusinessesMutationFn = Apollo.MutationFunction<MergeBusinessesMutation, MergeBusinessesMutationVariables>;
export function useMergeBusinessesMutation(baseOptions?: Apollo.MutationHookOptions<MergeBusinessesMutation, MergeBusinessesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MergeBusinessesMutation, MergeBusinessesMutationVariables>(MergeBusinessesDocument, options);
      }
export type MergeBusinessesMutationHookResult = ReturnType<typeof useMergeBusinessesMutation>;
export type MergeBusinessesMutationResult = Apollo.MutationResult<MergeBusinessesMutation>;
export type MergeBusinessesMutationOptions = Apollo.BaseMutationOptions<MergeBusinessesMutation, MergeBusinessesMutationVariables>;