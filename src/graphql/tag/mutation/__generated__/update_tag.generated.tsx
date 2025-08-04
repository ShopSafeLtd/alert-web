import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateTagMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.TagUpdateInput;
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag?: { __typename?: 'Tag', id?: string | null, name?: string | null, description?: string | null, type?: Types.TagType | null, crimeType?: Types.CrimeType | null } | null };


export const UpdateTagDocument = gql`
    mutation updateTag($where: UniqueId!, $data: TagUpdateInput!) {
  updateTag(where: $where, data: $data) {
    id
    name
    description
    type
    crimeType
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;