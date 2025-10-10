import type * as Types from '../../../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ParentBusinessesListQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
  hasChildrenOnly?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type ParentBusinessesListQuery = { __typename?: 'Query', businessRelay: { __typename?: 'QueryBusinessRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryBusinessRelayConnectionEdge', node: { __typename?: 'Business', id: string, name: string } }> } };


export const ParentBusinessesListDocument = gql`
    query ParentBusinessesList($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!], $hasChildrenOnly: Boolean) {
  businessRelay(
    where: $where
    skip: $skip
    take: $take
    orderBy: $orderBy
    hasChildrenOnly: $hasChildrenOnly
  ) {
    totalCount
    edges {
      node {
        id
        name
      }
    }
  }
}
    `;
export function useParentBusinessesListQuery(baseOptions?: Apollo.QueryHookOptions<ParentBusinessesListQuery, ParentBusinessesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ParentBusinessesListQuery, ParentBusinessesListQueryVariables>(ParentBusinessesListDocument, options);
      }
export function useParentBusinessesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ParentBusinessesListQuery, ParentBusinessesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ParentBusinessesListQuery, ParentBusinessesListQueryVariables>(ParentBusinessesListDocument, options);
        }
export type ParentBusinessesListQueryHookResult = ReturnType<typeof useParentBusinessesListQuery>;
export type ParentBusinessesListLazyQueryHookResult = ReturnType<typeof useParentBusinessesListLazyQuery>;
export type ParentBusinessesListQueryResult = Apollo.QueryResult<ParentBusinessesListQuery, ParentBusinessesListQueryVariables>;