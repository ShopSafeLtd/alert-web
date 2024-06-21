import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TranslateTextQueryVariables = Types.Exact<{
  data: Types.TranslateTextInput;
}>;

export type TranslateTextQuery = {
  __typename?: 'Query';
  translateText: Array<{
    __typename?: 'TranslatedText';
    translatedText: string;
    origText: string;
  }>;
};

export const TranslateTextDocument = gql`
  query TranslateText($data: TranslateTextInput!) {
    translateText(data: $data) {
      translatedText
      origText
    }
  }
`;
export function useTranslateTextQuery(
  baseOptions: Apollo.QueryHookOptions<
    TranslateTextQuery,
    TranslateTextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TranslateTextQuery, TranslateTextQueryVariables>(
    TranslateTextDocument,
    options
  );
}
export function useTranslateTextLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TranslateTextQuery,
    TranslateTextQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TranslateTextQuery, TranslateTextQueryVariables>(
    TranslateTextDocument,
    options
  );
}
export type TranslateTextQueryHookResult = ReturnType<
  typeof useTranslateTextQuery
>;
export type TranslateTextLazyQueryHookResult = ReturnType<
  typeof useTranslateTextLazyQuery
>;
export type TranslateTextQueryResult = Apollo.QueryResult<
  TranslateTextQuery,
  TranslateTextQueryVariables
>;
