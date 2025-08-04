import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RoleQueryVariables = Types.Exact<{
  where: Types.CustomRoleWhereUniqueInput;
}>;


export type RoleQuery = { __typename?: 'Query', role: { __typename?: 'CustomRole', id: string, name: string, usersCount: number, approvalTier: boolean, type: Types.Role, parentId?: string | null, permissions: Array<{ __typename?: 'Permission', allowedMethods: Array<Types.PermissionMethod>, model: Types.PermissionModel }>, folders: Array<{ __typename?: 'Folder', id: string, name: string, childFolders: Array<{ __typename?: 'Folder', id: string, name: string }> }>, checklists: Array<{ __typename?: 'Checklist', id: string, title: string }>, users: Array<{ __typename?: 'UserScheme', user: { __typename?: 'User', fullName: string, id: string, email?: string | null } }> } };


export const RoleDocument = gql`
    query Role($where: CustomRoleWhereUniqueInput!) {
  role(where: $where) {
    id
    name
    usersCount
    approvalTier
    permissions {
      allowedMethods
      model
    }
    type
    folders {
      id
      name
      childFolders {
        id
        name
      }
    }
    checklists {
      id
      title
    }
    users {
      user {
        fullName
        id
        email
      }
    }
    parentId
  }
}
    `;
export function useRoleQuery(baseOptions: Apollo.QueryHookOptions<RoleQuery, RoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
      }
export function useRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoleQuery, RoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RoleQuery, RoleQueryVariables>(RoleDocument, options);
        }
export type RoleQueryHookResult = ReturnType<typeof useRoleQuery>;
export type RoleLazyQueryHookResult = ReturnType<typeof useRoleLazyQuery>;
export type RoleQueryResult = Apollo.QueryResult<RoleQuery, RoleQueryVariables>;