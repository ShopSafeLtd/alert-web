import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import { OffenderSettingsFragmentDoc } from '../../../fragments/__generated__/offender-settings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.GroupUpdateInput;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup?: { __typename?: 'Group', id: string, name: string, description?: string | null, users: Array<{ __typename?: 'User', id?: string | null, fullName: string, businesses: Array<{ __typename?: 'Business', fullName?: string | null, id: string, name?: string | null }> }>, approver: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, offenderSettings?: { __typename?: 'OffenderSettings', name?: boolean | null, alias?: boolean | null, ethnicity?: boolean | null, gender?: boolean | null, build?: boolean | null, height?: boolean | null, hair?: boolean | null, age?: boolean | null, dateOfBirth?: boolean | null, dateOfBirthSource?: boolean | null, idVerified?: boolean | null, peculiarities?: boolean | null, comment?: boolean | null, images?: boolean | null } | null } | null };


export const UpdateGroupDocument = gql`
    mutation updateGroup($where: UniqueId!, $data: GroupUpdateInput!) {
  updateGroup(where: $where, data: $data) {
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
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;