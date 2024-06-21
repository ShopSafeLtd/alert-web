import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UserSettingsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserSettingsQuery = {
  __typename?: 'Query';
  currentUser?: {
    __typename?: 'User';
    id: string;
    messagePush: boolean;
    offenderPush: boolean;
    subscribedIncidentOnly: boolean;
    incidentEmail: boolean;
    incidentPush: boolean;
    subscribedOffenderOnly: boolean;
    offenderEmail: boolean;
  } | null;
};

export const UserSettingsDocument = gql`
  query UserSettings {
    currentUser {
      id
      messagePush
      offenderPush
      subscribedIncidentOnly
      incidentEmail
      incidentPush
      subscribedOffenderOnly
      offenderEmail
    }
  }
`;
export function useUserSettingsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserSettingsQuery,
    UserSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserSettingsQuery, UserSettingsQueryVariables>(
    UserSettingsDocument,
    options
  );
}
export function useUserSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserSettingsQuery,
    UserSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserSettingsQuery, UserSettingsQueryVariables>(
    UserSettingsDocument,
    options
  );
}
export type UserSettingsQueryHookResult = ReturnType<
  typeof useUserSettingsQuery
>;
export type UserSettingsLazyQueryHookResult = ReturnType<
  typeof useUserSettingsLazyQuery
>;
export type UserSettingsQueryResult = Apollo.QueryResult<
  UserSettingsQuery,
  UserSettingsQueryVariables
>;
