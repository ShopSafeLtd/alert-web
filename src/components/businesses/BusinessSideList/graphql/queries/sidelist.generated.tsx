import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessesSideListQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  orderBy?: Types.InputMaybe<
    Array<Types.BusinessOrderBy> | Types.BusinessOrderBy
  >;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;

export type BusinessesSideListQuery = {
  __typename?: 'Query';
  businessRelay: {
    __typename?: 'QueryBusinessRelayConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'QueryBusinessRelayConnectionEdge';
      node: {
        __typename?: 'Business';
        id: string;
        name: string;
        siteNumber?: string | null;
        locations: Array<{ __typename?: 'Address'; full: string }>;
      };
    }>;
    pageInfo: {
      __typename?: 'PageInfo';
      endCursor?: string | null;
      hasNextPage: boolean;
    };
  };
};

export const BusinessesSideListDocument = gql`
  query BusinessesSideList(
    $where: BusinessWhereInput
    $orderBy: [BusinessOrderBy!]
    $first: Int
    $after: String
  ) {
    businessRelay(
      where: $where
      orderBy: $orderBy
      first: $first
      after: $after
    ) {
      totalCount
      edges {
        node {
          id
          name
          siteNumber
          locations {
            full
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
export function useBusinessesSideListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    BusinessesSideListQuery,
    BusinessesSideListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    BusinessesSideListQuery,
    BusinessesSideListQueryVariables
  >(BusinessesSideListDocument, options);
}
export function useBusinessesSideListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BusinessesSideListQuery,
    BusinessesSideListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    BusinessesSideListQuery,
    BusinessesSideListQueryVariables
  >(BusinessesSideListDocument, options);
}
export type BusinessesSideListQueryHookResult = ReturnType<
  typeof useBusinessesSideListQuery
>;
export type BusinessesSideListLazyQueryHookResult = ReturnType<
  typeof useBusinessesSideListLazyQuery
>;
export type BusinessesSideListQueryResult = Apollo.QueryResult<
  BusinessesSideListQuery,
  BusinessesSideListQueryVariables
>;
