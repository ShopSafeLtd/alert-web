import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetSchemeSharingMutationVariables = Types.Exact<{
  data: Types.SetSchemeSharingInput;
}>;


export type SetSchemeSharingMutation = { __typename?: 'Mutation', setSchemeSharing: { __typename?: 'Scheme', id: string, name: string, connectedToSchemes: Array<{ __typename?: 'Scheme', id: string, name: string }> } };


export const SetSchemeSharingDocument = gql`
    mutation SetSchemeSharing($data: SetSchemeSharingInput!) {
  setSchemeSharing(data: $data) {
    id
    name
    connectedToSchemes {
      id
      name
    }
  }
}
    `;
export type SetSchemeSharingMutationFn = Apollo.MutationFunction<SetSchemeSharingMutation, SetSchemeSharingMutationVariables>;
export function useSetSchemeSharingMutation(baseOptions?: Apollo.MutationHookOptions<SetSchemeSharingMutation, SetSchemeSharingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetSchemeSharingMutation, SetSchemeSharingMutationVariables>(SetSchemeSharingDocument, options);
      }
export type SetSchemeSharingMutationHookResult = ReturnType<typeof useSetSchemeSharingMutation>;
export type SetSchemeSharingMutationResult = Apollo.MutationResult<SetSchemeSharingMutation>;
export type SetSchemeSharingMutationOptions = Apollo.BaseMutationOptions<SetSchemeSharingMutation, SetSchemeSharingMutationVariables>;