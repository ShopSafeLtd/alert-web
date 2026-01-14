import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueueActivityCsvExportMutationVariables = Types.Exact<{
  where: Types.ActivityExportWhere;
}>;


export type QueueActivityCsvExportMutation = { __typename?: 'Mutation', queueActivityCsvExport: { __typename?: 'QueuedIncidentExportResult', jobId: string, message: string, estimatedTime?: string | null } };


export const QueueActivityCsvExportDocument = gql`
    mutation QueueActivityCsvExport($where: ActivityExportWhere!) {
  queueActivityCsvExport(where: $where) {
    jobId
    message
    estimatedTime
  }
}
    `;
export type QueueActivityCsvExportMutationFn = Apollo.MutationFunction<QueueActivityCsvExportMutation, QueueActivityCsvExportMutationVariables>;
export function useQueueActivityCsvExportMutation(baseOptions?: Apollo.MutationHookOptions<QueueActivityCsvExportMutation, QueueActivityCsvExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueActivityCsvExportMutation, QueueActivityCsvExportMutationVariables>(QueueActivityCsvExportDocument, options);
      }
export type QueueActivityCsvExportMutationHookResult = ReturnType<typeof useQueueActivityCsvExportMutation>;
export type QueueActivityCsvExportMutationResult = Apollo.MutationResult<QueueActivityCsvExportMutation>;
export type QueueActivityCsvExportMutationOptions = Apollo.BaseMutationOptions<QueueActivityCsvExportMutation, QueueActivityCsvExportMutationVariables>;