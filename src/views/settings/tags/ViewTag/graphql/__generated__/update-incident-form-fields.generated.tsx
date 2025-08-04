import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpsertIncidentFormMutationVariables = Types.Exact<{
  data: Types.UpsertIncidentFormInput;
}>;


export type UpsertIncidentFormMutation = { __typename?: 'Mutation', upsertIncidentForm: { __typename?: 'IncidentForm', id: string } };


export const UpsertIncidentFormDocument = gql`
    mutation UpsertIncidentForm($data: UpsertIncidentFormInput!) {
  upsertIncidentForm(data: $data) {
    id
  }
}
    `;
export type UpsertIncidentFormMutationFn = Apollo.MutationFunction<UpsertIncidentFormMutation, UpsertIncidentFormMutationVariables>;
export function useUpsertIncidentFormMutation(baseOptions?: Apollo.MutationHookOptions<UpsertIncidentFormMutation, UpsertIncidentFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertIncidentFormMutation, UpsertIncidentFormMutationVariables>(UpsertIncidentFormDocument, options);
      }
export type UpsertIncidentFormMutationHookResult = ReturnType<typeof useUpsertIncidentFormMutation>;
export type UpsertIncidentFormMutationResult = Apollo.MutationResult<UpsertIncidentFormMutation>;
export type UpsertIncidentFormMutationOptions = Apollo.BaseMutationOptions<UpsertIncidentFormMutation, UpsertIncidentFormMutationVariables>;