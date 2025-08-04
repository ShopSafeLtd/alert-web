import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TodoQueryVariables = Types.Exact<{
  where: Types.TodoWhereUniqueInput;
}>;


export type TodoQuery = { __typename?: 'Query', todo: { __typename?: 'Todo', name?: string | null, reference?: number | null, createdAt?: Date | null, dueDate?: Date | null, completedDate?: Date | null, description?: string | null, id?: string | null, assignedUsers: Array<{ __typename?: 'User', id?: string | null, fullName: string }>, actions?: Array<{ __typename?: 'Action', id: string, description?: string | null, createdAt?: Date | null }> | null, createdBy?: { __typename?: 'User', id?: string | null } | null, completedBy?: { __typename?: 'User', id?: string | null, fullName: string } | null, answers?: Array<{ __typename?: 'Answer', id: string, answer: string, taskQuestion?: { __typename?: 'TaskQuestion', id?: string | null } | null }> | null, evidence?: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, fileType?: Types.FileType | null }> | null, timeTaken?: Array<{ __typename?: 'TimeTaken', timeTaken?: number | null, user?: { __typename?: 'User', id?: string | null } | null }> | null, questions?: Array<{ __typename?: 'TaskQuestion', id?: string | null, question?: { __typename?: 'Question', id?: string | null, optionsFormatted?: Array<string> | null, questionFormatted?: string | null, type?: Types.AnswerType | null, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', label: string, value: string }> | null } | null }> | null, business?: { __typename?: 'Business', id: string, name?: string | null, locations: Array<{ __typename?: 'Address', geoLat?: number | null, geoLng?: number | null }> } | null, groups: Array<{ __typename?: 'Group', id: string, name: string }>, checklist?: { __typename?: 'ActiveChecklist', id: string, name?: string | null, percentageScore?: string | null, percentComplete: number, status: Types.ChecklistStatus, business?: { __typename?: 'Business', id: string, name?: string | null } | null } | null, crimeGroup?: { __typename?: 'CrimeGroup', id: string, alias?: string | null, reference?: number | null, totalIncidents?: number | null, totalOffenders: number, totalRecoveredValue?: number | null, totalTheftSuccess?: number | null, totalValue?: number | null } | null, incident?: { __typename?: 'Incident', id?: string | null, dayTime: string, policeRef?: string | null, reference?: number | null, subject?: string | null, totalValue?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null }> } | null, offender?: { __typename?: 'Offender', id?: string | null, name?: string | null, totalIncidents: number, reference?: number | null, updatedAt?: Date | null, totalValue?: number | null, images: Array<{ __typename?: 'Image', id?: string | null, optimised?: string | null, url?: string | null }> } | null, investigation?: { __typename?: 'Investigation', id?: string | null, name?: string | null, reference?: number | null, status?: Types.InvestigationStatus | null, createdAt?: Date | null, closedAt?: Date | null } | null } };


export const TodoDocument = gql`
    query Todo($where: TodoWhereUniqueInput!) {
  todo(where: $where) {
    assignedUsers {
      id
      fullName
    }
    name
    reference
    actions {
      id
      description
      createdAt
    }
    createdAt
    createdBy {
      id
    }
    completedBy {
      id
      fullName
    }
    dueDate
    completedDate
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
      id
      name
      locations {
        geoLat
        geoLng
      }
    }
    description
    id
    groups {
      id
      name
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