import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListArticlesQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.ArticleWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  order?: Types.InputMaybe<Types.ArticleOrderByWithRelationInput>;
  groupsWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type ListArticlesQuery = { __typename?: 'Query', listArticles: { __typename?: 'ListArticles', total: number, articles: Array<{ __typename?: 'Article', watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, title: string, updatedAt: Date, id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, image?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null } | null, createdBy: { __typename?: 'User', fullName: string, id: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, groups: Array<{ __typename?: 'Group', id: string, name: string }> }> } };


export const ListArticlesDocument = gql`
    query listArticles($scheme: SchemeWhereUniqueInput!, $where: ArticleWhereInput, $take: Int, $skip: Int, $order: ArticleOrderByWithRelationInput, $groupsWhere: GroupWhereInput) {
  listArticles(
    where: $where
    order: $order
    take: $take
    skip: $skip
    scheme: $scheme
  ) {
    articles {
      watermarkImage
      previewImage
      previewText
      priority
      tags {
        id
        name
      }
      images {
        id
        url
        optimised
        card
        position
        rotation
      }
      image {
        id
        url
        optimised
        card
      }
      createdBy {
        fullName
        businesses {
          id
          name
        }
        id
      }
      groups(where: $groupsWhere) {
        id
        name
      }
      title
      updatedAt
      id
    }
    total
  }
}
    `;
export function useListArticlesQuery(baseOptions: Apollo.QueryHookOptions<ListArticlesQuery, ListArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListArticlesQuery, ListArticlesQueryVariables>(ListArticlesDocument, options);
      }
export function useListArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListArticlesQuery, ListArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListArticlesQuery, ListArticlesQueryVariables>(ListArticlesDocument, options);
        }
export type ListArticlesQueryHookResult = ReturnType<typeof useListArticlesQuery>;
export type ListArticlesLazyQueryHookResult = ReturnType<typeof useListArticlesLazyQuery>;
export type ListArticlesQueryResult = Apollo.QueryResult<ListArticlesQuery, ListArticlesQueryVariables>;