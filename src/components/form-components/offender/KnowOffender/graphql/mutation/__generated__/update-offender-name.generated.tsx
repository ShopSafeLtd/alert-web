import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderNameMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  data: Types.OffenderUpdateInput;
}>;


export type UpdateOffenderNameMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, name?: string | null, infoSource?: string | null } };


export const UpdateOffenderNameDocument = gql`
    mutation updateOffenderName($id: String!, $data: OffenderUpdateInput!) {
  updateOffender(where: {id: $id}, data: $data) {
    id
    name
    infoSource
  }
}
    `;
export type UpdateOffenderNameMutationFn = Apollo.MutationFunction<UpdateOffenderNameMutation, UpdateOffenderNameMutationVariables>;
export function useUpdateOffenderNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderNameMutation, UpdateOffenderNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderNameMutation, UpdateOffenderNameMutationVariables>(UpdateOffenderNameDocument, options);
      }
export type UpdateOffenderNameMutationHookResult = ReturnType<typeof useUpdateOffenderNameMutation>;
export type UpdateOffenderNameMutationResult = Apollo.MutationResult<UpdateOffenderNameMutation>;
export type UpdateOffenderNameMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderNameMutation, UpdateOffenderNameMutationVariables>;