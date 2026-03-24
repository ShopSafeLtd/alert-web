import type * as Types from '../../../../../../graphql/types';

import { gql } from '@apollo/client';
import { IncidentCardFragmentDoc } from '../../../../../../graphql/fragments/__generated__/incident-card.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentsFeedQueryVariables = Types.Exact<{
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  search?: Types.InputMaybe<Types.Scalars['String']>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  where?: Types.InputMaybe<Types.IncidentWhereInput>;
  schemeId: Types.Scalars['String'];
  approved?: Types.InputMaybe<Types.Scalars['Boolean']>;
  policeAreas?: Types.InputMaybe<Array<Types.PoliceForce> | Types.PoliceForce>;
}>;


export type IncidentsFeedQuery = { __typename?: 'Query', incidentsRelay: { __typename?: 'QueryIncidentsRelayConnection', edges: Array<{ __typename?: 'QueryIncidentsRelayConnectionEdge', node: { __typename?: 'Incident', approved?: boolean | null, draft: boolean, id: string, totalImages: number, priority: Types.IncidentPriority, customerRef?: string | null, newIncident: boolean, subject: string, reference?: number | null, policeRef?: string | null, dayTime: string, description: string, createdByUser: boolean, totalValue: number, totalRecoveredValue: number, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, images: Array<{ __typename?: 'Image', low?: string | null, optimised?: string | null, id: string, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null, primary?: boolean | null }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null, gender?: Types.Gender | null, race?: Types.Race | null, age?: Types.Age | null, build?: Types.Build | null, dateOfBirth?: Date | null, knownFor: Array<string>, wanted: boolean, images: Array<{ __typename?: 'Image', id: string, low?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition, positionX?: number | null, positionY?: number | null }> }>, business?: { __typename?: 'Business', id: string, name: string } | null, location?: { __typename?: 'Address', id: string, full: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } };


export const IncidentsFeedDocument = gql`
    query IncidentsFeed($order: IncidentOrderByWithRelationInput, $search: String, $first: Int, $after: String, $where: IncidentWhereInput, $schemeId: String!, $approved: Boolean, $policeAreas: [PoliceForce!]) {
  incidentsRelay(
    order: $order
    first: $first
    after: $after
    search: $search
    where: $where
    schemeId: $schemeId
    approved: $approved
    policeAreas: $policeAreas
  ) {
    edges {
      node {
        ...IncidentCard
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${IncidentCardFragmentDoc}`;
export function useIncidentsFeedQuery(baseOptions: Apollo.QueryHookOptions<IncidentsFeedQuery, IncidentsFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentsFeedQuery, IncidentsFeedQueryVariables>(IncidentsFeedDocument, options);
      }
export function useIncidentsFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentsFeedQuery, IncidentsFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentsFeedQuery, IncidentsFeedQueryVariables>(IncidentsFeedDocument, options);
        }
export type IncidentsFeedQueryHookResult = ReturnType<typeof useIncidentsFeedQuery>;
export type IncidentsFeedLazyQueryHookResult = ReturnType<typeof useIncidentsFeedLazyQuery>;
export type IncidentsFeedQueryResult = Apollo.QueryResult<IncidentsFeedQuery, IncidentsFeedQueryVariables>;