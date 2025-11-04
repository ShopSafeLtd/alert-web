import type * as Types from '../../../types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListOffendersSelectQueryVariables = Types.Exact<{
  scheme: Types.SchemeWhereUniqueInput;
  where?: Types.InputMaybe<Types.OffenderWhereInput>;
  order?: Types.InputMaybe<Types.OffenderOrderByWithRelationInput>;
  take?: Types.InputMaybe<Types.Scalars['Int']>;
  skip?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListOffendersSelectQuery = { __typename?: 'Query', listOffenders: { __typename?: 'ListOffenders', total: number, offenders: Array<{ __typename?: 'Offender', id: string, name?: string | null, reference?: number | null }> } };


export const ListOffendersSelectDocument = gql`
    query listOffendersSelect($scheme: SchemeWhereUniqueInput!, $where: OffenderWhereInput, $order: OffenderOrderByWithRelationInput, $take: Int, $skip: Int) {
  listOffenders(
    scheme: $scheme
    where: $where
    order: $order
    take: $take
    skip: $skip
  ) {
    offenders {
      id
      name
      reference
    }
    total
  }
}
    `;
export function useListOffendersSelectQuery(baseOptions: Apollo.QueryHookOptions<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>(ListOffendersSelectDocument, options);
      }
export function useListOffendersSelectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>(ListOffendersSelectDocument, options);
        }
export type ListOffendersSelectQueryHookResult = ReturnType<typeof useListOffendersSelectQuery>;
export type ListOffendersSelectLazyQueryHookResult = ReturnType<typeof useListOffendersSelectLazyQuery>;
export type ListOffendersSelectQueryResult = Apollo.QueryResult<ListOffendersSelectQuery, ListOffendersSelectQueryVariables>;