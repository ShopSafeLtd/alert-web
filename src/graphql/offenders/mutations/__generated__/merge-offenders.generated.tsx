import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { OffenderCardFragmentDoc } from '../../../fragments/__generated__/offender-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MergeOffendersMutationVariables = Types.Exact<{
  data: Types.MergeOffendersInput;
}>;


export type MergeOffendersMutation = { __typename?: 'Mutation', mergeOffender: { __typename?: 'Offender', id: string, name?: string | null, totalIncidents: number, reference?: number | null, totalImages: number, approved?: boolean | null, knownFor: Array<string>, targetedGoods: Array<string>, totalValue: number, comment?: string | null, createdByUser: boolean, idVerified: boolean, updatedAt: Date, wanted: boolean, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }> } };


export const MergeOffendersDocument = gql`
    mutation MergeOffenders($data: MergeOffendersInput!) {
  mergeOffender(data: $data) {
    ...OffenderCard
  }
}
    ${OffenderCardFragmentDoc}`;
export type MergeOffendersMutationFn = Apollo.MutationFunction<MergeOffendersMutation, MergeOffendersMutationVariables>;
export function useMergeOffendersMutation(baseOptions?: Apollo.MutationHookOptions<MergeOffendersMutation, MergeOffendersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MergeOffendersMutation, MergeOffendersMutationVariables>(MergeOffendersDocument, options);
      }
export type MergeOffendersMutationHookResult = ReturnType<typeof useMergeOffendersMutation>;
export type MergeOffendersMutationResult = Apollo.MutationResult<MergeOffendersMutation>;
export type MergeOffendersMutationOptions = Apollo.BaseMutationOptions<MergeOffendersMutation, MergeOffendersMutationVariables>;