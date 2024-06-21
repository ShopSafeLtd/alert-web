import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListInvestigationsQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.InvestigationWhereInput>;
}>;

export type ListInvestigationsQuery = {
  __typename?: 'Query';
  listInvestigations: {
    __typename?: 'ListInvestigations';
    total: number;
    investigations: Array<{
      __typename?: 'Investigation';
      id: string;
      name: string;
      description?: string | null;
      status: Types.InvestigationStatus;
    }>;
  };
};

export const ListInvestigationsDocument = gql`
  query listInvestigations(
    $scheme: SchemeWhereUniqueInput!
    $take: Int
    $skip: Int
    $where: InvestigationWhereInput
  ) {
    listInvestigations(
      scheme: $scheme
      where: $where
      take: $take
      skip: $skip
    ) {
      total
      investigations {
        id
        name
        description
        status
      }
    }
  }
`;
export function useListInvestigationsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListInvestigationsQuery,
    ListInvestigationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListInvestigationsQuery,
    ListInvestigationsQueryVariables
  >(ListInvestigationsDocument, options);
}
export function useListInvestigationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListInvestigationsQuery,
    ListInvestigationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListInvestigationsQuery,
    ListInvestigationsQueryVariables
  >(ListInvestigationsDocument, options);
}
export type ListInvestigationsQueryHookResult = ReturnType<
  typeof useListInvestigationsQuery
>;
export type ListInvestigationsLazyQueryHookResult = ReturnType<
  typeof useListInvestigationsLazyQuery
>;
export type ListInvestigationsQueryResult = Apollo.QueryResult<
  ListInvestigationsQuery,
  ListInvestigationsQueryVariables
>;
