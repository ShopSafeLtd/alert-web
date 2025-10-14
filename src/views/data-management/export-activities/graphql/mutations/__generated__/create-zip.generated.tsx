import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateActivityCsvZipMutationVariables = Types.Exact<{
  where: Types.ActivityExportWhere;
}>;


export type CreateActivityCsvZipMutation = { __typename?: 'Mutation', createActivityCsvZip: string };


export const CreateActivityCsvZipDocument = gql`
    mutation CreateActivityCsvZip($where: ActivityExportWhere!) {
  createActivityCsvZip(where: $where)
}
    `;
export type CreateActivityCsvZipMutationFn = Apollo.MutationFunction<CreateActivityCsvZipMutation, CreateActivityCsvZipMutationVariables>;
export function useCreateActivityCsvZipMutation(baseOptions?: Apollo.MutationHookOptions<CreateActivityCsvZipMutation, CreateActivityCsvZipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateActivityCsvZipMutation, CreateActivityCsvZipMutationVariables>(CreateActivityCsvZipDocument, options);
      }
export type CreateActivityCsvZipMutationHookResult = ReturnType<typeof useCreateActivityCsvZipMutation>;
export type CreateActivityCsvZipMutationResult = Apollo.MutationResult<CreateActivityCsvZipMutation>;
export type CreateActivityCsvZipMutationOptions = Apollo.BaseMutationOptions<CreateActivityCsvZipMutation, CreateActivityCsvZipMutationVariables>;