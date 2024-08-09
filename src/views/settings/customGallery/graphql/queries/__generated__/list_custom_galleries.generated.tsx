import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomGalleriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CustomGalleryWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.CustomGalleryOrderByWithRelationInput>;
}>;


export type CustomGalleriesQuery = { __typename?: 'Query', customGalleriesRelay: { __typename?: 'QueryCustomGalleriesRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryCustomGalleriesRelayConnectionEdge', node: { __typename?: 'CustomGallery', description?: string | null, id: string, name: string, groups: Array<{ __typename?: 'Group', id: string }> } }> } };


export const CustomGalleriesDocument = gql`
    query customGalleries($where: CustomGalleryWhereInput, $take: Int, $skip: Int, $order: CustomGalleryOrderByWithRelationInput) {
  customGalleriesRelay(where: $where, take: $take, skip: $skip, order: $order) {
    edges {
      node {
        description
        id
        name
        groups {
          id
        }
      }
    }
    totalCount
  }
}
    `;
export function useCustomGalleriesQuery(baseOptions?: Apollo.QueryHookOptions<CustomGalleriesQuery, CustomGalleriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomGalleriesQuery, CustomGalleriesQueryVariables>(CustomGalleriesDocument, options);
      }
export function useCustomGalleriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomGalleriesQuery, CustomGalleriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomGalleriesQuery, CustomGalleriesQueryVariables>(CustomGalleriesDocument, options);
        }
export type CustomGalleriesQueryHookResult = ReturnType<typeof useCustomGalleriesQuery>;
export type CustomGalleriesLazyQueryHookResult = ReturnType<typeof useCustomGalleriesLazyQuery>;
export type CustomGalleriesQueryResult = Apollo.QueryResult<CustomGalleriesQuery, CustomGalleriesQueryVariables>;