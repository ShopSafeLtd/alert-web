import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OffenderFeedQueryVariables = Types.Exact<{
  userId: Types.Scalars['String'];
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
  active?: Types.InputMaybe<Types.Scalars['Boolean']>;
  banned?: Types.InputMaybe<Types.Scalars['Boolean']>;
  groups?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['String']>>
    | Types.InputMaybe<Types.Scalars['String']>
  >;
  tags?: Types.InputMaybe<
    Array<Types.Scalars['String']> | Types.Scalars['String']
  >;
  ethnicity?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['String']>>
    | Types.InputMaybe<Types.Scalars['String']>
  >;
  sex?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars['String']>>
    | Types.InputMaybe<Types.Scalars['String']>
  >;
  approved?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;

export type OffenderFeedQuery = {
  __typename?: 'Query';
  offenderFeed: Array<{
    __typename?: 'Offender';
    id: string;
    createdAt: Date;
    updatedAt: Date;
    totalIncidents: number;
    reference?: number | null;
    age?: Types.Age | null;
    build?: Types.Build | null;
    height?: Types.Height | null;
    dateOfBirth?: Date | null;
    dateSource?: string | null;
    gender?: Types.Gender | null;
    hair?: string | null;
    name?: string | null;
    peculiarities?: string | null;
    race?: Types.Race | null;
    approved?: boolean | null;
    uploaded?: boolean | null;
    active?: boolean | null;
    images: Array<{
      __typename?: 'Image';
      id: string;
      url?: string | null;
      optimised?: string | null;
      card?: string | null;
      position: Types.ImagePosition;
      rotation: number;
    }>;
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
    groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
    createdBy: {
      __typename?: 'User';
      id: string;
      fullName: string;
      businesses: Array<{ __typename?: 'Business'; id: string; name: string }>;
    };
  }>;
};

export const OffenderFeedDocument = gql`
  query offenderFeed(
    $userId: String!
    $schemeId: String!
    $search: String
    $order: OffenderOrderByWithRelationInput
    $first: Int
    $cursor: String
    $active: Boolean
    $banned: Boolean
    $groups: [String]
    $tags: [String!]
    $ethnicity: [String]
    $sex: [String]
    $approved: Boolean
  ) {
    offenderFeed(
      userId: $userId
      schemeId: $schemeId
      search: $search
      order: $order
      first: $first
      after: $cursor
      active: $active
      banned: $banned
      groups: $groups
      tags: $tags
      ethnicity: $ethnicity
      sex: $sex
      approved: $approved
    ) {
      id
      createdAt
      updatedAt
      totalIncidents
      reference
      age
      build
      height
      dateOfBirth
      dateSource
      gender
      hair
      name
      peculiarities
      race
      approved
      uploaded
      active
      images {
        id
        url
        optimised
        card
        position
        rotation
      }
      tags {
        id
        name
      }
      groups {
        id
        name
      }
      createdBy {
        id
        fullName
        businesses {
          id
          name
        }
      }
    }
  }
`;
export function useOffenderFeedQuery(
  baseOptions: Apollo.QueryHookOptions<
    OffenderFeedQuery,
    OffenderFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OffenderFeedQuery, OffenderFeedQueryVariables>(
    OffenderFeedDocument,
    options
  );
}
export function useOffenderFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OffenderFeedQuery,
    OffenderFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OffenderFeedQuery, OffenderFeedQueryVariables>(
    OffenderFeedDocument,
    options
  );
}
export type OffenderFeedQueryHookResult = ReturnType<
  typeof useOffenderFeedQuery
>;
export type OffenderFeedLazyQueryHookResult = ReturnType<
  typeof useOffenderFeedLazyQuery
>;
export type OffenderFeedQueryResult = Apollo.QueryResult<
  OffenderFeedQuery,
  OffenderFeedQueryVariables
>;
