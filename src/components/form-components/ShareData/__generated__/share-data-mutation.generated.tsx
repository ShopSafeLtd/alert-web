import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ShareDataMutationVariables = Types.Exact<{
  data: Types.ShareDataInput;
}>;


export type ShareDataMutation = { __typename?: 'Mutation', shareData: { __typename?: 'SystemTask', success: boolean } };


export const ShareDataDocument = gql`
    mutation ShareData($data: ShareDataInput!) {
  shareData(data: $data) {
    success
  }
}
    `;
export type ShareDataMutationFn = Apollo.MutationFunction<ShareDataMutation, ShareDataMutationVariables>;
export function useShareDataMutation(baseOptions?: Apollo.MutationHookOptions<ShareDataMutation, ShareDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ShareDataMutation, ShareDataMutationVariables>(ShareDataDocument, options);
      }
export type ShareDataMutationHookResult = ReturnType<typeof useShareDataMutation>;
export type ShareDataMutationResult = Apollo.MutationResult<ShareDataMutation>;
export type ShareDataMutationOptions = Apollo.BaseMutationOptions<ShareDataMutation, ShareDataMutationVariables>;