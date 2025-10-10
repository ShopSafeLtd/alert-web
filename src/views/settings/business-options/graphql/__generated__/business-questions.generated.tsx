import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type BusinessQuestionsQueryVariables = Types.Exact<{
  first?: Types.InputMaybe<Types.Scalars['Int']>;
  after?: Types.InputMaybe<Types.Scalars['String']>;
  last?: Types.InputMaybe<Types.Scalars['Int']>;
  before?: Types.InputMaybe<Types.Scalars['String']>;
  where: Types.BusinessQuestionRelayWhereInput;
  orderBy?: Types.InputMaybe<Types.BusinessQuestionRelayOrderInput>;
}>;


export type BusinessQuestionsQuery = { __typename?: 'Query', businessQuestionRelay: { __typename?: 'QueryBusinessQuestionRelayConnection', totalCount: number, edges: Array<{ __typename?: 'QueryBusinessQuestionRelayConnectionEdge', node: { __typename?: 'BusinessQuestion', id: string, createdAt: Date, updatedAt: Date, schemeId: string, questionId: string, priority: number, req: boolean, deleted: boolean, dependentBrands: Array<string>, dependentQuestions: Array<{ [key: string]: any }>, dependentTags: Array<string>, actions: Array<{ [key: string]: any }>, failureAnswer?: string | null, failureMessage?: string | null, tooltip?: string | null, question: { __typename?: 'Question', id: string, question: string, type: Types.AnswerType, options: Array<{ [key: string]: any }> } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };


export const BusinessQuestionsDocument = gql`
    query BusinessQuestions($first: Int, $after: String, $last: Int, $before: String, $where: BusinessQuestionRelayWhereInput!, $orderBy: BusinessQuestionRelayOrderInput) {
  businessQuestionRelay(
    first: $first
    after: $after
    last: $last
    before: $before
    where: $where
    orderBy: $orderBy
  ) {
    edges {
      node {
        id
        createdAt
        updatedAt
        schemeId
        questionId
        priority
        req
        deleted
        dependentBrands
        dependentQuestions
        dependentTags
        actions
        failureAnswer
        failureMessage
        tooltip
        question {
          id
          question
          type
          options
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `;
export function useBusinessQuestionsQuery(baseOptions: Apollo.QueryHookOptions<BusinessQuestionsQuery, BusinessQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BusinessQuestionsQuery, BusinessQuestionsQueryVariables>(BusinessQuestionsDocument, options);
      }
export function useBusinessQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BusinessQuestionsQuery, BusinessQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BusinessQuestionsQuery, BusinessQuestionsQueryVariables>(BusinessQuestionsDocument, options);
        }
export type BusinessQuestionsQueryHookResult = ReturnType<typeof useBusinessQuestionsQuery>;
export type BusinessQuestionsLazyQueryHookResult = ReturnType<typeof useBusinessQuestionsLazyQuery>;
export type BusinessQuestionsQueryResult = Apollo.QueryResult<BusinessQuestionsQuery, BusinessQuestionsQueryVariables>;