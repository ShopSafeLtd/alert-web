import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BansQueryVariables = Types.Exact<{
  where: Types.BanWhereInput;
}>;


export type BansQuery = { __typename?: 'Query', bans: Array<{ __typename?: 'Ban', id: string, location: string, startDate: Date, endDate: Date, description?: string | null }> };


export const BansDocument = gql`
    query Bans($where: BanWhereInput!) {
  bans(where: $where) {
    id
    location
    startDate
    endDate
    description
  }
}
    `;
export function useBansQuery(baseOptions: Apollo.QueryHookOptions<BansQuery, BansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BansQuery, BansQueryVariables>(BansDocument, options);
      }
export function useBansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BansQuery, BansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BansQuery, BansQueryVariables>(BansDocument, options);
        }
export type BansQueryHookResult = ReturnType<typeof useBansQuery>;
export type BansLazyQueryHookResult = ReturnType<typeof useBansLazyQuery>;
export type BansQueryResult = Apollo.QueryResult<BansQuery, BansQueryVariables>;