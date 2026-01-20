import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceIncidentCardFragmentDoc } from '../../../../../components/police-incidents/PoliceIncidentCard/__generated__/PoliceIncidentCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedIncidentsFeedQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.SharedIncidentRelayOrderInput>;
  where?: Types.InputMaybe<Types.SharedIncidentRelayWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SharedIncidentsFeedQuery = { __typename?: 'Query', sharedIncidentRelay: { __typename?: 'QuerySharedIncidentRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'QuerySharedIncidentRelayConnectionEdge', cursor: string, node: { __typename?: 'SharedIncident', id: string, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, policeArea: Types.PoliceForce, aiQualityScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethod?: string | null, aiMO?: string | null, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null }>, incident: { __typename?: 'Incident', id: string, subject: string, description: string, reference?: number | null, policeRef?: string | null, customerRef?: string | null, priority: Types.IncidentPriority, totalImages: number, newIncident: boolean, dayTime: string, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }> } } }> } };


export const SharedIncidentsFeedDocument = gql`
    query SharedIncidentsFeed($after: String, $first: Int, $orderBy: SharedIncidentRelayOrderInput, $where: SharedIncidentRelayWhereInput, $skip: Int) {
  sharedIncidentRelay(
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
        ...PoliceIncidentCard
      }
    }
    totalCount
  }
}
    ${PoliceIncidentCardFragmentDoc}`;
export function useSharedIncidentsFeedQuery(baseOptions?: Apollo.QueryHookOptions<SharedIncidentsFeedQuery, SharedIncidentsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedIncidentsFeedQuery, SharedIncidentsFeedQueryVariables>(SharedIncidentsFeedDocument, options);
      }
export function useSharedIncidentsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedIncidentsFeedQuery, SharedIncidentsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedIncidentsFeedQuery, SharedIncidentsFeedQueryVariables>(SharedIncidentsFeedDocument, options);
        }
export type SharedIncidentsFeedQueryHookResult = ReturnType<typeof useSharedIncidentsFeedQuery>;
export type SharedIncidentsFeedLazyQueryHookResult = ReturnType<typeof useSharedIncidentsFeedLazyQuery>;
export type SharedIncidentsFeedQueryResult = Apollo.QueryResult<SharedIncidentsFeedQuery, SharedIncidentsFeedQueryVariables>;