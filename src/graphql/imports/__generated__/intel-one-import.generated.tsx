import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IntelOneImportDataMutationVariables = Types.Exact<{
  data: Types.IntelOneImportDataInput;
}>;


export type IntelOneImportDataMutation = { __typename?: 'Mutation', intelOneImportData: { __typename?: 'SystemTask', success: boolean } };


export const IntelOneImportDataDocument = gql`
    mutation IntelOneImportData($data: IntelOneImportDataInput!) {
  intelOneImportData(data: $data) {
    success
  }
}
    `;
export type IntelOneImportDataMutationFn = Apollo.MutationFunction<IntelOneImportDataMutation, IntelOneImportDataMutationVariables>;
export function useIntelOneImportDataMutation(baseOptions?: Apollo.MutationHookOptions<IntelOneImportDataMutation, IntelOneImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IntelOneImportDataMutation, IntelOneImportDataMutationVariables>(IntelOneImportDataDocument, options);
      }
export type IntelOneImportDataMutationHookResult = ReturnType<typeof useIntelOneImportDataMutation>;
export type IntelOneImportDataMutationResult = Apollo.MutationResult<IntelOneImportDataMutation>;
export type IntelOneImportDataMutationOptions = Apollo.BaseMutationOptions<IntelOneImportDataMutation, IntelOneImportDataMutationVariables>;