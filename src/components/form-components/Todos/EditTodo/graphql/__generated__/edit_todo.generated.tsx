import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EditTodoQueryVariables = Types.Exact<{
  where: Types.TodoWhereUniqueInput;
}>;


export type EditTodoQuery = { __typename?: 'Query', todo: { __typename?: 'Todo', description?: string | null, id?: string | null, name?: string | null, dueDate?: Date | null, completed?: boolean | null, authorised?: boolean | null, type?: Types.TodoType | null, completedDate?: Date | null, business?: { __typename?: 'Business', id: string } | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, timeTaken?: Array<{ __typename?: 'TimeTaken', timeTaken?: number | null, user?: { __typename?: 'User', id?: string | null } | null }> | null, questions?: Array<{ __typename?: 'TaskQuestion', id?: string | null, question?: { __typename?: 'Question', id?: string | null, optionsFormatted?: Array<string> | null, questionFormatted?: string | null, type?: Types.AnswerType | null, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', label: string, value: string }> | null } | null }> | null, answers?: Array<{ __typename?: 'Answer', id: string, answer: string, taskQuestion?: { __typename?: 'TaskQuestion', id?: string | null } | null }> | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, evidence?: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null }> | null, checklist?: { __typename?: 'ActiveChecklist', id: string, name?: string | null, percentageScore?: string | null, percentComplete: number, status: Types.ChecklistStatus, business?: { __typename?: 'Business', id: string, name?: string | null } | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null } | null, incident?: { __typename?: 'Incident', id?: string | null, dayTime: string, policeRef?: string | null, reference?: number | null, subject?: string | null, totalValue?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null }> } | null, offender?: { __typename?: 'Offender', id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, updatedAt?: Date | null, totalValue?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null }> } | null, investigation?: { __typename?: 'Investigation', id?: string | null, name?: string | null, reference?: number | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null } | null } };


export const EditTodoDocument = gql`
    query EditTodo($where: TodoWhereUniqueInput!) {
  todo(where: $where) {
    description
    id
    name
    dueDate
    completed
    authorised
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
    checklist {
      id
      name
      percentageScore
      percentComplete
      status
      business {
        id
        name
      }
    }
    crimeGroup {
      id
      alias
      reference
      totalIncidents
      totalOffenders
      totalRecoveredValue
      totalTheftSuccess
      totalValue
    }
    incident {
      id
      dayTime
      policeRef
      reference
      subject
      totalValue
      images {
        id
        optimised
        url
      }
    }
    offender {
      id
      name
      totalIncidents
      reference
      updatedAt
      totalValue
      images {
        id
        optimised
        url
      }
    }
    investigation {
      id
      name
      reference
      status
      createdAt
      closedAt
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