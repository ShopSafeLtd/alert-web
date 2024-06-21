import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { FeedImageFragmentDoc } from '../../fragments/feed-image.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersFeedQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type ListOffendersFeedQuery = {
  __typename?: 'Query';
  listOffenders: {
    __typename?: 'ListOffenders';
    total: number;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      reference?: number | null;
      name?: string | null;
      feedImage?: {
        __typename?: 'Image';
        id: string;
        low?: string | null;
        position: Types.ImagePosition;
        rotation: number;
      } | null;
    }>;
  };
};

export const ListOffendersFeedDocument = gql`
  query listOffendersFeed(
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
        id
        reference
        name
        feedImage {
          ...FeedImage
        }
      }
      total
    }
  }
  ${FeedImageFragmentDoc}
`;
export function useListOffendersFeedQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListOffendersFeedQuery,
    ListOffendersFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListOffendersFeedQuery,
    ListOffendersFeedQueryVariables
  >(ListOffendersFeedDocument, options);
}
export function useListOffendersFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListOffendersFeedQuery,
    ListOffendersFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListOffendersFeedQuery,
    ListOffendersFeedQueryVariables
  >(ListOffendersFeedDocument, options);
}
export type ListOffendersFeedQueryHookResult = ReturnType<
  typeof useListOffendersFeedQuery
>;
export type ListOffendersFeedLazyQueryHookResult = ReturnType<
  typeof useListOffendersFeedLazyQuery
>;
export type ListOffendersFeedQueryResult = Apollo.QueryResult<
  ListOffendersFeedQuery,
  ListOffendersFeedQueryVariables
>;
