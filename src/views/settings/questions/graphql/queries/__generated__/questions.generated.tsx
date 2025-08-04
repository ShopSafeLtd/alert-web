import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type QuestionManagementListQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  activityQuestions?: Types.InputMaybe<Types.Scalars['Boolean']>;
  schemeId: Types.Scalars['String'];
  search?: Types.InputMaybe<Types.Scalars['String']>;
  tagQuestions?: Types.InputMaybe<Types.Scalars['Boolean']>;
  type?: Types.InputMaybe<Array<Types.AnswerType> | Types.AnswerType>;
}>;


export type QuestionManagementListQuery = { __typename?: 'Query', questions: { __typename?: 'QueryQuestionsConnection', totalCount: number, edges: Array<{ __typename?: 'QueryQuestionsConnectionEdge', node: { __typename?: 'Question', id?: string | null, model?: Types.QuestionModel | null, activityCount: number, tagsCount: number, question?: string | null, type?: Types.AnswerType | null } }> } };


export const QuestionManagementListDocument = gql`
    query QuestionManagementList($first: Int, $skip: Int, $activityQuestions: Boolean, $schemeId: String!, $search: String, $tagQuestions: Boolean, $type: [AnswerType!]) {
  questions(
    where: {schemeId: $schemeId, activityQuestions: $activityQuestions, search: $search, tagQuestions: $tagQuestions, type: $type}
    first: $first
    skip: $skip
  ) {
    totalCount
    edges {
      node {
        id
        model
        activityCount
        tagsCount
        question
        type
      }
    }
  }
}
    `;
export function useQuestionManagementListQuery(baseOptions: Apollo.QueryHookOptions<QuestionManagementListQuery, QuestionManagementListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuestionManagementListQuery, QuestionManagementListQueryVariables>(QuestionManagementListDocument, options);
      }
export function useQuestionManagementListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuestionManagementListQuery, QuestionManagementListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuestionManagementListQuery, QuestionManagementListQueryVariables>(QuestionManagementListDocument, options);
        }
export type QuestionManagementListQueryHookResult = ReturnType<typeof useQuestionManagementListQuery>;
export type QuestionManagementListLazyQueryHookResult = ReturnType<typeof useQuestionManagementListLazyQuery>;
export type QuestionManagementListQueryResult = Apollo.QueryResult<QuestionManagementListQuery, QuestionManagementListQueryVariables>;