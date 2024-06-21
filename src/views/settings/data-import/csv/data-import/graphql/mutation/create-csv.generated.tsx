import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCsvImportMutationVariables = Types.Exact<{
  data: Types.CsvImportCreateInput;
}>;

export type CreateCsvImportMutation = {
  __typename?: 'Mutation';
  createOneCsvImport: { __typename?: 'CsvImport'; id: string };
};

export const CreateCsvImportDocument = gql`
  mutation CreateCsvImport($data: CsvImportCreateInput!) {
    createOneCsvImport(data: $data) {
      id
    }
  }
`;
export type CreateCsvImportMutationFn = Apollo.MutationFunction<
  CreateCsvImportMutation,
  CreateCsvImportMutationVariables
>;
export function useCreateCsvImportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCsvImportMutation,
    CreateCsvImportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCsvImportMutation,
    CreateCsvImportMutationVariables
  >(CreateCsvImportDocument, options);
}
export type CreateCsvImportMutationHookResult = ReturnType<
  typeof useCreateCsvImportMutation
>;
export type CreateCsvImportMutationResult =
  Apollo.MutationResult<CreateCsvImportMutation>;
export type CreateCsvImportMutationOptions = Apollo.BaseMutationOptions<
  CreateCsvImportMutation,
  CreateCsvImportMutationVariables
>;
