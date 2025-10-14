import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserInDatabaseMutationVariables = Types.Exact<{
  data: Types.CreateUserData;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type CreateUserInDatabaseMutation = { __typename?: 'Mutation', createUserInDatabase: { __typename?: 'User', id: string, fullName: string, status?: Types.UserStatus | null, publicName: boolean, email?: string | null, mobileNumber?: string | null, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const CreateUserInDatabaseDocument = gql`
    mutation createUserInDatabase($data: CreateUserData!, $groupWhere: GroupWhereInput) {
  createUserInDatabase(data: $data) {
    id
    fullName
    status
    publicName
    email
    mobileNumber
    businesses {
      id
      name
      fullName
    }
    status
    groups(where: $groupWhere) {
      id
      name
    }
  }
}
    `;
export type CreateUserInDatabaseMutationFn = Apollo.MutationFunction<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>;
export function useCreateUserInDatabaseMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>(CreateUserInDatabaseDocument, options);
      }
export type CreateUserInDatabaseMutationHookResult = ReturnType<typeof useCreateUserInDatabaseMutation>;
export type CreateUserInDatabaseMutationResult = Apollo.MutationResult<CreateUserInDatabaseMutation>;
export type CreateUserInDatabaseMutationOptions = Apollo.BaseMutationOptions<CreateUserInDatabaseMutation, CreateUserInDatabaseMutationVariables>;