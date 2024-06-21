import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessEngagementQueryVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
}>;

export type BusinessEngagementQuery = {
  __typename?: 'Query';
  businessContribution: {
    __typename?: 'ListBusinessContribution';
    total: number;
    businessContributions: Array<{
      __typename?: 'BusinessContributions';
      name: string;
      totalUsers: number;
      totalIncidents: number;
      totalOffenders: number;
      totalUpdates: number;
      totalMessages: number;
      totalLogins: number;
    }>;
  };
};

export const BusinessEngagementDocument = gql`
  query BusinessEngagement($where: UserContributionWhereInput!) {
    businessContribution(where: $where) {
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
export function useBusinessEngagementQuery(
  baseOptions: Apollo.QueryHookOptions<
    BusinessEngagementQuery,
    BusinessEngagementQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BusinessEngagementQuery,
    BusinessEngagementQueryVariables
  >(BusinessEngagementDocument, options);
}
export function useBusinessEngagementLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BusinessEngagementQuery,
    BusinessEngagementQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BusinessEngagementQuery,
    BusinessEngagementQueryVariables
  >(BusinessEngagementDocument, options);
}
export type BusinessEngagementQueryHookResult = ReturnType<
  typeof useBusinessEngagementQuery
>;
export type BusinessEngagementLazyQueryHookResult = ReturnType<
  typeof useBusinessEngagementLazyQuery
>;
export type BusinessEngagementQueryResult = Apollo.QueryResult<
  BusinessEngagementQuery,
  BusinessEngagementQueryVariables
>;
