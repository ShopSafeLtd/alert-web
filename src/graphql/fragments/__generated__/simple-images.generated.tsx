import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type SimpleImagesFragment = { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null };

export const SimpleImagesFragmentDoc = gql`
    fragment SimpleImages on Image {
  id
  url
  optimised
  position
  rotation
}
    `;