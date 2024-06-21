import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateUserInDatabaseMutationVariables = Types.Exact<{
  data: Types.CreateUserData;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;

export type CreateUserInDatabaseMutation = {
  __typename?: 'Mutation';
  createUserInDatabase: {
    __typename?: 'User';
    id: string;
    fullName: string;
    firstLetter: string;
    origName: string;
    origFirstLetter: string;
    email: string;
    publicName: boolean;
    reportToAllBusinesses: boolean;
    status?: Types.UserStatus | null;
    businesses: Array<{
      __typename?: 'Business';
      id: string;
      name: string;
      fullName: string;
    }>;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
    approverGroups: Array<{ __typename?: 'Group'; id: string; name: string }>;
    loginEvents: Array<{ __typename?: 'LoginEvent'; loginTime: Date }>;
  };
};

export const CreateUserInDatabaseDocument = gql`
  mutation createUserInDatabase(
    $data: CreateUserData!
    $groupWhere: GroupWhereInput
  ) {
    createUserInDatabase(data: $data) {
      id
      fullName
      firstLetter
      origName
      origFirstLetter
      email
      publicName
      reportToAllBusinesses
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
      approverGroups {
        id
        name
      }
      loginEvents {
        loginTime
      }
    }
  }
`;
export type CreateUserInDatabaseMutationFn = Apollo.MutationFunction<
  CreateUserInDatabaseMutation,
  CreateUserInDatabaseMutationVariables
>;
export function useCreateUserInDatabaseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserInDatabaseMutation,
    CreateUserInDatabaseMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateUserInDatabaseMutation,
    CreateUserInDatabaseMutationVariables
  >(CreateUserInDatabaseDocument, options);
}
export type CreateUserInDatabaseMutationHookResult = ReturnType<
  typeof useCreateUserInDatabaseMutation
>;
export type CreateUserInDatabaseMutationResult =
  Apollo.MutationResult<CreateUserInDatabaseMutation>;
export type CreateUserInDatabaseMutationOptions = Apollo.BaseMutationOptions<
  CreateUserInDatabaseMutation,
  CreateUserInDatabaseMutationVariables
>;
