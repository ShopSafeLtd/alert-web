import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RecycledItemsCountQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  dataType?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
}>;


export type RecycledItemsCountQuery = { __typename?: 'Query', recycledItemsCount: number };


export const RecycledItemsCountDocument = gql`
    query recycledItemsCount($schemeId: String!, $search: String, $dataType: [String!]) {
  recycledItemsCount(schemeId: $schemeId, search: $search, dataType: $dataType)
}
    `;
export function useRecycledItemsCountQuery(baseOptions: Apollo.QueryHookOptions<RecycledItemsCountQuery, RecycledItemsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecycledItemsCountQuery, RecycledItemsCountQueryVariables>(RecycledItemsCountDocument, options);
      }
export function useRecycledItemsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecycledItemsCountQuery, RecycledItemsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecycledItemsCountQuery, RecycledItemsCountQueryVariables>(RecycledItemsCountDocument, options);
        }
export type RecycledItemsCountQueryHookResult = ReturnType<typeof useRecycledItemsCountQuery>;
export type RecycledItemsCountLazyQueryHookResult = ReturnType<typeof useRecycledItemsCountLazyQuery>;
export type RecycledItemsCountQueryResult = Apollo.QueryResult<RecycledItemsCountQuery, RecycledItemsCountQueryVariables>;