import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../fragments/offenders.generated';
import { ImagesFragmentDoc } from '../../fragments/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SearchOffendersQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type SearchOffendersQuery = {
  __typename?: 'Query';
  listOffenders: {
    __typename?: 'ListOffenders';
    total: number;
    offenders: Array<{
      __typename?: 'Offender';
      id: string;
      name?: string | null;
      alias: Array<string>;
      age?: Types.Age | null;
      gender?: Types.Gender | null;
      race?: Types.Race | null;
      build?: Types.Build | null;
      height?: Types.Height | null;
      hair?: string | null;
      peculiarities?: string | null;
      comment?: string | null;
      dateSource?: string | null;
      dateOfBirth?: Date | null;
      idVerified: boolean;
      idSource?: Types.IdSource | null;
      knownFor: Array<string>;
      targetedGoods: Array<string>;
      justification?: string | null;
      infoSource?: string | null;
      images: Array<{
        __typename?: 'Image';
        isFace?: boolean | null;
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

export const SearchOffendersDocument = gql`
  query searchOffenders(
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
        ...Offenders
        images {
          ...Images
          isFace
        }
        tags {
          id
          name
        }
      }
      total
    }
  }
  ${OffendersFragmentDoc}
  ${ImagesFragmentDoc}
`;
export function useSearchOffendersQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchOffendersQuery,
    SearchOffendersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SearchOffendersQuery, SearchOffendersQueryVariables>(
    SearchOffendersDocument,
    options
  );
}
export function useSearchOffendersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchOffendersQuery,
    SearchOffendersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SearchOffendersQuery,
    SearchOffendersQueryVariables
  >(SearchOffendersDocument, options);
}
export type SearchOffendersQueryHookResult = ReturnType<
  typeof useSearchOffendersQuery
>;
export type SearchOffendersLazyQueryHookResult = ReturnType<
  typeof useSearchOffendersLazyQuery
>;
export type SearchOffendersQueryResult = Apollo.QueryResult<
  SearchOffendersQuery,
  SearchOffendersQueryVariables
>;
