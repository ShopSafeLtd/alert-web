import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ChecklistQueryVariables = Types.Exact<{
  where: Types.ChecklistWhereUniqueInput;
}>;


export type ChecklistQuery = { __typename?: 'Query', checklist: { __typename?: 'Checklist', id: string, title: string, description?: string | null, sections: Array<{ __typename?: 'ChecklistSection', order: number, title: string, dependsOnWeight?: { __typename?: 'DependWeight', weight: string, dependsOn: string } | null, subsections: Array<{ __typename?: 'ChecklistSubsection', title: string, order: number, questions: Array<{ __typename?: 'ChecklistQuestion', order: number, question: { [key: string]: any }, type: Types.ChecklistAnswerType, dependent?: { [key: string]: any } | null, brandIds: Array<string>, weight: Array<{ __typename?: 'AnswerWeight', weight: number, answer: string }> }> }> }>, users: Array<{ __typename?: 'User', id: string }>, business: Array<{ __typename?: 'Business', id: string }> } };


export const ChecklistDocument = gql`
    query Checklist($where: ChecklistWhereUniqueInput!) {
  checklist(where: $where) {
    id
    title
    description
    sections {
      order
      title
      dependsOnWeight {
        weight
        dependsOn
      }
      subsections {
        title
        order
        questions {
          order
          question
          type
          dependent
          brandIds
          weight {
            weight
            answer
          }
        }
      }
    }
    users {
      id
    }
    business {
      id
    }
  }
}
    `;
export function useChecklistQuery(baseOptions: Apollo.QueryHookOptions<ChecklistQuery, ChecklistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChecklistQuery, ChecklistQueryVariables>(ChecklistDocument, options);
      }
export function useChecklistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChecklistQuery, ChecklistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChecklistQuery, ChecklistQueryVariables>(ChecklistDocument, options);
        }
export type ChecklistQueryHookResult = ReturnType<typeof useChecklistQuery>;
export type ChecklistLazyQueryHookResult = ReturnType<typeof useChecklistLazyQuery>;
export type ChecklistQueryResult = Apollo.QueryResult<ChecklistQuery, ChecklistQueryVariables>;