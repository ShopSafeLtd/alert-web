import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QueueStockRemovalCsvExportMutationVariables = Types.Exact<{
  where: Types.StockRemovalCsvExportInput;
}>;


export type QueueStockRemovalCsvExportMutation = { __typename?: 'Mutation', queueStockRemovalCsvExport: { __typename?: 'QueuedStockRemovalExportResult', jobId: string, message: string, estimatedTime?: string | null } };


export const QueueStockRemovalCsvExportDocument = gql`
    mutation QueueStockRemovalCsvExport($where: StockRemovalCsvExportInput!) {
  queueStockRemovalCsvExport(where: $where) {
    jobId
    message
    estimatedTime
  }
}
    `;
export type QueueStockRemovalCsvExportMutationFn = Apollo.MutationFunction<QueueStockRemovalCsvExportMutation, QueueStockRemovalCsvExportMutationVariables>;
export function useQueueStockRemovalCsvExportMutation(baseOptions?: Apollo.MutationHookOptions<QueueStockRemovalCsvExportMutation, QueueStockRemovalCsvExportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<QueueStockRemovalCsvExportMutation, QueueStockRemovalCsvExportMutationVariables>(QueueStockRemovalCsvExportDocument, options);
      }
export type QueueStockRemovalCsvExportMutationHookResult = ReturnType<typeof useQueueStockRemovalCsvExportMutation>;
export type QueueStockRemovalCsvExportMutationResult = Apollo.MutationResult<QueueStockRemovalCsvExportMutation>;
export type QueueStockRemovalCsvExportMutationOptions = Apollo.BaseMutationOptions<QueueStockRemovalCsvExportMutation, QueueStockRemovalCsvExportMutationVariables>;