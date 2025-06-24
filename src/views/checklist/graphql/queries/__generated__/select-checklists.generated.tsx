import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SelectChecklistsQueryVariables = Types.Exact<{
  where: Types.ChecklistWhereInput;
  order?: Types.InputMaybe<Types.ChecklistOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SelectChecklistsQuery = { __typename?: 'Query', checklists: Array<{ __typename?: 'Checklist', id: string, titleLocaled: string }> };


export const SelectChecklistsDocument = gql`
    query SelectChecklists($where: ChecklistWhereInput!, $order: ChecklistOrderByWithRelationInput, $take: Int, $skip: Int) {
  checklists(where: $where, order: $order, take: $take, skip: $skip) {
    id
    titleLocaled
  }
}
    `;
export function useSelectChecklistsQuery(baseOptions: Apollo.QueryHookOptions<SelectChecklistsQuery, SelectChecklistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SelectChecklistsQuery, SelectChecklistsQueryVariables>(SelectChecklistsDocument, options);
      }
export function useSelectChecklistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SelectChecklistsQuery, SelectChecklistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SelectChecklistsQuery, SelectChecklistsQueryVariables>(SelectChecklistsDocument, options);
        }
export type SelectChecklistsQueryHookResult = ReturnType<typeof useSelectChecklistsQuery>;
export type SelectChecklistsLazyQueryHookResult = ReturnType<typeof useSelectChecklistsLazyQuery>;
export type SelectChecklistsQueryResult = Apollo.QueryResult<SelectChecklistsQuery, SelectChecklistsQueryVariables>;