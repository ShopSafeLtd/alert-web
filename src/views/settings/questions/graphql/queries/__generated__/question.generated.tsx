import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QuestionModalDetailsQueryVariables = Types.Exact<{
  where: Types.QuestionWhereUniqueInput;
}>;


export type QuestionModalDetailsQuery = { __typename?: 'Query', question: { __typename?: 'Question', id?: string | null, question?: string | null, tags?: Array<{ __typename?: 'TagQuestion', tag?: { __typename?: 'Tag', id?: string | null, name?: string | null } | null }> | null, questionGroup?: Array<{ __typename?: 'QuestionGroup', id?: string | null, name?: string | null }> | null } };


export const QuestionModalDetailsDocument = gql`
    query QuestionModalDetails($where: QuestionWhereUniqueInput!) {
  question(where: $where) {
    id
    tags {
      tag {
        id
        name
      }
    }
    question
    questionGroup {
      id
      name
    }
  }
}
    `;
export function useQuestionModalDetailsQuery(baseOptions: Apollo.QueryHookOptions<QuestionModalDetailsQuery, QuestionModalDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionModalDetailsQuery, QuestionModalDetailsQueryVariables>(QuestionModalDetailsDocument, options);
      }
export function useQuestionModalDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionModalDetailsQuery, QuestionModalDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionModalDetailsQuery, QuestionModalDetailsQueryVariables>(QuestionModalDetailsDocument, options);
        }
export type QuestionModalDetailsQueryHookResult = ReturnType<typeof useQuestionModalDetailsQuery>;
export type QuestionModalDetailsLazyQueryHookResult = ReturnType<typeof useQuestionModalDetailsLazyQuery>;
export type QuestionModalDetailsQueryResult = Apollo.QueryResult<QuestionModalDetailsQuery, QuestionModalDetailsQueryVariables>;