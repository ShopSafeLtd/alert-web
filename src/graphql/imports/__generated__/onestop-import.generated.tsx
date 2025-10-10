import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type OneStopImportDataMutationVariables = Types.Exact<{
  data: Types.OneStopImportDataInput;
}>;


export type OneStopImportDataMutation = { __typename?: 'Mutation', oneStopImportData: { __typename?: 'SystemTask', success: boolean } };


export const OneStopImportDataDocument = gql`
    mutation OneStopImportData($data: OneStopImportDataInput!) {
  oneStopImportData(data: $data) {
    success
  }
}
    `;
export type OneStopImportDataMutationFn = Apollo.MutationFunction<OneStopImportDataMutation, OneStopImportDataMutationVariables>;
export function useOneStopImportDataMutation(baseOptions?: Apollo.MutationHookOptions<OneStopImportDataMutation, OneStopImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OneStopImportDataMutation, OneStopImportDataMutationVariables>(OneStopImportDataDocument, options);
      }
export type OneStopImportDataMutationHookResult = ReturnType<typeof useOneStopImportDataMutation>;
export type OneStopImportDataMutationResult = Apollo.MutationResult<OneStopImportDataMutation>;
export type OneStopImportDataMutationOptions = Apollo.BaseMutationOptions<OneStopImportDataMutation, OneStopImportDataMutationVariables>;