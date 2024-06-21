import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TagQueryVariables = Types.Exact<{
  where: Types.TagWhereUniqueInput;
}>;

export type TagQuery = {
  __typename?: 'Query';
  tag: {
    __typename?: 'Tag';
    id: string;
    name: string;
    description: string;
    crimeType?: Types.CrimeType | null;
    type: Types.TagType;
  };
};

export const TagDocument = gql`
  query tag($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      id
      name
      description
      crimeType
      type
    }
  }
`;
export function useTagQuery(
  baseOptions: Apollo.QueryHookOptions<TagQuery, TagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TagQuery, TagQueryVariables>(TagDocument, options);
}
export function useTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TagQuery, TagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TagQuery, TagQueryVariables>(TagDocument, options);
}
export type TagQueryHookResult = ReturnType<typeof useTagQuery>;
export type TagLazyQueryHookResult = ReturnType<typeof useTagLazyQuery>;
export type TagQueryResult = Apollo.QueryResult<TagQuery, TagQueryVariables>;
