import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCsvZipMutationVariables = Types.Exact<{
  where: Types.IncidentExportInput;
}>;

export type CreateCsvZipMutation = {
  __typename?: 'Mutation';
  createCsvZip: string;
};

export const CreateCsvZipDocument = gql`
  mutation CreateCsvZip($where: IncidentExportInput!) {
    createCsvZip(where: $where)
  }
`;
export type CreateCsvZipMutationFn = Apollo.MutationFunction<
  CreateCsvZipMutation,
  CreateCsvZipMutationVariables
>;
export function useCreateCsvZipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCsvZipMutation,
    CreateCsvZipMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCsvZipMutation,
    CreateCsvZipMutationVariables
  >(CreateCsvZipDocument, options);
}
export type CreateCsvZipMutationHookResult = ReturnType<
  typeof useCreateCsvZipMutation
>;
export type CreateCsvZipMutationResult =
  Apollo.MutationResult<CreateCsvZipMutation>;
export type CreateCsvZipMutationOptions = Apollo.BaseMutationOptions<
  CreateCsvZipMutation,
  CreateCsvZipMutationVariables
>;
