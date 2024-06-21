import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListCrimeGroupsQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.CrimeGroupWhereInput>;
  order?: Types.InputMaybe<Types.CrimeGroupOrderByWithRelationInput>;
}>;

export type ListCrimeGroupsQuery = {
  __typename?: 'Query';
  listCrimeGroups: {
    __typename?: 'ListCrimeGroups';
    total: number;
    crimeGroups: Array<{
      __typename?: 'CrimeGroup';
      id: string;
      reference?: number | null;
      totalIncidents: number;
      totalOffenders: number;
      totalRecoveredValue: number;
      totalTheftSuccess: number;
      totalValue: number;
      alias?: string | null;
      updatedAt: Date;
    }>;
  };
};

export const ListCrimeGroupsDocument = gql`
  query ListCrimeGroups(
    $take: Int
    $skip: Int
    $where: CrimeGroupWhereInput
    $order: CrimeGroupOrderByWithRelationInput
  ) {
    listCrimeGroups(take: $take, skip: $skip, where: $where, order: $order) {
      crimeGroups {
        id
        reference
        totalIncidents
        totalOffenders
        totalRecoveredValue
        totalTheftSuccess
        totalValue
        alias
        updatedAt
      }
      total
    }
  }
`;
export function useListCrimeGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ListCrimeGroupsQuery,
    ListCrimeGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListCrimeGroupsQuery, ListCrimeGroupsQueryVariables>(
    ListCrimeGroupsDocument,
    options
  );
}
export function useListCrimeGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListCrimeGroupsQuery,
    ListCrimeGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListCrimeGroupsQuery,
    ListCrimeGroupsQueryVariables
  >(ListCrimeGroupsDocument, options);
}
export type ListCrimeGroupsQueryHookResult = ReturnType<
  typeof useListCrimeGroupsQuery
>;
export type ListCrimeGroupsLazyQueryHookResult = ReturnType<
  typeof useListCrimeGroupsLazyQuery
>;
export type ListCrimeGroupsQueryResult = Apollo.QueryResult<
  ListCrimeGroupsQuery,
  ListCrimeGroupsQueryVariables
>;
