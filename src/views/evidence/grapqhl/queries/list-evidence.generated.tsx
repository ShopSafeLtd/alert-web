import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDemEvidenceExtendedWithoutUserQueryVariables = Types.Exact<{
  where: Types.Scalars['String'];
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type ListDemEvidenceExtendedWithoutUserQuery = {
  __typename?: 'Query';
  listDemEvidenceExtendedWithoutUser: {
    __typename?: 'ListDemEvidenceExtended';
    total: number;
    demEvidence: Array<{
      __typename?: 'DemEvidenceExtended';
      type?: string | null;
      thumbnailUrl?: string | null;
      recordedAt?: Date | null;
      playbackUrl?: string | null;
      id?: string | null;
      importance?: string | null;
      officerName?: string | null;
      duration?: string | null;
    }>;
  };
};

export const ListDemEvidenceExtendedWithoutUserDocument = gql`
  query listDemEvidenceExtendedWithoutUser(
    $where: String!
    $skip: Int
    $take: Int
  ) {
    listDemEvidenceExtendedWithoutUser(
      where: $where
      skip: $skip
      take: $take
    ) {
      demEvidence {
        type
        thumbnailUrl
        recordedAt
        playbackUrl
        id
        importance
        officerName
        duration
      }
      total
    }
  }
`;
export function useListDemEvidenceExtendedWithoutUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListDemEvidenceExtendedWithoutUserQuery,
    ListDemEvidenceExtendedWithoutUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListDemEvidenceExtendedWithoutUserQuery,
    ListDemEvidenceExtendedWithoutUserQueryVariables
  >(ListDemEvidenceExtendedWithoutUserDocument, options);
}
export function useListDemEvidenceExtendedWithoutUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListDemEvidenceExtendedWithoutUserQuery,
    ListDemEvidenceExtendedWithoutUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListDemEvidenceExtendedWithoutUserQuery,
    ListDemEvidenceExtendedWithoutUserQueryVariables
  >(ListDemEvidenceExtendedWithoutUserDocument, options);
}
export type ListDemEvidenceExtendedWithoutUserQueryHookResult = ReturnType<
  typeof useListDemEvidenceExtendedWithoutUserQuery
>;
export type ListDemEvidenceExtendedWithoutUserLazyQueryHookResult = ReturnType<
  typeof useListDemEvidenceExtendedWithoutUserLazyQuery
>;
export type ListDemEvidenceExtendedWithoutUserQueryResult = Apollo.QueryResult<
  ListDemEvidenceExtendedWithoutUserQuery,
  ListDemEvidenceExtendedWithoutUserQueryVariables
>;
