import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffenderSettingsFragmentDoc } from '../../fragments/offender-settings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupQueryVariables = Types.Exact<{
  where: Types.GroupWhereUniqueInput;
}>;


export type GroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: string, name: string, description?: string | null, users: Array<{ __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> }>, approver: Array<{ __typename?: 'User', id: string, fullName: string }>, offenderSettings?: { __typename?: 'OffenderSettings', name: boolean, alias: boolean, ethnicity: boolean, gender: boolean, build: boolean, height: boolean, hair: boolean, age: boolean, dateOfBirth: boolean, dateOfBirthSource: boolean, idVerified: boolean, peculiarities: boolean, comment: boolean, images: boolean } | null } };


export const GroupDocument = gql`
    query Group($where: GroupWhereUniqueInput!) {
  group(where: $where) {
    id
    name
    description
    users {
      id
      fullName
      businesses {
        fullName
        id
        name
      }
    }
    approver {
      id
      fullName
    }
    offenderSettings {
      ...OffenderSettings
    }
  }
}
    ${OffenderSettingsFragmentDoc}`;
export function useGroupQuery(baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
      }
export function useGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(GroupDocument, options);
        }
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>;
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>;
export type GroupQueryResult = Apollo.QueryResult<GroupQuery, GroupQueryVariables>;