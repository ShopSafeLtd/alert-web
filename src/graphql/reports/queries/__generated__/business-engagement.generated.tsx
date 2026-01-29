import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessEngagementQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.BusinessContributionOrderByInput>;
}>;


export type BusinessEngagementQuery = { __typename?: 'Query', businessContribution: { __typename?: 'ListBusinessContribution', total: number, businessContributions: Array<{ __typename?: 'BusinessContributions', name: string, totalUsers: number, totalIncidents: number, totalOffenders: number, totalUpdates: number, totalMessages: number, totalLogins: number }> } };


export const BusinessEngagementDocument = gql`
    query BusinessEngagement($where: UserContributionWhereInput!, $skip: Int, $take: Int, $orderBy: BusinessContributionOrderByInput) {
  businessContribution(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    businessContributions {
      name
      totalUsers
      totalIncidents
      totalOffenders
      totalUpdates
      totalMessages
      totalLogins
    }
    total
  }
}
    `;
export function useBusinessEngagementQuery(baseOptions: Apollo.QueryHookOptions<BusinessEngagementQuery, BusinessEngagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessEngagementQuery, BusinessEngagementQueryVariables>(BusinessEngagementDocument, options);
      }
export function useBusinessEngagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessEngagementQuery, BusinessEngagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessEngagementQuery, BusinessEngagementQueryVariables>(BusinessEngagementDocument, options);
        }
export type BusinessEngagementQueryHookResult = ReturnType<typeof useBusinessEngagementQuery>;
export type BusinessEngagementLazyQueryHookResult = ReturnType<typeof useBusinessEngagementLazyQuery>;
export type BusinessEngagementQueryResult = Apollo.QueryResult<BusinessEngagementQuery, BusinessEngagementQueryVariables>;