import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlePreviewFragment = { __typename?: 'Article', previewText?: string | null, watermarkImage: boolean, previewImage?: string | null, priority: Types.ArticlePriority, status: Types.CompleteStatus, title: string, updatedAt?: Date | null, completedAt?: Date | null, id: string, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, createdBy: { __typename?: 'User', fullName: string, id?: string | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, groups: Array<{ __typename?: 'Group', id: string, name: string }> };

export type ListArticlesFeedQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ArticleWhereInput>;
  scheme: Types.SchemeWhereUniqueInput;
  order?: Types.InputMaybe<Types.ArticleOrderByWithRelationInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  groupsWhere?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type ListArticlesFeedQuery = { __typename?: 'Query', listArticlesRelay?: { __typename?: 'QueryListArticlesRelayConnection', edges: Array<{ __typename?: 'QueryListArticlesRelayConnectionEdge', node: { __typename?: 'Article', previewText?: string | null, watermarkImage: boolean, previewImage?: string | null, priority: Types.ArticlePriority, status: Types.CompleteStatus, title: string, updatedAt?: Date | null, completedAt?: Date | null, id: string, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }>, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null } | null, createdBy: { __typename?: 'User', fullName: string, id?: string | null, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null }> }, groups: Array<{ __typename?: 'Group', id: string, name: string }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };

export const ArticlePreviewFragmentDoc = gql`
    fragment ArticlePreview on Article {
  previewText
  watermarkImage
  previewImage
  priority
  status
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
  completedAt
  id
}
    `;
export const ListArticlesFeedDocument = gql`
    query ListArticlesFeed($where: ArticleWhereInput, $scheme: SchemeWhereUniqueInput!, $order: ArticleOrderByWithRelationInput, $first: Int, $after: String, $groupsWhere: GroupWhereInput) {
  listArticlesRelay(
    where: $where
    scheme: $scheme
    order: $order
    first: $first
    after: $after
  ) {
    edges {
      node {
        ...ArticlePreview
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${ArticlePreviewFragmentDoc}`;
export function useListArticlesFeedQuery(baseOptions: Apollo.QueryHookOptions<ListArticlesFeedQuery, ListArticlesFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListArticlesFeedQuery, ListArticlesFeedQueryVariables>(ListArticlesFeedDocument, options);
      }
export function useListArticlesFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListArticlesFeedQuery, ListArticlesFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListArticlesFeedQuery, ListArticlesFeedQueryVariables>(ListArticlesFeedDocument, options);
        }
export type ListArticlesFeedQueryHookResult = ReturnType<typeof useListArticlesFeedQuery>;
export type ListArticlesFeedLazyQueryHookResult = ReturnType<typeof useListArticlesFeedLazyQuery>;
export type ListArticlesFeedQueryResult = Apollo.QueryResult<ListArticlesFeedQuery, ListArticlesFeedQueryVariables>;