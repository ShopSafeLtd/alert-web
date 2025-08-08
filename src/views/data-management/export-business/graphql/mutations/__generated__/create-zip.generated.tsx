import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ExportBusinessesMutationVariables = Types.Exact<{
  where: Types.BusinessWhereInput;
}>;


export type ExportBusinessesMutation = { __typename?: 'Mutation', createBusinessCsvZip: string };


export const ExportBusinessesDocument = gql`
    mutation ExportBusinesses($where: BusinessWhereInput!) {
  createBusinessCsvZip(where: $where)
}
    `;
export type ExportBusinessesMutationFn = Apollo.MutationFunction<ExportBusinessesMutation, ExportBusinessesMutationVariables>;
export function useExportBusinessesMutation(baseOptions?: Apollo.MutationHookOptions<ExportBusinessesMutation, ExportBusinessesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExportBusinessesMutation, ExportBusinessesMutationVariables>(ExportBusinessesDocument, options);
      }
export type ExportBusinessesMutationHookResult = ReturnType<typeof useExportBusinessesMutation>;
export type ExportBusinessesMutationResult = Apollo.MutationResult<ExportBusinessesMutation>;
export type ExportBusinessesMutationOptions = Apollo.BaseMutationOptions<ExportBusinessesMutation, ExportBusinessesMutationVariables>;