import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueueBusinessEngagementCsvExportMutationVariables = Types.Exact<{
  where: Types.UserContributionWhereInput;
  orderBy?: Types.InputMaybe<Types.BusinessContributionOrderByInput>;
}>;


export type QueueBusinessEngagementCsvExportMutation = { __typename?: 'Mutation', queueBusinessEngagementCsvExport: { __typename?: 'QueuedIncidentExportResult', jobId: string, message: string, estimatedTime?: string | null } };


export const QueueBusinessEngagementCsvExportDocument = gql`
    mutation QueueBusinessEngagementCsvExport($where: UserContributionWhereInput!, $orderBy: BusinessContributionOrderByInput) {
  queueBusinessEngagementCsvExport(where: $where, orderBy: $orderBy) {
    jobId
    message
    estimatedTime
  }
}
    `;
export type QueueBusinessEngagementCsvExportMutationFn = Apollo.MutationFunction<QueueBusinessEngagementCsvExportMutation, QueueBusinessEngagementCsvExportMutationVariables>;
export function useQueueBusinessEngagementCsvExportMutation(baseOptions?: Apollo.MutationHookOptions<QueueBusinessEngagementCsvExportMutation, QueueBusinessEngagementCsvExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueBusinessEngagementCsvExportMutation, QueueBusinessEngagementCsvExportMutationVariables>(QueueBusinessEngagementCsvExportDocument, options);
      }
export type QueueBusinessEngagementCsvExportMutationHookResult = ReturnType<typeof useQueueBusinessEngagementCsvExportMutation>;
export type QueueBusinessEngagementCsvExportMutationResult = Apollo.MutationResult<QueueBusinessEngagementCsvExportMutation>;
export type QueueBusinessEngagementCsvExportMutationOptions = Apollo.BaseMutationOptions<QueueBusinessEngagementCsvExportMutation, QueueBusinessEngagementCsvExportMutationVariables>;