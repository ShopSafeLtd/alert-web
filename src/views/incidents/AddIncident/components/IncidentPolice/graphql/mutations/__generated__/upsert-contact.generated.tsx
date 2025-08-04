import type * as Types from '../../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertContactMutationVariables = Types.Exact<{
  data: Types.UpsertContactInput;
}>;


export type UpsertContactMutation = { __typename?: 'Mutation', upsertContact: { __typename?: 'Contact', id: string, address?: string | null, dobPlace?: string | null, formerName?: string | null, gender?: string | null, height?: string | null, homeTel?: string | null, mobileTel?: string | null, occupation?: string | null, postcode?: string | null, prefContact?: string | null, updatedAt: Date, workTel?: string | null, user?: { __typename?: 'User', email?: string | null, fullName: string, id: string } | null } };


export const UpsertContactDocument = gql`
    mutation UpsertContact($data: UpsertContactInput!) {
  upsertContact(data: $data) {
    id
    address
    dobPlace
    formerName
    gender
    height
    homeTel
    mobileTel
    occupation
    postcode
    prefContact
    updatedAt
    user {
      email
      fullName
      id
    }
    workTel
  }
}
    `;
export type UpsertContactMutationFn = Apollo.MutationFunction<UpsertContactMutation, UpsertContactMutationVariables>;
export function useUpsertContactMutation(baseOptions?: Apollo.MutationHookOptions<UpsertContactMutation, UpsertContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertContactMutation, UpsertContactMutationVariables>(UpsertContactDocument, options);
      }
export type UpsertContactMutationHookResult = ReturnType<typeof useUpsertContactMutation>;
export type UpsertContactMutationResult = Apollo.MutationResult<UpsertContactMutation>;
export type UpsertContactMutationOptions = Apollo.BaseMutationOptions<UpsertContactMutation, UpsertContactMutationVariables>;