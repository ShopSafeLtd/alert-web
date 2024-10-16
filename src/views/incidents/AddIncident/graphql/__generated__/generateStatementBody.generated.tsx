import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateStatementBodyMutationVariables = Types.Exact<{
  data: Types.GenerateStatementData;
}>;


export type GenerateStatementBodyMutation = { __typename?: 'Mutation', generateStatementBody: { __typename?: 'GeneratedStatementBody', statement: string } };


export const GenerateStatementBodyDocument = gql`
    mutation GenerateStatementBody($data: GenerateStatementData!) {
  generateStatementBody(data: $data) {
    statement
  }
}
    `;
export type GenerateStatementBodyMutationFn = Apollo.MutationFunction<GenerateStatementBodyMutation, GenerateStatementBodyMutationVariables>;
export function useGenerateStatementBodyMutation(baseOptions?: Apollo.MutationHookOptions<GenerateStatementBodyMutation, GenerateStatementBodyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateStatementBodyMutation, GenerateStatementBodyMutationVariables>(GenerateStatementBodyDocument, options);
      }
export type GenerateStatementBodyMutationHookResult = ReturnType<typeof useGenerateStatementBodyMutation>;
export type GenerateStatementBodyMutationResult = Apollo.MutationResult<GenerateStatementBodyMutation>;
export type GenerateStatementBodyMutationOptions = Apollo.BaseMutationOptions<GenerateStatementBodyMutation, GenerateStatementBodyMutationVariables>;