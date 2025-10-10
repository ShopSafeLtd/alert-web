import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type LinkOrgToDemMutationVariables = Types.Exact<{
  data: Types.UniqueId;
  where: Types.UniqueId;
}>;


export type LinkOrgToDemMutation = { __typename?: 'Mutation', linkOrgToDem: { __typename?: 'Business', id: string, name: string, demId?: string | null, parent?: { __typename?: 'Business', id: string, name: string } | null, locations: Array<{ __typename?: 'Address', id: string, full: string }> } };


export const LinkOrgToDemDocument = gql`
    mutation LinkOrgToDem($data: UniqueId!, $where: UniqueId!) {
  linkOrgToDem(data: $data, where: $where) {
    id
    name
    demId
    parent {
      id
      name
    }
    locations {
      id
      full
    }
  }
}
    `;
export type LinkOrgToDemMutationFn = Apollo.MutationFunction<LinkOrgToDemMutation, LinkOrgToDemMutationVariables>;
export function useLinkOrgToDemMutation(baseOptions?: Apollo.MutationHookOptions<LinkOrgToDemMutation, LinkOrgToDemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LinkOrgToDemMutation, LinkOrgToDemMutationVariables>(LinkOrgToDemDocument, options);
      }
export type LinkOrgToDemMutationHookResult = ReturnType<typeof useLinkOrgToDemMutation>;
export type LinkOrgToDemMutationResult = Apollo.MutationResult<LinkOrgToDemMutation>;
export type LinkOrgToDemMutationOptions = Apollo.BaseMutationOptions<LinkOrgToDemMutation, LinkOrgToDemMutationVariables>;