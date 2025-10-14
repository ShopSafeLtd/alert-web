import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ImportStockItemCsvMutationVariables = Types.Exact<{
  where: Types.Scalars['String'];
}>;


export type ImportStockItemCsvMutation = { __typename?: 'Mutation', importStockItemCsv: boolean };


export const ImportStockItemCsvDocument = gql`
    mutation ImportStockItemCsv($where: String!) {
  importStockItemCsv(where: $where)
}
    `;
export type ImportStockItemCsvMutationFn = Apollo.MutationFunction<ImportStockItemCsvMutation, ImportStockItemCsvMutationVariables>;
export function useImportStockItemCsvMutation(baseOptions?: Apollo.MutationHookOptions<ImportStockItemCsvMutation, ImportStockItemCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ImportStockItemCsvMutation, ImportStockItemCsvMutationVariables>(ImportStockItemCsvDocument, options);
      }
export type ImportStockItemCsvMutationHookResult = ReturnType<typeof useImportStockItemCsvMutation>;
export type ImportStockItemCsvMutationResult = Apollo.MutationResult<ImportStockItemCsvMutation>;
export type ImportStockItemCsvMutationOptions = Apollo.BaseMutationOptions<ImportStockItemCsvMutation, ImportStockItemCsvMutationVariables>;