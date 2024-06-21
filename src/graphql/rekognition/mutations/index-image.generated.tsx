import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IndexImageMutationVariables = Types.Exact<{
  where: Types.ImageWhereUniqueInput;
}>;

export type IndexImageMutation = {
  __typename?: 'Mutation';
  indexImage: {
    __typename?: 'Image';
    id: string;
    url?: string | null;
    optimised?: string | null;
    position: Types.ImagePosition;
    rotation: number;
    faces: Array<{
      __typename?: 'RekFace';
      id: string;
      confidence?: number | null;
      boundingHeight?: number | null;
      boundingLeft?: number | null;
      boundingTop?: number | null;
      boundingWidth?: number | null;
      offender: { __typename?: 'Offender'; id: string; name?: string | null };
      rekMatchedSearches: Array<{ __typename?: 'RekMatch'; id: string }>;
    }>;
  };
};

export const IndexImageDocument = gql`
  mutation IndexImage($where: ImageWhereUniqueInput!) {
    indexImage(where: $where) {
      id
      url
      optimised
      position
      rotation
      faces {
        id
        confidence
        boundingHeight
        boundingLeft
        boundingTop
        boundingWidth
        offender {
          id
          name
        }
        rekMatchedSearches {
          id
        }
      }
    }
  }
`;
export type IndexImageMutationFn = Apollo.MutationFunction<
  IndexImageMutation,
  IndexImageMutationVariables
>;
export function useIndexImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    IndexImageMutation,
    IndexImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IndexImageMutation, IndexImageMutationVariables>(
    IndexImageDocument,
    options
  );
}
export type IndexImageMutationHookResult = ReturnType<
  typeof useIndexImageMutation
>;
export type IndexImageMutationResult =
  Apollo.MutationResult<IndexImageMutation>;
export type IndexImageMutationOptions = Apollo.BaseMutationOptions<
  IndexImageMutation,
  IndexImageMutationVariables
>;
