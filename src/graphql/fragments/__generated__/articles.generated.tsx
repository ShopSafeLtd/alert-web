import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type ArticlesFragment = { __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } };

export const ArticlesFragmentDoc = gql`
    fragment Articles on Article {
  id
  title
  updatedAt
  watermarkImage
  previewImage
  previewText
  priority
  images {
    id
    url
    optimised
    card
    position
    rotation
  }
  createdBy {
    fullName
    id
  }
}
    `;