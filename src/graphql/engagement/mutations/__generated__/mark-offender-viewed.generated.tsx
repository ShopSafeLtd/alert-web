import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkOffenderViewedMutationVariables = Types.Exact<{
  offenderId: Types.Scalars['String'];
}>;


export type MarkOffenderViewedMutation = { __typename?: 'Mutation', markOffenderViewed: { __typename?: 'Impression', id: string, viewCount: number, firstViewedAt: Date, lastViewedAt: Date, createdAt: Date } };


export const MarkOffenderViewedDocument = gql`
    mutation MarkOffenderViewed($offenderId: String!) {
  markOffenderViewed(offenderId: $offenderId) {
    id
    viewCount
    firstViewedAt
    lastViewedAt
    createdAt
  }
}
    `;
export type MarkOffenderViewedMutationFn = Apollo.MutationFunction<MarkOffenderViewedMutation, MarkOffenderViewedMutationVariables>;
export function useMarkOffenderViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkOffenderViewedMutation, MarkOffenderViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkOffenderViewedMutation, MarkOffenderViewedMutationVariables>(MarkOffenderViewedDocument, options);
      }
export type MarkOffenderViewedMutationHookResult = ReturnType<typeof useMarkOffenderViewedMutation>;
export type MarkOffenderViewedMutationResult = Apollo.MutationResult<MarkOffenderViewedMutation>;
export type MarkOffenderViewedMutationOptions = Apollo.BaseMutationOptions<MarkOffenderViewedMutation, MarkOffenderViewedMutationVariables>;