import type * as Types from '../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TranslateQueryVariables = Types.Exact<{
  data: Types.TranslateTextInput;
}>;

export type TranslateQuery = {
  __typename?: 'Query';
  translateText: Array<{
    __typename?: 'TranslatedText';
    origText: string;
    translatedText: string;
  }>;
};

export const TranslateDocument = gql`
  query Translate($data: TranslateTextInput!) {
    translateText(data: $data) {
      origText
      translatedText
    }
  }
`;
export function useTranslateQuery(
  baseOptions: Apollo.QueryHookOptions<TranslateQuery, TranslateQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TranslateQuery, TranslateQueryVariables>(
    TranslateDocument,
    options
  );
}
export function useTranslateLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    TranslateQuery,
    TranslateQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TranslateQuery, TranslateQueryVariables>(
    TranslateDocument,
    options
  );
}
export type TranslateQueryHookResult = ReturnType<typeof useTranslateQuery>;
export type TranslateLazyQueryHookResult = ReturnType<
  typeof useTranslateLazyQuery
>;
export type TranslateQueryResult = Apollo.QueryResult<
  TranslateQuery,
  TranslateQueryVariables
>;
