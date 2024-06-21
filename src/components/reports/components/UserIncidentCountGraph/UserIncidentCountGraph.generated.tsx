import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserIncidentCountGraphQueryVariables = Types.Exact<{
  where: Types.UserIncidentsCountGraphInput;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
}>;

export type UserIncidentCountGraphQuery = {
  __typename?: 'Query';
  userIncidentCountGraph: Array<{
    __typename?: 'Graph';
    label: string;
    value: number;
  }>;
};

export const UserIncidentCountGraphDocument = gql`
  query UserIncidentCountGraph(
    $where: UserIncidentsCountGraphInput!
    $take: Int
  ) {
    userIncidentCountGraph(where: $where, take: $take) {
      label
      value
    }
  }
`;
export function useUserIncidentCountGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserIncidentCountGraphQuery,
    UserIncidentCountGraphQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    UserIncidentCountGraphQuery,
    UserIncidentCountGraphQueryVariables
  >(UserIncidentCountGraphDocument, options);
}
export function useUserIncidentCountGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserIncidentCountGraphQuery,
    UserIncidentCountGraphQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    UserIncidentCountGraphQuery,
    UserIncidentCountGraphQueryVariables
  >(UserIncidentCountGraphDocument, options);
}
export type UserIncidentCountGraphQueryHookResult = ReturnType<
  typeof useUserIncidentCountGraphQuery
>;
export type UserIncidentCountGraphLazyQueryHookResult = ReturnType<
  typeof useUserIncidentCountGraphLazyQuery
>;
export type UserIncidentCountGraphQueryResult = Apollo.QueryResult<
  UserIncidentCountGraphQuery,
  UserIncidentCountGraphQueryVariables
>;
