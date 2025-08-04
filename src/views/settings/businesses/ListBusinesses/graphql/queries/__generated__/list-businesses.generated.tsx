import type * as Types from '../../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessesListQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type BusinessesListQuery = { __typename?: 'Query', businessRelay?: { __typename?: 'QueryBusinessRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryBusinessRelayConnectionEdge', node: { __typename?: 'Business', id: string, name?: string | null, siteNumber?: string | null, fullName?: string | null, publicName: boolean, policeArea?: Array<Types.PoliceForce> | null, demId?: string | null, totalUsers: number, parent?: { __typename?: 'Business', id: string, name?: string | null } | null, locations: Array<{ __typename?: 'Address', id: string, full?: string | null }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null }> } }> } | null };


export const BusinessesListDocument = gql`
    query BusinessesList($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  businessRelay(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    totalCount
    edges {
      node {
        id
        name
        siteNumber
        fullName
        publicName
        policeArea
        demId
        parent {
          id
          name
        }
        locations {
          id
          full
        }
        groups {
          id
          name
        }
        tags {
          id
          name
        }
        totalUsers
      }
    }
  }
}
    `;
export function useBusinessesListQuery(baseOptions?: Apollo.QueryHookOptions<BusinessesListQuery, BusinessesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessesListQuery, BusinessesListQueryVariables>(BusinessesListDocument, options);
      }
export function useBusinessesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessesListQuery, BusinessesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessesListQuery, BusinessesListQueryVariables>(BusinessesListDocument, options);
        }
export type BusinessesListQueryHookResult = ReturnType<typeof useBusinessesListQuery>;
export type BusinessesListLazyQueryHookResult = ReturnType<typeof useBusinessesListLazyQuery>;
export type BusinessesListQueryResult = Apollo.QueryResult<BusinessesListQuery, BusinessesListQueryVariables>;