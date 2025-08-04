import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserNotificationsMutationVariables = Types.Exact<{
  where: Types.UserNotificationWhereInput;
}>;


export type UpdateUserNotificationsMutation = { __typename?: 'Mutation', updateUserNotifications?: Array<{ __typename?: 'UserNotification', id?: string | null, read?: boolean | null, createdAt?: Date | null, notification?: { __typename?: 'Notification', id?: string | null, crimeGroupId?: string | null, createdAt?: Date | null, chatId?: string | null, body?: string | null, articleId?: string | null, incidentId?: string | null, investigationId?: string | null, offenderId?: string | null, title?: string | null, type?: Types.Model | null, vehicleId?: string | null, userId?: string | null, schemes?: Array<{ __typename?: 'Scheme', id?: string | null }> | null, ban?: { __typename?: 'Ban', id: string, offender: { __typename?: 'Offender', id?: string | null } } | null } | null }> | null };


export const UpdateUserNotificationsDocument = gql`
    mutation updateUserNotifications($where: UserNotificationWhereInput!) {
  updateUserNotifications(where: $where) {
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
}
    `;
export type UpdateUserNotificationsMutationFn = Apollo.MutationFunction<UpdateUserNotificationsMutation, UpdateUserNotificationsMutationVariables>;
export function useUpdateUserNotificationsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNotificationsMutation, UpdateUserNotificationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNotificationsMutation, UpdateUserNotificationsMutationVariables>(UpdateUserNotificationsDocument, options);
      }
export type UpdateUserNotificationsMutationHookResult = ReturnType<typeof useUpdateUserNotificationsMutation>;
export type UpdateUserNotificationsMutationResult = Apollo.MutationResult<UpdateUserNotificationsMutation>;
export type UpdateUserNotificationsMutationOptions = Apollo.BaseMutationOptions<UpdateUserNotificationsMutation, UpdateUserNotificationsMutationVariables>;