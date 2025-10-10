import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBusinessesLocationsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type ListBusinessesLocationsQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name: string, locations: Array<{ __typename?: 'Address', id: string, building?: string | null, street?: string | null, townCity?: string | null, county?: string | null, postcode?: string | null }> }> } };


export const ListBusinessesLocationsDocument = gql`
    query ListBusinessesLocations($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
      locations {
        id
        building
        street
        townCity
        county
        postcode
      }
    }
  }
}
    `;
export function useListBusinessesLocationsQuery(baseOptions?: Apollo.QueryHookOptions<ListBusinessesLocationsQuery, ListBusinessesLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBusinessesLocationsQuery, ListBusinessesLocationsQueryVariables>(ListBusinessesLocationsDocument, options);
      }
export function useListBusinessesLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBusinessesLocationsQuery, ListBusinessesLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBusinessesLocationsQuery, ListBusinessesLocationsQueryVariables>(ListBusinessesLocationsDocument, options);
        }
export type ListBusinessesLocationsQueryHookResult = ReturnType<typeof useListBusinessesLocationsQuery>;
export type ListBusinessesLocationsLazyQueryHookResult = ReturnType<typeof useListBusinessesLocationsLazyQuery>;
export type ListBusinessesLocationsQueryResult = Apollo.QueryResult<ListBusinessesLocationsQuery, ListBusinessesLocationsQueryVariables>;