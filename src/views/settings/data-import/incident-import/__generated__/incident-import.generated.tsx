import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentImportMutationVariables = Types.Exact<{
  data: Types.IncidentImportDataInput;
}>;


export type IncidentImportMutation = { __typename?: 'Mutation', incidentImport: { __typename?: 'IncidentImportValidationResult', success: boolean, total: number } };


export const IncidentImportDocument = gql`
    mutation IncidentImport($data: IncidentImportDataInput!) {
  incidentImport(data: $data) {
    success
    total
  }
}
    `;
export type IncidentImportMutationFn = Apollo.MutationFunction<IncidentImportMutation, IncidentImportMutationVariables>;
export function useIncidentImportMutation(baseOptions?: Apollo.MutationHookOptions<IncidentImportMutation, IncidentImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncidentImportMutation, IncidentImportMutationVariables>(IncidentImportDocument, options);
      }
export type IncidentImportMutationHookResult = ReturnType<typeof useIncidentImportMutation>;
export type IncidentImportMutationResult = Apollo.MutationResult<IncidentImportMutation>;
export type IncidentImportMutationOptions = Apollo.BaseMutationOptions<IncidentImportMutation, IncidentImportMutationVariables>;