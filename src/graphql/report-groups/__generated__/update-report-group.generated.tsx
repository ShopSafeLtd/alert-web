import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateReportGroupMutationVariables = Types.Exact<{
  data: Types.ReportGroupEditInput;
  where: Types.UniqueId;
}>;


export type UpdateReportGroupMutation = { __typename?: 'Mutation', updateReportGroup: { __typename?: 'ReportGroup', id: string, name: string, order: number, reports: Array<{ __typename?: 'ReportTemplate', id: string, name: string, description?: string | null, type: Types.ReportType }> } };


export const UpdateReportGroupDocument = gql`
    mutation UpdateReportGroup($data: ReportGroupEditInput!, $where: UniqueId!) {
  updateReportGroup(data: $data, where: $where) {
    id
    name
    order
    reports {
      id
      name
      description
      type
    }
  }
}
    `;
export type UpdateReportGroupMutationFn = Apollo.MutationFunction<UpdateReportGroupMutation, UpdateReportGroupMutationVariables>;
export function useUpdateReportGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportGroupMutation, UpdateReportGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReportGroupMutation, UpdateReportGroupMutationVariables>(UpdateReportGroupDocument, options);
      }
export type UpdateReportGroupMutationHookResult = ReturnType<typeof useUpdateReportGroupMutation>;
export type UpdateReportGroupMutationResult = Apollo.MutationResult<UpdateReportGroupMutation>;
export type UpdateReportGroupMutationOptions = Apollo.BaseMutationOptions<UpdateReportGroupMutation, UpdateReportGroupMutationVariables>;