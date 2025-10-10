import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type SimpleImagesFragment = { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number };

export const SimpleImagesFragmentDoc = gql`
    fragment SimpleImages on Image {
  id
  url
  optimised
  position
  rotation
}
    `;