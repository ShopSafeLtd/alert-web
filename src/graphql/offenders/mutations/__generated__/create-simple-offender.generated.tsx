import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { SimpleImagesFragmentDoc } from '../../../fragments/__generated__/simple-images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateSimpleOffenderMutationVariables = Types.Exact<{
  data: Types.CreateOffenderData;
}>;


export type CreateSimpleOffenderMutation = { __typename?: 'Mutation', createOffender: { __typename?: 'Offender', totalIncidents: number, totalValue: number, recycled: boolean, id: string, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number }> } };


export const CreateSimpleOffenderDocument = gql`
    mutation CreateSimpleOffender($data: CreateOffenderData!) {
  createOffender(data: $data) {
    ...Offenders
    totalIncidents
    totalValue
    images(take: 1) {
      ...SimpleImages
    }
    recycled
  }
}
    ${OffendersFragmentDoc}
${SimpleImagesFragmentDoc}`;
export type CreateSimpleOffenderMutationFn = Apollo.MutationFunction<CreateSimpleOffenderMutation, CreateSimpleOffenderMutationVariables>;
export function useCreateSimpleOffenderMutation(baseOptions?: Apollo.MutationHookOptions<CreateSimpleOffenderMutation, CreateSimpleOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSimpleOffenderMutation, CreateSimpleOffenderMutationVariables>(CreateSimpleOffenderDocument, options);
      }
export type CreateSimpleOffenderMutationHookResult = ReturnType<typeof useCreateSimpleOffenderMutation>;
export type CreateSimpleOffenderMutationResult = Apollo.MutationResult<CreateSimpleOffenderMutation>;
export type CreateSimpleOffenderMutationOptions = Apollo.BaseMutationOptions<CreateSimpleOffenderMutation, CreateSimpleOffenderMutationVariables>;