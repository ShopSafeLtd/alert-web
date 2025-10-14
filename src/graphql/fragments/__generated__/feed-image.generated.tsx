import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type FeedImageFragment = { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number };

export const FeedImageFragmentDoc = gql`
    fragment FeedImage on Image {
  id
  low
  position
  positionX
  positionY
  rotation
}
    `;