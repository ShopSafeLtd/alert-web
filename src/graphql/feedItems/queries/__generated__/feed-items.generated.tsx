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


export type FeedItemsQuery = { __typename?: 'Query', feedRelay?: { __typename?: 'QueryFeedRelayConnection', edges: Array<{ __typename?: 'QueryFeedRelayConnectionEdge', node: { __typename?: 'FeedItem', type?: Types.FeedItemType | null, articleId?: string | null, createdAt?: Date | null, updatedAt?: Date | null, message?: string | null, model?: Types.Model | null, crimeGroupId?: string | null, vehicleId?: string | null, investigationId?: string | null, id?: string | null, incidentId?: string | null, offenderId?: string | null, ban?: { __typename?: 'Ban', title?: string | null, type?: Types.BanType | null, location: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, offender: { __typename?: 'Offender', id?: string | null, name?: string | null } } | null, article?: { __typename?: 'Article', id: string, title: string, previewText?: string | null, priority: Types.ArticlePriority, createdBy: { __typename?: 'User', fullName: string }, image?: { __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, latestUpdate?: { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> } | null } | null, vehicle?: { __typename?: 'Vehicle', totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, latestUpdate?: { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> } | null } | null, investigation?: { __typename?: 'Investigation', id?: string | null, name?: string | null, reference?: number | null, totalOffenders: number, totalIncidents: number, description?: string | null, updatedAt?: Date | null, latestUpdate?: { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> } | null } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, incident?: { __typename?: 'Incident', id?: string | null, subject?: string | null, reference?: number | null, description?: string | null, approved?: boolean | null, latestUpdate?: { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> } | null, business?: { __typename?: 'Business', id: string, name?: string | null } | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null } | null, offender?: { __typename?: 'Offender', id?: string | null, totalIncidents: number, reference?: number | null, updatedAt?: Date | null, height?: Types.Height | null, dateOfBirth?: Date | null, dateSource?: string | null, hair?: string | null, name?: string | null, peculiarities?: string | null, race?: Types.Race | null, approved?: boolean | null, subscribed?: boolean | null, uploaded?: boolean | null, active?: boolean | null, latestIncident?: { __typename?: 'Incident', id?: string | null, dateAgo?: number | null, reportedBusinessName: string } | null, latestUpdate?: { __typename?: 'Update', id?: string | null, text?: string | null, icon?: Types.UpdateIcon | null, type?: Types.UpdateType | null, createdAt?: Date | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null, linkedCrimeGroups: Array<{ __typename?: 'CrimeGroup', totalOffenders: number, totalIncidents?: number | null, alias?: string | null, id: string, reference?: number | null, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null, updatedAt?: Date | null }>, linkedVehicles: Array<{ __typename?: 'Vehicle', updatedAt?: Date | null, totalOffenders: number, registration?: string | null, reference?: number | null, model?: string | null, make?: string | null, id?: string | null, colour?: string | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedOffenders: Array<{ __typename?: 'Offender', id?: string | null, updatedAt?: Date | null, age?: Types.Age | null, build?: Types.Build | null, height?: Types.Height | null, dateOfBirth?: Date | null, name?: string | null, race?: Types.Race | null, gender?: Types.Gender | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedIncidents: Array<{ __typename?: 'Incident', id?: string | null, subject?: string | null, description?: string | null, dayTime: string, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null }>, linkedArticles: Array<{ __typename?: 'Article', id: string, title: string, updatedAt?: Date | null, watermarkImage: boolean, previewImage?: string | null, previewText?: string | null, priority: Types.ArticlePriority, images: Array<{ __typename?: 'Image', id?: string | null, url?: string | null, optimised?: string | null, card?: string | null, position?: Types.ImagePosition | null, rotation?: number | null }>, createdBy: { __typename?: 'User', fullName: string, id?: string | null } }> } | null, feedImage?: { __typename?: 'Image', id?: string | null, low?: string | null, position?: Types.ImagePosition | null, rotation?: number | null } | null } | null } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } | null };


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