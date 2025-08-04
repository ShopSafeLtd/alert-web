import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListVehiclesQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.VehicleWhereInput>;
  order?: Types.InputMaybe<Types.VehicleOrderByWithRelationInput>;
}>;


export type ListVehiclesQuery = { __typename?: 'Query', listVehicles: { __typename?: 'ListVehicles', total: number, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null, make?: string | null, model?: string | null, registration?: string | null, totalCrimeGroups: number, totalOffenders: number, totalIncidents: number, reference?: number | null, totalImages?: number | null, updatedAt?: Date | null, colour?: string | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, incidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null, name?: string | null }>, crimeGroup: Array<{ __typename?: 'CrimeGroup', id: string, reference?: number | null }> }> } };


export const ListVehiclesDocument = gql`
    query ListVehicles($take: Int, $skip: Int, $where: VehicleWhereInput, $order: VehicleOrderByWithRelationInput) {
  listVehicles(take: $take, skip: $skip, where: $where, order: $order) {
    vehicles {
      id
      make
      model
      registration
      totalCrimeGroups
      totalOffenders
      totalIncidents
      reference
      totalImages
      images {
        id
        optimised
        url
        position
        rotation
      }
      incidents {
        id
        subject
      }
      offenders {
        id
        name
      }
      updatedAt
      colour
      crimeGroup {
        id
        reference
      }
    }
    total
  }
}
    `;
export function useListVehiclesQuery(baseOptions?: Apollo.QueryHookOptions<ListVehiclesQuery, ListVehiclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListVehiclesQuery, ListVehiclesQueryVariables>(ListVehiclesDocument, options);
      }
export function useListVehiclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListVehiclesQuery, ListVehiclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListVehiclesQuery, ListVehiclesQueryVariables>(ListVehiclesDocument, options);
        }
export type ListVehiclesQueryHookResult = ReturnType<typeof useListVehiclesQuery>;
export type ListVehiclesLazyQueryHookResult = ReturnType<typeof useListVehiclesLazyQuery>;
export type ListVehiclesQueryResult = Apollo.QueryResult<ListVehiclesQuery, ListVehiclesQueryVariables>;