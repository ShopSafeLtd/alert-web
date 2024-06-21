import type * as Types from '../../../../graphql/types.js';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DocumentsQueryVariables = Types.Exact<{
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  orderBy?: Types.InputMaybe<
    | Array<Types.DocumentOrderByWithRelationInput>
    | Types.DocumentOrderByWithRelationInput
  >;
  where?: Types.InputMaybe<Types.DocumentWhereInput>;
}>;

export type DocumentsQuery = {
  __typename?: 'Query';
  documents: {
    __typename?: 'QueryDocumentsConnection';
    totalCount: number;
    edges: Array<{
      __typename?: 'QueryDocumentsConnectionEdge';
      node: {
        __typename?: 'Document';
        id: string;
        name: string;
        url: string;
        fileType?: Types.FileType | null;
        tags: Array<{ __typename?: 'Tag'; id: string; name: string }>;
      };
    }>;
  };
};

export const DocumentsDocument = gql`
  query Documents(
    $skip: Int
    $take: Int
    $orderBy: [DocumentOrderByWithRelationInput!]
    $where: DocumentWhereInput
  ) {
    documents(skip: $skip, take: $take, orderBy: $orderBy, where: $where) {
      totalCount
      edges {
        node {
          id
          name
          url
          fileType
          tags {
            id
            name
          }
        }
      }
    }
  }
`;
export function useDocumentsQuery(
  baseOptions?: Apollo.QueryHookOptions<DocumentsQuery, DocumentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DocumentsQuery, DocumentsQueryVariables>(
    DocumentsDocument,
    options
  );
}
export function useDocumentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DocumentsQuery,
    DocumentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(
    DocumentsDocument,
    options
  );
}
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>;
export type DocumentsLazyQueryHookResult = ReturnType<
  typeof useDocumentsLazyQuery
>;
export type DocumentsQueryResult = Apollo.QueryResult<
  DocumentsQuery,
  DocumentsQueryVariables
>;
