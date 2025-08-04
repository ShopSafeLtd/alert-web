import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderJustificationMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  data: Types.OffenderUpdateInput;
}>;


export type UpdateOffenderJustificationMutation = { __typename?: 'Mutation', updateOffender?: { __typename?: 'Offender', id?: string | null, justification?: string | null } | null };


export const UpdateOffenderJustificationDocument = gql`
    mutation updateOffenderJustification($id: String!, $data: OffenderUpdateInput!) {
  updateOffender(where: {id: $id}, data: $data) {
    id
    justification
  }
}
    `;
export type UpdateOffenderJustificationMutationFn = Apollo.MutationFunction<UpdateOffenderJustificationMutation, UpdateOffenderJustificationMutationVariables>;
export function useUpdateOffenderJustificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderJustificationMutation, UpdateOffenderJustificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderJustificationMutation, UpdateOffenderJustificationMutationVariables>(UpdateOffenderJustificationDocument, options);
      }
export type UpdateOffenderJustificationMutationHookResult = ReturnType<typeof useUpdateOffenderJustificationMutation>;
export type UpdateOffenderJustificationMutationResult = Apollo.MutationResult<UpdateOffenderJustificationMutation>;
export type UpdateOffenderJustificationMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderJustificationMutation, UpdateOffenderJustificationMutationVariables>;