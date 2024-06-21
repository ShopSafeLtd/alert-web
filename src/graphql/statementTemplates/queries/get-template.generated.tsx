import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type StatementTemplateQueryVariables = Types.Exact<{
  where: Types.StatementTemplateWhereUniqueInput;
}>;

export type StatementTemplateQuery = {
  __typename?: 'Query';
  statementTemplate: {
    __typename?: 'StatementTemplate';
    id: string;
    name: string;
    content: string;
  };
};

export const StatementTemplateDocument = gql`
  query StatementTemplate($where: StatementTemplateWhereUniqueInput!) {
    statementTemplate(where: $where) {
      id
      name
      content
    }
  }
`;
export function useStatementTemplateQuery(
  baseOptions: Apollo.QueryHookOptions<
    StatementTemplateQuery,
    StatementTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    StatementTemplateQuery,
    StatementTemplateQueryVariables
  >(StatementTemplateDocument, options);
}
export function useStatementTemplateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    StatementTemplateQuery,
    StatementTemplateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    StatementTemplateQuery,
    StatementTemplateQueryVariables
  >(StatementTemplateDocument, options);
}
export type StatementTemplateQueryHookResult = ReturnType<
  typeof useStatementTemplateQuery
>;
export type StatementTemplateLazyQueryHookResult = ReturnType<
  typeof useStatementTemplateLazyQuery
>;
export type StatementTemplateQueryResult = Apollo.QueryResult<
  StatementTemplateQuery,
  StatementTemplateQueryVariables
>;
