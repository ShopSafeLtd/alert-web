import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TagsQueryVariables = Types.Exact<{
  where: Types.TagWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.TagOrderByWithRelationInput> | Types.TagOrderByWithRelationInput>;
}>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, description: string, crimeType?: Types.CrimeType | null, type: Types.TagType, parentTag?: { __typename?: 'Tag', id: string } | null }> };


export const TagsDocument = gql`
    query tags($where: TagWhereInput!, $orderBy: [TagOrderByWithRelationInput!]) {
  tags(where: $where, orderBy: $orderBy) {
    id
    name
    description
    crimeType
    type
    parentTag {
      id
    }
  }
}
    `;
export function useTagsQuery(baseOptions: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;