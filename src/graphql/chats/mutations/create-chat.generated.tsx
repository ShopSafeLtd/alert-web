import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateChatMutationVariables = Types.Exact<{
  data: Types.ChatCreateInput;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'Chat', id: string, name: string, description?: string | null, updatedAt: Date, createdAt: Date, members: Array<{ __typename?: 'UserChat', id: string, newMessages?: boolean | null, mentioned?: boolean | null, updatedAt: Date, createdAt: Date, chat: { __typename?: 'Chat', id: string, name: string, firstLetter: string, totalMembers: number, messageCount: number, messages: Array<{ __typename?: 'Message', id: string, content: string, createdAt: Date, from: { __typename?: 'User', id: string, origName: string }, images: Array<{ __typename?: 'Image', id: string }>, incidents: Array<{ __typename?: 'Incident', id: string }>, offenders: Array<{ __typename?: 'Offender', id: string }>, vehicles: Array<{ __typename?: 'Vehicle', id: string }>, crimeGroups: Array<{ __typename?: 'CrimeGroup', id: string }>, articles: Array<{ __typename?: 'Article', id: string }> }> } }> } };


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