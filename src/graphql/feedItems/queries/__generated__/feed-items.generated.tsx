import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { FeedImageFragmentDoc } from '../../../fragments/__generated__/feed-image.generated';
import { FeedUpdateFragmentDoc } from '../../../fragments/__generated__/feed-update.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FeedItemsQueryVariables = Types.Exact<{
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  order?: Types.InputMaybe<Types.FeedItemOrderByWithRelationInput>;
  where?: Types.InputMaybe<Types.FeedItemWhereInput>;
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  groups?: Types.InputMaybe<Array<Types.Scalars['String']> | Types.Scalars['String']>;
  groupsWhere2?: Types.InputMaybe<Types.GroupWhereInput>;
}>;


export type FeedItemsQuery = { __typename?: 'Query', feedRelay: { __typename?: 'QueryFeedRelayConnection', edges: Array<{ __typename?: 'QueryFeedRelayConnectionEdge', node: { __typename?: 'FeedItem', type: Types.FeedItemType, articleId?: string | null, createdAt: Date, updatedAt: Date, message: string, model?: Types.Model | null, crimeGroupId?: string | null, vehicleId?: string | null, investigationId?: string | null, id: string, incidentId?: string | null, offenderId?: string | null, ban?: { __typename?: 'Ban', title?: string | null, type?: Types.BanType | null, location: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, offender: { __typename?: 'Offender', id: string, name?: string | null } } | null, article?: { __typename?: 'Article', id: string, title: string, previewText?: string | null, priority: Types.ArticlePriority, createdBy: { __typename?: 'User', fullName: string }, image?: { __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, position: Types.ImagePosition, rotation: number } | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, latestUpdate?: { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> } | null } | null, vehicle?: { __typename?: 'Vehicle', totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, latestUpdate?: { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> } | null } | null, investigation?: { __typename?: 'Investigation', id: string, name: string, reference?: number | null, totalOffenders: number, totalIncidents: number, description?: string | null, updatedAt: Date, latestUpdate?: { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> } | null } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, incident?: { __typename?: 'Incident', id: string, subject: string, reference?: number | null, description: string, approved?: boolean | null, latestUpdate?: { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> } | null, business?: { __typename?: 'Business', id: string, name: string } | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null } | null, offender?: { __typename?: 'Offender', id: string, totalIncidents: number, reference?: number | null, updatedAt: Date, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, approved?: boolean | null, subscribed: boolean, uploaded?: boolean | null, active?: boolean | null, latestIncident?: { __typename?: 'Incident', id: string, dateAgo: number, reportedBusinessName: string } | null, latestUpdate?: { __typename?: 'Update', id: string, text?: string | null, icon: Types.UpdateIcon, type: Types.UpdateType, createdAt: Date, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents: number, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue: number, totalTheftSuccess: number, totalValue: number, updatedAt: Date }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt: Date, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id: string, colour?: string | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id: string, updatedAt: Date, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id: string, subject: string, description: string, dayTime: string, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt: Date, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id: string, url?: string | null, optimised?: string | null, card?: string | null, position: Types.ImagePosition, rotation: number }>, createdBy: { __typename?: 'User', fullName: string, id: string } }> } | null, feedImage?: { __typename?: 'Image', id: string, low?: string | null, position: Types.ImagePosition, rotation: number } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const FeedItemsDocument = gql`
    query FeedItems($schemeId: String!, $search: String, $order: FeedItemOrderByWithRelationInput, $where: FeedItemWhereInput, $first: Int, $after: String, $groups: [String!], $groupsWhere2: GroupWhereInput) {
  feedRelay(
    where: $where
    schemeId: $schemeId
    search: $search
    order: $order
    after: $after
    groups: $groups
    first: $first
  ) {
    edges {
      node {
        type
        ban {
          title
          type
          location
          feedImage {
            ...FeedImage
          }
          offender {
            id
            name
          }
        }
        article {
          id
          title
          createdBy {
            fullName
          }
          image {
            id
            url
            optimised
            position
            rotation
          }
          previewText
          priority
        }
        articleId
        createdAt
        updatedAt
        message
        model
        crimeGroupId
        crimeGroup {
          totalOffenders
          totalIncidents
          alias
          id
          reference
          latestUpdate {
            ...FeedUpdate
          }
        }
        vehicleId
        vehicle {
          totalOffenders
          registration
          reference
          model
          make
          id
          colour
          feedImage {
            ...FeedImage
          }
          latestUpdate {
            ...FeedUpdate
          }
        }
        investigationId
        investigation {
          id
          name
          reference
          totalOffenders
          totalIncidents
          description
          updatedAt
          latestUpdate {
            ...FeedUpdate
          }
        }
        groups(where: $groupsWhere2) {
          id
          name
        }
        id
        incident {
          id
          subject
          reference
          description
          latestUpdate {
            ...FeedUpdate
          }
          approved
          business {
            id
            name
          }
          feedImage {
            ...FeedImage
          }
        }
        incidentId
        offender {
          id
          totalIncidents
          latestIncident {
            id
            dateAgo
            reportedBusinessName
          }
          reference
          updatedAt
          height
          dateOfBirth
          dateSource
          hair
          name
          peculiarities
          race
          approved
          subscribed
          uploaded
          active
          latestUpdate {
            ...FeedUpdate
          }
          feedImage {
            ...FeedImage
          }
        }
        offenderId
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
    ${FeedImageFragmentDoc}
${FeedUpdateFragmentDoc}`;
export function useFeedItemsQuery(baseOptions: Apollo.QueryHookOptions<FeedItemsQuery, FeedItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedItemsQuery, FeedItemsQueryVariables>(FeedItemsDocument, options);
      }
export function useFeedItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedItemsQuery, FeedItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedItemsQuery, FeedItemsQueryVariables>(FeedItemsDocument, options);
        }
export type FeedItemsQueryHookResult = ReturnType<typeof useFeedItemsQuery>;
export type FeedItemsLazyQueryHookResult = ReturnType<typeof useFeedItemsLazyQuery>;
export type FeedItemsQueryResult = Apollo.QueryResult<FeedItemsQuery, FeedItemsQueryVariables>;