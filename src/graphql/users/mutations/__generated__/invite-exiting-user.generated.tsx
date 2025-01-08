import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteExistingUserMutationVariables = Types.Exact<{
  data: Types.UserUpdateInput;
  where: Types.UniqueId;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type InviteExistingUserMutation = { __typename?: 'Mutation', inviteExistingUser: { __typename?: 'User', id: string, fullName: string, firstLetter: string, origName: string, origFirstLetter: string, email?: string | null, publicName: boolean, reportToAllBusinesses?: boolean | null, status?: Types.UserStatus | null, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }>, loginEvents: Array<{ __typename?: 'LoginEvent', loginTime: Date }> } };


export const InviteExistingUserDocument = gql`
    mutation inviteExistingUser($data: UserUpdateInput!, $where: UniqueId!, $groupWhere: GroupWhereInput) {
  inviteExistingUser(data: $data, where: $where) {
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
export type InviteExistingUserMutationFn = Apollo.MutationFunction<InviteExistingUserMutation, InviteExistingUserMutationVariables>;
export function useInviteExistingUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteExistingUserMutation, InviteExistingUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteExistingUserMutation, InviteExistingUserMutationVariables>(InviteExistingUserDocument, options);
      }
export type InviteExistingUserMutationHookResult = ReturnType<typeof useInviteExistingUserMutation>;
export type InviteExistingUserMutationResult = Apollo.MutationResult<InviteExistingUserMutation>;
export type InviteExistingUserMutationOptions = Apollo.BaseMutationOptions<InviteExistingUserMutation, InviteExistingUserMutationVariables>;