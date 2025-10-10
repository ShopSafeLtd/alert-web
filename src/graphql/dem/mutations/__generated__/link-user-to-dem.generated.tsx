import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkUserToDemMutationVariables = Types.Exact<{
  data: Types.UniqueId;
  where: Types.UniqueId;
}>;


export type LinkUserToDemMutation = { __typename?: 'Mutation', linkUserToDem: { __typename?: 'User', id: string, demId?: string | null } };


export const LinkUserToDemDocument = gql`
    mutation LinkUserToDem($data: UniqueId!, $where: UniqueId!) {
  linkUserToDem(data: $data, where: $where) {
    id
    demId
  }
}
    `;
export type LinkUserToDemMutationFn = Apollo.MutationFunction<LinkUserToDemMutation, LinkUserToDemMutationVariables>;
export function useLinkUserToDemMutation(baseOptions?: Apollo.MutationHookOptions<LinkUserToDemMutation, LinkUserToDemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkUserToDemMutation, LinkUserToDemMutationVariables>(LinkUserToDemDocument, options);
      }
export type LinkUserToDemMutationHookResult = ReturnType<typeof useLinkUserToDemMutation>;
export type LinkUserToDemMutationResult = Apollo.MutationResult<LinkUserToDemMutation>;
export type LinkUserToDemMutationOptions = Apollo.BaseMutationOptions<LinkUserToDemMutation, LinkUserToDemMutationVariables>;