import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IcelandImportDataMutationVariables = Types.Exact<{
  data: Types.IcelandImportDataInput;
}>;


export type IcelandImportDataMutation = { __typename?: 'Mutation', icelandImportData: { __typename?: 'SystemTask', success: boolean } };


export const IcelandImportDataDocument = gql`
    mutation IcelandImportData($data: IcelandImportDataInput!) {
  icelandImportData(data: $data) {
    success
  }
}
    `;
export type IcelandImportDataMutationFn = Apollo.MutationFunction<IcelandImportDataMutation, IcelandImportDataMutationVariables>;
export function useIcelandImportDataMutation(baseOptions?: Apollo.MutationHookOptions<IcelandImportDataMutation, IcelandImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IcelandImportDataMutation, IcelandImportDataMutationVariables>(IcelandImportDataDocument, options);
      }
export type IcelandImportDataMutationHookResult = ReturnType<typeof useIcelandImportDataMutation>;
export type IcelandImportDataMutationResult = Apollo.MutationResult<IcelandImportDataMutation>;
export type IcelandImportDataMutationOptions = Apollo.BaseMutationOptions<IcelandImportDataMutation, IcelandImportDataMutationVariables>;