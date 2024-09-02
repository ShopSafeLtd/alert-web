import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTodoQueryVariables = Types.Exact<{
  where: Types.TodoWhereUniqueInput;
}>;


export type EditTodoQuery = { __typename?: 'Query', todo: { __typename?: 'Todo', description?: string | null, id: string, name?: string | null, dueDate?: Date | null, completed?: boolean | null, type?: Types.TodoType | null, completedDate?: Date | null, business?: { __typename?: 'Business', id: string } | null, assignedUsers: Array<{ __typename?: 'User', id: string, fullName: string }>, timeTaken: Array<{ __typename?: 'TimeTaken', timeTaken: number, user: { __typename?: 'User', id: string } }>, questions: Array<{ __typename?: 'TaskQuestion', id: string, question: { __typename?: 'Question', id: string, optionsFormatted?: Array<string> | null, questionFormatted: string, type: Types.AnswerType, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', label: string, value: string }> | null } }>, answers?: Array<{ __typename?: 'Answer', id: string, answer: string, taskQuestion?: { __typename?: 'TaskQuestion', id: string } | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, evidence: Array<{ __typename?: 'Document', id: string, name: string, url: string, fileType?: Types.FileType | null }> } };


export const EditTodoDocument = gql`
    query EditTodo($where: TodoWhereUniqueInput!) {
  todo(where: $where) {
    description
    id
    name
    dueDate
    completed
    type
    completedDate
    business {
      id
    }
    assignedUsers {
      id
      fullName
    }
    timeTaken {
      user {
        id
      }
      timeTaken
    }
    business {
      id
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
    answers {
      id
      taskQuestion {
        id
      }
      answer
    }
    groups {
      id
      name
    }
    evidence {
      id
      name
      url
      fileType
    }
  }
}
    `;
export function useEditTodoQuery(baseOptions: Apollo.QueryHookOptions<EditTodoQuery, EditTodoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditTodoQuery, EditTodoQueryVariables>(EditTodoDocument, options);
      }
export function useEditTodoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditTodoQuery, EditTodoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditTodoQuery, EditTodoQueryVariables>(EditTodoDocument, options);
        }
export type EditTodoQueryHookResult = ReturnType<typeof useEditTodoQuery>;
export type EditTodoLazyQueryHookResult = ReturnType<typeof useEditTodoLazyQuery>;
export type EditTodoQueryResult = Apollo.QueryResult<EditTodoQuery, EditTodoQueryVariables>;