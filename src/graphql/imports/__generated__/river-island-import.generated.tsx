import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RiverIslandImportDataMutationVariables = Types.Exact<{
  data: Types.RiverIslandImportInput;
}>;


export type RiverIslandImportDataMutation = { __typename?: 'Mutation', riverIslandImportData: { __typename?: 'SystemTask', success: boolean } };


export const RiverIslandImportDataDocument = gql`
    mutation RiverIslandImportData($data: RiverIslandImportInput!) {
  riverIslandImportData(data: $data) {
    success
  }
}
    `;
export type RiverIslandImportDataMutationFn = Apollo.MutationFunction<RiverIslandImportDataMutation, RiverIslandImportDataMutationVariables>;
export function useRiverIslandImportDataMutation(baseOptions?: Apollo.MutationHookOptions<RiverIslandImportDataMutation, RiverIslandImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RiverIslandImportDataMutation, RiverIslandImportDataMutationVariables>(RiverIslandImportDataDocument, options);
      }
export type RiverIslandImportDataMutationHookResult = ReturnType<typeof useRiverIslandImportDataMutation>;
export type RiverIslandImportDataMutationResult = Apollo.MutationResult<RiverIslandImportDataMutation>;
export type RiverIslandImportDataMutationOptions = Apollo.BaseMutationOptions<RiverIslandImportDataMutation, RiverIslandImportDataMutationVariables>;