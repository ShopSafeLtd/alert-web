import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListTagsQueryVariables = Types.Exact<{
  where: Types.TagWhereInput;
  order?: Types.InputMaybe<Types.TagOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListTagsQuery = { __typename?: 'Query', listTags: { __typename?: 'ListTags', total: number, tags: Array<{ __typename?: 'Tag', id: string, name: string, description: string, crimeType?: Types.CrimeType | null, type: Types.TagType }> } };


export const ListTagsDocument = gql`
    query ListTags($where: TagWhereInput!, $order: TagOrderByWithRelationInput, $take: Int, $skip: Int) {
  listTags(where: $where, order: $order) {
    tags {
      id
      name
      description
      crimeType
      type
    }
    total
  }
}
    `;
export function useListTagsQuery(baseOptions: Apollo.QueryHookOptions<ListTagsQuery, ListTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListTagsQuery, ListTagsQueryVariables>(ListTagsDocument, options);
      }
export function useListTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListTagsQuery, ListTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListTagsQuery, ListTagsQueryVariables>(ListTagsDocument, options);
        }
export type ListTagsQueryHookResult = ReturnType<typeof useListTagsQuery>;
export type ListTagsLazyQueryHookResult = ReturnType<typeof useListTagsLazyQuery>;
export type ListTagsQueryResult = Apollo.QueryResult<ListTagsQuery, ListTagsQueryVariables>;