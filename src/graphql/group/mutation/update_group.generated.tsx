import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import { OffenderSettingsFragmentDoc } from '../../fragments/offender-settings.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateGroupMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.GroupUpdateInput;
}>;

export type UpdateGroupMutation = {
  __typename?: 'Mutation';
  updateGroup: {
    __typename?: 'Group';
    id: string;
    name: string;
    description?: string | null;
    users: Array<{
      __typename?: 'User';
      id: string;
      fullName: string;
      businesses: Array<{
        __typename?: 'Business';
        fullName: string;
        id: string;
        name: string;
      }>;
    }>;
    approver: Array<{ __typename?: 'User'; id: string; fullName: string }>;
    offenderSettings?: {
      __typename?: 'OffenderSettings';
      name: boolean;
      alias: boolean;
      ethnicity: boolean;
      gender: boolean;
      build: boolean;
      height: boolean;
      hair: boolean;
      age: boolean;
      dateOfBirth: boolean;
      dateOfBirthSource: boolean;
      idVerified: boolean;
      peculiarities: boolean;
      comment: boolean;
      images: boolean;
    } | null;
  };
};

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
  ${OffenderSettingsFragmentDoc}
`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>;
export function useUpdateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupMutation,
    UpdateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(
    UpdateGroupDocument,
    options
  );
}
export type UpdateGroupMutationHookResult = ReturnType<
  typeof useUpdateGroupMutation
>;
export type UpdateGroupMutationResult =
  Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>;
