import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserEngagementQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.UserContributionOrderByInput>;
}>;


export type UserEngagementQuery = { __typename?: 'Query', userContributions: { __typename?: 'ListUserContribution', total: number, userContributions: Array<{ __typename?: 'UserContribution', name: string, businesses: Array<string>, totalIncidents: number, totalOffenders: number, totalUpdates: number, totalMessages: number, totalLogins: number, lastLogin: string, groups?: Array<string> | null }> } };


export const UserEngagementDocument = gql`
    query UserEngagement($where: UserContributionWhereInput!, $skip: Int, $take: Int, $orderBy: UserContributionOrderByInput) {
  userContributions(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    userContributions {
      name
      businesses
      totalIncidents
      totalOffenders
      totalUpdates
      totalMessages
      totalLogins
      lastLogin
      groups
    }
  }
}
    `;
export function useUserEngagementQuery(baseOptions: Apollo.QueryHookOptions<UserEngagementQuery, UserEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserEngagementQuery, UserEngagementQueryVariables>(UserEngagementDocument, options);
      }
export function useUserEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserEngagementQuery, UserEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserEngagementQuery, UserEngagementQueryVariables>(UserEngagementDocument, options);
        }
export type UserEngagementQueryHookResult = ReturnType<typeof useUserEngagementQuery>;
export type UserEngagementLazyQueryHookResult = ReturnType<typeof useUserEngagementLazyQuery>;
export type UserEngagementQueryResult = Apollo.QueryResult<UserEngagementQuery, UserEngagementQueryVariables>;