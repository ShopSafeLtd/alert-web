import type * as Types from '../../../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CompleteChecklistMutationVariables = Types.Exact<{
  data: Types.CompleteActiveChecklistInput;
  where: Types.Scalars['String'];
}>;


export type CompleteChecklistMutation = { __typename?: 'Mutation', completeChecklist: { __typename?: 'ActiveChecklist', id: string, name?: string | null, comments?: string | null, signature?: string | null, status: Types.ChecklistStatus, completedAt?: Date | null, completedBy?: { __typename?: 'User', origName: string } | null, fields: Array<{ __typename?: 'ActiveChecklistFields', id: string, question: { [key: string]: any }, type: Types.ChecklistAnswerType, availableAnswers: Array<{ [key: string]: any }>, section: number, subsection: number, order: number, answer?: { __typename?: 'ChecklistAnswer', answer: string, additionalComments?: string | null, images: Array<string> } | null }>, checklistSection: Array<{ __typename?: 'ActiveChecklistSections', sub: boolean, section: number, subsection?: number | null, titleLocaled: string }> } };


export const CompleteChecklistDocument = gql`
    mutation CompleteChecklist($data: CompleteActiveChecklistInput!, $where: String!) {
  completeChecklist(data: $data, where: $where) {
    id
    name
    comments
    signature
    status
    completedAt
    completedBy {
      origName
    }
    fields {
      id
      question
      type
      availableAnswers
      answer {
        answer
        additionalComments
        images
      }
      section
      subsection
      order
    }
    checklistSection {
      sub
      section
      subsection
      titleLocaled
    }
  }
}
    `;
export type CompleteChecklistMutationFn = Apollo.MutationFunction<CompleteChecklistMutation, CompleteChecklistMutationVariables>;
export function useCompleteChecklistMutation(baseOptions?: Apollo.MutationHookOptions<CompleteChecklistMutation, CompleteChecklistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CompleteChecklistMutation, CompleteChecklistMutationVariables>(CompleteChecklistDocument, options);
      }
export type CompleteChecklistMutationHookResult = ReturnType<typeof useCompleteChecklistMutation>;
export type CompleteChecklistMutationResult = Apollo.MutationResult<CompleteChecklistMutation>;
export type CompleteChecklistMutationOptions = Apollo.BaseMutationOptions<CompleteChecklistMutation, CompleteChecklistMutationVariables>;