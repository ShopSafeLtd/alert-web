import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import { OffendersFragmentDoc } from '../../../../fragments/__generated__/offenders.generated';
import { ImagesFragmentDoc } from '../../../../fragments/__generated__/images.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateInvestigationOffendersMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  offenderIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  disconnectOffenderIds?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
}>;


export type UpdateInvestigationOffendersMutation = { __typename?: 'Mutation', updateInvestigation?: { __typename?: 'Investigation', id?: string | null, offenders: Array<{ __typename?: 'Offender', id?: string | null, reference?: number | null, name?: string | null, alias: Array<string>, age?: Types.Age | null, gender?: Types.Gender | null, race?: Types.Race | null, build?: Types.Build | null, height?: Types.Height | null, hair?: string | null, peculiarities?: string | null, comment?: string | null, dateSource?: string | null, dateOfBirth?: Date | null, idVerified?: boolean | null, idSource?: Types.IdSource | null, knownFor: Array<string>, targetedGoods: Array<string>, justification?: string | null, infoSource?: string | null, images: Array<{ __typename?: 'Image', isFace?: boolean | null, id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null, primary?: boolean | null, policeImage?: boolean | null, card?: string | null }> }> } | null };


export const UpdateInvestigationOffendersDocument = gql`
    mutation UpdateInvestigationOffenders($id: String!, $offenderIds: [String], $disconnectOffenderIds: [String]) {
  updateInvestigation(
    where: {id: $id}
    data: {offenderIds: $offenderIds, disconnectOffenderIds: $disconnectOffenderIds}
  ) {
    id
    offenders {
      ...Offenders
      images {
        ...Images
        isFace
      }
    }
  }
}
    ${OffendersFragmentDoc}
${ImagesFragmentDoc}`;
export type UpdateInvestigationOffendersMutationFn = Apollo.MutationFunction<UpdateInvestigationOffendersMutation, UpdateInvestigationOffendersMutationVariables>;
export function useUpdateInvestigationOffendersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInvestigationOffendersMutation, UpdateInvestigationOffendersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInvestigationOffendersMutation, UpdateInvestigationOffendersMutationVariables>(UpdateInvestigationOffendersDocument, options);
      }
export type UpdateInvestigationOffendersMutationHookResult = ReturnType<typeof useUpdateInvestigationOffendersMutation>;
export type UpdateInvestigationOffendersMutationResult = Apollo.MutationResult<UpdateInvestigationOffendersMutation>;
export type UpdateInvestigationOffendersMutationOptions = Apollo.BaseMutationOptions<UpdateInvestigationOffendersMutation, UpdateInvestigationOffendersMutationVariables>;