import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewTagQueryVariables = Types.Exact<{
  where: Types.TagWhereUniqueInput;
  listWhere: Types.TagWhereInput;
  tagQuestionsWhere?: Types.InputMaybe<Types.TagQuestionWhereInput>;
}>;


export type ViewTagQuery = { __typename?: 'Query', listTags: { __typename?: 'ListTags', tags: Array<{ __typename?: 'Tag', id?: string | null, name?: string | null, parentTag?: { __typename?: 'Tag', id?: string | null } | null }> }, tag: { __typename?: 'Tag', id?: string | null, name?: string | null, description?: string | null, parentTag?: { __typename?: 'Tag', id?: string | null, name?: string | null } | null, incidentForm?: { __typename?: 'IncidentForm', id?: string | null, fields?: Array<{ __typename?: 'FormField', id?: string | null, position?: number | null, type?: Types.IncidentFormField | null, metadata?: { [key: string]: any } | null, conditions?: Array<{ [key: string]: any }> | null }> | null } | null, tagQuestions: Array<{ __typename?: 'TagQuestion', req?: boolean | null, priority?: number | null, dependentQuestions?: Array<{ [key: string]: any }> | null, id?: string | null, question?: { __typename?: 'Question', questionFormatted?: string | null, type?: Types.AnswerType | null, id?: string | null, optionsFormatted?: Array<string> | null } | null }> } };


export const ViewTagDocument = gql`
    query ViewTag($where: TagWhereUniqueInput!, $listWhere: TagWhereInput!, $tagQuestionsWhere: TagQuestionWhereInput) {
  listTags(where: $listWhere) {
    tags {
      id
      name
      parentTag {
        id
      }
    }
  }
  tag(where: $where) {
    id
    name
    parentTag {
      id
      name
    }
    description
    incidentForm {
      id
      fields {
        id
        position
        type
        metadata
        conditions
      }
    }
    tagQuestions(where: $tagQuestionsWhere) {
      req
      priority
      dependentQuestions
      question {
        questionFormatted
        type
        id
        optionsFormatted
        type
      }
      id
    }
  }
}
    `;
export function useViewTagQuery(baseOptions: Apollo.QueryHookOptions<ViewTagQuery, ViewTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewTagQuery, ViewTagQueryVariables>(ViewTagDocument, options);
      }
export function useViewTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewTagQuery, ViewTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewTagQuery, ViewTagQueryVariables>(ViewTagDocument, options);
        }
export type ViewTagQueryHookResult = ReturnType<typeof useViewTagQuery>;
export type ViewTagLazyQueryHookResult = ReturnType<typeof useViewTagLazyQuery>;
export type ViewTagQueryResult = Apollo.QueryResult<ViewTagQuery, ViewTagQueryVariables>;