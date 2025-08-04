import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateReportGroupMutationVariables = Types.Exact<{
  data: Types.ReportGroupCreateInput;
}>;


export type CreateReportGroupMutation = { __typename?: 'Mutation', createReportGroup: { __typename?: 'ReportGroup', id?: string | null, name?: string | null, order?: number | null, reports?: Array<{ __typename?: 'ReportTemplate', id?: string | null, name?: string | null, description?: string | null, type?: Types.ReportType | null }> | null } };


export const CreateReportGroupDocument = gql`
    mutation CreateReportGroup($data: ReportGroupCreateInput!) {
  createReportGroup(data: $data) {
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
export type CreateReportGroupMutationFn = Apollo.MutationFunction<CreateReportGroupMutation, CreateReportGroupMutationVariables>;
export function useCreateReportGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportGroupMutation, CreateReportGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportGroupMutation, CreateReportGroupMutationVariables>(CreateReportGroupDocument, options);
      }
export type CreateReportGroupMutationHookResult = ReturnType<typeof useCreateReportGroupMutation>;
export type CreateReportGroupMutationResult = Apollo.MutationResult<CreateReportGroupMutation>;
export type CreateReportGroupMutationOptions = Apollo.BaseMutationOptions<CreateReportGroupMutation, CreateReportGroupMutationVariables>;