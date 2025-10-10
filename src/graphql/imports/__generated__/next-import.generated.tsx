import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NextImportDataMutationVariables = Types.Exact<{
  data: Types.NextImportDataInput;
}>;


export type NextImportDataMutation = { __typename?: 'Mutation', nextImportData: { __typename?: 'SystemTask', success: boolean } };


export const NextImportDataDocument = gql`
    mutation NextImportData($data: NextImportDataInput!) {
  nextImportData(data: $data) {
    success
  }
}
    `;
export type NextImportDataMutationFn = Apollo.MutationFunction<NextImportDataMutation, NextImportDataMutationVariables>;
export function useNextImportDataMutation(baseOptions?: Apollo.MutationHookOptions<NextImportDataMutation, NextImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<NextImportDataMutation, NextImportDataMutationVariables>(NextImportDataDocument, options);
      }
export type NextImportDataMutationHookResult = ReturnType<typeof useNextImportDataMutation>;
export type NextImportDataMutationResult = Apollo.MutationResult<NextImportDataMutation>;
export type NextImportDataMutationOptions = Apollo.BaseMutationOptions<NextImportDataMutation, NextImportDataMutationVariables>;