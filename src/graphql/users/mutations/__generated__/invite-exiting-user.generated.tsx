import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteExistingUserMutationVariables = Types.Exact<{
  data: Types.UserUpdateInput;
  where: Types.UniqueId;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type InviteExistingUserMutation = { __typename?: 'Mutation', inviteExistingUser?: { __typename?: 'User', id?: string | null, fullName: string, firstLetter?: string | null, origName?: string | null, origFirstLetter?: string | null, email?: string | null, publicName?: boolean | null, reportToAllBusinesses?: boolean | null, status?: Types.UserStatus | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }> } | null };


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