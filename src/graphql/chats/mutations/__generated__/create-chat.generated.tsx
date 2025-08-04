import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateChatMutationVariables = Types.Exact<{
  data: Types.ChatCreateInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name: string, description?: string | null, updatedAt?: Date | null, createdAt?: Date | null, members: Array<{ __typename?: 'UserChat', id?: string | null, newMessages?: boolean | null, mentioned?: boolean | null, updatedAt?: Date | null, createdAt?: Date | null, chat?: { __typename?: 'Chat', id: string, name: string, firstLetter?: string | null, totalMembers: number, messageCount: number, messages: Array<{ __typename?: 'Message', id?: string | null, content?: string | null, createdAt?: Date | null, from: { __typename?: 'User', id?: string | null, origName?: string | null }, images: Array<{ __typename?: 'Image', id?: string | null }>, incidents: Array<{ __typename?: 'Incident', id?: string | null }>, offenders: Array<{ __typename?: 'Offender', id?: string | null }>, vehicles: Array<{ __typename?: 'Vehicle', id?: string | null }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }>, articles: Array<{ __typename?: 'Article', id: string }> }> } | null }> } };


export const CreateChatDocument = gql`
    mutation createChat($data: ChatCreateInput!) {
  createChat(data: $data) {
    id
    name
    description
    updatedAt
    createdAt
    members {
      id
      newMessages
      mentioned
      updatedAt
      createdAt
      chat {
        id
        name
        firstLetter
        totalMembers
        messageCount
        messages {
          id
          content
          createdAt
          from {
            id
            origName
          }
          images {
            id
          }
          incidents {
            id
          }
          offenders {
            id
          }
          vehicles {
            id
          }
          crimeGroups {
            id
          }
          articles {
            id
          }
        }
      }
    }
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;