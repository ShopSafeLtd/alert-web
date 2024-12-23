import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  chatWhere?: Types.InputMaybe<Types.UserChatWhereInput>;
  schemeWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, fullName: string, email: string, status?: Types.UserStatus | null, demId?: string | null, publicName: boolean, reportToAllBusinesses?: boolean | null, disabled: boolean, newUser: boolean, incidentEmail: boolean, incidentPush: boolean, bulletinEmails: boolean, bulletinPush: boolean, subscribedIncidentOnly: boolean, subscribedOffenderOnly: boolean, messagePush: boolean, offenderEmail: boolean, offenderPush: boolean, totalLastYearLogin: number, totalThirtyDaysLogin: number, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string, demId?: string | null }>, signedTerms?: { __typename?: 'UserTerm', id: string, signature?: string | null, signedAt: Date, terms: { __typename?: 'TermsAndCondition', id: string, version: number } } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }>, defaultGroups: Array<{ __typename?: 'Group', id: string, name: string }>, chats: Array<{ __typename?: 'UserChat', id: string, chat: { __typename?: 'Chat', id: string, name: string } }>, schemes: Array<{ __typename?: 'UserScheme', id: string, schemeId: string, role: Types.Role }>, lastTenLogin: Array<{ __typename?: 'LoginEvent', loginTime: Date, id: string }>, lastLogin?: { __typename?: 'LoginEvent', loginTime: Date, id: string } | null, schemePermission?: { __typename?: 'CustomRole', id: string, name: string, type: Types.Role } | null, sessions: Array<{ __typename?: 'Session', locationLng?: number | null, locationLat?: number | null, createdAt: Date, app: Types.AppType, id: string, updatedAt: Date }> } };


export const UserDocument = gql`
    query User($where: UserWhereUniqueInput!, $groupWhere: GroupWhereInput, $chatWhere: UserChatWhereInput, $schemeWhere: UserSchemeWhereInput) {
  user(where: $where) {
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
    signedTerms {
      id
      signature
      terms {
        id
        version
      }
      signedAt
    }
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
      schemeId
      role
    }
    totalLastYearLogin
    totalThirtyDaysLogin
    lastTenLogin {
      loginTime
      id
    }
    lastLogin {
      loginTime
      id
    }
    schemePermission {
      id
      name
      type
    }
    sessions {
      locationLng
      locationLat
      createdAt
      app
      id
      updatedAt
    }
  }
}
    `;
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;