import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../fragments/__generated__/offenders.generated';
import { SimpleImagesFragmentDoc } from '../../../fragments/__generated__/simple-images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSimpleOffenderMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.OffenderUpdateInput;
}>;


export type UpdateSimpleOffenderMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', recycled: boolean, id: string, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified: boolean, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, rotation: number }> } };


export const UpdateSimpleOffenderDocument = gql`
    mutation UpdateSimpleOffender($where: UniqueId!, $data: OffenderUpdateInput!) {
  updateOffender(where: $where, data: $data) {
    ...Offenders
    images {
      ...SimpleImages
    }
    recycled
  }
}
    ${OffendersFragmentDoc}
${SimpleImagesFragmentDoc}`;
export type UpdateSimpleOffenderMutationFn = Apollo.MutationFunction<UpdateSimpleOffenderMutation, UpdateSimpleOffenderMutationVariables>;
export function useUpdateSimpleOffenderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSimpleOffenderMutation, UpdateSimpleOffenderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSimpleOffenderMutation, UpdateSimpleOffenderMutationVariables>(UpdateSimpleOffenderDocument, options);
      }
export type UpdateSimpleOffenderMutationHookResult = ReturnType<typeof useUpdateSimpleOffenderMutation>;
export type UpdateSimpleOffenderMutationResult = Apollo.MutationResult<UpdateSimpleOffenderMutation>;
export type UpdateSimpleOffenderMutationOptions = Apollo.BaseMutationOptions<UpdateSimpleOffenderMutation, UpdateSimpleOffenderMutationVariables>;