import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TjxImportDataMutationVariables = Types.Exact<{
  data: Types.TjxImportDataInput;
}>;


export type TjxImportDataMutation = { __typename?: 'Mutation', tjxImportData: { __typename?: 'SystemTask', success: boolean } };


export const TjxImportDataDocument = gql`
    mutation TJXImportData($data: TjxImportDataInput!) {
  tjxImportData(data: $data) {
    success
  }
}
    `;
export type TjxImportDataMutationFn = Apollo.MutationFunction<TjxImportDataMutation, TjxImportDataMutationVariables>;
export function useTjxImportDataMutation(baseOptions?: Apollo.MutationHookOptions<TjxImportDataMutation, TjxImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TjxImportDataMutation, TjxImportDataMutationVariables>(TjxImportDataDocument, options);
      }
export type TjxImportDataMutationHookResult = ReturnType<typeof useTjxImportDataMutation>;
export type TjxImportDataMutationResult = Apollo.MutationResult<TjxImportDataMutation>;
export type TjxImportDataMutationOptions = Apollo.BaseMutationOptions<TjxImportDataMutation, TjxImportDataMutationVariables>;