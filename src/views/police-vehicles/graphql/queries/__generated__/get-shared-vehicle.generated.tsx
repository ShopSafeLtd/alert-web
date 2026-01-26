import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceVehicleCardFragmentDoc } from '../../../../../components/police-vehicles/PoliceVehicleCard/__generated__/PoliceVehicleCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSharedVehicleQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type GetSharedVehicleQuery = { __typename?: 'Query', sharedVehicle: { __typename?: 'SharedVehicle', aiAssociatedRiskSnapshot?: { [key: string]: any } | null, aiGeographicMovementSnapshot?: { [key: string]: any } | null, aiVehicleUsageAnalysisSnapshot?: { [key: string]: any } | null, id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiUsagePatterns?: string | null, aiGeographicPattern?: string | null, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, vehicle: Array<{ __typename?: 'Vehicle', id: string, registration?: string | null, reference?: number | null, make?: string | null, model?: string | null, colour?: string | null, totalIncidents: number, totalOffenders: number, totalImages: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, url?: string | null }> }> } };


export const GetSharedVehicleDocument = gql`
    query GetSharedVehicle($id: String!) {
  sharedVehicle(where: {id: $id}) {
    ...PoliceVehicleCard
    aiAssociatedRiskSnapshot
    aiGeographicMovementSnapshot
    aiVehicleUsageAnalysisSnapshot
  }
}
    ${PoliceVehicleCardFragmentDoc}`;
export function useGetSharedVehicleQuery(baseOptions: Apollo.QueryHookOptions<GetSharedVehicleQuery, GetSharedVehicleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSharedVehicleQuery, GetSharedVehicleQueryVariables>(GetSharedVehicleDocument, options);
      }
export function useGetSharedVehicleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSharedVehicleQuery, GetSharedVehicleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSharedVehicleQuery, GetSharedVehicleQueryVariables>(GetSharedVehicleDocument, options);
        }
export type GetSharedVehicleQueryHookResult = ReturnType<typeof useGetSharedVehicleQuery>;
export type GetSharedVehicleLazyQueryHookResult = ReturnType<typeof useGetSharedVehicleLazyQuery>;
export type GetSharedVehicleQueryResult = Apollo.QueryResult<GetSharedVehicleQuery, GetSharedVehicleQueryVariables>;