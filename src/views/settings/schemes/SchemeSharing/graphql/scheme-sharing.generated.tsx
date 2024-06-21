import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeSharingQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;

export type SchemeSharingQuery = {
  __typename?: 'Query';
  scheme: {
    __typename?: 'Scheme';
    id: string;
    connectedToSchemes: Array<{
      __typename?: 'Scheme';
      id: string;
      name: string;
    }>;
  };
};

export const SchemeSharingDocument = gql`
  query SchemeSharing($where: SchemeWhereUniqueInput!) {
    scheme(where: $where) {
      id
      connectedToSchemes {
        id
        name
      }
    }
  }
`;
export function useSchemeSharingQuery(
  baseOptions: Apollo.QueryHookOptions<
    SchemeSharingQuery,
    SchemeSharingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SchemeSharingQuery, SchemeSharingQueryVariables>(
    SchemeSharingDocument,
    options
  );
}
export function useSchemeSharingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SchemeSharingQuery,
    SchemeSharingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SchemeSharingQuery, SchemeSharingQueryVariables>(
    SchemeSharingDocument,
    options
  );
}
export type SchemeSharingQueryHookResult = ReturnType<
  typeof useSchemeSharingQuery
>;
export type SchemeSharingLazyQueryHookResult = ReturnType<
  typeof useSchemeSharingLazyQuery
>;
export type SchemeSharingQueryResult = Apollo.QueryResult<
  SchemeSharingQuery,
  SchemeSharingQueryVariables
>;
