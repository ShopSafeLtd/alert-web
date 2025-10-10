import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChecklistsQueryVariables = Types.Exact<{
  where: Types.ChecklistWhereInput;
  order?: Types.InputMaybe<Types.ChecklistOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ChecklistsQuery = { __typename?: 'Query', checklists: Array<{ __typename?: 'Checklist', id: string, titleLocaled: string, descriptionLocaled: string }> };


export const ChecklistsDocument = gql`
    query Checklists($where: ChecklistWhereInput!, $order: ChecklistOrderByWithRelationInput, $take: Int, $skip: Int) {
  checklists(where: $where, order: $order, take: $take, skip: $skip) {
    id
    titleLocaled
    descriptionLocaled
  }
}
    `;
export function useChecklistsQuery(baseOptions: Apollo.QueryHookOptions<ChecklistsQuery, ChecklistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChecklistsQuery, ChecklistsQueryVariables>(ChecklistsDocument, options);
      }
export function useChecklistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChecklistsQuery, ChecklistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChecklistsQuery, ChecklistsQueryVariables>(ChecklistsDocument, options);
        }
export type ChecklistsQueryHookResult = ReturnType<typeof useChecklistsQuery>;
export type ChecklistsLazyQueryHookResult = ReturnType<typeof useChecklistsLazyQuery>;
export type ChecklistsQueryResult = Apollo.QueryResult<ChecklistsQuery, ChecklistsQueryVariables>;