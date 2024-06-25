import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddUsersToBusinessMutationVariables = Types.Exact<{
  data: Array<Types.UserWhereUniqueInput> | Types.UserWhereUniqueInput;
  where: Types.BusinessWhereUniqueInput;
  schemeWhere: Types.SchemeWhereUniqueInput;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type AddUsersToBusinessMutation = { __typename?: 'Mutation', addUsersToBusiness: { __typename?: 'Business', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, status?: Types.UserStatus | null, publicName: boolean, loginEvents: Array<{ __typename?: 'LoginEvent', loginTime: Date }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const AddUsersToBusinessDocument = gql`
    mutation AddUsersToBusiness($data: [UserWhereUniqueInput!]!, $where: BusinessWhereUniqueInput!, $schemeWhere: SchemeWhereUniqueInput!, $groupWhere: GroupWhereInput) {
  addUsersToBusiness(data: $data, where: $where, schemeWhere: $schemeWhere) {
    id
    name
    users {
      id
      fullName
      status
      publicName
      loginEvents {
        loginTime
      }
      groups(where: $groupWhere) {
        id
        name
      }
    }
  }
}
    `;
export type AddUsersToBusinessMutationFn = Apollo.MutationFunction<AddUsersToBusinessMutation, AddUsersToBusinessMutationVariables>;
export function useAddUsersToBusinessMutation(baseOptions?: Apollo.MutationHookOptions<AddUsersToBusinessMutation, AddUsersToBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUsersToBusinessMutation, AddUsersToBusinessMutationVariables>(AddUsersToBusinessDocument, options);
      }
export type AddUsersToBusinessMutationHookResult = ReturnType<typeof useAddUsersToBusinessMutation>;
export type AddUsersToBusinessMutationResult = Apollo.MutationResult<AddUsersToBusinessMutation>;
export type AddUsersToBusinessMutationOptions = Apollo.BaseMutationOptions<AddUsersToBusinessMutation, AddUsersToBusinessMutationVariables>;