import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { ImagesFragmentDoc } from '../../../../graphql/fragments/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchOffenderReportsQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type SearchOffenderReportsQuery = {
  __typename?: 'Query';
  listOffenders: {
    __typename?: 'ListOffenders';
    total: number;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      name?: string | null;
      totalIncidents: number;
      totalValue: number;
      latestIncident?: {
        __typename?: 'Incident';
        id: string;
        dayTime: string;
      } | null;
      images: Array<{
        __typename?: 'Image';
        id: string;
        url?: string | null;
        optimised?: string | null;
        position: Types.ImagePosition;
        rotation: number;
        primary?: boolean | null;
        policeImage?: boolean | null;
        card?: string | null;
      }>;
      tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
    }>;
  };
};

export const SearchOffenderReportsDocument = gql`
  query searchOffenderReports(
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
        name
        totalIncidents
        totalValue
        latestIncident {
          id
          dayTime
        }
        images {
          ...Images
        }
        tags {
          id
          name
        }
      }
      total
    }
  }
  ${ImagesFragmentDoc}
`;
export function useSearchOffenderReportsQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchOffenderReportsQuery,
    SearchOffenderReportsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SearchOffenderReportsQuery,
    SearchOffenderReportsQueryVariables
  >(SearchOffenderReportsDocument, options);
}
export function useSearchOffenderReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchOffenderReportsQuery,
    SearchOffenderReportsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchOffenderReportsQuery,
    SearchOffenderReportsQueryVariables
  >(SearchOffenderReportsDocument, options);
}
export type SearchOffenderReportsQueryHookResult = ReturnType<
  typeof useSearchOffenderReportsQuery
>;
export type SearchOffenderReportsLazyQueryHookResult = ReturnType<
  typeof useSearchOffenderReportsLazyQuery
>;
export type SearchOffenderReportsQueryResult = Apollo.QueryResult<
  SearchOffenderReportsQuery,
  SearchOffenderReportsQueryVariables
>;
