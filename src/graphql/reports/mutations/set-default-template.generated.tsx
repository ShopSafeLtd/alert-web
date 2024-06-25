import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SetDefaultTemplateMutationVariables = Types.Exact<{
  data: Types.SetDefaultTemplateInput;
}>;


export type SetDefaultTemplateMutation = { __typename?: 'Mutation', setDefaultTemplate?: { __typename?: 'ReportTemplate', id: string, default: boolean } | null };


export const SetDefaultTemplateDocument = gql`
    mutation SetDefaultTemplate($data: SetDefaultTemplateInput!) {
  setDefaultTemplate(data: $data) {
    id
    default
  }
}
    `;
export type SetDefaultTemplateMutationFn = Apollo.MutationFunction<SetDefaultTemplateMutation, SetDefaultTemplateMutationVariables>;
export function useSetDefaultTemplateMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultTemplateMutation, SetDefaultTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultTemplateMutation, SetDefaultTemplateMutationVariables>(SetDefaultTemplateDocument, options);
      }
export type SetDefaultTemplateMutationHookResult = ReturnType<typeof useSetDefaultTemplateMutation>;
export type SetDefaultTemplateMutationResult = Apollo.MutationResult<SetDefaultTemplateMutation>;
export type SetDefaultTemplateMutationOptions = Apollo.BaseMutationOptions<SetDefaultTemplateMutation, SetDefaultTemplateMutationVariables>;