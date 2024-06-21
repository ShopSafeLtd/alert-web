import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersSelectQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type ListOffendersSelectQuery = {
  __typename?: 'Query';
  listOffenders: {
    __typename?: 'ListOffenders';
    total: number;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      reference?: number | null;
      totalImages: number;
      createdAt: Date;
      updatedAt: Date;
      totalIncidents: number;
      age?: Types.Age | null;
      build?: Types.Build | null;
      height?: Types.Height | null;
      dateOfBirth?: Date | null;
      dateSource?: string | null;
      hair?: string | null;
      gender?: Types.Gender | null;
      name?: string | null;
      race?: Types.Race | null;
      peculiarities?: string | null;
      approved?: boolean | null;
      active?: boolean | null;
      lastActive?: {
        __typename?: 'Incident';
        id: string;
        dayTime: string;
      } | null;
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      images: Array<{
        __typename?: 'Image';
        id: string;
        optimisedPersisted?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        primary?: boolean | null;
        policeImage?: boolean | null;
        isFace?: boolean | null;
      }>;
      groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
      createdBy: {
        __typename?: 'User';
        id: string;
        fullName: string;
        businesses: Array<{
          __typename?: 'Business';
          id: string;
          name: string;
        }>;
      };
      incidents: Array<{
        __typename?: 'Incident';
        id: string;
        reference?: number | null;
        subject?: string | null;
        description: string;
        dayTime: string;
        date: Date;
        location?: { __typename?: 'Address'; id: string; full: string } | null;
        createdBy: {
          __typename?: 'User';
          id: string;
          fullName: string;
          businesses: Array<{
            __typename?: 'Business';
            id: string;
            name: string;
          }>;
        };
      }>;
    }>;
  };
};

export const ListOffendersSelectDocument = gql`
  query listOffendersSelect(
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
        totalImages
        createdAt
        updatedAt
        totalIncidents
        reference
        age
        build
        height
        dateOfBirth
        dateSource
        hair
        gender
        name
        race
        peculiarities
        approved
        active
        lastActive {
          id
          dayTime
        }
        tags {
          id
          name
        }
        images {
          id
          optimisedPersisted
          position
          rotation
          primary
          policeImage
          isFace
        }
        groups {
          id
          name
        }
        tags {
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
        incidents {
          id
          reference
          subject
          description
          dayTime
          date
          location {
            id
            full
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
      total
    }
  }
`;
export function useListOffendersSelectQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListOffendersSelectQuery,
    ListOffendersSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListOffendersSelectQuery,
    ListOffendersSelectQueryVariables
  >(ListOffendersSelectDocument, options);
}
export function useListOffendersSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListOffendersSelectQuery,
    ListOffendersSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListOffendersSelectQuery,
    ListOffendersSelectQueryVariables
  >(ListOffendersSelectDocument, options);
}
export type ListOffendersSelectQueryHookResult = ReturnType<
  typeof useListOffendersSelectQuery
>;
export type ListOffendersSelectLazyQueryHookResult = ReturnType<
  typeof useListOffendersSelectLazyQuery
>;
export type ListOffendersSelectQueryResult = Apollo.QueryResult<
  ListOffendersSelectQuery,
  ListOffendersSelectQueryVariables
>;
