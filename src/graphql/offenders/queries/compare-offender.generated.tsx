import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewOffenderCompareQueryVariables = Types.Exact<{
  where: Types.OffenderWhereUniqueInput;
}>;

export type ViewOffenderCompareQuery = {
  __typename?: 'Query';
  offender: {
    __typename?: 'Offender';
    id: string;
    updatedAt: Date;
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
    images: Array<{
      __typename?: 'Image';
      id: string;
      optimised?: string | null;
      position: Types.ImagePosition;
      rotation: number;
    }>;
    tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
    lastActive?: {
      __typename?: 'Incident';
      id: string;
      dayTime: string;
    } | null;
  };
};

export const ViewOffenderCompareDocument = gql`
  query ViewOffenderCompare($where: OffenderWhereUniqueInput!) {
    offender(where: $where) {
      id
      updatedAt
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
      images {
        id
        optimised
        position
        rotation
      }
      tags {
        id
        name
      }
      lastActive {
        id
        dayTime
      }
    }
  }
`;
export function useViewOffenderCompareQuery(
  baseOptions: Apollo.QueryHookOptions<
    ViewOffenderCompareQuery,
    ViewOffenderCompareQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ViewOffenderCompareQuery,
    ViewOffenderCompareQueryVariables
  >(ViewOffenderCompareDocument, options);
}
export function useViewOffenderCompareLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ViewOffenderCompareQuery,
    ViewOffenderCompareQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ViewOffenderCompareQuery,
    ViewOffenderCompareQueryVariables
  >(ViewOffenderCompareDocument, options);
}
export type ViewOffenderCompareQueryHookResult = ReturnType<
  typeof useViewOffenderCompareQuery
>;
export type ViewOffenderCompareLazyQueryHookResult = ReturnType<
  typeof useViewOffenderCompareLazyQuery
>;
export type ViewOffenderCompareQueryResult = Apollo.QueryResult<
  ViewOffenderCompareQuery,
  ViewOffenderCompareQueryVariables
>;
