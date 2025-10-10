import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExportIncidentItemsCsvMutationVariables = Types.Exact<{
  where: Types.IncidentItemsWhereInput;
}>;


export type ExportIncidentItemsCsvMutation = { __typename?: 'Mutation', incidentItemsCsv: string };


export const ExportIncidentItemsCsvDocument = gql`
    mutation ExportIncidentItemsCsv($where: IncidentItemsWhereInput!) {
  incidentItemsCsv(where: $where)
}
    `;
export type ExportIncidentItemsCsvMutationFn = Apollo.MutationFunction<ExportIncidentItemsCsvMutation, ExportIncidentItemsCsvMutationVariables>;
export function useExportIncidentItemsCsvMutation(baseOptions?: Apollo.MutationHookOptions<ExportIncidentItemsCsvMutation, ExportIncidentItemsCsvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExportIncidentItemsCsvMutation, ExportIncidentItemsCsvMutationVariables>(ExportIncidentItemsCsvDocument, options);
      }
export type ExportIncidentItemsCsvMutationHookResult = ReturnType<typeof useExportIncidentItemsCsvMutation>;
export type ExportIncidentItemsCsvMutationResult = Apollo.MutationResult<ExportIncidentItemsCsvMutation>;
export type ExportIncidentItemsCsvMutationOptions = Apollo.BaseMutationOptions<ExportIncidentItemsCsvMutation, ExportIncidentItemsCsvMutationVariables>;