import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkAsReadMessagesMutationVariables = Types.Exact<{
  userChatId: Types.Scalars['String'];
}>;

export type MarkAsReadMessagesMutation = {
  __typename?: 'Mutation';
  markAsReadMessages: {
    __typename?: 'UserChat';
    id: string;
    newMessages?: boolean | null;
    mentioned?: boolean | null;
    updatedAt: Date;
    createdAt: Date;
    user: {
      __typename?: 'User';
      id: string;
      fullName: string;
      firstLetter: string;
    };
    chat: {
      __typename?: 'Chat';
      id: string;
      name: string;
      firstLetter: string;
      totalMembers: number;
      messages: Array<{
        __typename?: 'Message';
        id: string;
        content: string;
        createdAt: Date;
        from: {
          __typename?: 'User';
          id: string;
          fullName: string;
          origFirstLetter: string;
          origName: string;
        };
        images: Array<{
          __typename?: 'Image';
          id: string;
          url?: string | null;
          optimised?: string | null;
          position: Types.ImagePosition;
          rotation: number;
        }>;
        vehicles: Array<{
          __typename?: 'Vehicle';
          id: string;
          reference?: number | null;
        }>;
        crimeGroups: Array<{
          __typename?: 'CrimeGroup';
          id: string;
          reference?: number | null;
        }>;
        incidents: Array<{
          __typename?: 'Incident';
          id: string;
          subject?: string | null;
        }>;
        offenders: Array<{
          __typename?: 'Offender';
          id: string;
          name?: string | null;
        }>;
        articles: Array<{ __typename?: 'Article'; id: string; title: string }>;
      }>;
    };
  };
};

export const MarkAsReadMessagesDocument = gql`
  mutation markAsReadMessages($userChatId: String!) {
    markAsReadMessages(userChatId: $userChatId) {
      id
      newMessages
      mentioned
      updatedAt
      createdAt
      user {
        id
        fullName
        firstLetter
      }
      chat {
        id
        name
        firstLetter
        totalMembers
        messages {
          id
          content
          createdAt
          from {
            id
            fullName
            origFirstLetter
            origName
          }
          images {
            id
            url
            optimised
            position
            rotation
          }
          vehicles {
            id
            reference
          }
          crimeGroups {
            id
            reference
          }
          incidents {
            id
            subject
          }
          offenders {
            id
            name
          }
          articles {
            id
            title
          }
        }
      }
    }
  }
`;
export type MarkAsReadMessagesMutationFn = Apollo.MutationFunction<
  MarkAsReadMessagesMutation,
  MarkAsReadMessagesMutationVariables
>;
export function useMarkAsReadMessagesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkAsReadMessagesMutation,
    MarkAsReadMessagesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    MarkAsReadMessagesMutation,
    MarkAsReadMessagesMutationVariables
  >(MarkAsReadMessagesDocument, options);
}
export type MarkAsReadMessagesMutationHookResult = ReturnType<
  typeof useMarkAsReadMessagesMutation
>;
export type MarkAsReadMessagesMutationResult =
  Apollo.MutationResult<MarkAsReadMessagesMutation>;
export type MarkAsReadMessagesMutationOptions = Apollo.BaseMutationOptions<
  MarkAsReadMessagesMutation,
  MarkAsReadMessagesMutationVariables
>;
