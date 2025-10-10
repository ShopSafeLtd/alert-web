import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type IncidentFeedQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.IncidentOrderByWithRelationInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  cursor?: Types.InputMaybe<Types.Scalars['String']>;
  groups?: Types.InputMaybe<Array<Types.InputMaybe<Types.Scalars['String']>> | Types.InputMaybe<Types.Scalars['String']>>;
  crimeTypes?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  approved?: Types.InputMaybe<Types.Scalars['Boolean']>;
}>;


export type IncidentFeedQuery = { __typename?: 'Query', incidentFeed: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, reference?: number | null, policeRef?: string | null, newIncident: boolean, approved?: boolean | null, uploaded?: boolean | null, status?: { __typename?: 'IncidentStatus', id: string, name: string, tooltip?: string | null } | null, crimeTypes: Array<{ __typename?: 'Tag', id: string, name: string }>, business?: { __typename?: 'Business', id: string, name: string } | null, createdBy: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', id: string, name: string }> }, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number, card?: string | null, offenders: Array<{ __typename?: 'Offender', id: string }> }>, groups: Array<{ __typename?: 'Group', id: string, name: string }>, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, rotation: number, position: Types.ImagePosition }> }> }> };


export const IncidentFeedDocument = gql`
    query incidentFeed($schemeId: String!, $search: String, $order: IncidentOrderByWithRelationInput, $first: Int, $cursor: String, $groups: [String], $crimeTypes: [String!], $approved: Boolean) {
  incidentFeed(
    schemeId: $schemeId
    order: $order
    first: $first
    after: $cursor
    crimeTypes: $crimeTypes
    search: $search
    groups: $groups
    approved: $approved
  ) {
    id
    subject
    description
    dayTime
    reference
    policeRef
    newIncident
    status {
      id
      name
      tooltip
    }
    crimeTypes {
      id
      name
    }
    approved
    uploaded
    business {
      id
      name
    }
    createdBy {
      id
      fullName
      businesses {
        id
        name
      }
    }
    images {
      id
      url
      optimised
      position
      rotation
      card
      offenders {
        id
      }
    }
    groups {
      id
      name
    }
    offenders {
      id
      name
      images(take: 1, orderBy: {createdAt: desc}) {
        id
        url
        optimised
        rotation
        position
      }
    }
  }
}
    `;
export function useIncidentFeedQuery(baseOptions: Apollo.QueryHookOptions<IncidentFeedQuery, IncidentFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IncidentFeedQuery, IncidentFeedQueryVariables>(IncidentFeedDocument, options);
      }
export function useIncidentFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IncidentFeedQuery, IncidentFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IncidentFeedQuery, IncidentFeedQueryVariables>(IncidentFeedDocument, options);
        }
export type IncidentFeedQueryHookResult = ReturnType<typeof useIncidentFeedQuery>;
export type IncidentFeedLazyQueryHookResult = ReturnType<typeof useIncidentFeedLazyQuery>;
export type IncidentFeedQueryResult = Apollo.QueryResult<IncidentFeedQuery, IncidentFeedQueryVariables>;