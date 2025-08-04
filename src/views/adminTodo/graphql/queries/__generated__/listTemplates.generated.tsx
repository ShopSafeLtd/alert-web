import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QuestionGroupOnSchemeQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
  questionGroupsWhere?: Types.InputMaybe<Types.QuestionGroupWhereInput>;
  orderBy?: Types.InputMaybe<Array<Types.QuestionGroupOrderByWithRelationInput> | Types.QuestionGroupOrderByWithRelationInput>;
}>;


export type QuestionGroupOnSchemeQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', questionGroups: Array<{ __typename?: 'QuestionGroup', id?: string | null, name?: string | null, description?: string | null, defaultDueDate?: number | null, questions?: Array<{ __typename?: 'Question', questionFormatted?: string | null, id?: string | null, type?: Types.AnswerType | null, optionsFormFormatted?: Array<{ __typename?: 'AnswerOption', label: string, value: string }> | null }> | null }> } };


export const QuestionGroupOnSchemeDocument = gql`
    query QuestionGroupOnScheme($where: SchemeWhereUniqueInput!, $questionGroupsWhere: QuestionGroupWhereInput, $orderBy: [QuestionGroupOrderByWithRelationInput!]) {
  scheme(where: $where) {
    questionGroups(where: $questionGroupsWhere, orderBy: $orderBy) {
      id
      name
      description
      defaultDueDate
      questions {
        questionFormatted
        id
        optionsFormFormatted {
          label
          value
        }
        type
      }
    }
  }
}
    `;
export function useQuestionGroupOnSchemeQuery(baseOptions: Apollo.QueryHookOptions<QuestionGroupOnSchemeQuery, QuestionGroupOnSchemeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionGroupOnSchemeQuery, QuestionGroupOnSchemeQueryVariables>(QuestionGroupOnSchemeDocument, options);
      }
export function useQuestionGroupOnSchemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionGroupOnSchemeQuery, QuestionGroupOnSchemeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionGroupOnSchemeQuery, QuestionGroupOnSchemeQueryVariables>(QuestionGroupOnSchemeDocument, options);
        }
export type QuestionGroupOnSchemeQueryHookResult = ReturnType<typeof useQuestionGroupOnSchemeQuery>;
export type QuestionGroupOnSchemeLazyQueryHookResult = ReturnType<typeof useQuestionGroupOnSchemeLazyQuery>;
export type QuestionGroupOnSchemeQueryResult = Apollo.QueryResult<QuestionGroupOnSchemeQuery, QuestionGroupOnSchemeQueryVariables>;