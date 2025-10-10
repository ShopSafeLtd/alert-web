import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MidCountiesImportDataMutationVariables = Types.Exact<{
  data: Types.MidCountiesImportDataInput;
}>;


export type MidCountiesImportDataMutation = { __typename?: 'Mutation', midCountiesImportData: { __typename?: 'SystemTask', success: boolean } };


export const MidCountiesImportDataDocument = gql`
    mutation midCountiesImportData($data: MidCountiesImportDataInput!) {
  midCountiesImportData(data: $data) {
    success
  }
}
    `;
export type MidCountiesImportDataMutationFn = Apollo.MutationFunction<MidCountiesImportDataMutation, MidCountiesImportDataMutationVariables>;
export function useMidCountiesImportDataMutation(baseOptions?: Apollo.MutationHookOptions<MidCountiesImportDataMutation, MidCountiesImportDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MidCountiesImportDataMutation, MidCountiesImportDataMutationVariables>(MidCountiesImportDataDocument, options);
      }
export type MidCountiesImportDataMutationHookResult = ReturnType<typeof useMidCountiesImportDataMutation>;
export type MidCountiesImportDataMutationResult = Apollo.MutationResult<MidCountiesImportDataMutation>;
export type MidCountiesImportDataMutationOptions = Apollo.BaseMutationOptions<MidCountiesImportDataMutation, MidCountiesImportDataMutationVariables>;