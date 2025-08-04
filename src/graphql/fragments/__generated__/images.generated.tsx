import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
export type ImagesFragment = { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null };

export const ImagesFragmentDoc = gql`
    fragment Images on Image {
  id
  url
  optimised
  position
  rotation
  primary
  policeImage
  card
}
    `;