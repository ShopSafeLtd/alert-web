import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveUserFromBusinessMutationVariables = Types.Exact<{
  data: Types.UserWhereUniqueInput;
  where: Types.BusinessWhereUniqueInput;
  schemeWhere: Types.SchemeWhereUniqueInput;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type RemoveUserFromBusinessMutation = { __typename?: 'Mutation', removeUserFromBusiness: { __typename?: 'Business', id: string, name: string, users: Array<{ __typename?: 'User', id: string, fullName: string, status?: Types.UserStatus | null, publicName: boolean, loginEvents: Array<{ __typename?: 'LoginEvent', loginTime: Date }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const RemoveUserFromBusinessDocument = gql`
    mutation RemoveUserFromBusiness($data: UserWhereUniqueInput!, $where: BusinessWhereUniqueInput!, $schemeWhere: SchemeWhereUniqueInput!, $groupWhere: GroupWhereInput) {
  removeUserFromBusiness(data: $data, where: $where, schemeWhere: $schemeWhere) {
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
export type RemoveUserFromBusinessMutationFn = Apollo.MutationFunction<RemoveUserFromBusinessMutation, RemoveUserFromBusinessMutationVariables>;
export function useRemoveUserFromBusinessMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromBusinessMutation, RemoveUserFromBusinessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromBusinessMutation, RemoveUserFromBusinessMutationVariables>(RemoveUserFromBusinessDocument, options);
      }
export type RemoveUserFromBusinessMutationHookResult = ReturnType<typeof useRemoveUserFromBusinessMutation>;
export type RemoveUserFromBusinessMutationResult = Apollo.MutationResult<RemoveUserFromBusinessMutation>;
export type RemoveUserFromBusinessMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromBusinessMutation, RemoveUserFromBusinessMutationVariables>;