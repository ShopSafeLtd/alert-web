import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateOneMg11MutationVariables = Types.Exact<{
  data: Types.Mg11UpdateInput;
  where: Types.Mg11WhereUniqueInput;
}>;


export type UpdateOneMg11Mutation = { __typename?: 'Mutation', updateOneMG11: { __typename?: 'MG11', id: string } };


export const UpdateOneMg11Document = gql`
    mutation UpdateOneMG11($data: MG11UpdateInput!, $where: MG11WhereUniqueInput!) {
  updateOneMG11(data: $data, where: $where) {
    id
  }
}
    `;
export type UpdateOneMg11MutationFn = Apollo.MutationFunction<UpdateOneMg11Mutation, UpdateOneMg11MutationVariables>;
export function useUpdateOneMg11Mutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneMg11Mutation, UpdateOneMg11MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneMg11Mutation, UpdateOneMg11MutationVariables>(UpdateOneMg11Document, options);
      }
export type UpdateOneMg11MutationHookResult = ReturnType<typeof useUpdateOneMg11Mutation>;
export type UpdateOneMg11MutationResult = Apollo.MutationResult<UpdateOneMg11Mutation>;
export type UpdateOneMg11MutationOptions = Apollo.BaseMutationOptions<UpdateOneMg11Mutation, UpdateOneMg11MutationVariables>;