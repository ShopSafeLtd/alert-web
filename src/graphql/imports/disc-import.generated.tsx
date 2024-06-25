import type * as Types from '../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DiscImportDataMutationVariables = Types.Exact<{
  data: Types.DiscImportDataInput;
}>;


export type DiscImportDataMutation = { __typename?: 'Mutation', discImportData: { __typename?: 'SystemTask', success: boolean } };


export const DiscImportDataDocument = gql`
    mutation DiscImportData($data: DiscImportDataInput!) {
  discImportData(data: $data) {
    success
  }
}
    `;
export type DiscImportDataMutationFn = Apollo.MutationFunction<DiscImportDataMutation, DiscImportDataMutationVariables>;
export function useDiscImportDataMutation(baseOptions?: Apollo.MutationHookOptions<DiscImportDataMutation, DiscImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DiscImportDataMutation, DiscImportDataMutationVariables>(DiscImportDataDocument, options);
      }
export type DiscImportDataMutationHookResult = ReturnType<typeof useDiscImportDataMutation>;
export type DiscImportDataMutationResult = Apollo.MutationResult<DiscImportDataMutation>;
export type DiscImportDataMutationOptions = Apollo.BaseMutationOptions<DiscImportDataMutation, DiscImportDataMutationVariables>;