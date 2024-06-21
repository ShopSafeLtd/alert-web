import type * as Types from '../types.js';

import { gql } from '@apollo/client';
export type FeedImageFragment = {
  __typename?: 'Image';
  id: string;
  low?: string | null;
  position: Types.ImagePosition;
  rotation: number;
};

export const FeedImageFragmentDoc = gql`
  fragment FeedImage on Image {
    id
    low
    position
    rotation
  }
`;
