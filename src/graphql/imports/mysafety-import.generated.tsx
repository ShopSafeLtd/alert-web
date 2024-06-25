import type * as Types from '../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MySafetyImportDataMutationVariables = Types.Exact<{
  data: Types.MySafetyImportDataInput;
}>;


export type MySafetyImportDataMutation = { __typename?: 'Mutation', mySafetyImportData: { __typename?: 'SystemTask', success: boolean } };


export const MySafetyImportDataDocument = gql`
    mutation MySafetyImportData($data: MySafetyImportDataInput!) {
  mySafetyImportData(data: $data) {
    success
  }
}
    `;
export type MySafetyImportDataMutationFn = Apollo.MutationFunction<MySafetyImportDataMutation, MySafetyImportDataMutationVariables>;
export function useMySafetyImportDataMutation(baseOptions?: Apollo.MutationHookOptions<MySafetyImportDataMutation, MySafetyImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MySafetyImportDataMutation, MySafetyImportDataMutationVariables>(MySafetyImportDataDocument, options);
      }
export type MySafetyImportDataMutationHookResult = ReturnType<typeof useMySafetyImportDataMutation>;
export type MySafetyImportDataMutationResult = Apollo.MutationResult<MySafetyImportDataMutation>;
export type MySafetyImportDataMutationOptions = Apollo.BaseMutationOptions<MySafetyImportDataMutation, MySafetyImportDataMutationVariables>;