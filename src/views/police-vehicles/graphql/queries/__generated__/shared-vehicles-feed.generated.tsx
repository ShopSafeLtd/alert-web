import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceVehicleCardFragmentDoc } from '../../../../../components/police-vehicles/PoliceVehicleCard/__generated__/PoliceVehicleCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedVehiclesFeedQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.SharedVehicleRelayOrderInput>;
  where?: Types.InputMaybe<Types.SharedVehicleRelayWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SharedVehiclesFeedQuery = { __typename?: 'Query', sharedVehicleRelay: { __typename?: 'QuerySharedVehicleRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'QuerySharedVehicleRelayConnectionEdge', cursor: string, node: { __typename?: 'SharedVehicle', id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiUsagePatterns?: string | null, aiGeographicPattern?: string | null, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, vehicle: Array<{ __typename?: 'Vehicle', id: string, registration?: string | null, reference?: number | null, make?: string | null, model?: string | null, colour?: string | null, totalIncidents: number, totalOffenders: number, totalImages: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, url?: string | null }> }> } }> } };


export const SharedVehiclesFeedDocument = gql`
    query SharedVehiclesFeed($after: String, $first: Int, $orderBy: SharedVehicleRelayOrderInput, $where: SharedVehicleRelayWhereInput, $skip: Int) {
  sharedVehicleRelay(
    after: $after
    first: $first
    orderBy: $orderBy
    where: $where
    skip: $skip
  ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      endCursor
      startCursor
    }
    edges {
      cursor
      node {
        ...PoliceVehicleCard
      }
    }
    totalCount
  }
}
    ${PoliceVehicleCardFragmentDoc}`;
export function useSharedVehiclesFeedQuery(baseOptions?: Apollo.QueryHookOptions<SharedVehiclesFeedQuery, SharedVehiclesFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedVehiclesFeedQuery, SharedVehiclesFeedQueryVariables>(SharedVehiclesFeedDocument, options);
      }
export function useSharedVehiclesFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedVehiclesFeedQuery, SharedVehiclesFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedVehiclesFeedQuery, SharedVehiclesFeedQueryVariables>(SharedVehiclesFeedDocument, options);
        }
export type SharedVehiclesFeedQueryHookResult = ReturnType<typeof useSharedVehiclesFeedQuery>;
export type SharedVehiclesFeedLazyQueryHookResult = ReturnType<typeof useSharedVehiclesFeedLazyQuery>;
export type SharedVehiclesFeedQueryResult = Apollo.QueryResult<SharedVehiclesFeedQuery, SharedVehiclesFeedQueryVariables>;