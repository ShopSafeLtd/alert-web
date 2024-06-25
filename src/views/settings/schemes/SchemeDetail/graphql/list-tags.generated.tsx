import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListSchemeTagsQueryVariables = Types.Exact<{
  listWhere: Types.TagWhereInput;
}>;


export type ListSchemeTagsQuery = { __typename?: 'Query', listTags: { __typename?: 'ListTags', tags: Array<{ __typename?: 'Tag', id: string, name: string, parentTag?: { __typename?: 'Tag', id: string } | null }> } };


export const ListSchemeTagsDocument = gql`
    query ListSchemeTags($listWhere: TagWhereInput!) {
  listTags(where: $listWhere) {
    tags {
      id
      name
      parentTag {
        id
      }
    }
  }
}
    `;
export function useListSchemeTagsQuery(baseOptions: Apollo.QueryHookOptions<ListSchemeTagsQuery, ListSchemeTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSchemeTagsQuery, ListSchemeTagsQueryVariables>(ListSchemeTagsDocument, options);
      }
export function useListSchemeTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSchemeTagsQuery, ListSchemeTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSchemeTagsQuery, ListSchemeTagsQueryVariables>(ListSchemeTagsDocument, options);
        }
export type ListSchemeTagsQueryHookResult = ReturnType<typeof useListSchemeTagsQuery>;
export type ListSchemeTagsLazyQueryHookResult = ReturnType<typeof useListSchemeTagsLazyQuery>;
export type ListSchemeTagsQueryResult = Apollo.QueryResult<ListSchemeTagsQuery, ListSchemeTagsQueryVariables>;