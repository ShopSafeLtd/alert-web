import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteReportGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
}>;


export type DeleteReportGroupMutation = { __typename?: 'Mutation', deleteReportGroup: { __typename?: 'ReportGroup', id?: string | null } };


export const DeleteReportGroupDocument = gql`
    mutation DeleteReportGroup($where: UniqueId!) {
  deleteReportGroup(where: $where) {
    id
  }
}
    `;
export type DeleteReportGroupMutationFn = Apollo.MutationFunction<DeleteReportGroupMutation, DeleteReportGroupMutationVariables>;
export function useDeleteReportGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteReportGroupMutation, DeleteReportGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReportGroupMutation, DeleteReportGroupMutationVariables>(DeleteReportGroupDocument, options);
      }
export type DeleteReportGroupMutationHookResult = ReturnType<typeof useDeleteReportGroupMutation>;
export type DeleteReportGroupMutationResult = Apollo.MutationResult<DeleteReportGroupMutation>;
export type DeleteReportGroupMutationOptions = Apollo.BaseMutationOptions<DeleteReportGroupMutation, DeleteReportGroupMutationVariables>;