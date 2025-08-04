import type * as Types from '../../../types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListDocumentsOnSchemeQueryVariables = Types.Exact<{
  where: Types.SchemeWhereUniqueInput;
}>;


export type ListDocumentsOnSchemeQuery = { __typename?: 'Query', scheme: { __typename?: 'Scheme', mg11Available?: boolean | null, documents: Array<{ __typename?: 'Document', id?: string | null, name?: string | null, url?: string | null, thumbnailUrl?: string | null, createdAt?: Date | null, tags: Array<{ __typename?: 'Tag', name?: string | null, id?: string | null }> }> } };


export const ListDocumentsOnSchemeDocument = gql`
    query listDocumentsOnScheme($where: SchemeWhereUniqueInput!) {
  scheme(where: $where) {
    mg11Available
    documents {
      id
      name
      tags {
        name
        id
      }
      url
      thumbnailUrl
      createdAt
    }
  }
}
    `;
export function useListDocumentsOnSchemeQuery(baseOptions: Apollo.QueryHookOptions<ListDocumentsOnSchemeQuery, ListDocumentsOnSchemeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListDocumentsOnSchemeQuery, ListDocumentsOnSchemeQueryVariables>(ListDocumentsOnSchemeDocument, options);
      }
export function useListDocumentsOnSchemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListDocumentsOnSchemeQuery, ListDocumentsOnSchemeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListDocumentsOnSchemeQuery, ListDocumentsOnSchemeQueryVariables>(ListDocumentsOnSchemeDocument, options);
        }
export type ListDocumentsOnSchemeQueryHookResult = ReturnType<typeof useListDocumentsOnSchemeQuery>;
export type ListDocumentsOnSchemeLazyQueryHookResult = ReturnType<typeof useListDocumentsOnSchemeLazyQuery>;
export type ListDocumentsOnSchemeQueryResult = Apollo.QueryResult<ListDocumentsOnSchemeQuery, ListDocumentsOnSchemeQueryVariables>;