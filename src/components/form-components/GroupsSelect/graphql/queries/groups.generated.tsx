import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeGroupsSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
  orderBy?: Types.InputMaybe<
    | Array<Types.GroupOrderByWithRelationInput>
    | Types.GroupOrderByWithRelationInput
  >;
}>;

export type SchemeGroupsSelectQuery = {
  __typename?: 'Query';
  groups: Array<{ __typename?: 'Group'; id: string; name: string }>;
};

export const SchemeGroupsSelectDocument = gql`
  query schemeGroupsSelect(
    $where: GroupWhereInput
    $orderBy: [GroupOrderByWithRelationInput!]
  ) {
    groups(where: $where, orderBy: $orderBy) {
      id
      name
    }
  }
`;
export function useSchemeGroupsSelectQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SchemeGroupsSelectQuery,
    SchemeGroupsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    SchemeGroupsSelectQuery,
    SchemeGroupsSelectQueryVariables
  >(SchemeGroupsSelectDocument, options);
}
export function useSchemeGroupsSelectLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemeGroupsSelectQuery,
    SchemeGroupsSelectQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    SchemeGroupsSelectQuery,
    SchemeGroupsSelectQueryVariables
  >(SchemeGroupsSelectDocument, options);
}
export type SchemeGroupsSelectQueryHookResult = ReturnType<
  typeof useSchemeGroupsSelectQuery
>;
export type SchemeGroupsSelectLazyQueryHookResult = ReturnType<
  typeof useSchemeGroupsSelectLazyQuery
>;
export type SchemeGroupsSelectQueryResult = Apollo.QueryResult<
  SchemeGroupsSelectQuery,
  SchemeGroupsSelectQueryVariables
>;
