import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateOneStatementTemplateMutationVariables = Types.Exact<{
  data: Types.StatementTemplateCreateInput;
}>;

export type CreateOneStatementTemplateMutation = {
  __typename?: 'Mutation';
  createOneStatementTemplate: {
    __typename?: 'StatementTemplate';
    id: string;
    name: string;
    content: string;
    schemes: Array<{ __typename?: 'Scheme'; id: string; name: string }>;
  };
};

export const CreateOneStatementTemplateDocument = gql`
  mutation CreateOneStatementTemplate($data: StatementTemplateCreateInput!) {
    createOneStatementTemplate(data: $data) {
      id
      name
      content
      schemes {
        id
        name
      }
    }
  }
`;
export type CreateOneStatementTemplateMutationFn = Apollo.MutationFunction<
  CreateOneStatementTemplateMutation,
  CreateOneStatementTemplateMutationVariables
>;
export function useCreateOneStatementTemplateMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOneStatementTemplateMutation,
    CreateOneStatementTemplateMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOneStatementTemplateMutation,
    CreateOneStatementTemplateMutationVariables
  >(CreateOneStatementTemplateDocument, options);
}
export type CreateOneStatementTemplateMutationHookResult = ReturnType<
  typeof useCreateOneStatementTemplateMutation
>;
export type CreateOneStatementTemplateMutationResult =
  Apollo.MutationResult<CreateOneStatementTemplateMutation>;
export type CreateOneStatementTemplateMutationOptions =
  Apollo.BaseMutationOptions<
    CreateOneStatementTemplateMutation,
    CreateOneStatementTemplateMutationVariables
  >;
