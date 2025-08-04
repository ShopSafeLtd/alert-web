import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateChecklistCsvZipMutationVariables = Types.Exact<{
  range: Types.ChecklistDateRange;
  where: Types.ActiveChecklistWhereInput;
}>;


export type CreateChecklistCsvZipMutation = { __typename?: 'Mutation', createChecklistCsvZip: string };


export const CreateChecklistCsvZipDocument = gql`
    mutation CreateChecklistCsvZip($range: ChecklistDateRange!, $where: ActiveChecklistWhereInput!) {
  createChecklistCsvZip(where: $where, range: $range)
}
    `;
export type CreateChecklistCsvZipMutationFn = Apollo.MutationFunction<CreateChecklistCsvZipMutation, CreateChecklistCsvZipMutationVariables>;
export function useCreateChecklistCsvZipMutation(baseOptions?: Apollo.MutationHookOptions<CreateChecklistCsvZipMutation, CreateChecklistCsvZipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChecklistCsvZipMutation, CreateChecklistCsvZipMutationVariables>(CreateChecklistCsvZipDocument, options);
      }
export type CreateChecklistCsvZipMutationHookResult = ReturnType<typeof useCreateChecklistCsvZipMutation>;
export type CreateChecklistCsvZipMutationResult = Apollo.MutationResult<CreateChecklistCsvZipMutation>;
export type CreateChecklistCsvZipMutationOptions = Apollo.BaseMutationOptions<CreateChecklistCsvZipMutation, CreateChecklistCsvZipMutationVariables>;