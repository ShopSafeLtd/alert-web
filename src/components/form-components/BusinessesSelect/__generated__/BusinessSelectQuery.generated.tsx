import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessesSelectQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type BusinessesSelectQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name?: string | null, siteNumber?: string | null }> } };


export const BusinessesSelectDocument = gql`
    query BusinessesSelect($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
      siteNumber
    }
  }
}
    `;
export function useBusinessesSelectQuery(baseOptions?: Apollo.QueryHookOptions<BusinessesSelectQuery, BusinessesSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessesSelectQuery, BusinessesSelectQueryVariables>(BusinessesSelectDocument, options);
      }
export function useBusinessesSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessesSelectQuery, BusinessesSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessesSelectQuery, BusinessesSelectQueryVariables>(BusinessesSelectDocument, options);
        }
export type BusinessesSelectQueryHookResult = ReturnType<typeof useBusinessesSelectQuery>;
export type BusinessesSelectLazyQueryHookResult = ReturnType<typeof useBusinessesSelectLazyQuery>;
export type BusinessesSelectQueryResult = Apollo.QueryResult<BusinessesSelectQuery, BusinessesSelectQueryVariables>;