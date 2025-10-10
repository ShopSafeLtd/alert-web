import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SentrysysImportDataMutationVariables = Types.Exact<{
  data: Types.SentrysysImportDataInput;
}>;


export type SentrysysImportDataMutation = { __typename?: 'Mutation', sentrysysImportData: { __typename?: 'SystemTask', success: boolean } };


export const SentrysysImportDataDocument = gql`
    mutation SentrysysImportData($data: SentrysysImportDataInput!) {
  sentrysysImportData(data: $data) {
    success
  }
}
    `;
export type SentrysysImportDataMutationFn = Apollo.MutationFunction<SentrysysImportDataMutation, SentrysysImportDataMutationVariables>;
export function useSentrysysImportDataMutation(baseOptions?: Apollo.MutationHookOptions<SentrysysImportDataMutation, SentrysysImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SentrysysImportDataMutation, SentrysysImportDataMutationVariables>(SentrysysImportDataDocument, options);
      }
export type SentrysysImportDataMutationHookResult = ReturnType<typeof useSentrysysImportDataMutation>;
export type SentrysysImportDataMutationResult = Apollo.MutationResult<SentrysysImportDataMutation>;
export type SentrysysImportDataMutationOptions = Apollo.BaseMutationOptions<SentrysysImportDataMutation, SentrysysImportDataMutationVariables>;