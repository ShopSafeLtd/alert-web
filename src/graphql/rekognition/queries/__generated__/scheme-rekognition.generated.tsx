import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SchemeRekognitionQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type SchemeRekognitionQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', id: string, facialRecognition: boolean, facialDetection: boolean, facialRedaction: boolean, rekCollections: Array<{ __typename?: 'RekCollection', id: string, name: string }> } };


export const SchemeRekognitionDocument = gql`
    query SchemeRekognition($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    id
    facialRecognition
    facialDetection
    facialRedaction
    rekCollections {
      id
      name
    }
  }
}
    `;
export function useSchemeRekognitionQuery(baseOptions: Apollo.QueryHookOptions<SchemeRekognitionQuery, SchemeRekognitionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SchemeRekognitionQuery, SchemeRekognitionQueryVariables>(SchemeRekognitionDocument, options);
      }
export function useSchemeRekognitionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SchemeRekognitionQuery, SchemeRekognitionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SchemeRekognitionQuery, SchemeRekognitionQueryVariables>(SchemeRekognitionDocument, options);
        }
export type SchemeRekognitionQueryHookResult = ReturnType<typeof useSchemeRekognitionQuery>;
export type SchemeRekognitionLazyQueryHookResult = ReturnType<typeof useSchemeRekognitionLazyQuery>;
export type SchemeRekognitionQueryResult = Apollo.QueryResult<SchemeRekognitionQuery, SchemeRekognitionQueryVariables>;