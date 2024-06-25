import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import { VehiclesFragmentDoc } from '../../../../../../graphql/fragments/vehicles.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListVehiclesCardQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.VehicleWhereInput>;
  order?: Types.InputMaybe<Types.VehicleOrderByWithRelationInput>;
}>;


export type ListVehiclesCardQuery = { __typename?: 'Query', listVehicles: { __typename?: 'ListVehicles', total: number, vehicles: Array<{ __typename?: 'Vehicle', id: string, reference?: number | null, colour?: string | null, model?: string | null, make?: string | null, registration?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, url?: string | null, position: Types.ImagePosition, rotation: number }> }> } };


export const ListVehiclesCardDocument = gql`
    query ListVehiclesCard($take: Int, $skip: Int, $where: VehicleWhereInput, $order: VehicleOrderByWithRelationInput) {
  listVehicles(take: $take, skip: $skip, where: $where, order: $order) {
    vehicles {
      ...Vehicles
      images {
        id
        optimised
        url
        position
        rotation
      }
    }
    total
  }
}
    ${VehiclesFragmentDoc}`;
export function useListVehiclesCardQuery(baseOptions?: Apollo.QueryHookOptions<ListVehiclesCardQuery, ListVehiclesCardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListVehiclesCardQuery, ListVehiclesCardQueryVariables>(ListVehiclesCardDocument, options);
      }
export function useListVehiclesCardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListVehiclesCardQuery, ListVehiclesCardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListVehiclesCardQuery, ListVehiclesCardQueryVariables>(ListVehiclesCardDocument, options);
        }
export type ListVehiclesCardQueryHookResult = ReturnType<typeof useListVehiclesCardQuery>;
export type ListVehiclesCardLazyQueryHookResult = ReturnType<typeof useListVehiclesCardLazyQuery>;
export type ListVehiclesCardQueryResult = Apollo.QueryResult<ListVehiclesCardQuery, ListVehiclesCardQueryVariables>;