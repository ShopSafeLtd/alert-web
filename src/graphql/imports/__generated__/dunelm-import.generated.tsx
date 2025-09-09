import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DunelmImportDataMutationVariables = Types.Exact<{
  data: Types.DunelmImportDataInput;
}>;


export type DunelmImportDataMutation = { __typename?: 'Mutation', dunelmImportData: { __typename?: 'SystemTask', success: boolean } };


export const DunelmImportDataDocument = gql`
    mutation DunelmImportData($data: DunelmImportDataInput!) {
  dunelmImportData(data: $data) {
    success
  }
}
    `;
export type DunelmImportDataMutationFn = Apollo.MutationFunction<DunelmImportDataMutation, DunelmImportDataMutationVariables>;
export function useDunelmImportDataMutation(baseOptions?: Apollo.MutationHookOptions<DunelmImportDataMutation, DunelmImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DunelmImportDataMutation, DunelmImportDataMutationVariables>(DunelmImportDataDocument, options);
      }
export type DunelmImportDataMutationHookResult = ReturnType<typeof useDunelmImportDataMutation>;
export type DunelmImportDataMutationResult = Apollo.MutationResult<DunelmImportDataMutation>;
export type DunelmImportDataMutationOptions = Apollo.BaseMutationOptions<DunelmImportDataMutation, DunelmImportDataMutationVariables>;