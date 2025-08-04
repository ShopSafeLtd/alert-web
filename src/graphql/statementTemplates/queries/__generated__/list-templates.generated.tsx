import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListStatementTemplatesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.StatementTemplateWhereInput>;
}>;


export type ListStatementTemplatesQuery = { __typename?: 'Query', statementTemplates: Array<{ __typename?: 'StatementTemplate', id?: string | null, name?: string | null, content?: string | null, schemes?: Array<{ __typename?: 'Scheme', id?: string | null, name?: string | null }> | null }> };


export const ListStatementTemplatesDocument = gql`
    query ListStatementTemplates($where: StatementTemplateWhereInput) {
  statementTemplates(where: $where) {
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
export function useListStatementTemplatesQuery(baseOptions?: Apollo.QueryHookOptions<ListStatementTemplatesQuery, ListStatementTemplatesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListStatementTemplatesQuery, ListStatementTemplatesQueryVariables>(ListStatementTemplatesDocument, options);
      }
export function useListStatementTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListStatementTemplatesQuery, ListStatementTemplatesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListStatementTemplatesQuery, ListStatementTemplatesQueryVariables>(ListStatementTemplatesDocument, options);
        }
export type ListStatementTemplatesQueryHookResult = ReturnType<typeof useListStatementTemplatesQuery>;
export type ListStatementTemplatesLazyQueryHookResult = ReturnType<typeof useListStatementTemplatesLazyQuery>;
export type ListStatementTemplatesQueryResult = Apollo.QueryResult<ListStatementTemplatesQuery, ListStatementTemplatesQueryVariables>;