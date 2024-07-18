import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TodoQueryVariables = Types.Exact<{
  where: Types.TodoWhereUniqueInput;
}>;


export type TodoQuery = { __typename?: 'Query', todo: { __typename?: 'Todo', name?: string | null, createdAt: Date, dueDate?: Date | null, description?: string | null, id: string, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, answers?: Array<{ __typename?: 'Answer', id: string, answer: string, taskQuestion?: { __typename?: 'TaskQuestion', id: string } | null }> | null, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }>, timeTaken: Array<{ __typename?: 'TimeTaken', timeTaken: number, user: { __typename?: 'User', id: string } }>, questions: Array<{ __typename?: 'TaskQuestion', id: string, question: { __typename?: 'Question', id: string, optionsFormatted?: Array<string> | null, questionFormatted: string, type: Types.AnswerType, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', label: string, value: string }> | null } }>, business?: { __typename?: 'Business', locations: Array<{ __typename?: 'Address', geoLat?: number | null, geoLng?: number | null }> } | null } };


export const TodoDocument = gql`
    query Todo($where: TodoWhereUniqueInput!) {
  todo(where: $where) {
    assignedUsers {
      id
      fullName
    }
    name
    createdAt
    dueDate
    answers {
      id
      taskQuestion {
        id
      }
      answer
    }
    evidence {
      id
      name
      url
      fileType
    }
    timeTaken {
      user {
        id
      }
      timeTaken
    }
    questions {
      id
      question {
        id
        optionsFormatted
        optionsFormFormatted {
          label
          value
        }
        questionFormatted
        type
      }
    }
    business {
      locations {
        geoLat
        geoLng
      }
    }
    description
    id
  }
}
    `;
export function useTodoQuery(baseOptions: Apollo.QueryHookOptions<TodoQuery, TodoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
      }
export function useTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TodoQuery, TodoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TodoQuery, TodoQueryVariables>(TodoDocument, options);
        }
export type TodoQueryHookResult = ReturnType<typeof useTodoQuery>;
export type TodoLazyQueryHookResult = ReturnType<typeof useTodoLazyQuery>;
export type TodoQueryResult = Apollo.QueryResult<TodoQuery, TodoQueryVariables>;