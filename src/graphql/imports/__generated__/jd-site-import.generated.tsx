import type * as Types from '../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JdSiteImportMutationVariables = Types.Exact<{
  data: Types.JdSiteImportInput;
}>;


export type JdSiteImportMutation = { __typename?: 'Mutation', jdSiteImport: { __typename?: 'SystemTask', success: boolean } };


export const JdSiteImportDocument = gql`
    mutation JDSiteImport($data: JdSiteImportInput!) {
  jdSiteImport(data: $data) {
    success
  }
}
    `;
export type JdSiteImportMutationFn = Apollo.MutationFunction<JdSiteImportMutation, JdSiteImportMutationVariables>;
export function useJdSiteImportMutation(baseOptions?: Apollo.MutationHookOptions<JdSiteImportMutation, JdSiteImportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JdSiteImportMutation, JdSiteImportMutationVariables>(JdSiteImportDocument, options);
      }
export type JdSiteImportMutationHookResult = ReturnType<typeof useJdSiteImportMutation>;
export type JdSiteImportMutationResult = Apollo.MutationResult<JdSiteImportMutation>;
export type JdSiteImportMutationOptions = Apollo.BaseMutationOptions<JdSiteImportMutation, JdSiteImportMutationVariables>;