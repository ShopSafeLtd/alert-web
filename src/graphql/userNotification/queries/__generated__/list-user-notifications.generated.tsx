import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListUserNotificationsQueryVariables = Types.Exact<{
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  where?: Types.InputMaybe<Types.UserNotificationWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.UserNotificationOrderByWithRelationInput> | Types.UserNotificationOrderByWithRelationInput>;
}>;


export type ListUserNotificationsQuery = { __typename?: 'Query', listUserNotifications: { __typename?: 'ListUserNotifications', total: number, notifications: Array<{ __typename?: 'UserNotification', id?: string | null, read?: boolean | null, createdAt?: Date | null, notification?: { __typename?: 'Notification', id?: string | null, crimeGroupId?: string | null, createdAt?: Date | null, chatId?: string | null, body?: string | null, articleId?: string | null, incidentId?: string | null, investigationId?: string | null, offenderId?: string | null, title?: string | null, type?: Types.Model | null, vehicleId?: string | null, userId?: string | null, schemes?: Array<{ __typename?: 'Scheme', id?: string | null }> | null, ban?: { __typename?: 'Ban', id: string, offender: { __typename?: 'Offender', id?: string | null } } | null } | null }> } };


export const ListUserNotificationsDocument = gql`
    query listUserNotifications($take: Int, $skip: Int, $where: UserNotificationWhereInput, $orderBy: [UserNotificationOrderByWithRelationInput!]) {
  listUserNotifications(
    take: $take
    skip: $skip
    where: $where
    orderBy: $orderBy
  ) {
    notifications {
      id
      read
      createdAt
      notification {
        id
        crimeGroupId
        createdAt
        chatId
        body
        articleId
        incidentId
        investigationId
        offenderId
        schemes {
          id
        }
        title
        type
        vehicleId
        ban {
          id
          offender {
            id
          }
        }
        userId
      }
    }
    total
  }
}
    `;
export function useListUserNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<ListUserNotificationsQuery, ListUserNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUserNotificationsQuery, ListUserNotificationsQueryVariables>(ListUserNotificationsDocument, options);
      }
export function useListUserNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUserNotificationsQuery, ListUserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUserNotificationsQuery, ListUserNotificationsQueryVariables>(ListUserNotificationsDocument, options);
        }
export type ListUserNotificationsQueryHookResult = ReturnType<typeof useListUserNotificationsQuery>;
export type ListUserNotificationsLazyQueryHookResult = ReturnType<typeof useListUserNotificationsLazyQuery>;
export type ListUserNotificationsQueryResult = Apollo.QueryResult<ListUserNotificationsQuery, ListUserNotificationsQueryVariables>;