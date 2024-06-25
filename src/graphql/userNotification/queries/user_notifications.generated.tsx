import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserNotificationsQueryVariables = Types.Exact<{
  where: Types.UserWhereUniqueInput;
  orderBy?: Types.InputMaybe<Array<Types.UserNotificationOrderByWithRelationInput> | Types.UserNotificationOrderByWithRelationInput>;
  notificationWhere?: Types.InputMaybe<Types.UserNotificationWhereInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type UserNotificationsQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, totalNotifications: number, totalUnreadNotifications: number, notifications: Array<{ __typename?: 'UserNotification', id: string, read: boolean, createdAt: Date, notification: { __typename?: 'Notification', id: string, crimeGroupId?: string | null, createdAt: Date, chatId?: string | null, body?: string | null, articleId?: string | null, incidentId?: string | null, investigationId?: string | null, offenderId?: string | null, title?: string | null, type?: Types.Model | null, vehicleId?: string | null, userId?: string | null, schemes: Array<{ __typename?: 'Scheme', id: string, name: string }>, ban?: { __typename?: 'Ban', id: string, offender: { __typename?: 'Offender', id: string } } | null } }> } };


export const UserNotificationsDocument = gql`
    query userNotifications($where: UserWhereUniqueInput!, $orderBy: [UserNotificationOrderByWithRelationInput!], $notificationWhere: UserNotificationWhereInput, $take: Int, $skip: Int) {
  user(where: $where) {
    id
    totalNotifications
    totalUnreadNotifications
    notifications(
      where: $notificationWhere
      orderBy: $orderBy
      take: $take
      skip: $skip
    ) {
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
          name
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
  }
}
    `;
export function useUserNotificationsQuery(baseOptions: Apollo.QueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
      }
export function useUserNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserNotificationsQuery, UserNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserNotificationsQuery, UserNotificationsQueryVariables>(UserNotificationsDocument, options);
        }
export type UserNotificationsQueryHookResult = ReturnType<typeof useUserNotificationsQuery>;
export type UserNotificationsLazyQueryHookResult = ReturnType<typeof useUserNotificationsLazyQuery>;
export type UserNotificationsQueryResult = Apollo.QueryResult<UserNotificationsQuery, UserNotificationsQueryVariables>;