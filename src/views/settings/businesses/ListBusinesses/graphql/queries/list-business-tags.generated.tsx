import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessTagsQueryVariables = Types.Exact<{
  where: Types.TagWhereInput;
  orderBy?: Types.InputMaybe<
    Array<Types.TagOrderByWithRelationInput> | Types.TagOrderByWithRelationInput
  >;
}>;

export type BusinessTagsQuery = {
  __typename?: 'Query';
  tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
};

export const BusinessTagsDocument = gql`
  query businessTags(
    $where: TagWhereInput!
    $orderBy: [TagOrderByWithRelationInput!]
  ) {
    tags(where: $where, orderBy: $orderBy) {
      id
      name
    }
  }
`;
export function useBusinessTagsQuery(
  baseOptions: Apollo.QueryHookOptions<
    BusinessTagsQuery,
    BusinessTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BusinessTagsQuery, BusinessTagsQueryVariables>(
    BusinessTagsDocument,
    options
  );
}
export function useBusinessTagsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    BusinessTagsQuery,
    BusinessTagsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BusinessTagsQuery, BusinessTagsQueryVariables>(
    BusinessTagsDocument,
    options
  );
}
export type BusinessTagsQueryHookResult = ReturnType<
  typeof useBusinessTagsQuery
>;
export type BusinessTagsLazyQueryHookResult = ReturnType<
  typeof useBusinessTagsLazyQuery
>;
export type BusinessTagsQueryResult = Apollo.QueryResult<
  BusinessTagsQuery,
  BusinessTagsQueryVariables
>;
