import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ActiveChecklistQueryVariables = Types.Exact<{
  where: Types.ActiveChecklistWhereUniqueInput;
}>;


export type ActiveChecklistQuery = { __typename?: 'Query', activeChecklist: { __typename?: 'ActiveChecklist', id: string, name?: string | null, comments?: string | null, signature?: string | null, status: Types.ChecklistStatus, completedAt?: Date | null, percentageScore: string, percentComplete: number, completedBy?: { __typename?: 'User', origName: string } | null, fields: Array<{ __typename?: 'ActiveChecklistFields', id: string, question: { [key: string]: any }, type: Types.ChecklistAnswerType, availableAnswers: Array<{ [key: string]: any }>, dependent?: { [key: string]: any } | null, section: number, subsection: number, order: number, answer?: { __typename?: 'ChecklistAnswer', answer: string, additionalComments?: string | null, images: Array<string> } | null }>, checklistSection: Array<{ __typename?: 'ActiveChecklistSections', sub: boolean, section: number, subsection?: number | null, titleLocaled: string, dependsOnWeight?: { __typename?: 'DependWeight', weight: string, dependsOn: string } | null }> } };


export const ActiveChecklistDocument = gql`
    query ActiveChecklist($where: ActiveChecklistWhereUniqueInput!) {
  activeChecklist(where: $where) {
    id
    name
    comments
    signature
    status
    completedAt
    percentageScore
    percentComplete
    completedBy {
      origName
    }
    fields {
      id
      question
      type
      availableAnswers
      dependent
      answer {
        answer
        additionalComments
        images
      }
      section
      subsection
      order
    }
    checklistSection {
      sub
      section
      subsection
      titleLocaled
      dependsOnWeight {
        weight
        dependsOn
      }
    }
  }
}
    `;
export function useActiveChecklistQuery(baseOptions: Apollo.QueryHookOptions<ActiveChecklistQuery, ActiveChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveChecklistQuery, ActiveChecklistQueryVariables>(ActiveChecklistDocument, options);
      }
export function useActiveChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveChecklistQuery, ActiveChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveChecklistQuery, ActiveChecklistQueryVariables>(ActiveChecklistDocument, options);
        }
export type ActiveChecklistQueryHookResult = ReturnType<typeof useActiveChecklistQuery>;
export type ActiveChecklistLazyQueryHookResult = ReturnType<typeof useActiveChecklistLazyQuery>;
export type ActiveChecklistQueryResult = Apollo.QueryResult<ActiveChecklistQuery, ActiveChecklistQueryVariables>;