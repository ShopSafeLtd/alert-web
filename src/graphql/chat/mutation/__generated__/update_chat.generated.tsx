import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateChatMutationVariables = Types.Exact<{
  where: Types.UniqueId;
  data: Types.ChatUpdateInput;
}>;


export type UpdateChatMutation = { __typename?: 'Mutation', updateChat: { __typename?: 'Chat', id: string, name: string, description?: string | null, members: Array<{ __typename?: 'UserChat', user: { __typename?: 'User', id: string, fullName: string, businesses: Array<{ __typename?: 'Business', fullName: string, id: string, name: string }> } }> } };


export const UpdateChatDocument = gql`
    mutation updateChat($where: UniqueId!, $data: ChatUpdateInput!) {
  updateChat(where: $where, data: $data) {
    id
    name
    description
    members {
      user {
        id
        fullName
        businesses {
          fullName
          id
          name
        }
      }
    }
  }
}
    `;
export type UpdateChatMutationFn = Apollo.MutationFunction<UpdateChatMutation, UpdateChatMutationVariables>;
export function useUpdateChatMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChatMutation, UpdateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChatMutation, UpdateChatMutationVariables>(UpdateChatDocument, options);
      }
export type UpdateChatMutationHookResult = ReturnType<typeof useUpdateChatMutation>;
export type UpdateChatMutationResult = Apollo.MutationResult<UpdateChatMutation>;
export type UpdateChatMutationOptions = Apollo.BaseMutationOptions<UpdateChatMutation, UpdateChatMutationVariables>;