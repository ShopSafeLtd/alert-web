import type * as Types from '../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ViewTagQueryVariables = Types.Exact<{
  where: Types.TagWhereUniqueInput;
  listWhere: Types.TagWhereInput;
  tagQuestionsWhere?: Types.InputMaybe<Types.TagQuestionWhereInput>;
}>;

export type ViewTagQuery = {
  __typename?: 'Query';
  listTags: {
    __typename?: 'ListTags';
    tags: Array<{
      __typename?: 'Tag';
      id: string;
      name: string;
      parentTag?: { __typename?: 'Tag'; id: string } | null;
    }>;
  };
  tag: {
    __typename?: 'Tag';
    id: string;
    name: string;
    description: string;
    parentTag?: { __typename?: 'Tag'; id: string; name: string } | null;
    incidentForm?: {
      __typename?: 'IncidentForm';
      id: string;
      fields: Array<{
        __typename?: 'FormField';
        id: string;
        position: number;
        type: Types.IncidentFormField;
      }>;
    } | null;
    tagQuestions: Array<{
      __typename?: 'TagQuestion';
      req: boolean;
      priority: number;
      dependentQuestions: Array<{ [key: string]: any }>;
      id: string;
      question: {
        __typename?: 'Question';
        questionFormatted: string;
        type: Types.AnswerType;
        id: string;
        optionsFormatted?: Array<string> | null;
      };
    }>;
  };
};

export const ViewTagDocument = gql`
  query ViewTag(
    $where: TagWhereUniqueInput!
    $listWhere: TagWhereInput!
    $tagQuestionsWhere: TagQuestionWhereInput
  ) {
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
export function useViewTagQuery(
  baseOptions: Apollo.QueryHookOptions<ViewTagQuery, ViewTagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ViewTagQuery, ViewTagQueryVariables>(
    ViewTagDocument,
    options
  );
}
export function useViewTagLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ViewTagQuery, ViewTagQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ViewTagQuery, ViewTagQueryVariables>(
    ViewTagDocument,
    options
  );
}
export type ViewTagQueryHookResult = ReturnType<typeof useViewTagQuery>;
export type ViewTagLazyQueryHookResult = ReturnType<typeof useViewTagLazyQuery>;
export type ViewTagQueryResult = Apollo.QueryResult<
  ViewTagQuery,
  ViewTagQueryVariables
>;
