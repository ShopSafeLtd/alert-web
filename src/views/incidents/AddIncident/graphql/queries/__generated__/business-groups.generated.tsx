import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessGroupsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type BusinessGroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string }> };


export const BusinessGroupsDocument = gql`
    query BusinessGroups($where: GroupWhereInput) {
  groups(where: $where) {
    id
    name
  }
}
    `;
export function useBusinessGroupsQuery(baseOptions?: Apollo.QueryHookOptions<BusinessGroupsQuery, BusinessGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessGroupsQuery, BusinessGroupsQueryVariables>(BusinessGroupsDocument, options);
      }
export function useBusinessGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessGroupsQuery, BusinessGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessGroupsQuery, BusinessGroupsQueryVariables>(BusinessGroupsDocument, options);
        }
export type BusinessGroupsQueryHookResult = ReturnType<typeof useBusinessGroupsQuery>;
export type BusinessGroupsLazyQueryHookResult = ReturnType<typeof useBusinessGroupsLazyQuery>;
export type BusinessGroupsQueryResult = Apollo.QueryResult<BusinessGroupsQuery, BusinessGroupsQueryVariables>;