import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOneStatementTemplateMutationVariables = Types.Exact<{
  data: Types.StatementTemplateUpdateInput;
  where: Types.StatementTemplateWhereUniqueInput;
}>;


export type UpdateOneStatementTemplateMutation = { __typename?: 'Mutation', updateOneStatementTemplate: { __typename?: 'StatementTemplate', id: string, name: string, content: string, schemes: Array<{ __typename?: 'Scheme', id: string, name: string }> } };


export const UpdateOneStatementTemplateDocument = gql`
    mutation UpdateOneStatementTemplate($data: StatementTemplateUpdateInput!, $where: StatementTemplateWhereUniqueInput!) {
  updateOneStatementTemplate(data: $data, where: $where) {
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
export type UpdateOneStatementTemplateMutationFn = Apollo.MutationFunction<UpdateOneStatementTemplateMutation, UpdateOneStatementTemplateMutationVariables>;
export function useUpdateOneStatementTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneStatementTemplateMutation, UpdateOneStatementTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneStatementTemplateMutation, UpdateOneStatementTemplateMutationVariables>(UpdateOneStatementTemplateDocument, options);
      }
export type UpdateOneStatementTemplateMutationHookResult = ReturnType<typeof useUpdateOneStatementTemplateMutation>;
export type UpdateOneStatementTemplateMutationResult = Apollo.MutationResult<UpdateOneStatementTemplateMutation>;
export type UpdateOneStatementTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateOneStatementTemplateMutation, UpdateOneStatementTemplateMutationVariables>;