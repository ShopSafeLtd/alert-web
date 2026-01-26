import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import { PoliceOffenderCardFragmentDoc } from '../../../../../components/police-offenders/PoliceOffenderCard/__generated__/PoliceOffenderCard.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SharedOffendersFeedQueryVariables = Types.Exact<{
  after?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<Types.SharedOffenderRelayOrderInput>;
  where?: Types.InputMaybe<Types.SharedOffenderRelayWhereInput>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SharedOffendersFeedQuery = { __typename?: 'Query', sharedOffenderRelay: { __typename?: 'QuerySharedOffenderRelayConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, endCursor?: string | null, startCursor?: string | null }, edges: Array<{ __typename?: 'QuerySharedOffenderRelayConnectionEdge', cursor: string, node: { __typename?: 'SharedOffender', id: string, name?: string | null, createdAt: Date, updatedAt: Date, policePriorityScore?: number | null, aiQualityScore?: number | null, aiImpactScore?: number | null, aiSummary?: string | null, aiKeyObservations: Array<string>, aiMethods: Array<string>, aiMO?: string | null, aiPatternSignature: Array<string>, aiGenerationStatus?: string | null, aiLastGeneratedAt?: Date | null, aiGenerationAttempts: number, hasImages: boolean, hasName: boolean, lastIncidentAt?: Date | null, totalLossValue?: number | null, totalIncidents: number, images: Array<{ __typename?: 'Image', id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, optimised?: string | null, primary?: boolean | null, policeImage?: boolean | null, isFace?: boolean | null }>, tag: Array<{ __typename?: 'Tag', id: string, name: string }>, schemes: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, sources: Array<{ __typename?: 'Scheme', id: string, name: string, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, policeHubs: Array<{ __typename?: 'Scheme', id: string, name: string, hubForce?: Types.PoliceForce | null, logo?: { __typename?: 'Image', url?: string | null, optimised?: string | null } | null, darkLogo?: { __typename?: 'Image', url?: string | null } | null }>, offender: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, totalImages: number, idVerified: boolean, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string, dayTime: string } | null }> } }> } };


export const SharedOffendersFeedDocument = gql`
    query SharedOffendersFeed($after: String, $first: Int, $orderBy: SharedOffenderRelayOrderInput, $where: SharedOffenderRelayWhereInput, $skip: Int) {
  sharedOffenderRelay(
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
        ...PoliceOffenderCard
      }
    }
    totalCount
  }
}
    ${PoliceOffenderCardFragmentDoc}`;
export function useSharedOffendersFeedQuery(baseOptions?: Apollo.QueryHookOptions<SharedOffendersFeedQuery, SharedOffendersFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SharedOffendersFeedQuery, SharedOffendersFeedQueryVariables>(SharedOffendersFeedDocument, options);
      }
export function useSharedOffendersFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SharedOffendersFeedQuery, SharedOffendersFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SharedOffendersFeedQuery, SharedOffendersFeedQueryVariables>(SharedOffendersFeedDocument, options);
        }
export type SharedOffendersFeedQueryHookResult = ReturnType<typeof useSharedOffendersFeedQuery>;
export type SharedOffendersFeedLazyQueryHookResult = ReturnType<typeof useSharedOffendersFeedLazyQuery>;
export type SharedOffendersFeedQueryResult = Apollo.QueryResult<SharedOffendersFeedQuery, SharedOffendersFeedQueryVariables>;