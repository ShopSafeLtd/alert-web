import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddIncidentTagsQueryVariables = Types.Exact<{
  where: Types.TagWhereInput;
  orderBy?: Types.InputMaybe<Array<Types.TagOrderByWithRelationInput> | Types.TagOrderByWithRelationInput>;
}>;


export type AddIncidentTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string, description: string, type: Types.TagType }> };


export const AddIncidentTagsDocument = gql`
    query AddIncidentTags($where: TagWhereInput!, $orderBy: [TagOrderByWithRelationInput!]) {
  tags(where: $where, orderBy: $orderBy) {
    id
    name
    description
    type
  }
}
    `;
export function useAddIncidentTagsQuery(baseOptions: Apollo.QueryHookOptions<AddIncidentTagsQuery, AddIncidentTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddIncidentTagsQuery, AddIncidentTagsQueryVariables>(AddIncidentTagsDocument, options);
      }
export function useAddIncidentTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddIncidentTagsQuery, AddIncidentTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddIncidentTagsQuery, AddIncidentTagsQueryVariables>(AddIncidentTagsDocument, options);
        }
export type AddIncidentTagsQueryHookResult = ReturnType<typeof useAddIncidentTagsQuery>;
export type AddIncidentTagsLazyQueryHookResult = ReturnType<typeof useAddIncidentTagsLazyQuery>;
export type AddIncidentTagsQueryResult = Apollo.QueryResult<AddIncidentTagsQuery, AddIncidentTagsQueryVariables>;