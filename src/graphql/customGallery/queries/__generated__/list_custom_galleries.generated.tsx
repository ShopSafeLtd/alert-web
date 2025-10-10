import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListCustomGalleriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.CustomGalleryWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.CustomGalleryOrderByWithRelationInput>;
}>;


export type ListCustomGalleriesQuery = { __typename?: 'Query', customGalleriesRelay: { __typename?: 'QueryCustomGalleriesRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryCustomGalleriesRelayConnectionEdge', node: { __typename?: 'CustomGallery', description?: string | null, id: string, name: string } }> } };


export const ListCustomGalleriesDocument = gql`
    query listCustomGalleries($where: CustomGalleryWhereInput, $take: Int, $skip: Int, $order: CustomGalleryOrderByWithRelationInput) {
  customGalleriesRelay(where: $where, take: $take, skip: $skip, order: $order) {
    edges {
      node {
        description
        id
        name
      }
    }
    totalCount
  }
}
    `;
export function useListCustomGalleriesQuery(baseOptions?: Apollo.QueryHookOptions<ListCustomGalleriesQuery, ListCustomGalleriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListCustomGalleriesQuery, ListCustomGalleriesQueryVariables>(ListCustomGalleriesDocument, options);
      }
export function useListCustomGalleriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListCustomGalleriesQuery, ListCustomGalleriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListCustomGalleriesQuery, ListCustomGalleriesQueryVariables>(ListCustomGalleriesDocument, options);
        }
export type ListCustomGalleriesQueryHookResult = ReturnType<typeof useListCustomGalleriesQuery>;
export type ListCustomGalleriesLazyQueryHookResult = ReturnType<typeof useListCustomGalleriesLazyQuery>;
export type ListCustomGalleriesQueryResult = Apollo.QueryResult<ListCustomGalleriesQuery, ListCustomGalleriesQueryVariables>;