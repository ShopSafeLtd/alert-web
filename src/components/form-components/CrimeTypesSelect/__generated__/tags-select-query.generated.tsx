import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TagsSelectQueryVariables = Types.Exact<{
  where: Types.TagWhereInput;
  order?: Types.InputMaybe<Types.TagOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TagsSelectQuery = { __typename?: 'Query', listTags: { __typename?: 'ListTags', total: number, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const TagsSelectDocument = gql`
    query tagsSelect($where: TagWhereInput!, $order: TagOrderByWithRelationInput, $take: Int, $skip: Int) {
  listTags(where: $where, order: $order, take: $take, skip: $skip) {
    tags {
      id
      name
    }
    total
  }
}
    `;
export function useTagsSelectQuery(baseOptions: Apollo.QueryHookOptions<TagsSelectQuery, TagsSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsSelectQuery, TagsSelectQueryVariables>(TagsSelectDocument, options);
      }
export function useTagsSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsSelectQuery, TagsSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsSelectQuery, TagsSelectQueryVariables>(TagsSelectDocument, options);
        }
export type TagsSelectQueryHookResult = ReturnType<typeof useTagsSelectQuery>;
export type TagsSelectLazyQueryHookResult = ReturnType<typeof useTagsSelectLazyQuery>;
export type TagsSelectQueryResult = Apollo.QueryResult<TagsSelectQuery, TagsSelectQueryVariables>;