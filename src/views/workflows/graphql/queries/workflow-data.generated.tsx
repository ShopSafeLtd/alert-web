import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type WorkflowDataQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
  questionsWhere?: Types.InputMaybe<Types.QuestionWhereInput>;
  schemeTagsWhere?: Types.InputMaybe<Types.TagWhereInput>;
}>;


export type WorkflowDataQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', questions: Array<{ __typename?: 'Question', id: string, questionOn: Types.QuestionModel, type: Types.AnswerType, questionFormatted: string, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', value: string, label: string }> | null }>, schemeTags: Array<{ __typename?: 'Tag', id: string, name: string }>, members: Array<{ __typename?: 'UserScheme', role: Types.Role, userId: string, user: { __typename?: 'User', fullName: string } }>, groups: Array<{ __typename?: 'Group', id: string, name: string }> } };


export const WorkflowDataDocument = gql`
    query WorkflowData($where: SchemeWhereUniqueInput!, $questionsWhere: QuestionWhereInput, $schemeTagsWhere: TagWhereInput) {
  scheme(where: $where) {
    questions(where: $questionsWhere) {
      id
      questionOn
      optionsFormFormatted {
        value
        label
      }
      type
      questionFormatted
    }
    schemeTags(where: $schemeTagsWhere) {
      id
      name
    }
    members {
      role
      userId
      user {
        fullName
      }
    }
    groups {
      id
      name
    }
  }
}
    `;
export function useWorkflowDataQuery(baseOptions: Apollo.QueryHookOptions<WorkflowDataQuery, WorkflowDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkflowDataQuery, WorkflowDataQueryVariables>(WorkflowDataDocument, options);
      }
export function useWorkflowDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkflowDataQuery, WorkflowDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkflowDataQuery, WorkflowDataQueryVariables>(WorkflowDataDocument, options);
        }
export type WorkflowDataQueryHookResult = ReturnType<typeof useWorkflowDataQuery>;
export type WorkflowDataLazyQueryHookResult = ReturnType<typeof useWorkflowDataLazyQuery>;
export type WorkflowDataQueryResult = Apollo.QueryResult<WorkflowDataQuery, WorkflowDataQueryVariables>;