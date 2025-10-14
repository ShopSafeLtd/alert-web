import type * as Types from '../../types';

import { gql } from '@apollo/client';
export type ImagesFragment = { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number, primary?: boolean | null, policeImage?: boolean | null, card?: string | null };

export const ImagesFragmentDoc = gql`
    fragment Images on Image {
  id
  url
  optimised
  position
  positionX
  positionY
  rotation
  primary
  policeImage
  card
}
    `;