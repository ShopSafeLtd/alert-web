import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddIncidentIncidentTagsQueryVariables = Types.Exact<{
  where: Types.IncidentTagsInput;
}>;


export type AddIncidentIncidentTagsQuery = { __typename?: 'Query', listIncidentTags: Array<{ __typename?: 'IncidentTags', hasChildren: boolean, label: string, parentId?: string | null, parents: Array<string>, tier: number, value: string, tooltip?: string | null, policeReporting: boolean, incidentForm?: Array<{ __typename?: 'IncidentFormOnTag', position: number, type: Types.IncidentFormField }> | null, questions?: Array<{ __typename?: 'IncidentQuestions', answerType: Types.AnswerType, label: string, questionId: string, required: boolean, tagQuestionId: string, priority: number, dependentOnQuestionId?: string | null, dependentOnAnswerValue?: string | null, dependentOnBrandIds?: Array<string> | null, tooltip?: string | null, options: Array<{ __typename?: 'AnswerOption', label: string, value: string }> }> | null }> };


export const AddIncidentIncidentTagsDocument = gql`
    query AddIncidentIncidentTags($where: IncidentTagsInput!) {
  listIncidentTags(where: $where) {
    hasChildren
    incidentForm {
      position
      type
    }
    label
    parentId
    parents
    questions {
      answerType
      label
      questionId
      required
      tagQuestionId
      priority
      dependentOnQuestionId
      dependentOnAnswerValue
      dependentOnBrandIds
      tooltip
      options {
        label
        value
      }
    }
    tier
    value
    tooltip
    policeReporting
  }
}
    `;
export function useAddIncidentIncidentTagsQuery(baseOptions: Apollo.QueryHookOptions<AddIncidentIncidentTagsQuery, AddIncidentIncidentTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddIncidentIncidentTagsQuery, AddIncidentIncidentTagsQueryVariables>(AddIncidentIncidentTagsDocument, options);
      }
export function useAddIncidentIncidentTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddIncidentIncidentTagsQuery, AddIncidentIncidentTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddIncidentIncidentTagsQuery, AddIncidentIncidentTagsQueryVariables>(AddIncidentIncidentTagsDocument, options);
        }
export type AddIncidentIncidentTagsQueryHookResult = ReturnType<typeof useAddIncidentIncidentTagsQuery>;
export type AddIncidentIncidentTagsLazyQueryHookResult = ReturnType<typeof useAddIncidentIncidentTagsLazyQuery>;
export type AddIncidentIncidentTagsQueryResult = Apollo.QueryResult<AddIncidentIncidentTagsQuery, AddIncidentIncidentTagsQueryVariables>;