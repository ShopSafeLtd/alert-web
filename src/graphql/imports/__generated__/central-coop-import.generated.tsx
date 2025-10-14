import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CentralCoopImportDataMutationVariables = Types.Exact<{
  data: Types.CentralCoopImportDataInput;
}>;


export type CentralCoopImportDataMutation = { __typename?: 'Mutation', centralCoopImportData: { __typename?: 'SystemTask', success: boolean } };


export const CentralCoopImportDataDocument = gql`
    mutation CentralCoopImportData($data: CentralCoopImportDataInput!) {
  centralCoopImportData(data: $data) {
    success
  }
}
    `;
export type CentralCoopImportDataMutationFn = Apollo.MutationFunction<CentralCoopImportDataMutation, CentralCoopImportDataMutationVariables>;
export function useCentralCoopImportDataMutation(baseOptions?: Apollo.MutationHookOptions<CentralCoopImportDataMutation, CentralCoopImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CentralCoopImportDataMutation, CentralCoopImportDataMutationVariables>(CentralCoopImportDataDocument, options);
      }
export type CentralCoopImportDataMutationHookResult = ReturnType<typeof useCentralCoopImportDataMutation>;
export type CentralCoopImportDataMutationResult = Apollo.MutationResult<CentralCoopImportDataMutation>;
export type CentralCoopImportDataMutationOptions = Apollo.BaseMutationOptions<CentralCoopImportDataMutation, CentralCoopImportDataMutationVariables>;