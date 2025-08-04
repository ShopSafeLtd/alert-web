import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewUserQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  groupWhere?: Types.InputMaybe<Types.GroupWhereInput>;
  chatWhere?: Types.InputMaybe<Types.UserChatWhereInput>;
  schemeWhere?: Types.InputMaybe<Types.UserSchemeWhereInput>;
  sessionWhere?: Types.InputMaybe<Types.SessionWhereInput>;
}>;


export type ViewUserQuery = { __typename?: 'Query', user: { __typename?: 'User', id?: string | null, fullName: string, email?: string | null, mobileNumber?: string | null, status?: Types.UserStatus | null, demId?: string | null, publicName?: boolean | null, reportToAllBusinesses?: boolean | null, disabled?: boolean | null, newUser?: boolean | null, incidentEmail?: boolean | null, incidentPush?: boolean | null, bulletinEmails?: boolean | null, bulletinPush?: boolean | null, subscribedIncidentOnly?: boolean | null, subscribedOffenderOnly?: boolean | null, messagePush?: boolean | null, offenderEmail?: boolean | null, offenderPush?: boolean | null, totalLastYearLogin?: number | null, totalThirtyDaysLogin?: number | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, fullName?: string | null, demId?: string | null }>, signedTerms?: { __typename?: 'UserTerm', id?: string | null, signature?: string | null, signedAt?: Date | null, terms?: { __typename?: 'TermsAndCondition', id?: string | null, version?: number | null } | null } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, approverGroups: Array<{ __typename?: 'Group', id: string, name: string }>, defaultGroups: Array<{ __typename?: 'Group', id: string, name: string }>, chats: Array<{ __typename?: 'UserChat', id?: string | null, chat?: { __typename?: 'Chat', id: string, name: string } | null }>, schemes: Array<{ __typename?: 'UserScheme', id?: string | null, schemeId?: string | null, role?: Types.Role | null }>, schemePermission?: { __typename?: 'CustomRole', id: string, name: string, type: Types.Role } | null, sessions: Array<{ __typename?: 'Session', locationLng?: number | null, locationLat?: number | null, createdAt?: Date | null, app?: Types.AppType | null, id: string, updatedAt?: Date | null }> } };


export const ViewUserDocument = gql`
    query ViewUser($where: UserWhereUniqueInput!, $groupWhere: GroupWhereInput, $chatWhere: UserChatWhereInput, $schemeWhere: UserSchemeWhereInput, $sessionWhere: SessionWhereInput) {
  user(where: $where) {
    id
    fullName
    email
    mobileNumber
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
    schemePermission {
      id
      name
      type
    }
    sessions(take: 10, orderBy: {createdAt: desc}, where: $sessionWhere) {
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
export function useViewUserQuery(baseOptions: Apollo.QueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, options);
      }
export function useViewUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewUserQuery, ViewUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewUserQuery, ViewUserQueryVariables>(ViewUserDocument, options);
        }
export type ViewUserQueryHookResult = ReturnType<typeof useViewUserQuery>;
export type ViewUserLazyQueryHookResult = ReturnType<typeof useViewUserLazyQuery>;
export type ViewUserQueryResult = Apollo.QueryResult<ViewUserQuery, ViewUserQueryVariables>;