import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QuestionDetailsQueryVariables = Types.Exact<{
  where: Types.QuestionWhereUniqueInput;
}>;


export type QuestionDetailsQuery = { __typename?: 'Query', question: { __typename?: 'Question', id: string, questionFormatted: string, question: string, optionsFormatted?: Array<string> | null, type: Types.AnswerType, options: Array<{ [key: string]: any }>, tags: Array<{ __typename?: 'TagQuestion', id: string, dependentBrands: Array<string>, tooltip?: string | null }> } };


export const QuestionDetailsDocument = gql`
    query QuestionDetails($where: QuestionWhereUniqueInput!) {
  question(where: $where) {
    id
    questionFormatted
    question
    optionsFormatted
    type
    options
    tags {
      id
      dependentBrands
      tooltip
    }
  }
}
    `;
export function useQuestionDetailsQuery(baseOptions: Apollo.QueryHookOptions<QuestionDetailsQuery, QuestionDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionDetailsQuery, QuestionDetailsQueryVariables>(QuestionDetailsDocument, options);
      }
export function useQuestionDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionDetailsQuery, QuestionDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionDetailsQuery, QuestionDetailsQueryVariables>(QuestionDetailsDocument, options);
        }
export type QuestionDetailsQueryHookResult = ReturnType<typeof useQuestionDetailsQuery>;
export type QuestionDetailsLazyQueryHookResult = ReturnType<typeof useQuestionDetailsLazyQuery>;
export type QuestionDetailsQueryResult = Apollo.QueryResult<QuestionDetailsQuery, QuestionDetailsQueryVariables>;