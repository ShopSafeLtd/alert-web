import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateBusinessMutationVariables = Types.Exact<{
  data: Types.CreateBusinessDataInput;
}>;


export type CreateBusinessMutation = { __typename?: 'Mutation', createBusiness?: { __typename?: 'Business', id: string, name?: string | null, fullName?: string | null, publicName: boolean, policeArea?: Array<Types.PoliceForce> | null, siteNumber?: string | null, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name?: string | null } | null, locations: Array<{ __typename?: 'Address', id: string, full?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> } | null };


export const CreateBusinessDocument = gql`
    mutation CreateBusiness($data: CreateBusinessDataInput!) {
  createBusiness(data: $data) {
    id
    name
    fullName
    publicName
    policeArea
    siteNumber
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
export type CreateBusinessMutationFn = Apollo.MutationFunction<CreateBusinessMutation, CreateBusinessMutationVariables>;
export function useCreateBusinessMutation(baseOptions?: Apollo.MutationHookOptions<CreateBusinessMutation, CreateBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBusinessMutation, CreateBusinessMutationVariables>(CreateBusinessDocument, options);
      }
export type CreateBusinessMutationHookResult = ReturnType<typeof useCreateBusinessMutation>;
export type CreateBusinessMutationResult = Apollo.MutationResult<CreateBusinessMutation>;
export type CreateBusinessMutationOptions = Apollo.BaseMutationOptions<CreateBusinessMutation, CreateBusinessMutationVariables>;