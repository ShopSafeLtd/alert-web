import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkBulletinViewedMutationVariables = Types.Exact<{
  articleId: Types.Scalars['String'];
}>;


export type MarkBulletinViewedMutation = { __typename?: 'Mutation', markBulletinViewed: { __typename?: 'Impression', id: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date, createdAt: Date } };


export const MarkBulletinViewedDocument = gql`
    mutation MarkBulletinViewed($articleId: String!) {
  markBulletinViewed(articleId: $articleId) {
    id
    viewCount
    firstViewedAt
    lastViewedAt
    createdAt
  }
}
    `;
export type MarkBulletinViewedMutationFn = Apollo.MutationFunction<MarkBulletinViewedMutation, MarkBulletinViewedMutationVariables>;
export function useMarkBulletinViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkBulletinViewedMutation, MarkBulletinViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkBulletinViewedMutation, MarkBulletinViewedMutationVariables>(MarkBulletinViewedDocument, options);
      }
export type MarkBulletinViewedMutationHookResult = ReturnType<typeof useMarkBulletinViewedMutation>;
export type MarkBulletinViewedMutationResult = Apollo.MutationResult<MarkBulletinViewedMutation>;
export type MarkBulletinViewedMutationOptions = Apollo.BaseMutationOptions<MarkBulletinViewedMutation, MarkBulletinViewedMutationVariables>;