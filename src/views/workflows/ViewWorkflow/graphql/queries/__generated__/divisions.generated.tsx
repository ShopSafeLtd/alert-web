import type * as Types from '../../../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DivisionsOnSchemeQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type DivisionsOnSchemeQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', divisions: Array<string> } };


export const DivisionsOnSchemeDocument = gql`
    query divisionsOnScheme($id: String!) {
  scheme(where: {id: $id}) {
    divisions
  }
}
    `;
export function useDivisionsOnSchemeQuery(baseOptions: Apollo.QueryHookOptions<DivisionsOnSchemeQuery, DivisionsOnSchemeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DivisionsOnSchemeQuery, DivisionsOnSchemeQueryVariables>(DivisionsOnSchemeDocument, options);
      }
export function useDivisionsOnSchemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DivisionsOnSchemeQuery, DivisionsOnSchemeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DivisionsOnSchemeQuery, DivisionsOnSchemeQueryVariables>(DivisionsOnSchemeDocument, options);
        }
export type DivisionsOnSchemeQueryHookResult = ReturnType<typeof useDivisionsOnSchemeQuery>;
export type DivisionsOnSchemeLazyQueryHookResult = ReturnType<typeof useDivisionsOnSchemeLazyQuery>;
export type DivisionsOnSchemeQueryResult = Apollo.QueryResult<DivisionsOnSchemeQuery, DivisionsOnSchemeQueryVariables>;