import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AvailableTaskQuestionsQueryVariables = Types.Exact<{
  where: Array<Types.Scalars['String']> | Types.Scalars['String'];
}>;


export type AvailableTaskQuestionsQuery = { __typename?: 'Query', availableTaskQuestions: Array<{ __typename?: 'Question', id: string, questionFormatted: string, question: string, optionsFormatted?: Array<string> | null, type: Types.AnswerType, options: Array<{ [key: string]: any }> }> };


export const AvailableTaskQuestionsDocument = gql`
    query AvailableTaskQuestions($where: [String!]!) {
  availableTaskQuestions(where: $where) {
    id
    questionFormatted
    question
    optionsFormatted
    type
    options
  }
}
    `;
export function useAvailableTaskQuestionsQuery(baseOptions: Apollo.QueryHookOptions<AvailableTaskQuestionsQuery, AvailableTaskQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableTaskQuestionsQuery, AvailableTaskQuestionsQueryVariables>(AvailableTaskQuestionsDocument, options);
      }
export function useAvailableTaskQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableTaskQuestionsQuery, AvailableTaskQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableTaskQuestionsQuery, AvailableTaskQuestionsQueryVariables>(AvailableTaskQuestionsDocument, options);
        }
export type AvailableTaskQuestionsQueryHookResult = ReturnType<typeof useAvailableTaskQuestionsQuery>;
export type AvailableTaskQuestionsLazyQueryHookResult = ReturnType<typeof useAvailableTaskQuestionsLazyQuery>;
export type AvailableTaskQuestionsQueryResult = Apollo.QueryResult<AvailableTaskQuestionsQuery, AvailableTaskQuestionsQueryVariables>;