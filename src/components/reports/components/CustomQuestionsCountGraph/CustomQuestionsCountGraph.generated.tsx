import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CustomQuestionsCountGraphQueryVariables = Types.Exact<{
  where: Types.CustomQuestionsCountGraphInput;
}>;

export type CustomQuestionsCountGraphQuery = {
  __typename?: 'Query';
  customQuestionsCountGraph: {
    __typename?: 'CustomQuestionsGraph';
    title: string;
    data: Array<{ __typename?: 'Graph'; label: string; value: number }>;
  };
};

export const CustomQuestionsCountGraphDocument = gql`
  query CustomQuestionsCountGraph($where: CustomQuestionsCountGraphInput!) {
    customQuestionsCountGraph(where: $where) {
      data {
        label
        value
      }
      title
    }
  }
`;
export function useCustomQuestionsCountGraphQuery(
  baseOptions: Apollo.QueryHookOptions<
    CustomQuestionsCountGraphQuery,
    CustomQuestionsCountGraphQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    CustomQuestionsCountGraphQuery,
    CustomQuestionsCountGraphQueryVariables
  >(CustomQuestionsCountGraphDocument, options);
}
export function useCustomQuestionsCountGraphLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CustomQuestionsCountGraphQuery,
    CustomQuestionsCountGraphQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    CustomQuestionsCountGraphQuery,
    CustomQuestionsCountGraphQueryVariables
  >(CustomQuestionsCountGraphDocument, options);
}
export type CustomQuestionsCountGraphQueryHookResult = ReturnType<
  typeof useCustomQuestionsCountGraphQuery
>;
export type CustomQuestionsCountGraphLazyQueryHookResult = ReturnType<
  typeof useCustomQuestionsCountGraphLazyQuery
>;
export type CustomQuestionsCountGraphQueryResult = Apollo.QueryResult<
  CustomQuestionsCountGraphQuery,
  CustomQuestionsCountGraphQueryVariables
>;
