import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateDashboardMutationVariables = Types.Exact<{
  data: Types.DashboardCreateInput;
}>;


export type CreateDashboardMutation = { __typename?: 'Mutation', createDashboard: { __typename?: 'Dashboard', id?: string | null, name?: string | null, roles?: Array<{ __typename?: 'CustomRole', name: string, id: string }> | null } };

export type DeleteDashboardMutationVariables = Types.Exact<{
  where: Types.DashboardWhereUniqueInput;
}>;


export type DeleteDashboardMutation = { __typename?: 'Mutation', deleteDashboardTemplate?: { __typename?: 'Dashboard', id?: string | null } | null };

export type UpdateDashboardTemplateMutationVariables = Types.Exact<{
  data: Types.DashboardTemplateUpdateInput;
  where: Types.DashboardWhereUniqueInput;
}>;


export type UpdateDashboardTemplateMutation = { __typename?: 'Mutation', updateDashboardTemplate: { __typename?: 'Dashboard', name?: string | null, id?: string | null, roles?: Array<{ __typename?: 'CustomRole', name: string, id: string }> | null } };


export const CreateDashboardDocument = gql`
    mutation CreateDashboard($data: DashboardCreateInput!) {
  createDashboard(data: $data) {
    id
    name
    roles {
      name
      id
    }
  }
}
    `;
export type CreateDashboardMutationFn = Apollo.MutationFunction<CreateDashboardMutation, CreateDashboardMutationVariables>;
export function useCreateDashboardMutation(baseOptions?: Apollo.MutationHookOptions<CreateDashboardMutation, CreateDashboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDashboardMutation, CreateDashboardMutationVariables>(CreateDashboardDocument, options);
      }
export type CreateDashboardMutationHookResult = ReturnType<typeof useCreateDashboardMutation>;
export type CreateDashboardMutationResult = Apollo.MutationResult<CreateDashboardMutation>;
export type CreateDashboardMutationOptions = Apollo.BaseMutationOptions<CreateDashboardMutation, CreateDashboardMutationVariables>;
export const DeleteDashboardDocument = gql`
    mutation DeleteDashboard($where: DashboardWhereUniqueInput!) {
  deleteDashboardTemplate(where: $where) {
    id
  }
}
    `;
export type DeleteDashboardMutationFn = Apollo.MutationFunction<DeleteDashboardMutation, DeleteDashboardMutationVariables>;
export function useDeleteDashboardMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDashboardMutation, DeleteDashboardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDashboardMutation, DeleteDashboardMutationVariables>(DeleteDashboardDocument, options);
      }
export type DeleteDashboardMutationHookResult = ReturnType<typeof useDeleteDashboardMutation>;
export type DeleteDashboardMutationResult = Apollo.MutationResult<DeleteDashboardMutation>;
export type DeleteDashboardMutationOptions = Apollo.BaseMutationOptions<DeleteDashboardMutation, DeleteDashboardMutationVariables>;
export const UpdateDashboardTemplateDocument = gql`
    mutation updateDashboardTemplate($data: DashboardTemplateUpdateInput!, $where: DashboardWhereUniqueInput!) {
  updateDashboardTemplate(data: $data, where: $where) {
    name
    roles {
      name
      id
    }
    id
  }
}
    `;
export type UpdateDashboardTemplateMutationFn = Apollo.MutationFunction<UpdateDashboardTemplateMutation, UpdateDashboardTemplateMutationVariables>;
export function useUpdateDashboardTemplateMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDashboardTemplateMutation, UpdateDashboardTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDashboardTemplateMutation, UpdateDashboardTemplateMutationVariables>(UpdateDashboardTemplateDocument, options);
      }
export type UpdateDashboardTemplateMutationHookResult = ReturnType<typeof useUpdateDashboardTemplateMutation>;
export type UpdateDashboardTemplateMutationResult = Apollo.MutationResult<UpdateDashboardTemplateMutation>;
export type UpdateDashboardTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateDashboardTemplateMutation, UpdateDashboardTemplateMutationVariables>;