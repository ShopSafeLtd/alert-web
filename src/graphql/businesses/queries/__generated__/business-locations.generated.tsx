import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessLocationsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BusinessWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Array<Types.BusinessOrderBy> | Types.BusinessOrderBy>;
}>;


export type BusinessLocationsQuery = { __typename?: 'Query', listBusinesses: { __typename?: 'ListBusinesses', total: number, businesses: Array<{ __typename?: 'Business', id: string, name: string, fullName: string, publicName: boolean, brands: Array<string>, locations: Array<{ __typename?: 'Address', id: string, full: string, geoLat?: number | null, geoLng?: number | null }> }> } };


export const BusinessLocationsDocument = gql`
    query businessLocations($where: BusinessWhereInput, $skip: Int, $take: Int, $orderBy: [BusinessOrderBy!]) {
  listBusinesses(where: $where, skip: $skip, take: $take, orderBy: $orderBy) {
    total
    businesses {
      id
      name
      fullName
      publicName
      brands
      locations {
        id
        full
        geoLat
        geoLng
      }
    }
  }
}
    `;
export function useBusinessLocationsQuery(baseOptions?: Apollo.QueryHookOptions<BusinessLocationsQuery, BusinessLocationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessLocationsQuery, BusinessLocationsQueryVariables>(BusinessLocationsDocument, options);
      }
export function useBusinessLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessLocationsQuery, BusinessLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessLocationsQuery, BusinessLocationsQueryVariables>(BusinessLocationsDocument, options);
        }
export type BusinessLocationsQueryHookResult = ReturnType<typeof useBusinessLocationsQuery>;
export type BusinessLocationsLazyQueryHookResult = ReturnType<typeof useBusinessLocationsLazyQuery>;
export type BusinessLocationsQueryResult = Apollo.QueryResult<BusinessLocationsQuery, BusinessLocationsQueryVariables>;