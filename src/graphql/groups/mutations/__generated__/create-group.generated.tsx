import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateGroupMutationVariables = Types.Exact<{
  data: Types.GroupCreateInput;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, description?: string | null, users: Array<{ __typename?: 'User', id: string, fullName: string }>, approver: Array<{ __typename?: 'User', id: string, fullName: string }>, scheme: { __typename?: 'Scheme', id: string, name: string } } };


export const CreateGroupDocument = gql`
    mutation createGroup($data: GroupCreateInput!) {
  createGroup(data: $data) {
    id
    name
    description
    users {
      id
      fullName
    }
    approver {
      id
      fullName
    }
    scheme {
      id
      name
    }
  }
}
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;