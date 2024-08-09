import type * as Types from '../../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOffenderTagsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  tags?: Types.InputMaybe<Types.TagUpdateManyWithoutIncidentsInput>;
}>;


export type UpdateOffenderTagsMutation = { __typename?: 'Mutation', updateOffender: { __typename?: 'Offender', id: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };


export const UpdateOffenderTagsDocument = gql`
    mutation updateOffenderTags($id: String!, $tags: TagUpdateManyWithoutIncidentsInput) {
  updateOffender(where: {id: $id}, data: {tags: $tags}) {
    id
    tags {
      id
      name
    }
  }
}
    `;
export type UpdateOffenderTagsMutationFn = Apollo.MutationFunction<UpdateOffenderTagsMutation, UpdateOffenderTagsMutationVariables>;
export function useUpdateOffenderTagsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOffenderTagsMutation, UpdateOffenderTagsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOffenderTagsMutation, UpdateOffenderTagsMutationVariables>(UpdateOffenderTagsDocument, options);
      }
export type UpdateOffenderTagsMutationHookResult = ReturnType<typeof useUpdateOffenderTagsMutation>;
export type UpdateOffenderTagsMutationResult = Apollo.MutationResult<UpdateOffenderTagsMutation>;
export type UpdateOffenderTagsMutationOptions = Apollo.BaseMutationOptions<UpdateOffenderTagsMutation, UpdateOffenderTagsMutationVariables>;