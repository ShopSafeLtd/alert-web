import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { OffenderCardFragmentDoc } from '../../../../../../graphql/fragments/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderFeedListQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type OffenderFeedListQuery = {
  __typename?: 'Query';
  listOffenders: {
    __typename?: 'ListOffenders';
    total: number;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      name?: string | null;
      totalIncidents: number;
      reference?: number | null;
      totalImages: number;
      approved?: boolean | null;
      knownFor: Array<string>;
      targetedGoods: Array<string>;
      totalValue: number;
      comment?: string | null;
      createdByUser: boolean;
      idVerified: boolean;
      latestIncident?: {
        __typename?: 'Incident';
        id: string;
        dateAgo: number;
        reportedBusinessName: string;
        dayTime: string;
      } | null;
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      images: Array<{
        __typename?: 'Image';
        id: string;
        rotation: number;
        position: Types.ImagePosition;
        optimised?: string | null;
        primary?: boolean | null;
        policeImage?: boolean | null;
        isFace?: boolean | null;
      }>;
    }>;
  };
};

export type ListOffendersRelayQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  scheme?: Types.InputMaybe<Types.SchemeWhereUniqueInput>;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  orderByValue?: Types.InputMaybe<Types.SortOrder>;
}>;

export type ListOffendersRelayQuery = {
  __typename?: 'Query';
  listOffendersRelay: {
    __typename?: 'QueryListOffendersRelayConnection';
    pageInfo: {
      __typename?: 'PageInfo';
      hasNextPage: boolean;
      endCursor?: string | null;
    };
    edges: Array<{
      __typename?: 'QueryListOffendersRelayConnectionEdge';
      node: {
        __typename?: 'Offender';
        id: string;
        name?: string | null;
        totalIncidents: number;
        reference?: number | null;
        totalImages: number;
        approved?: boolean | null;
        knownFor: Array<string>;
        targetedGoods: Array<string>;
        totalValue: number;
        comment?: string | null;
        createdByUser: boolean;
        idVerified: boolean;
        latestIncident?: {
          __typename?: 'Incident';
          id: string;
          dateAgo: number;
          reportedBusinessName: string;
          dayTime: string;
        } | null;
        tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
        images: Array<{
          __typename?: 'Image';
          id: string;
          rotation: number;
          position: Types.ImagePosition;
          optimised?: string | null;
          primary?: boolean | null;
          policeImage?: boolean | null;
          isFace?: boolean | null;
        }>;
      };
    }>;
  };
};

export const OffenderFeedListDocument = gql`
  query offenderFeedList(
    $scheme: SchemeWhereUniqueInput!
    $where: OffenderWhereInput
    $order: OffenderOrderByWithRelationInput
    $take: Int
    $skip: Int
  ) {
    listOffenders(
      scheme: $scheme
      where: $where
      order: $order
      take: $take
      skip: $skip
    ) {
      offenders {
        ...OffenderCard
      }
      total
    }
  }
  ${OffenderCardFragmentDoc}
`;
export function useOffenderFeedListQuery(
  baseOptions: Apollo.QueryHookOptions<
    OffenderFeedListQuery,
    OffenderFeedListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OffenderFeedListQuery, OffenderFeedListQueryVariables>(
    OffenderFeedListDocument,
    options
  );
}
export function useOffenderFeedListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OffenderFeedListQuery,
    OffenderFeedListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    OffenderFeedListQuery,
    OffenderFeedListQueryVariables
  >(OffenderFeedListDocument, options);
}
export type OffenderFeedListQueryHookResult = ReturnType<
  typeof useOffenderFeedListQuery
>;
export type OffenderFeedListLazyQueryHookResult = ReturnType<
  typeof useOffenderFeedListLazyQuery
>;
export type OffenderFeedListQueryResult = Apollo.QueryResult<
  OffenderFeedListQuery,
  OffenderFeedListQueryVariables
>;
export const ListOffendersRelayDocument = gql`
  query ListOffendersRelay(
    $after: String
    $first: Int
    $order: OffenderOrderByWithRelationInput
    $scheme: SchemeWhereUniqueInput
    $where: OffenderWhereInput
    $orderByValue: SortOrder
  ) {
    listOffendersRelay(
      after: $after
      first: $first
      order: $order
      scheme: $scheme
      where: $where
      orderByValue: $orderByValue
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          ...OffenderCard
        }
      }
    }
  }
  ${OffenderCardFragmentDoc}
`;
export function useListOffendersRelayQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListOffendersRelayQuery,
    ListOffendersRelayQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListOffendersRelayQuery,
    ListOffendersRelayQueryVariables
  >(ListOffendersRelayDocument, options);
}
export function useListOffendersRelayLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListOffendersRelayQuery,
    ListOffendersRelayQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListOffendersRelayQuery,
    ListOffendersRelayQueryVariables
  >(ListOffendersRelayDocument, options);
}
export type ListOffendersRelayQueryHookResult = ReturnType<
  typeof useListOffendersRelayQuery
>;
export type ListOffendersRelayLazyQueryHookResult = ReturnType<
  typeof useListOffendersRelayLazyQuery
>;
export type ListOffendersRelayQueryResult = Apollo.QueryResult<
  ListOffendersRelayQuery,
  ListOffendersRelayQueryVariables
>;
