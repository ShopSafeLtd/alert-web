import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.UserUpdateInput;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  chatWhere?: Types.InputMaybe<Types.UserChatWhereInput>;
  schemeWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, fullName: string, email: string, status?: Types.UserStatus | null, demId?: string | null, publicName: boolean, reportToAllBusinesses?: boolean | null, disabled: boolean, newUser: boolean, incidentEmail: boolean, incidentPush: boolean, bulletinEmails: boolean, bulletinPush: boolean, subscribedIncidentOnly: boolean, subscribedOffenderOnly: boolean, messagePush: boolean, offenderEmail: boolean, offenderPush: boolean, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string, demId?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }>, defaultGroups: Array<{ __typename?: 'Group', id: string, name: string }>, chats: Array<{ __typename?: 'UserChat', id: string, chat: { __typename?: 'Chat', id: string, name: string } }>, schemes: Array<{ __typename?: 'UserScheme', id: string, role: Types.Role }> } };


export const UpdateUserDocument = gql`
    mutation updateUser($where: UniqueId!, $data: UserUpdateInput!, $groupWhere: GroupWhereInput, $chatWhere: UserChatWhereInput, $schemeWhere: UserSchemeWhereInput) {
  updateUser(where: $where, data: $data) {
    id
    fullName
    email
    status
    demId
    publicName
    reportToAllBusinesses
    businesses {
      id
      name
      fullName
      demId
    }
    disabled
    newUser
    incidentEmail
    incidentPush
    bulletinEmails
    bulletinPush
    subscribedIncidentOnly
    subscribedOffenderOnly
    messagePush
    offenderEmail
    offenderPush
    groups(where: $groupWhere) {
      id
      name
    }
    approverGroups(where: $groupWhere) {
      id
      name
    }
    defaultGroups(where: $groupWhere) {
      id
      name
    }
    chats(where: $chatWhere) {
      id
      chat {
        id
        name
      }
    }
    schemes(where: $schemeWhere) {
      id
      role
    }
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;