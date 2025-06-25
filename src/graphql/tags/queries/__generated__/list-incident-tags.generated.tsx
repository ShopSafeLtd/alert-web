import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIncidentTagsQueryVariables = Types.Exact<{
  where: Types.IncidentTagsInput;
}>;


export type ListIncidentTagsQuery = { __typename?: 'Query', listIncidentTags: Array<{ __typename?: 'IncidentTags', hasChildren: boolean, label: string, parentId?: string | null, parents: Array<string>, policeReporting: boolean, tier: number, value: string, tooltip?: string | null, incidentForm?: Array<{ __typename?: 'IncidentFormOnTag', position: number, type: Types.IncidentFormField, metadata?: { [key: string]: any } | null, conditions?: Array<{ [key: string]: any }> | null }> | null, questions?: Array<{ __typename?: 'IncidentQuestions', answerType: Types.AnswerType, label: string, questionId: string, required: boolean, tagQuestionId: string, priority: number, dependentOnQuestionId?: string | null, dependentOnAnswerValue?: string | null, dependentOnTagIds?: Array<string> | null, dependentOnBrandIds?: Array<string> | null, dependentMode?: string | null, dependentOnAnswerValueArray?: Array<string> | null, tooltip?: string | null, actions: Array<{ [key: string]: any }>, options: Array<{ __typename?: 'AnswerOption', label: string, value: string }> }> | null }> };


export const ListIncidentTagsDocument = gql`
    query ListIncidentTags($where: IncidentTagsInput!) {
  listIncidentTags(where: $where) {
    hasChildren
    incidentForm {
      position
      type
      metadata
      conditions
    }
    label
    parentId
    parents
    policeReporting
    questions {
      answerType
      label
      questionId
      required
      tagQuestionId
      priority
      dependentOnQuestionId
      dependentOnAnswerValue
      dependentOnTagIds
      dependentOnBrandIds
      dependentMode
      dependentOnAnswerValueArray
      tooltip
      actions
      options {
        label
        value
      }
    }
    tier
    value
    tooltip
  }
}
    `;
export function useListIncidentTagsQuery(baseOptions: Apollo.QueryHookOptions<ListIncidentTagsQuery, ListIncidentTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIncidentTagsQuery, ListIncidentTagsQueryVariables>(ListIncidentTagsDocument, options);
      }
export function useListIncidentTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIncidentTagsQuery, ListIncidentTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIncidentTagsQuery, ListIncidentTagsQueryVariables>(ListIncidentTagsDocument, options);
        }
export type ListIncidentTagsQueryHookResult = ReturnType<typeof useListIncidentTagsQuery>;
export type ListIncidentTagsLazyQueryHookResult = ReturnType<typeof useListIncidentTagsLazyQuery>;
export type ListIncidentTagsQueryResult = Apollo.QueryResult<ListIncidentTagsQuery, ListIncidentTagsQueryVariables>;