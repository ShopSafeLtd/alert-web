import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type FeedImageFragment = { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null };

export const FeedImageFragmentDoc = gql`
    fragment FeedImage on Image {
  id
  low
  position
  rotation
}
    `;