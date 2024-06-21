import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewOffendersCompareQueryVariables = Types.Exact<{
  where: Types.OffenderWhereInput;
}>;

export type ViewOffendersCompareQuery = {
  __typename?: 'Query';
  offenders: Array<{
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
  }>;
};

export const ViewOffendersCompareDocument = gql`
  query ViewOffendersCompare($where: OffenderWhereInput!) {
    offenders(where: $where) {
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
export function useViewOffendersCompareQuery(
  baseOptions: Apollo.QueryHookOptions<
    ViewOffendersCompareQuery,
    ViewOffendersCompareQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ViewOffendersCompareQuery,
    ViewOffendersCompareQueryVariables
  >(ViewOffendersCompareDocument, options);
}
export function useViewOffendersCompareLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ViewOffendersCompareQuery,
    ViewOffendersCompareQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ViewOffendersCompareQuery,
    ViewOffendersCompareQueryVariables
  >(ViewOffendersCompareDocument, options);
}
export type ViewOffendersCompareQueryHookResult = ReturnType<
  typeof useViewOffendersCompareQuery
>;
export type ViewOffendersCompareLazyQueryHookResult = ReturnType<
  typeof useViewOffendersCompareLazyQuery
>;
export type ViewOffendersCompareQueryResult = Apollo.QueryResult<
  ViewOffendersCompareQuery,
  ViewOffendersCompareQueryVariables
>;
