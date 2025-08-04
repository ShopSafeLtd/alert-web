import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueueIncidentCsvExportMutationVariables = Types.Exact<{
  where: Types.IncidentExportInput;
}>;


export type QueueIncidentCsvExportMutation = { __typename?: 'Mutation', queueIncidentCsvExport?: { __typename?: 'QueuedIncidentExportResult', estimatedTime?: string | null, jobId: string, message: string } | null };


export const QueueIncidentCsvExportDocument = gql`
    mutation queueIncidentCsvExport($where: IncidentExportInput!) {
  queueIncidentCsvExport(where: $where) {
    estimatedTime
    jobId
    message
  }
}
    `;
export type QueueIncidentCsvExportMutationFn = Apollo.MutationFunction<QueueIncidentCsvExportMutation, QueueIncidentCsvExportMutationVariables>;
export function useQueueIncidentCsvExportMutation(baseOptions?: Apollo.MutationHookOptions<QueueIncidentCsvExportMutation, QueueIncidentCsvExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueIncidentCsvExportMutation, QueueIncidentCsvExportMutationVariables>(QueueIncidentCsvExportDocument, options);
      }
export type QueueIncidentCsvExportMutationHookResult = ReturnType<typeof useQueueIncidentCsvExportMutation>;
export type QueueIncidentCsvExportMutationResult = Apollo.MutationResult<QueueIncidentCsvExportMutation>;
export type QueueIncidentCsvExportMutationOptions = Apollo.BaseMutationOptions<QueueIncidentCsvExportMutation, QueueIncidentCsvExportMutationVariables>;