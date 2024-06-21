import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AvailableQuestionsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.UniqueId>;
}>;

export type AvailableQuestionsQuery = {
  __typename?: 'Query';
  availableQuestions: Array<{
    __typename?: 'Question';
    id: string;
    questionFormatted: string;
    question: string;
    optionsFormatted?: Array<string> | null;
    type: Types.AnswerType;
    options: Array<{ [key: string]: any }>;
  }>;
};

export const AvailableQuestionsDocument = gql`
  query AvailableQuestions($where: UniqueId) {
    availableQuestions(where: $where) {
      id
      questionFormatted
      question
      optionsFormatted
      type
      options
    }
  }
`;
export function useAvailableQuestionsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AvailableQuestionsQuery,
    AvailableQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    AvailableQuestionsQuery,
    AvailableQuestionsQueryVariables
  >(AvailableQuestionsDocument, options);
}
export function useAvailableQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AvailableQuestionsQuery,
    AvailableQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    AvailableQuestionsQuery,
    AvailableQuestionsQueryVariables
  >(AvailableQuestionsDocument, options);
}
export type AvailableQuestionsQueryHookResult = ReturnType<
  typeof useAvailableQuestionsQuery
>;
export type AvailableQuestionsLazyQueryHookResult = ReturnType<
  typeof useAvailableQuestionsLazyQuery
>;
export type AvailableQuestionsQueryResult = Apollo.QueryResult<
  AvailableQuestionsQuery,
  AvailableQuestionsQueryVariables
>;
