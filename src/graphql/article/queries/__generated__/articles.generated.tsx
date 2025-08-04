import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ArticleWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.ArticleOrderByWithRelationInput> | Types.ArticleOrderByWithRelationInput>;
}>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Article', previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, watermarkImage: boolean, title: string, updatedAt?: Date | null, id: string, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, createdBy: { __typename?: 'User', fullName: string, id?: string | null, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> } }> };


export const ArticlesDocument = gql`
    query Articles($where: ArticleWhereInput, $orderBy: [ArticleOrderByWithRelationInput!]) {
  articles(where: $where, orderBy: $orderBy) {
    previewImage
    previewText
    priority
    watermarkImage
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
        fullName
        id
        name
      }
      id
    }
    title
    updatedAt
    id
  }
}
    `;
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;