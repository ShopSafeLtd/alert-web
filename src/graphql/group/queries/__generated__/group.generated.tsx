import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { OffenderSettingsFragmentDoc } from '../../../fragments/__generated__/offender-settings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GroupQueryVariables = Types.Exact<{
  where: Types.GroupWhereUniqueInput;
}>;


export type GroupQuery = { __typename?: 'Query', group: { __typename?: 'Group', id: string, name: string, description?: string | null, users: Array<{ __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> }>, approver: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, offenderSettings?: { __typename?: 'OffenderSettings', name?: boolean | null, alias?: boolean | null, ethnicity?: boolean | null, gender?: boolean | null, build?: boolean | null, height?: boolean | null, hair?: boolean | null, age?: boolean | null, dateOfBirth?: boolean | null, dateOfBirthSource?: boolean | null, idVerified?: boolean | null, peculiarities?: boolean | null, comment?: boolean | null, images?: boolean | null } | null } };


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